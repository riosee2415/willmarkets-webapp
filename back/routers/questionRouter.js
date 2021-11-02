const express = require("express");
const isAdminCheck = require("../middlewares/isAdminCheck");
const isLoggedIn = require("../middlewares/isLoggedIn");
const { Question, User } = require("../models");
const { Op } = require("sequelize");
const sendSecretMail = require("../utils/mailSender");

const router = express.Router();

router.get(
  ["/list/:listType", "/list"],
  isAdminCheck,
  async (req, res, next) => {
    const { page, search } = req.query;
    const { listType } = req.params;
    const { language } = req.body;

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
      let totalQuestion;
      let questionLen;

      let lastPage;

      let questions = [];

      switch (_listType) {
        case 1:
          totalQuestion = await Question.findAll({
            where: {
              name: {
                [Op.like]: `%${_search}%`,
              },
            },
          });

          questionLen = totalQuestion.length;

          lastPage =
            questionLen % LIMIT > 0
              ? questionLen / LIMIT + 1
              : questionLen / LIMIT;

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
        case 2:
          totalQuestion = await Question.findAll({
            where: {
              isComplete: false,
              name: {
                [Op.like]: `%${_search}%`,
              },
            },
          });

          questionLen = totalQuestion.length;

          lastPage =
            questionLen % LIMIT > 0
              ? questionLen / LIMIT + 1
              : questionLen / LIMIT;

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
        case 3:
          totalQuestion = await Question.findAll({
            where: {
              isComplete: true,
              name: {
                [Op.like]: `%${_search}%`,
              },
            },
          });

          questionLen = totalQuestion.length;

          lastPage =
            questionLen % LIMIT > 0
              ? questionLen / LIMIT + 1
              : questionLen / LIMIT;

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
        default:
          break;
      }

      return res
        .status(200)
        .json({ questions, lastPage: parseInt(lastPage), questionLen });
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .send("문의 데이터를 불러올 수 없습니다. [CODE 036]");
    }
  }
);

router.post("/create", async (req, res, next) => {
  const { language, name, mobile, email, content } = req.body;

  try {
    const createResult = await Question.create({
      name,
      mobile,
      email,
      content,
    });

    sendSecretMail(
      `4leaf.njm@gmail.com`,
      `💌 WILLMARKET 에서 문의사항이 작성되었습니다.`,
      `
    <div style="width: 50%; padding: 30px; border: 1px solid #eeeeee">
        <img src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/logo/logo.png"
        style="width: 80px; height: 80px; background-size: cover; padding-bottom: 30px;"
        />
        
        <div style="
          height: 45px;
          display: flex;
          border-bottom: 1px solid #f7b1ff;
          font-size: 22px;
          color: #0b0b0b;
          line-height: 2;
        ">
        ${name} 님의 문의사항입니다.
        </div>

        <div style="color: #0b0b0b; padding: 50px 0; font-size: 14px;">
          <strong>연락처</strong> : ${mobile}<br/>
          <strong>이메일</strong> : ${email}<br/>
          <strong>문의내용</strong><br/>
          ${content
            .split(`\n`)
            .map((data) => {
              return `<p>
                ${data}
              </p>`;
            })
            .join(``)}
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

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send(
        language === "ko"
          ? `문의 데이터를 생성할 수 없습니다. [CODE 037]`
          : `Could not create inquiry data. [CODE 037]`
      );
  }
});

router.patch("/updateComplete", isAdminCheck, async (req, res, next) => {
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
        isComplete: true,
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
