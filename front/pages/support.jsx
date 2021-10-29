import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import styled from "styled-components";
import { Result, message } from "antd";
import useInput from "../hooks/useInput";
import { emptyCheck } from "../components/commonUtils";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import {} from "@ant-design/icons";
import useWidth from "../hooks/useWidth";
import {
  Image,
  Wrapper,
  RsWrapper,
  CommonButton,
  Label,
  TextInput,
  RadioInput,
} from "../components/commonComponents";
import ClientLayout from "../components/ClientLayout";
import Theme from "../components/Theme";
import SubBanner from "../components/SubBanner";
import { QUESTION_CREATE_REQUEST } from "../reducers/question";
import { useTranslation } from "react-i18next";

const TextLabel = styled(Label)``;

const InputText = styled(TextInput)`
  border: none;
  border-bottom: ${(props) => props.borderBottom};
  &:focus {
    border-bottom: 1px solid #ff65a6;
  }
`;

const Content = styled.textarea`
  font-size: 16px;
  color: #8b8686;
  font-weight: 400;
  padding: 0 10px;
  border: none;
  outline: none;
  resize: none;
  width: 100%;
  border-bottom: ${(props) => props.borderBottom};
  &:focus {
    border-bottom: 1px solid #ff65a6;
  }
`;

const Support = () => {
  ////// VARIABLES //////

  ////// HOOKS //////
  const dispatch = useDispatch();

  const { t } = useTranslation(["support"]);

  const width = useWidth();

  const { st_questionCreateDone, st_questionCreateError } = useSelector(
    (state) => state.question
  );

  const inputName = useInput("");
  const inputNumber = useInput("");
  const inputEmail = useInput("");
  const inputContent = useInput("");
  const inputAgree = useInput(false);

  ////// TOGGLE //////

  ////// HANDLER //////

  const createQuestionHandler = useCallback(() => {
    if (!emptyCheck(inputName.value)) {
      return message.error(t(`1`));
    }

    if (!emptyCheck(inputNumber.value)) {
      return message.error(t(`2`));
    }

    if (!emptyCheck(inputEmail.value)) {
      return message.error(t(`3`));
    }

    if (!emptyCheck(inputContent.value)) {
      return message.error(t(`4`));
    }

    if (!inputAgree.value) {
      return message.error(t(`5`));
    }

    dispatch({
      type: QUESTION_CREATE_REQUEST,
      data: {
        name: inputName.value,
        mobile: inputNumber.value,
        email: inputEmail.value,
        content: inputContent.value,
      },
    });
  }, [inputName, inputNumber, inputEmail, inputContent, inputAgree]);

  useEffect(() => {
    if (st_questionCreateDone) {
      message.success(t(`6`));

      inputName.setValue("");
      inputNumber.setValue("");
      inputEmail.setValue("");
      inputContent.setValue("");
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
      <SubBanner />

      <Wrapper bgColor={`#000105`} padding={`80px 0`}>
        <RsWrapper>
          <Wrapper color={"#3353F2"} fontSize={`28px`} fontWeight={`300`}>
            {t(`7`)}
          </Wrapper>

          <Wrapper
            color={`#fff`}
            margin={`22px 0 5px`}
            textAlign={`center`}
            fontSize={`20px`}>
            {t(`8`)}
            <br />
            {t(`9`)}
          </Wrapper>

          <Wrapper dr={`row`} ju={`flex-start`} margin={`110px 0 0 0`}>
            <Wrapper width={`50%`}>
              <Image
                width={`auto`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/consulting/image_consulting.png`}
              />
            </Wrapper>

            <Wrapper dr={`row`} width={`50%`}>
              <Wrapper
                bgColor={Theme.white_C}
                radius={`8px`}
                padding={`50px 15px 60px`}
                width={`425px`}>
                <Wrapper dr={`row`} al={`normal`}>
                  <Wrapper width={`85px`} al={`flex-start`} ju={`flex-end`}>
                    <TextLabel margin={`0 25px 0 0 `}>{t(`10`)}</TextLabel>
                  </Wrapper>

                  <Wrapper width={`250px`}>
                    <InputText
                      width={width < 700 ? `calc(100% - 85px)` : ``}
                      borderBottom={"1px solid #e3e3e3"}
                      fontSize={`16px`}
                      color={`#8b8686`}
                      fontWeight={`400`}
                      {...inputName}
                    />
                  </Wrapper>
                </Wrapper>

                <Wrapper dr={`row`} al={`normal`} margin={`30px 0 0 0`}>
                  <Wrapper width={`85px`} al={"flex-start"} ju={`flex-end`}>
                    <TextLabel margin={`0 25px 0 0 `}>{t(`11`)}</TextLabel>
                  </Wrapper>

                  <Wrapper width={`250px`}>
                    <InputText
                      maxLength={`13`}
                      borderBottom={"1px solid #e3e3e3"}
                      fontSize={`16px`}
                      color={`#8b8686`}
                      fontWeight={`400`}
                      {...inputNumber}
                    />
                  </Wrapper>
                </Wrapper>

                <Wrapper dr={`row`} al={`normal`} margin={`30px 0 0 0`}>
                  <Wrapper width={`85px`} al={"flex-start"} ju={`flex-end`}>
                    <TextLabel margin={`0 25px 0 0 `}>{t(`12`)}</TextLabel>
                  </Wrapper>
                  <Wrapper width={`250px`}>
                    <InputText
                      borderBottom={"1px solid #e3e3e3"}
                      fontSize={`16px`}
                      color={`#8b8686`}
                      fontWeight={`400`}
                      {...inputEmail}
                    />
                  </Wrapper>
                </Wrapper>

                <Wrapper dr={`row`} al={`baseline`} margin={`40px 0 0 0`}>
                  <Wrapper width={`85px`} al={`flex-start`} ju={`flex-end`}>
                    <TextLabel margin={`0 25px 0 0 `}>{t(`13`)}</TextLabel>
                  </Wrapper>
                  <Wrapper width={`250px`} borderBottom={"1px solid #e3e3e3"}>
                    <Content width={`100%`} {...inputContent} />
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper margin={`10px 0`}>
                <Wrapper ju={`flex-start`} width={`475px`} margin={`0 30px`}>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    margin={`0px 10px 0 0px`}>
                    <RadioInput
                      color={`#FF3C8E`}
                      checked={inputAgree.value}
                      onClick={() => inputAgree.setValue(!inputAgree.value)}
                    />
                    <Wrapper
                      fontSize={`15px`}
                      color={`white`}
                      margin={`0 30px 0 0`}
                      width={`auto`}
                      opacity={`0.6`}
                      cursor={`pointer`}
                      onClick={() => inputAgree.setValue(!inputAgree.value)}>
                      {t(`14`)}
                    </Wrapper>
                    <Wrapper
                      cursor={`pointer`}
                      fontSize={`13px`}
                      color={`white`}
                      width={`auto`}
                      radius={`5px`}
                      padding={`0 6px`}
                      bgColor={"#8b8686"}>
                      {t(`15`)}
                    </Wrapper>
                  </Wrapper>

                  <Wrapper margin={`50px 80px 0 0`} fontSize={`32px`}>
                    <CommonButton
                      bgColor={`#3353F2`}
                      color={`#fff`}
                      fontWeight={`300`}
                      fontSize={`24px`}
                      padding={`6px 50px 8px`}
                      radius={`6px`}
                      onClick={createQuestionHandler}>
                      {t(`7`)}
                    </CommonButton>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </RsWrapper>
      </Wrapper>
    </ClientLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Support;
