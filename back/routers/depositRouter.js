const express = require("express");
const { Op } = require("sequelize");
const isAdminCheck = require("../middlewares/isAdminCheck");
const { Deposit, User, DepositImage } = require("../models");
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

router.get(["/list/:listType", "/list"], async (req, res, next) => {
  const { page, search } = req.query;
  const { listType } = req.params;
  const { language } = req.body;

  let nanFlag = isNaN(listType);

  if (!listType) {
    nanFlag = false;
  }

  if (nanFlag) {
    return res.status(400).send("잘못된 요청 입니다.");
  }

  let _listType = Number(listType);

  if (_listType > 2 || !listType) {
    _listType = 2;
  }

  const LIMIT = 10;

  const _page = page ? page : 1;
  const _search = search ? search : "";

  const __page = _page - 1;
  const OFFSET = __page * 10;
  try {
    let depositLen = 0;
    let lastPage = 0;

    let deposits = [];

    let totalDeposit;

    switch (_listType) {
      case 1:
        totalDeposit = await Deposit.findAll({
          include: {
            model: User,
            where: {
              username: {
                [Op.like]: `%${_search}%`,
              },
            },
          },
        });

        depositLen = totalDeposit.length;

        lastPage =
          depositLen % LIMIT > 0 ? depositLen / LIMIT + 1 : depositLen / LIMIT;

        deposits = await Deposit.findAll({
          offset: OFFSET,
          limit: LIMIT,
          include: {
            model: User,
            where: {
              username: {
                [Op.like]: `%${_search}%`,
              },
            },
            attributes: ["id", "username"],
          },
          order: [["createdAt", "DESC"]],
        });

        break;
      case 2:
        totalDeposit = await DepositImage.findAll({
          include: {
            model: User,
            where: {
              username: {
                [Op.like]: `%${_search}%`,
              },
            },
          },
        });

        depositLen = totalDeposit.length;

        lastPage =
          depositLen % LIMIT > 0 ? depositLen / LIMIT + 1 : depositLen / LIMIT;

        deposits = await DepositImage.findAll({
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: User,
              where: {
                username: {
                  [Op.like]: `%${_search}%`,
                },
              },
              attributes: ["id", "username"],
            },
          ],
        });

        break;
      default:
        break;
    }

    return res
      .status(200)
      .json({ deposits, lastPage: parseInt(lastPage), depositLen });
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send(
        language === `ko`
          ? "입금 신청 목록을 불러올 수 없습니다."
          : "Could not load deposit request list."
      );
  }
});

router.post("/image", async (req, res, next) => {
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

    return res.json({
      path: req.file.location,
      originName: req.file.originalname,
    });
  });
});

router.post("/createImage", async (req, res, next) => {
  const { language, userId, filePath, fileOriginName } = req.body;
  try {
    const exUser = await User.findOne({
      where: { id: parseInt(userId) },
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
    const createResult = await DepositImage.create({
      UserId: parseInt(userId),
      filePath,
      fileOriginName,
    });

    if (!createResult) {
      return res
        .status(401)
        .send(
          language === `ko`
            ? "이미지를 생성할 수 없습니다."
            : "Unable to create image."
        );
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send(
        language === `ko`
          ? "이미지를 생성할 수 없습니다."
          : "Unable to create image."
      );
  }
});

router.post("/create", async (req, res, next) => {
  const {
    language,
    userId,
    // bankName,
    // bankNo,
    // swiftCode,
    // willAddress,
    // bankAddress,
    selectBank,
    // price,
    priceType,
    filePath,
    fileOriginName,
    walletAddress,
    hashAddress,
  } = req.body;
  try {
    const exUser = await User.findOne({
      where: { id: parseInt(userId) },
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

    const createResult = await Deposit.create({
      UserId: parseInt(userId),
      // bankName,
      // bankNo,
      // swiftCode,
      // willAddress,
      // bankAddress,
      selectBank,
      // price,
      priceType,
      filePath,
      fileOriginName,
      walletAddress,
      hashAddress,
      isComplete: false,
    });

    if (!createResult) {
      return res
        .status(401)
        .send(
          language === `ko`
            ? "입금 신청을 할 수 없습니다."
            : "Cannot apply for deposit."
        );
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send(
        language === `ko`
          ? "입금 신청을 할 수 없습니다."
          : "Cannot apply for deposit."
      );
  }
});

router.patch("/updatePermit", isAdminCheck, async (req, res, next) => {
  const { language, id, userId } = req.body;
  try {
    const exUpdatePermit = await Deposit.findOne({
      where: {
        id: parseInt(id),
      },
    });

    if (!exUpdatePermit) {
      return res
        .status(401)
        .send(
          language === `ko`
            ? "존재하지 않는 입금 신청입니다."
            : "This is a non-existent deposit application."
        );
    }

    const exUser = await User.findOne({
      where: { id: parseInt(userId) },
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

    const updateData = await Deposit.findOne({
      where: { id: parseInt(id) },
      include: {
        model: User,
      },
    });

    const updateResult = await Deposit.update(
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
        exUser.email,
        "입금 신청이 성공적으로 승인되었습니다.",
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
            입금 신청이 성공적으로 승인되었습니다.
            </div>

            <div style="color: #0b0b0b; padding: 50px 0; font-size: 14px;">
            ${updateData.User.username}님
            <br />
            willmarkets 플랫폼을 이용해주셔서 감사합니다.
            <br />
            입금 신청이 성공되었습니다.
            <br />
            담당부서 심사가 필요합니다.
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
  }
});

module.exports = router;
