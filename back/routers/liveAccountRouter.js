const express = require("express");
const { Op } = require("sequelize");
const isAdminCheck = require("../middlewares/isAdminCheck");
const { LiveAccount, User } = require("../models");
const sendSecretMail = require("../utils/mailSender");
const router = express.Router();

router.get(["/list/:listType", "/list"], async (req, res, next) => {
  const { page, search } = req.query;
  const { language } = req.body;

  const LIMIT = 10;

  const _page = page ? page : 1;
  const _search = search ? search : "";

  const __page = _page - 1;
  const OFFSET = __page * 10;

  try {
    const totalLive = await LiveAccount.findAll({
      include: {
        model: User,
        where: {
          username: {
            [Op.like]: `%${_search}%`,
          },
        },
      },
    });

    const liveLen = totalLive.length;

    const lastPage =
      liveLen % LIMIT > 0 ? liveLen / LIMIT + 1 : liveLen / LIMIT;

    const liveAccounts = await LiveAccount.findAll({
      offset: OFFSET,
      limit: LIMIT,
      include: {
        model: User,
        where: {
          username: {
            [Op.like]: `%${_search}%`,
          },
        },
      },
      order: [["createdAt", "DESC"]],
    });

    return res
      .status(200)
      .json({ liveAccounts, lastPage: parseInt(lastPage), liveLen });
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send(
        language === `ko`
          ? "라이브 계좌 목록을 불러올 수 없습니다."
          : "Could not load list of live accounts."
      );
  }
});

router.post("/create", async (req, res, next) => {
  const {
    language,
    userId,
    platform,
    type,
    leverage,
    tradePassword,
    viewPassword,
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

    const createResult = await LiveAccount.create({
      UserId: parseInt(userId),
      platform,
      type,
      leverage,
      tradePassword,
      viewPassword,
      isComplete: false,
    });

    if (!createResult) {
      return res
        .status(401)
        .send(
          language === `ko`
            ? "라이브 계좌를 생성할 수 없습니다."
            : "Could not create live account."
        );
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send(
        language === `ko`
          ? "라이브 계좌를 생성할 수 없습니다."
          : "Could not create live account."
      );
  }
});

router.patch("/updatePermit", isAdminCheck, async (req, res, next) => {
  const { language, id, bankNo, userId } = req.body;
  try {
    const exUpdatePermit = await LiveAccount.findOne({
      where: {
        id: parseInt(id),
      },
    });

    if (!exUpdatePermit) {
      return res
        .status(401)
        .send(
          language === `ko`
            ? "존재하지 않는 라이브 계좌입니다."
            : "This is a non-existent live account."
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

    const updateData = await LiveAccount.findOne({
      where: {
        id: parseInt(id),
      },
    });

    const updateResult = await LiveAccount.update(
      {
        isComplete: true,
        completedAt: new Date(),
        bankNo,
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
            padding: 0 15;
            line-height: 2;
            border-radius: 3px;
          ">
            라이브 계정이 성공적으로 열렸습니다.
            </div>

            <div style="color: #0b0b0b; padding: 50px 0; font-size: 14px;">
            라이브 계정이 성공적으로 열렸습니다. 다음은 라이브 계정 정보입니다.
            <br />
            <br />
            거래 플랫폼 : ${updateData.platform}
            <br />
            유형 : ${updateData.type}
            <br />
            레버리지 : ${updateData.leverage}
            <br />
            거래용 비밀번호 : ${updateData.tradePassword}
            <br />
            보기용 비밀번호 : ${updateData.viewPassword}
            <br />
            라이브 계좌 : ${updateData.bankNo}
            <br />
            <br />
            
            자세한 내용은 홈페이지에서 확인하세요 !
            <br />
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

      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
