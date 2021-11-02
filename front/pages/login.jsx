import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import { message } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import useInput from "../hooks/useInput";
import { emptyCheck } from "../components/commonUtils";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { LOAD_MY_INFO_REQUEST, USER_SIGNIN_REQUEST } from "../reducers/user";
import {
  Image,
  Wrapper,
  RsWrapper,
  TextInput,
  CommonButton,
} from "../components/commonComponents";
import ClientLayout from "../components/ClientLayout";
import Theme from "../components/Theme";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const CustomInput = styled(TextInput)`
  padding: 0 0 0 15px;
  font-weight: 400;
  border: none;
`;

const Login = () => {
  ////// VARIABLES //////

  ////// HOOKS //////
  const dispatch = useDispatch();

  const { t } = useTranslation(["login"]);

  const router = useRouter();

  const { me, st_userSigninDone, st_userSigninError } = useSelector(
    (state) => state.user
  );

  const inputEmail = useInput("");
  const inputPassword = useInput("");

  ////// TOGGLE //////

  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const loginHandler = useCallback(() => {
    if (!emptyCheck(inputEmail.value)) {
      return message.error(t(`1`));
    }
    if (!emptyCheck(inputPassword.value)) {
      return message.error(t(`2`));
    }

    dispatch({
      type: USER_SIGNIN_REQUEST,
      data: {
        email: `ISCLIENT&&${i18next.language}&&${inputEmail.value}`,
        password: inputPassword.value,
      },
    });
  }, [inputEmail, inputPassword]);

  const changeCaptchaHandler = useCallback((value) => {
    console.log(value);
  }, []);

  ////// USEEFFECT //////
  useEffect(() => {
    if (st_userSigninDone) {
      moveLinkHandler(`/user`);
      message.success(t(`3`));
    }
  }, [st_userSigninDone]);

  useEffect(() => {
    if (st_userSigninError) {
      message.error(st_userSigninError);
    }
  }, [st_userSigninError]);

  return (
    <ClientLayout>
      <Wrapper
        position={`absolute`}
        top={`0`}
        left={`0`}
        zIndex={`0`}
        minHeight={`100vh`}>
        <Image
          height={`100vh`}
          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/banner/main_banner02.png`}
        />
      </Wrapper>

      <Wrapper>
        <RsWrapper
          position={`relative`}
          zIndex={`1`}
          al={`flex-end`}
          minHeight={`100vh`}>
          <Wrapper
            margin={`0 45px 0 0`}
            padding={`60px 50px`}
            width={`500px`}
            bgColor={`#fff`}
            shadow={`1px 1px 8px #dedede`}>
            <Image
              width={`auto`}
              margin={`0 0 50px`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/logo/logo_big.png`}
            />

            <Wrapper
              dr={`row`}
              padding={`0 10px 5px`}
              borderBottom={`1.5px solid #635CF3`}>
              <UserOutlined style={{ fontSize: `24px`, color: `#555555` }} />
              <CustomInput
                width={`calc(100% - 24px)`}
                placeholder={`ID`}
                {...inputEmail}
                onKeyDown={(e) => e.keyCode === 13 && loginHandler()}
              />
            </Wrapper>

            <Wrapper
              dr={`row`}
              margin={`30px 0 0`}
              padding={`0 10px 5px`}
              borderBottom={`1.5px solid #635CF3`}>
              <LockOutlined style={{ fontSize: `24px`, color: `#555555` }} />
              <CustomInput
                type={`password`}
                width={`calc(100% - 24px)`}
                placeholder={`PASSWORD`}
                {...inputPassword}
                onKeyDown={(e) => e.keyCode === 13 && loginHandler()}
              />
            </Wrapper>

            <Wrapper al={`flex-end`} margin={`5px 0 20px`}>
              <Wrapper
                width={`auto`}
                fontSize={`15px`}
                fontWeight={`300`}
                color={`#707070`}
                cursor={`pointer`}
                onClick={() => moveLinkHandler(`/find`)}>
                {t(`4`)}
              </Wrapper>
            </Wrapper>

            <Wrapper>
              <CommonButton
                width={`180px`}
                height={`45px`}
                lineHeight={`40px`}
                fontSize={`20px`}
                margin={`0 0 10px`}
                radius={`8px`}
                bgColor={`#313B91`}
                color={`#fff`}
                onClick={loginHandler}>
                {t(`5`)}
              </CommonButton>
              <CommonButton
                width={`180px`}
                height={`45px`}
                lineHeight={`40px`}
                fontSize={`20px`}
                margin={`0 0 10px`}
                radius={`8px`}
                border={`1px solid #313B91`}
                bgColor={`#fff`}
                color={`#313B91`}
                onClick={() => moveLinkHandler(`/signup`)}>
                {t(`6`)}
              </CommonButton>
            </Wrapper>
          </Wrapper>
        </RsWrapper>
      </Wrapper>

      {/* <Wrapper>
        <ReCAPTCHA
          sitekey={`6LfrU5kcAAAAAPksd-pntn_n9L8LEof76kCO8_ED`}
          hl={`en`}
          onChange={changeCaptchaHandler}
        />
      </Wrapper> */}

      {/* <Wrapper>
        <TextInput {...inputEmail} />
        <TextInput {...inputPassword} />

        <CommonButton kindOf={`blue`} onClick={loginHandler}>
          버튼
        </CommonButton>
      </Wrapper> */}
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
export default Login;
