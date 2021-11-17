const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const {
  User,
  Deposit,
  Withdraw,
  LiveAccount,
  DemoAccount,
} = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const { Op } = require("sequelize");
const generateUUID = require("../utils/generateUUID");
const sendSecretMail = require("../utils/mailSender");
const fs = require("fs");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_Id,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.S3_BUCKET_NAME,
    key(req, file, cb) {
      cb(
        null,
        `${
          process.env.S3_STORAGE_FOLDER_NAME
        }/original/${Date.now()}_${path.basename(file.originalname)}`
      );
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const router = express.Router();

router.get("/list", isAdminCheck, async (req, res, next) => {
  const { page, search, searchType, searchComplete } = req.query;

  const LIMIT = 10;

  const _page = page ? page : 1;
  const searchName = search ? search : "";
  const searchTypes = searchType ? searchType : "";
  const searchCompletes = searchComplete ? searchComplete : "";

  const __page = _page - 1;
  const OFFSET = __page * 10;

  try {
    const totalUser = await User.findAll({
      where: {
        username: {
          [Op.like]: `%${searchName}%`,
        },
        userType: {
          [Op.like]: `%${searchTypes}%`,
        },
        isComplete: {
          [Op.like]: `%${searchCompletes}%`,
        },
      },
    });

    const userLen = totalUser.length;

    const lastPage =
      userLen % LIMIT > 0 ? userLen / LIMIT + 1 : userLen / LIMIT;

    const users = await User.findAll({
      offset: OFFSET,
      limit: LIMIT,
      where: {
        username: {
          [Op.like]: `%${searchName}%`,
        },
        userType: {
          [Op.like]: `%${searchTypes}%`,
        },
        isComplete: {
          [Op.like]: `%${searchCompletes}%`,
        },
      },
      include: [
        { model: Deposit },
        { model: Withdraw },
        { model: LiveAccount },
        { model: DemoAccount },
      ],
      attributes: {
        exclude: ["password"],
      },
      order: [["createdAt", "DESC"]],
    });

    return res
      .status(200)
      .json({ users, lastPage: parseInt(lastPage), userLen });
  } catch (error) {
    console.error(error);
    return res.status(401).send("사용자 목록을 불러올 수 없습니다.");
  }
});

router.get("/signin", async (req, res, next) => {
  console.log("❌❌❌❌❌❌❌❌❌❌❌❌❌❌");
  console.log(req.user);
  console.log("❌❌❌❌❌❌❌❌❌❌❌❌❌❌");
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          { model: Deposit },
          { model: Withdraw },
          { model: LiveAccount },
          { model: DemoAccount },
        ],
      });

      console.log("🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀");
      console.log(fullUserWithoutPassword);
      console.log("🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀");
      return res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (info) {
      console.log(`❌ LOGIN FAILED : ${info.reason}`);
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          { model: Deposit },
          { model: Withdraw },
          { model: LiveAccount },
          { model: DemoAccount },
        ],
      });

      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/signin/admin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (user.level < 3) {
      console.log(`❌ LOGIN FAILED : 관리자 접속 권한이 없습니다.`);
      return res.status(403).send({ reason: "관리자 접속 권한이 없습니다." }); // Forbbiden 권한 없음
    }

    if (info) {
      console.log(`❌ LOGIN FAILED : ${info.reason}`);
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
      });

      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post(
  "/image",
  async (req, res, next) => {
    const uploadImage = upload.single("image");

    await uploadImage(req, res, (err) => {
      const { language } = req.body;

      if (err instanceof multer.MulterError) {
        return res
          .status(401)
          .send(
            language === `ko`
              ? "첨부 가능한 용량을 초과했습니다."
              : "The attachable capacity has been exceeded"
          );
      } else if (err) {
        return res
          .status(401)
          .send(
            language === `ko`
              ? "업로드 중 문제가 발생했습니다."
              : "There was a problem uploading"
          );
      }

      next();
    });
  },
  async (req, res) => {
    return res.json({
      path: req.file.location,
      originName: req.file.originalname,
    });
  }
);

router.post("/signup", async (req, res, next) => {
  const {
    language,
    type,
    email,
    password,
    username,
    countryNo,
    mobile,
    gender,
    zoneCode,
    address,
    detailAddress,
    idType,
    idDate1,
    idDate2,
    idFilePath,
    idFileOriginName,
    addrType,
    addrFilePath,
    addrFileOriginName,
    platform,
    accountType,
    leverage,
  } = req.body;

  try {
    const exUser = await User.findOne({
      where: { email: email },
    });

    if (exUser) {
      return res
        .status(401)
        .send(
          language === `ko`
            ? `이미 가입된 이메일 입니다.`
            : `This email is already registered`
        );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      userType: type,
      email,
      password: hashedPassword,
      username,
      countryNo,
      mobile,
      gender,
      zoneCode,
      address,
      detailAddress,
      idType,
      idDate1,
      idDate2,
      idFilePath,
      idFileOriginName,
      addrType,
      addrFilePath,
      addrFileOriginName,
      platform,
      accountType,
      leverage,
    });

    if (updateResult[0] > 0 && type === 0) {
      sendSecretMail(
        "신규 라이브 계정 요청이 접수되었습니다.",
        `
      <div style="width: 50%; padding: 30px; border: 1px solid #eeeeee">
            <img src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/logo/logo_hover.png"
            style="width: auto; height: auto; background-size: cover; padding-bottom: 30px;"
            />
            
            <div style="
            height: 45px;
            display: flex;
            background: #3792eb;
            font-size: 22px;
            color: #fff;
            padding: 0 20px;
            line-height: 45px;
            border-radius: 3px;
          ">
            신규 라이브 계정 요청이 접수되었습니다.
            </div>

            <div style="color: #0b0b0b; padding: 50px 0; font-size: 14px;">
            신규 라이브 계정 요청이 접수되었습니다.
            <br />
            담당부서 승인이 필요합니다.
            <br />
            자세한 내용은 홈페이지에서 확인바랍니다.
            <br />
            <br />
            </div>
            <div>
              <a href="https://www.will-markets.com">
                <button style="padding: 10px 20px; color: #fff; background-color:#0b0b0b; 
                border: 1px solid #0b0b0b;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;">
                  윌마켓으로 이동하기
                </button>
              </a>
            </div>
       </div>
       `
      );
      return res.status(200).json({ result: true });
    } else if (updateResult[0] > 0 && type === 1) {
      sendSecretMail(
        "신규 데모 계정 요청이 접수되었습니다.",
        `
      <div style="width: 50%; padding: 30px; border: 1px solid #eeeeee">
            <img src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/logo/logo_hover.png"
            style="width: auto; height: auto; background-size: cover; padding-bottom: 30px;"
            />
            
            <div style="
            height: 45px;
            display: flex;
            background: #3792eb;
            font-size: 22px;
            color: #fff;
            padding: 0 20px;
            line-height: 45px;
            border-radius: 3px;
          ">
            신규 데모 계정 요청이 접수되었습니다.
            </div>

            <div style="color: #0b0b0b; padding: 50px 0; font-size: 14px;">
            신규 데모 계정 요청이 접수되었습니다.
            <br />
            담당부서 승인이 필요합니다.
            <br />
            자세한 내용은 홈페이지에서 확인바랍니다.
            <br />
            <br />
            </div>
            <div>
              <a href="https://www.will-markets.com">
                <button style="padding: 10px 20px; color: #fff; background-color:#0b0b0b; 
                border: 1px solid #0b0b0b;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;">
                  윌마켓으로 이동하기
                </button>
              </a>
            </div>
       </div>
       `
      );
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/me", isLoggedIn, async (req, res, next) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.error(error);
    return res.status(401).send("사용자 정보를 불러올 수 없습니다.");
  }
});

router.patch("/me/update", async (req, res, next) => {
  const {
    language,
    id,
    email,
    password,
    username,
    countryNo,
    mobile,
    gender,
    zoneCode,
    address,
    detailAddress,
    idType,
    idDate1,
    idDate2,
    idFilePath,
    idFileOriginName,
    addrType,
    addrFilePath,
    addrFileOriginName,
  } = req.body;

  try {
    const exUser = await User.findOne({ where: { id: parseInt(id) } });

    if (!exUser) {
      return res
        .status(401)
        .send(
          language === `ko`
            ? "존재하지 않는 사용자 입니다."
            : "User does not exist."
        );
    }

    if (exUser.email !== email) {
      const exEmail = await User.findOne({
        where: { email: email },
      });

      if (exEmail) {
        return res
          .status(401)
          .send(
            language === `ko`
              ? "이미 사용중인 이메일 입니다."
              : "This email is already in use."
          );
      }
    }

    const updatedata = {
      email,
      username,
      countryNo,
      mobile,
      gender,
      zoneCode,
      address,
      detailAddress,
      idType,
      idDate1,
      idDate2,
      idFilePath,
      idFileOriginName,
      addrType,
      addrFilePath,
      addrFileOriginName,
    };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      updatedata.password = hashedPassword;
    }

    const updateUser = await User.update(updatedata, {
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send(
        language === `ko`
          ? "정보를 수정할 수 없습니다."
          : "Information cannot be edited."
      );
  }
});

router.patch("/updatePrice", async (req, res, next) => {
  const { id, price } = req.body;

  try {
    const exUser = await User.findOne({
      where: { id: parseInt(id) },
    });

    if (!exUser) {
      return res
        .status(401)
        .send(
          language === `ko`
            ? "존재하지 않는 사용자입니다."
            : "User does not exist"
        );
    }

    const updateResult = await User.update(
      {
        priceWallet: exUser.priceWallet + parseFloat(price),
      },
      {
        where: { id: parseInt(id) },
      }
    );

    if (updateResult[0] > 0) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send("잘못된 요청입니다. 개발사에 문의하여 주십시오.");
  }
});

router.post("/checkEmail", async (req, res, next) => {
  const { language, email } = req.body;
  try {
    const exEmail = await User.findOne({
      where: { email: email },
    });

    if (exEmail) {
      return res
        .status(401)
        .send(
          language === `ko`
            ? "이미 사용중인 이메일 입니다."
            : "This email is already in use."
        );
    } else {
      return res.status(200).json({ result: true });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send(
        language === `ko`
          ? "처리중 문제가 발생하였습니다."
          : "A problem occurred during processing"
      );
  }
});

router.post("/secretEmail", async (req, res, next) => {
  const { language, email } = req.body;
  try {
    const UUID = generateUUID();

    await sendSecretMail(
      email,
      `🔐 [보안 인증코드 입니다.] WILLMARKETS 에서 보안인증 코드를 발송했습니다.`,
      `
    <div style="width: 50%; padding: 30px; border: 1px solid #eeeeee">
        <img src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/logo/logo_hover.png"
        style="width: auto; height: auto; background-size: cover; padding-bottom: 30px;"
        />
        
        <div style="
          height: 45px;
          display: flex;
          background: #3792eb;
          font-size: 22px;
          color: #fff;
          padding: 0 20px;
          line-height: 45px;
          border-radius: 3px;
        ">
        아래 인증코드를 입력해주세요.
        </div>

        <div style="color: #0b0b0b; padding: 50px 0; font-size: 14px;">
          사용자 여러분 안녕하세요<br/>
          Willmarkets 플랫폼을 선택해주셔서 감사합니다.<br/>
          인증코드 : <strong style="color: #d62929">[${UUID}]</strong>
          <br />
          <br />
          자세한 내용은 홈페이지에서 확인하세요 !
        </div>

        <div>
          <a href="https://www.will-markets.com">
            <button style="padding: 10px 20px; color: #fff; background-color:#0b0b0b; 
            border: 1px solid #0b0b0b;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            ">
              윌마켓으로 이동하기
            </button>
          </a>
        </div>
     </div>
     `
    );

    return res.status(200).json(UUID);
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send(
        language === `ko`
          ? "처리중 문제가 발생하였습니다."
          : "A problem occurred during processing"
      );
  }
});

router.post("/findPass", async (req, res, next) => {
  const { language, email } = req.body;

  try {
    const UUID = generateUUID();

    const updateResult = await User.update(
      { secret: UUID },
      {
        where: { email },
      }
    );

    if (updateResult[0] > 0) {
      // 이메일 전송
      sendSecretMail(
        email,
        `🔐 [보안 인증코드 입니다.] WILLMARKETS 에서 보안인증 코드를 발송했습니다.`,
        `
      <div style="width: 50%; padding: 30px; border: 1px solid #eeeeee">
        <img src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/logo/logo_hover.png"
        style="width: auto; height: auto; background-size: cover; padding-bottom: 30px;"
        />
          
      <div style="
        height: 45px;
        display: flex;
        background: #3792eb;
        font-size: 22px;
        color: #fff;
        padding: 0 20px;
        line-height: 45px;
        border-radius: 3px;
      ">
          아래 인증코드를 입력해주세요.
          </div>

          <div style="color: #0b0b0b; padding: 50px 0; font-size: 14px;">
            사용자 여러분 안녕하세요<br/>
            Willmarkets 플랫폼을 선택해주셔서 감사합니다.<br/>
            인증코드 : <strong style="color: #d62929">[${UUID}]</strong>
            <br />
            <br />
            자세한 내용은 홈페이지에서 확인하세요 !
          </div>

          <div>
            <a href="https://www.will-markets.com">
              <button style="padding: 10px 20px; color: #fff; background-color:#0b0b0b; 
              border: 1px solid #0b0b0b;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              ">
                윌마켓으로 이동하기
              </button>
            </a>
          </div>
       </div>
       `
      );

      return res.status(200).json({ result: true, UUID });
    } else {
      return res
        .status(401)
        .send(
          language === `ko`
            ? "가입되지 않은 이메일입니다."
            : "This is an unsigned email"
        );
    }
  } catch (error) {
    console.errofindPassr(error);
    return res
      .status(401)
      .send(
        language === `ko`
          ? "가입되지 않은 이메일입니다."
          : "This is an unsigned email"
      );
  }
});

router.post("/findPass/confirm", async (req, res, next) => {
  const { language, secret, email } = req.body;
  try {
    const exUser = await User.findOne({
      where: { email },
    });

    if (secret === exUser.secret) {
      return res.status(200).json({ result: true });
    } else {
      return res
        .status(401)
        .send(
          language === `ko`
            ? "올바르지 않은 인증코드입니다."
            : "Invalid verification code."
        );
    }
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send(
        language === `ko`
          ? "올바르지 않은 인증코드입니다."
          : "Invalid verification code."
      );
  }
});

router.patch("/findPass/update", async (req, res, next) => {
  const { language, email, password } = req.body;

  try {
    const exUser = await User.findOne({
      where: { email },
    });

    if (!exUser) {
      return res
        .status(401)
        .send(
          language === `ko`
            ? "잘못된 요청 입니다. 다시 로그인 후 이용해주세요."
            : "Invalid request. Please log in again and try again."
        );
    }

    const hashPassord = await bcrypt.hash(password, 12);

    const updateResult = await User.update(
      { password: hashPassord },
      {
        where: { email },
      }
    );

    if (updateResult[0] === 1) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send(language === `ko` ? "잘못된 요청 입니다." : "Invalid request.");
  }
});

router.patch("/updatePermit", isAdminCheck, async (req, res, next) => {
  const {
    id,
    platform,
    type,
    leverage,
    price,
    tradePassword,
    viewPassword,
    bankNo,
  } = req.body;

  try {
    const exUpdatePermit = await User.findOne({
      where: {
        id: parseInt(id),
      },
    });

    if (!exUpdatePermit) {
      return res.status(401).send("존재하지 않는 사용자입니다.");
    }

    const updateResult = await User.update(
      {
        isComplete: true,
        completedAt: new Date(),
      },
      {
        where: {
          id: parseInt(id),
        },
      }
    );

    if (updateResult[0] > 0) {
      if (exUpdatePermit.userType === "1") {
        const createResult = await DemoAccount.create({
          UserId: parseInt(id),
          bankNo,
          platform,
          type,
          leverage,
          price,
          tradePassword,
          viewPassword,
          isComplete: true,
          completedAt: new Date(),
        });

        sendSecretMail(
          exUpdatePermit.email,
          "데모 계정이 성공적으로 열렸습니다.",
          `
        <div style="width: 50%; padding: 30px; border: 1px solid #eeeeee">
          <img src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/logo/logo_hover.png"
          style="width: auto; height: auto; background-size: cover; padding-bottom: 30px;"
          />
            
        <div style="
          height: 45px;
          display: flex;
          background: #3792eb;
          font-size: 22px;
          color: #fff;
          padding: 0 20px;
          line-height: 45px;
          border-radius: 3px;
        ">
            데모 계정이 성공적으로 열렸습니다.
            </div>

            <div style="color: #0b0b0b; padding: 50px 0; font-size: 14px;">
            데모 계정이 성공적으로 열렸습니다. 다음은 데모 계정 정보입니다.
            <br />
            <br />
            거래 플랫폼 : ${platform}
            <br />
            유형 : ${type}
            <br />
            레버리지 : ${leverage}
            <br />
            환율금액 : ${price}
            <br />
            거래용 비밀번호 : ${tradePassword}
            <br />
            보기용 비밀번호 : ${viewPassword}
            <br />
            데모 계좌 : ${bankNo}
            <br />
            <br />
            
            자세한 내용은 홈페이지에서 확인하세요 !
            <br />
            </div>

            <div>
              <a href="https://www.will-markets.com">
                <button style="padding: 10px 20px; color: #fff; background-color:#0b0b0b; 
                border: 1px solid #0b0b0b;">
                  윌마켓으로 이동하기
                </button>
              </a>
            </div>
       </div>
       `
        );

        return res.status(200).json({ result: true });
      } else if (exUpdatePermit.userType === "2") {
        const createResult = await LiveAccount.create({
          UserId: parseInt(id),
          bankNo,
          platform,
          type,
          leverage,
          tradePassword,
          viewPassword,
          isComplete: true,
          completedAt: new Date(),
        });

        sendSecretMail(
          exUpdatePermit.email,
          "라이브 계정이 성공적으로 열렸습니다.",
          `
      <div style="width: 50%; padding: 30px; border: 1px solid #eeeeee">
            <img src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/logo/logo_hover.png"
            style="width: auto; height: auto; background-size: cover; padding-bottom: 30px;"
            />
            
          <div style="
            height: 45px;
            display: flex;
            background: #3792eb;
            font-size: 22px;
            color: #fff;
            padding: 0 20px;
            line-height: 45px;
            border-radius: 3px;
        ">
            라이브 계정이 성공적으로 열렸습니다.
            </div>

            <div style="color: #0b0b0b; padding: 50px 0; font-size: 14px;">
            라이브 계정이 성공적으로 열렸습니다. 다음은 라이브 계정 정보입니다.
            <br />
            <br />
            거래 플랫폼 : ${platform}
            <br />
            유형 : ${type}
            <br />
            레버리지 : ${leverage}
            <br />
            거래용 비밀번호 : ${tradePassword}
            <br />
            보기용 비밀번호 : ${viewPassword}
            <br />
            라이브 계좌 : ${bankNo}
            <br />
            <br />
            
            자세한 내용은 홈페이지에서 확인하세요 !
            <br />
            </div>

            <div>
              <a href="https://www.will-markets.com">
                <button style="
                padding: 10px 20px; 
                color: #fff; background-color:#0b0b0b; 
                border: 1px solid #0b0b0b;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                ">
                  윌마켓으로 이동하기
                </button>
              </a>
            </div>
       </div>
       `
        );

        return res.status(200).json({ result: true });
      } else {
        return res.status(401).send("존재하지 않는 사용자 유형입니다.");
      }
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
  }
});

router.patch("/level/update", isAdminCheck, async (req, res, next) => {
  const { selectUserId, changeLevel } = req.body;

  try {
    const exUser = await User.findOne({
      where: { id: parseInt(selectUserId) },
    });

    if (!exUser) {
      return res
        .status(401)
        .send("잘못된 사용자 입니다. 다시 확인 후 시도해주세요.");
    }

    const currentLevel = parseInt(exUser.dataValues.level);

    if (parseInt(currentLevel) === 5) {
      return res.status(403).send("개발사의 권한을 수정할 수 없습니다.");
    }

    if (parseInt(currentLevel) === parseInt(changeLevel)) {
      return res
        .status(401)
        .send(
          "변경하려는 사용자 권한이 동일합니다. 다시 확인 후 시도해주세요."
        );
    }

    const updateResult = await User.update(
      { level: parseInt(changeLevel) },
      {
        where: {
          id: parseInt(selectUserId),
        },
      }
    );

    if (updateResult[0] === 1) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("잘못된 요청 입니다. 개발사에 문의해주세요.");
  }
});

router.get("/logout", function (req, res) {
  req.logout();
  req.session.save(() => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

module.exports = router;
