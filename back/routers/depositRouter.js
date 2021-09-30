const express = require("express");
const { Op } = require("sequelize/types");
const isAdminCheck = require("../middlewares/isAdminCheck");
const { Deposit, User } = require("../models");
const sendSecretMail = require("../utils/mailSender");

const router = express.Router();

router.get(["/list/:listType", "/list"], async (req, res, next) => {
  const { page, search } = req.query;
  const { listType } = req.params;

  let nanFlag = isNaN(listType);

  if (!listType) {
    nanFlag = false;
  }

  if (nanFlag) {
    return res.status(400).send("잘못된 요청 입니다.");
  }

  let _listType = Number(listType);

  if (_listType > 2 || !!listType) {
    _listType = 2;
  }

  const LIMIT = 10;

  const _page = page ? page : 1;
  const _search = search ? search : "";

  const __page = _page - 1;
  const OFFSET = __page * 10;
  try {
    const totalDeposit = await Deposit.findAll({
      where: {
        username: {
          [Op.like]: `%${search}%`,
        },
      },
    });

    const depositLen = totalDeposit.length;

    const lastPage =
      depositLen % LIMIT > 0 ? depositLen / LIMIT + 1 : depositLen / LIMIT;

    switch (_listType) {
      case 1:
        deposits = await Deposit.findAll({
          offset: OFFSET,
          limit: LIMIT,
          where: {
            username: {
              [Op.like]: `%${search}%`,
            },
          },
          order: [["createdAt", "DESC"]],
        });
        break;
      case 2:
        deposits = await Deposit.findAll({
          offset: OFFSET,
          limit: LIMIT,
          where: {
            username: {
              [Op.like]: `%${search}%`,
            },
          },
          order: [["createdAt", "DESC"]],
        });
        break;
      default:
        break;
    }

    return res.status(200).json({ deposits, lastPage: parseInt(lastPage) });
  } catch (error) {
    console.error(error);
    return res.status(401).send("입금 신청 목록을 불러올 수 없습니다.");
  }
});

router.post("/create", async (req, res, next) => {
  const {
    userId,
    bankName,
    bankNo,
    swiftCode,
    willAddress,
    bankAddress,
    selectBank,
    price,
  } = req.body;
  try {
    const exUser = await User.findOne({
      where: { id: parseInt(userId) },
    });

    if (!exUser) {
      return res.status(401).send("존재하지 않는 사용자입니다.");
    }

    const createResult = await Deposit.create({
      userId,
      bankName,
      bankNo,
      swiftCode,
      willAddress,
      bankAddress,
      selectBank,
      price,
    });

    if (!createResult) {
      return res.status(401).send("입금 신청을 할 수 없습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("입금 신청을 할 수 없습니다.");
  }
});

router.patch("/updatePermit", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;
  try {
    const exUpdatePermit = await Deposit.findOne({
      where: {
        id: parseInt(id),
      },
    });

    if (!exUpdatePermit) {
      return res.status(401).send("존재하지 않는 입금 신청입니다.");
    }

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
        "4leaf.sjh@gmai.com",
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
