const express = require("express");
const { Op } = require("sequelize");
const { PriceHistory } = require("../models");
const isAdminCheck = require("../middlewares/isAdminCheck");

const router = express.Router();

router.post("/create", isAdminCheck, async (req, res, next) => {
  const { userId, price, bankNo } = req.body;

  try {
    let type = "";

    if (price < 0) {
      type = "출금";
    } else {
      type = "입금";
    }

    const createResult = await PriceHistory.create({
      UserId: parseInt(userId),
      type,
      price,
      bankNo,
    });

    if (!createResult) {
      return res.status(401).send("처리 중 문제가 발생했습니다.");
    }

    return res.status(200).json({ result: true });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
