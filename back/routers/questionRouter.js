const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const { Question, User } = require("../models");
const { Op } = require("sequelize");

const router = express.Router();

router.get(
  ["/list/:listType", "/list"],
  isAdminCheck,
  async (req, res, next) => {
    const { page, search } = req.query;
    const { listType } = req.params;
    const LIMIT = 10;

    const _page = page ? page : 1;
    const _search = search ? search : "";

    const __page = _page - 1;
    const OFFSET = __page * 10;

    let nanFlag = isNaN(listType);

    if (!listType) {
      nanFlag = false;
    }

    if (nanFlag) {
      return res.status(400).send("잘못된 요청 입니다.");
    }

    let _listType = Number(listType);

    if (_listType > 3 || !listType) {
      _listType = 3;
    }

    try {
      const totalQuestion = await Question.findAll({
        where: {
          name: {
            [Op.like]: `%${_search}%`,
          },
        },
      });

      const questionLen = totalQuestion.length;

      const lastPage =
        questionLen % LIMIT > 0 ? questionLen / LIMIT + 1 : questionLen / LIMIT;

      let questions = [];

      switch (_listType) {
        case 1:
          questions = await Question.findAll({
            offset: OFFSET,
            limit: LIMIT,
            where: {
              isComplete: false,
              name: {
                [Op.like]: `%${_search}%`,
              },
            },
            order: [["createdAt", "DESC"]],
          });
          break;
        case 2:
          questions = await Question.findAll({
            offset: OFFSET,
            limit: LIMIT,
            where: {
              isComplete: true,
              name: {
                [Op.like]: `%${_search}%`,
              },
            },
            order: [["createdAt", "DESC"]],
          });
          break;
        case 3:
          questions = await Question.findAll({
            offset: OFFSET,
            limit: LIMIT,
            where: {
              name: {
                [Op.like]: `%${_search}%`,
              },
            },
            order: [["createdAt", "DESC"]],
          });
          break;
        default:
          break;
      }

      return res.status(200).json({ questions, lastPage: parseInt(lastPage) });
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .send("문의 데이터를 불러올 수 없습니다. [CODE 036]");
    }
  }
);

router.post("/create", async (req, res, next) => {
  const { name, mobile, email, content } = req.body;

  try {
    const createResult = await Question.create({
      name,
      mobile,
      email,
      content,
    });

    console.log(createResult);

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res.status(401).send("문의 데이터를 생성할 수 없습니다. [CODE 037]");
  }
});

router.patch("/update", isAdminCheck, async (req, res, next) => {
  const { id } = req.body;

  try {
    const exQuestion = await Question.findOne({
      where: { id: parseInt(id) },
    });

    if (!exQuestion) {
      return res.status(401).send("존재하지 않는 문의 입니다.");
    }

    const updateResult = await Question.update(
      {
        isCompleted: true,
        completedAt: new Date(),
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
    return res.status(401).send("문의내용을 수정할 수 없습니다. [CODE 035]");
  }
});

module.exports = router;
