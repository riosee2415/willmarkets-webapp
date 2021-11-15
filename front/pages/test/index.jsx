import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { emptyCheck } from "../../components/commonUtils";
import { message } from "antd";

import {
  Wrapper,
  Image,
  TextInput,
  RadioInput,
  RsWrapper,
  Label,
  CommonButton,
} from "../../components/commonComponents";
import ClientLayout from "../../components/ClientLayout";
import { QUESTION_CREATE_REQUEST } from "../../reducers/question";

const SuportImage = styled(Image)`
  width: 100%;
  height: 500px;
  display: flex;
`;

const QnA = styled(Wrapper)`
  width: 425px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 50px 15px 60px;
  justify-content: center;
  margin: 0 0 15px 0;
`;

const Content = styled.textarea`
  font-size: 16px;
  outline: none;
  resize: none;
  border: none;
  border-bottom: 1px solid rgba(227, 227, 227);
  width: 70%;
  padding: 5px 0;

  &:focus {
    border-bottom: 1px solid blue;
  }
`;

const QnAInput = styled(TextInput)`
  width: 70%;
  border: none;
  border-bottom: 1px solid rgba(227, 227, 227);

  &:focus {
    border-bottom: 1px solid blue;
  }
`;

const Support = () => {
  const dispatch = useDispatch();

  const { st_questionCreateDone, st_questionCreateError } = useSelector(
    (state) => state.question
  );

  const inputName = useInput("");
  const inputNumber = useInput("");
  const inputEmail = useInput("");
  const inputConotent = useInput("");
  const inputAgree = useInput(false);

  const createQuestionHandler = useCallback(() => {
    if (!emptyCheck(inputName.value)) {
      return message.error("성명을 입력하세요");
    }
    if (!emptyCheck(inputNumber.value)) {
      return message.error("연락처를 입력하세요");
    }
    if (!emptyCheck(inputEmail.value)) {
      return message.error("이메일을 입력하세요");
    }
    if (!emptyCheck(inputConotent.value)) {
      return message.error("문의사항을 입력하세요");
    }
    if (!inputAgree.value) {
      return message.error("개인정보처리방침에 동의하세요");
    }

    dispatch({
      type: QUESTION_CREATE_REQUEST,
      data: {
        name: inputName.value,
        mobile: inputNumber.value,
        email: inputEmail.value,
        content: inputConotent.value,
      },
    });
  }, [inputName, inputNumber, inputEmail, inputConotent, inputAgree]);

  useEffect(() => {
    if (st_questionCreateDone) {
      message.success("문의사항이 정상 접수되었습니다.");

      inputName.setValue("");
      inputNumber.setValue("");
      inputEmail.setValue("");
      inputConotent.setValue("");
      inputAgree.setValue(false);
    }
  }, [st_questionCreateDone]);

  useEffect(() => {
    if (st_questionCreateError) {
      return message.error(st_questionCreateError);
    }
  }, [st_questionCreateError]);

  return (
    <ClientLayout>
      <Wrapper>
        <SuportImage
          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/banner/subbanner_consulting.png`}
        ></SuportImage>

        <Wrapper
          height={`500px`}
          bgColor={`rgba(0, 0, 0, 0.7)`}
          position={`absolute`}
        >
          <Wrapper
            color={`#fff`}
            margin={`30px 0 0 0`}
            fontSize={`40px`}
            fontWeight={`510`}
          >
            고객지원
          </Wrapper>
        </Wrapper>
      </Wrapper>
      <Wrapper bgColor={`#000105`} padding={`80px 0`}>
        <RsWrapper>
          <Wrapper color={`#3353f2`} fontSize={`28px`} fontWeight={`300`}>
            문의하기
          </Wrapper>

          <Wrapper
            color={`#fff`}
            margin={`22px 0 5px`}
            textAlign={`center`}
            fontSize={`20px`}
          >
            궁금하거나 불편하신 점이 있으시면 아래 정보를 입력 후 문의하시기
            바랍니다.
            <br />
            귀하를 지원하기 위해 최선을 다하는 Willmarkets이 되겠습니다.
          </Wrapper>

          <Wrapper dr={`row`} ju={`flex-start`} margin={`100px 0 0 0`}>
            <Wrapper dr={`row`} width={`60%`}>
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/consulting/image_consulting.png`}
              />
            </Wrapper>

            <Wrapper width={`40%`}>
              <Wrapper>
                <QnA>
                  <RsWrapper
                    ju={`flex-start`}
                    dr={`row`}
                    margin={`5px 0 0 25px`}
                  >
                    <Label width={`20%`}>성명</Label>
                    <QnAInput {...inputName} />
                  </RsWrapper>
                  <RsWrapper
                    ju={`flex-start`}
                    dr={`row`}
                    margin={`30px 0 0 25px`}
                  >
                    <Label width={`20%`}>연락처</Label>
                    <QnAInput {...inputNumber} />
                  </RsWrapper>
                  <RsWrapper
                    ju={`flex-start`}
                    dr={`row`}
                    margin={`30px 0 0 25px`}
                  >
                    <Label width={`20%`}>이메일</Label>
                    <QnAInput {...inputEmail} />
                  </RsWrapper>
                  <RsWrapper
                    ju={`flex-start`}
                    dr={`row`}
                    margin={`20px 0 5px 25px`}
                  >
                    <Label width={`20%`}>문의내용</Label>
                    <Content {...inputConotent} />
                  </RsWrapper>
                </QnA>
                <Wrapper dr={`row`}>
                  <RadioInput
                    id={`agree`}
                    checked={inputAgree.value}
                    onClick={() => inputAgree.setValue(!inputAgree.value)}
                  />
                  <Wrapper ///inputAgree ! 부정 제거후 작동잘됨 왜?  Wrapper로 변경후 정상작동
                    ///Label과 Wrapper의 차이?
                    htmlFor={`agree`}
                    fontWeight={`400`}
                    width={`auto`}
                    color={`gray`}
                    cursor={`pointer`}
                    onClick={() => inputAgree.setValue(!inputAgree.value)}
                  >
                    개인정보 처리방침에 동의합니다.
                  </Wrapper>
                  <CommonButton
                    margin={`0 50px 0 30px`}
                    radius={`5px`}
                    width={`45px`}
                    bgColor={`gray`}
                    color={`#fff`}
                    fontSize={`12px`}
                    padding={`0 0`}
                    fontWeight={`400`}
                  >
                    보기
                  </CommonButton>
                </Wrapper>
                <CommonButton
                  bgColor={`#3353f2`}
                  color={`#fff`}
                  fontWeight={`300`}
                  fontSize={`24px`}
                  padding={`6px 50px 8px`}
                  radius={`6px`}
                  margin={`50px 0 0 0`}
                  onClick={createQuestionHandler}
                >
                  문의하기
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </RsWrapper>
      </Wrapper>
    </ClientLayout>
  );
};

export default Support;
