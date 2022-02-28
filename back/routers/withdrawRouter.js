const express = require("express");
const { Op } = require("sequelize");
const { Withdraw, User } = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");
const sendSecretMail = require("../utils/mailSender");

const router = express.Router();

router.get("/list", async (req, res, next) => {
  const { page, search } = req.query;
  const { language } = req.body;

  const LIMIT = 10;

  const _page = page ? page : 1;
  const _search = search ? search : "";

  const __page = _page - 1;
  const OFFSET = __page * 10;

  try {
    const totalWithdraw = await Withdraw.findAll({
      include: {
        model: User,
      },
    });

    const _totalWithdraw = await totalWithdraw.filter((data) => {
      if (data.selectBank.toLowerCase().includes(_search.toLowerCase())) {
        return true;
      } else if (data.User.username.includes(_search)) {
        return true;
      } else if (data.User.email.includes(_search)) {
        return true;
      } else {
        return false;
      }
    });

    const withdrawLen = _totalWithdraw.length;

    const lastPage =
      withdrawLen % LIMIT > 0 ? withdrawLen / LIMIT + 1 : withdrawLen / LIMIT;

    const withdraws = await Withdraw.findAll({
      offset: OFFSET,
      limit: LIMIT,
      include: {
        model: User,
      },
      order: [["createdAt", "DESC"]],
    });

    const _withdraws = await withdraws.filter((data) => {
      if (data.selectBank.toLowerCase().includes(_search.toLowerCase())) {
        return true;
      } else if (data.User.username.includes(_search)) {
        return true;
      } else if (data.User.email.includes(_search)) {
        return true;
      } else {
        return false;
      }
    });

    return res.status(200).json({
      withdraws: _withdraws,
      lastPage: parseInt(lastPage),
      withdrawLen,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send(
        language === `ko`
          ? "출금 신청 목록을 불러올 수 없습니다."
          : "Could not load withdrawal request list."
      );
  }
});

router.post("/create", async (req, res, next) => {
  const {
    language,
    userId,
    // bankName,
    price,
    // swiftCode,
    // bankAddress,
    selectBank,
    // bankNo,
    priceType,
    walletAddress,
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
            : "User does not exist."
        );
    }

    const createResult = await Withdraw.create({
      UserId: parseInt(userId),
      // bankName,
      price,
      // swiftCode,
      // bankAddress,
      selectBank,
      // bankNo,
      priceType,
      walletAddress,
      isComplete: false,
    });

    if (!createResult) {
      return res
        .status(401)
        .send(
          language === `ko`
            ? "출금 신청을 할 수 없습니다."
            : "Cannot apply for withdrawal."
        );
    }

    sendSecretMail(
      "support@will-markets.com",
      "출금 요청이 접수되었습니다.",
      `
      <div style="width: 100%; padding: 30px; border: 1px solid #eeeeee">
            <img src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/logo/logo_hover.png"
            style="width: auto; height: auto; background-size: cover; padding-bottom: 30px;"
            />
            
            <div style="
            height: 45px;
            display: flex;
            background: #3792eb;
            font-size: 20px;
            color: #fff;
            padding: 0 20px;
            line-height: 45px;
            border-radius: 3px;
          ">
            출금 요청이 접수되었습니다.
            </div>
  
            <div style="color: #0b0b0b; padding: 50px 0; font-size: 14px;">
            출금 요청이 접수되었습니다.
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

    sendSecretMail(
      exUser.email,
      "출금 요청이 접수되었습니다.",
      `
      <div style="width: 100%; padding: 30px; border: 1px solid #eeeeee">
            <img src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/logo/logo_hover.png"
            style="width: auto; height: auto; background-size: cover; padding-bottom: 30px;"
            />
            
            <div style="
            height: 45px;
            display: flex;
            background: #3792eb;
            font-size: 20px;
            color: #fff;
            padding: 0 20px;
            line-height: 45px;
            border-radius: 3px;
          ">
            출금 요청이 접수되었습니다.
            </div>
  
            <div style="color: #0b0b0b; padding: 50px 0; font-size: 14px;">
            출금 요청이 접수되었습니다.
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
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send(
        language === `ko`
          ? "출금 신청을 할 수 없습니다."
          : "Cannot apply for withdrawal."
      );
  }
});

router.patch("/updatePermit", isAdminCheck, async (req, res, next) => {
  const { language, id, userId } = req.body;
  try {
    const exUpdatePermit = await Withdraw.findOne({
      where: {
        id: parseInt(id),
      },
    });

    if (!exUpdatePermit) {
      return res
        .status(401)
        .send(
          language === `ko`
            ? "존재하지 않는 출금 신청입니다."
            : "This is a non-existent withdrawal request."
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
            : "User does not exist."
        );
    }

    const updateData = await Withdraw.findOne({
      where: { id: parseInt(id) },
      include: {
        model: User,
      },
    });

    const updateResult = await Withdraw.update(
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
        "출금 신청이 성공적으로 승인되었습니다.",
        `
      <div style="width: 100%; padding: 30px; border: 1px solid #eeeeee">
          <img src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/logo/logo_hover.png"
          style="width: auto; height: auto; background-size: cover; padding-bottom: 30px;"
          />
            
        <div style="
            height: 45px;
            display: flex;
            background: #3792eb;
            font-size: 20px;
            color: #fff;
            padding: 0 20px;
            line-height: 45px;
            border-radius: 3px;
          ">
            출금 신청이 성공적으로 승인되었습니다.
            </div>

            <div style="color: #0b0b0b; padding: 50px 0; font-size: 14px;">
            ${updateData.User.username}님
            <br />
            willmarkets 플랫폼을 이용해주셔서 감사합니다.
            <br />
            출금 신청이 성공되었습니다.
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
