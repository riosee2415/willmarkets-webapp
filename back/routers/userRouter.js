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
const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

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

router.get(
  ["/list/:listType", "/list/:listType/:listType2", "/list"],
  isAdminCheck,
  async (req, res, next) => {
    let findType = 1;
    let findType2 = 1;

    const { listType, listType2 } = req.params;
    const { page, search } = req.query;

    const LIMIT = 10;

    const _page = page ? page : 1;
    const searchName = search ? search : "";

    const __page = _page - 1;
    const OFFSET = __page * 10;

    const validation = Number(listType);
    const validation2 = Number(listType2);

    const numberFlag = isNaN(validation);
    const numberFlag2 = isNaN(validation2);

    if (numberFlag) {
      findType = parseInt(1);
    }
    if (numberFlag2) {
      findType2 = parseInt(1);
    }

    if (validation >= 3) {
      findType = 3;
    } else {
      findType = 1;
    }

    if (validation2 >= 3) {
      findType2 = 3;
    } else {
      findType2 = 1;
    }

    try {
      let users = [];

      const totalUser = await User.findAll({
        where: {
          username: {
            [Op.like]: `%${searchName}%`,
          },
        },
      });

      const userLen = totalUser.length;

      const lastPage =
        userLen % LIMIT > 0 ? userLen / LIMIT + 1 : userLen / LIMIT;

      switch (parseInt(findType)) {
        case 1:
          users = await User.findAll({
            offset: OFFSET,
            limit: LIMIT,
            where: {
              username: {
                [Op.like]: `%${searchName}%`,
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

          break;
        case 2:
          users = await User.findAll({
            offset: OFFSET,
            limit: LIMIT,
            where: {
              type: "1",
              username: {
                [Op.like]: `%${searchName}%`,
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

          break;

        case 3:
          users = await User.findAll({
            offset: OFFSET,
            limit: LIMIT,
            where: {
              type: "2",
              username: {
                [Op.like]: `%${searchName}%`,
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
            order: [["username", "ASC"]],
          });
          break;

        default:
          break;
      }

      switch (parseInt(findType2)) {
        case 1:
          users = await User.findAll({
            offset: OFFSET,
            limit: LIMIT,
            where: {
              username: {
                [Op.like]: `%${searchName}%`,
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
          break;

        case 2:
          users = await User.findAll({
            offset: OFFSET,
            limit: LIMIT,
            where: {
              isComplete: false,
              username: {
                [Op.like]: `%${searchName}%`,
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
          break;

        case 3:
          users = await User.findAll({
            offset: OFFSET,
            limit: LIMIT,
            where: {
              isComplete: true,
              username: {
                [Op.like]: `%${searchName}%`,
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
          break;

        default:
          break;
      }

      return res.status(200).json({ users, lastPage: parseInt(lastPage) });
    } catch (error) {
      console.error(error);
      return res.status(401).send("사용자 목록을 불러올 수 없습니다.");
    }
  }
);

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

router.post("/signin/admin", isAdminCheck, (req, res, next) => {
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

router.post("/image", async (req, res, next) => {
  const uploadImage = upload.single("image");

  await uploadImage(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(401).send("첨부 가능한 용량을 초과했습니다.");
    } else if (err) {
      return res.status(401).send("업로드 중 문제가 발생했습니다.");
    }

    return res.json({
      path: req.file.location,
      originName: req.file.originalname,
    });
  });
});

router.post("/signup", async (req, res, next) => {
  const {
    type,
    email,
    password,
    username,
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
    const exUser = await User.findOne({
      where: { email: email },
    });

    if (exUser) {
      return res.status(401).send("이미 가입된 이메일 입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      type,
      email,
      password: hashedPassword,
      username,
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
    });

    res.status(201).send("SUCCESS");
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
    id,
    email,
    password,
    username,
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
      return res.status(401).send("존재하지 않는 사용자 입니다.");
    }

    if (exUser.email !== email) {
      const exEmail = await User.findOne({
        where: { email: email },
      });

      if (exEmail) {
        return res.status(401).send("이미 사용중인 이메일 입니다.");
      }
    }

    const updatedata = {
      email,
      username,
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
    return res.status(401).send("정보를 수정할 수 없습니다.");
  }
});

router.patch("/updatePrice", async (req, res, next) => {
  const { id, price } = req.body;

  try {
    const exUser = await User.findOne({
      where: { id: parseInt(id) },
    });

    if (!exUser) {
      return res.status(401).send("존재하지 않는 사용자입니다.");
    }

    const updateResult = await User.update(
      {
        priceWallet: exUser.priceWallet + parseInt(price),
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
  const { email } = req.body;
  try {
    const exEmail = await User.findOne({
      where: { email: email },
    });

    if (exEmail) {
      return res.status(401).send("이미 사용중인 이메일 입니다.");
    } else {
      return res.status(200).json({ result: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("이미 사용중인 이메일 입니다.");
  }
});

router.post("/findPass", async (req, res, next) => {
  const { email } = req.body;

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
      await sendSecretMail(
        email,
        `🔐 [보안 인증코드 입니다.] WILLMARKET 에서 보안인증 코드를 발송했습니다.`,
        `
        <div>
          <h3>WILLMARKET</h3>
          <hr />
          <p>보안 인증코드를 발송해드립니다. WILLMARKET 홈페이지의 인증코드 입력란에 정확히 입력해주시기 바랍니다.</p>
          <p>인증코드는 [<strong>${UUID}</strong>] 입니다. </p>

          <br /><hr />
          <article>
            발송해드린 인증코드는 외부로 유출하시거나, 유출 될 경우 개인정보 침해의 위험이 있으니, 필히 본인만 사용하며 타인에게 양도하거나 알려주지 마십시오.
          </article>
        </div>
        `
      );

      return res.status(200).json({ result: true, UUID });
    } else {
      return res.status(401).send("가입되지 않은 이메일입니다.");
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("가입되지 않은 이메일입니다.");
  }
});

router.post("/findPass/confirm", async (req, res, next) => {
  const { secret, email } = req.body;
  try {
    const exUser = await User.findOne({
      where: { email },
    });

    if (secret === exUser.secret) {
      return res.status(200).json({ result: true });
    } else {
      return res.status(401).send("올바르지 않은 인증코드입니다.");
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("올바르지 않은 인증코드입니다.");
  }
});

router.patch("/findPass/update", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const exUser = await User.findOne({
      where: { email },
    });

    if (!exUser) {
      return res
        .status(401)
        .send("잘못된 요청 입니다. 다시 로그인 후 이용해주세요.");
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
    return res.status(401).send("잘못된 요청 입니다.");
  }
});

router.patch("/updatePermit", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;
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
      sendSecretMail(
        exUpdatePermit.email,
        "test Title",
        "<h1>Test Mail Send</h1>"
      );

      return res.status(200).json({ result: true });
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
