const express = require("express");
const { Op } = require("sequelize/types");
const { Withdraw, User } = require("../models");
const router = express.Router();

router.get("/list", async (req, res, next) => {
  const { page, search } = req.query;

  const LIMIT = 10;

  const _page = page ? page : 1;
  const _search = search ? search : "";

  const __page = _page - 1;
  const OFFSET = __page * 10;

  try {
    const totalWithDraw = await Withdraw.findAll({
      where: {
        usernane: {
          [Op.like]: `%${search}%`,
        },
      },
    });

    const withDrawLen = totalWithDraw.length;

    const lastPage =
      withDrawLen % LIMIT > 0 ? withDrawLen / LIMIT + 1 : withDrawLen / LIMIT;

    const withdraws = await Withdraw.findAll({
      offset: OFFSET,
      limit: LIMIT,
      where: {
        usernane: {
          [Op.like]: `%${search}%`,
        },
      },
    });
    return res.status(200).json({ withdraws, lastPage: parseInt(lastPage) });
  } catch (error) {
    console.error(error);
    return res.status(401).send("출금 신청 목록을 불러올 수 없습니다.");
  }
});

router.post("/create", async (req, res, next) => {
  const {
    userId,
    bankName,
    price,
    swiftCode,
    bankAddress,
    selectBank,
    bankNo,
  } = req.body;
  try {
    const exUser = await User.findOne({
      where: {
        id: parseInt(userId),
      },
    });

    if (!exUser) {
      return res.status(401).send("존재하지 않는 사용자입니다.");
    }

    const createResult = await Withdraw.create({
      bankName,
      price,
      swiftCode,
      bankAddress,
      selectBank,
      bankNo,
    });

    if (!createResult) {
      return res.status(401).send("출금 신청을 할 수 없습니다.");
    }

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("출금 신청을 할 수 없습니다.");
  }
});

router.patch("/updatePermit", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;
  try {
    const exUpdatePermit = await Withdraw.findOne({
      where: {
        id: parseInt(id),
      },
    });

    if (!exUpdatePermit) {
      return res.status(401).send("존재하지 않는 입금 신청입니다.");
    }

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
      return res.status(200).json({ result: true });
    } else {
      return res.status(200).json({ result: false });
    }
  } catch (error) {
    console.error(error);
  }
});

// 메일기능 추가, 유저이름으로 서치
