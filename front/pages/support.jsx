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

const TextLabel = styled(Label)`
  border-bottom: ${(props) => props.border || `2px solid #e3e3e3`};
`;

const InputText = styled(TextInput)`
  border-bottom: ${(props) => props.borderBottom};
  outline: 0;
  border-width: 0 0 2px;
  border-color: #e3e3e3;

  &:focus {
    outline: 0;
    border-width: 0 0 1px;
    border-color: #b12774;
  }
`;

const Support = () => {
  ////// VARIABLES //////

  ////// HOOKS //////
  const dispatch = useDispatch();

  const { me, st_userSigninDone, st_userSigninError } = useSelector(
    (state) => state.user
  );

  const inputName = useInput("");
  const inputNumber = useInput("");
  const inputEmail = useInput("");
  const inputContent = useInput("");

  ////// TOGGLE //////

  ////// HANDLER //////

  return (
    <ClientLayout>
      <SubBanner />

      <Wrapper bgColor={`#000105`} padding={`80px 0`}>
        <RsWrapper>
          <Wrapper color={"#FF3C8E"} fontSize={`28px`} fontWeight={`500`}>
            문의하기
          </Wrapper>

          <Wrapper
            color={`#fff`}
            margin={`15px 0`}
            textAlign={`center`}
            fontSize={`20px`}>
            궁금하거나 불편하신 점이 있으시면 편하게 물어보세요.
            <br />
            귀하를 지원하기 위해 최선을 다하는 Willmarkets이 되겠습니다.
          </Wrapper>

          <Wrapper margin={`30px 0`}>
            <Image
              width={`auto`}
              src={
                "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/consulting/image_consulting.png"
              }
            />
          </Wrapper>

          <Wrapper bgColor={`#fff`}>
            <Wrapper dr={`row`}>
              <Wrapper width={`80px`}>
                <TextLabel>이름</TextLabel>
              </Wrapper>

              <Wrapper width={`auto`}>
                <InputText />
              </Wrapper>
            </Wrapper>

            <Wrapper dr={`row`}>
              <Wrapper width={`80px`}>
                <TextLabel>이름</TextLabel>
              </Wrapper>

              <Wrapper width={`auto`}>
                <InputText />
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper dr={`row`} width={`50%`} ju={`flex-start`} margin={`10px 0`}>
            <RadioInput color={`#FF3C8E`} border={`#FF3C8E`} />

            <Wrapper color={`white`} width={`auto`} margin={`0 5px 0 0`}>
              개인정보 처리 방침에 동의합니다.
            </Wrapper>
            <Wrapper color={`white`} width={`auto`}>
              보기
            </Wrapper>
          </Wrapper>

          <Wrapper margin={`10px 0 0 0`} fontSize={`32px`}>
            <CommonButton
              bgColor={`#FF3C8E`}
              color={`#fff`}
              fontWeight={`500`}
              fontSize={`28px`}
              padding={`4px 35px`}
              radius={`6px`}>
              문의하기
            </CommonButton>
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
