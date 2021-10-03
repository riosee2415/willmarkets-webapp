const express = require("express");
const { Op } = require("sequelize");
const isAdminCheck = require("../middlewares/isAdminCheck");
const { LiveAccount, User } = require("../models");
const sendSecretMail = require("../utils/mailSender");
const router = express.Router();

router.get(["/list/:listType", "/list"], async (req, res, next) => {
  const { page, search } = req.query;

  const LIMIT = 10;

  const _page = page ? page : 1;
  const _search = search ? search : "";

  const __page = _page - 1;
  const OFFSET = __page * 10;

  try {
    const totalLive = await LiveAccount.findAll({
      where: {
        username: {
          [Op.like]: `%${search}%`,
        },
      },
    });

    const liveLen = totalLive.length;

    const lastPage =
      liveLen % LIMIT > 0 ? liveLen / LIMIT + 1 : liveLen / LIMIT;

    const liveAccounts = await LiveAccount.findAll({
      offset: OFFSET,
      limit: LIMIT,
      where: {
        username: {
          [Op.like]: `%${search}%`,
        },
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ liveAccounts, lastPage: parseInt(lastPage) });
  } catch (error) {
    console.error(error);
    return res.status(401).send("라이브 계좌 목록을 불러올 수 없습니다.");
  }
});

router.post("/create", async (req, res, next) => {
  const { userId, platform, type, leverage, tradePassword, viewPassword } =
    req.body;

  try {
    const exUser = await User.findOne({
      where: { id: parseInt(userId) },
    });

    if (!exUser) {
      return res.status(401).send("존재하지 않는 사용자입니다.");
    }

    const createResult = await LiveAccount.create({
      userId: parseInt(userId),
      platform,
      type,
      leverage,
      tradePassword,
      viewPassword,
    });

    if (!createResult) {
      return res.status(401).send("라이브 계좌를 생성할 수 없습니다.");
    }
  } catch (error) {
    console.error(error);
    return res.status(401).send("라이브 계좌를 생성할 수 없습니다.");
  }
});

router.patch("/updatePermit", isAdminCheck, async (req, res, next) => {
  const { id, bankNo } = req.body;
  try {
    const exUpdatePermit = await LiveAccount.findOne({
      where: {
        id: parseInt(id),
      },
    });

    if (!exUpdatePermit) {
      return res.status(401).send("존재하지 않는 라이브 계좌입니다.");
    }

    const updateResult = await LiveAccount.update(
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
      //   sendSecretMail(
      //     "4leaf.sjh@gmai.com",
      //     "test Title",
      //     "<h1>Test Mail Send</h1>"
      //   );

      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
