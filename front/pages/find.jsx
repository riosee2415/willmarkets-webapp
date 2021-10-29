import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, useRouter } from "next/router";
import styled from "styled-components";
import { message } from "antd";
import useInput from "../hooks/useInput";
import { emptyCheck } from "../components/commonUtils";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  LOAD_MY_INFO_REQUEST,
  USER_FIND_PASSWORD_REQUEST,
  USER_FIND_PASSWORD_CONFIRM_REQUEST,
  USER_FIND_PASSWORD_UPDATE_REQUEST,
} from "../reducers/user";
import {
  Image,
  Wrapper,
  RsWrapper,
  Label,
  TextInput,
  CommonButton,
} from "../components/commonComponents";
import ClientLayout from "../components/ClientLayout";
import Theme from "../components/Theme";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const CustomLabel = styled(Label)`
  display: flex;
  align-items: center;
  width: auto;
  height: 40px;
  font-size: 17px;
  font-weight: 500;

  & .required {
    width: auto;
    margin: 0 5px 0 0;
    color: #a06ec6;
  }
`;

const CustomInput = styled(TextInput)`
  width: ${(props) => props.width || `350px`};
  height: 40px;
  border: none;
  border-bottom: ${(props) => props.borderBottom || `1px solid #dfdfdf`};

  &:hover,
  &:focus {
    border-bottom: ${(props) => props.hoverBorderBottom || `1px solid #e6c0d4`};
  }
`;

const Find = () => {
  ////// VARIABLES //////

  ////// HOOKS //////
  const dispatch = useDispatch();

  const { t } = useTranslation(["find"]);

  const router = useRouter();

  const {
    me,
    st_userFindPasswordDone,
    st_userFindPasswordError,
    st_userFindPasswordConfirmDone,
    st_userFindPasswordConfirmError,
    st_userFindPasswordUpdateDone,
    st_userFindPasswordUpdateError,
  } = useSelector((state) => state.user);

  const [currentTab, setCurrentTab] = useState(0);

  const inputEmail = useInput("");
  const inputSecret = useInput("");
  const inputPassword = useInput("");
  const inputPasswordCheck = useInput("");

  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isConfirmEmail, setIsConfirmEmail] = useState(false);

  ////// TOGGLE //////

  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const findPasswordHandler = useCallback(() => {
    if (!emptyCheck(inputEmail.value)) {
      return message.error(t(`1`));
    }

    dispatch({
      type: USER_FIND_PASSWORD_REQUEST,
      data: {
        email: inputEmail.value,
      },
    });
  }, [inputEmail]);

  const findPasswordConfirmHandler = useCallback(() => {
    if (!emptyCheck(inputSecret.value)) {
      return message.error(t(`2`));
    }

    dispatch({
      type: USER_FIND_PASSWORD_CONFIRM_REQUEST,
      data: {
        email: inputEmail.value,
        secret: inputSecret.value,
      },
    });
  }, [inputEmail, inputSecret]);

  const findPasswordUpdateHandler = useCallback(() => {
    if (currentTab === 0) {
      if (!emptyCheck(inputEmail.value)) {
        return message.error(t(`1`));
      }

      if (!isConfirmEmail) {
        return message.error(t(`3`));
      }

      setCurrentTab(1);
    } else if (currentTab === 1) {
      if (!emptyCheck(inputPassword.value)) {
        return message.error(t(`4`));
      }

      if (!emptyCheck(inputPasswordCheck.value)) {
        return message.error(t(`5`));
      }

      if (inputPassword.value !== inputPasswordCheck.value) {
        return message.error(t(`6`));
      }

      dispatch({
        type: USER_FIND_PASSWORD_UPDATE_REQUEST,
        data: {
          email: inputEmail.value,
          password: inputPassword.value,
        },
      });
    }
  }, [
    inputEmail,
    inputSecret,
    inputPassword,
    inputPasswordCheck,
    isConfirmEmail,
  ]);

  ////// USEEFFECT //////
  useEffect(() => {
    if (st_userFindPasswordDone) {
      setIsSendEmail(true);
      setIsConfirmEmail(false);
      message.success(t(`7`));
    }
  }, [st_userFindPasswordDone]);

  useEffect(() => {
    if (st_userFindPasswordError) {
      setIsSendEmail(false);
      setIsConfirmEmail(false);
      message.error(st_userFindPasswordError);
    }
  }, [st_userFindPasswordError]);

  useEffect(() => {
    if (st_userFindPasswordConfirmDone) {
      setIsConfirmEmail(true);
      message.success(t(`8`));
    }
  }, [st_userFindPasswordConfirmDone]);

  useEffect(() => {
    if (st_userFindPasswordConfirmError) {
      setIsConfirmEmail(false);
      message.error(st_userFindPasswordConfirmError);
    }
  }, [st_userFindPasswordConfirmError]);

  useEffect(() => {
    if (st_userFindPasswordUpdateDone) {
      moveLinkHandler(`/login`);
      message.success(t(`9`));
    }
  }, [st_userFindPasswordUpdateDone]);

  useEffect(() => {
    if (st_userFindPasswordUpdateError) {
      message.error(st_userFindPasswordUpdateError);
    }
  }, [st_userFindPasswordUpdateError]);

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
            padding={`40px 40px 30px`}
            width={`500px`}
            bgColor={`#fff`}
            shadow={`1px 1px 8px #dedede`}>
            <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 30px`}>
              <Image
                width={`50px`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/logo/big_logo.png`}
              />
              <Wrapper
                width={`auto`}
                margin={`0 0 0 10px`}
                fontSize={`20px`}
                fontWeight={`500`}
                color={`#242424`}>
                {t(`10`)}
              </Wrapper>
            </Wrapper>

            {currentTab === 0 && (
              <Wrapper>
                <Wrapper dr={`row`} al={`flex-start`}>
                  <Wrapper al={`flex-start`} width={`120px`}>
                    <CustomLabel for={`inp-email`}>{t(`11`)}</CustomLabel>
                  </Wrapper>

                  <Wrapper width={`calc(100% - 120px)`}>
                    <Wrapper dr={`row`} ju={`flex-start`}>
                      <CustomInput
                        id={`inp-email`}
                        width={
                          i18next.language === `en`
                            ? `calc(100% - 110px)`
                            : `calc(100% - 90px)`
                        }
                        {...inputEmail}
                        placeholder={t(`11`)}
                        readOnly={isConfirmEmail}
                        onChange={(e) => {
                          setIsSendEmail(false);
                          setIsConfirmEmail(false);
                          inputEmail.setValue(e.target.value);
                        }}
                      />
                      <CommonButton
                        width={i18next.language === `en` ? `100px` : `80px`}
                        height={`38px`}
                        lineHeight={`34px`}
                        margin={`0 0 0 10px`}
                        bgColor={`#030303`}
                        color={`#fff`}
                        fontWeight={`500`}
                        radius={`5px`}
                        onClick={findPasswordHandler}>
                        {isConfirmEmail ? t(`12`) : t(`13`)}
                      </CommonButton>
                    </Wrapper>

                    {isSendEmail && !isConfirmEmail && (
                      <Wrapper dr={`row`} ju={`flex-start`} margin={`10px 0 0`}>
                        <CustomInput
                          width={`calc(100% - 90px)`}
                          {...inputSecret}
                          placeholder={t(`14`)}
                        />
                        <CommonButton
                          width={`80px`}
                          height={`38px`}
                          lineHeight={`34px`}
                          margin={`0 0 0 10px`}
                          bgColor={`#ebebeb`}
                          color={`#030303`}
                          fontWeight={`500`}
                          radius={`5px`}
                          onClick={findPasswordConfirmHandler}>
                          {t(`15`)}
                        </CommonButton>
                      </Wrapper>
                    )}
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            )}

            {currentTab === 1 && (
              <Wrapper>
                <Wrapper dr={`row`}>
                  <Wrapper al={`flex-start`} width={`120px`}>
                    <CustomLabel for={`inp-password`}>{t(`16`)}</CustomLabel>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    width={`calc(100% - 120px)`}>
                    <CustomInput
                      type={`password`}
                      id={`inp-password`}
                      {...inputPassword}
                      placeholder={t(`16`)}
                    />
                  </Wrapper>
                </Wrapper>

                <Wrapper dr={`row`} margin={`10px 0 0`}>
                  <Wrapper al={`flex-start`} width={`120px`}>
                    <CustomLabel for={`inp-passwordCheck`}>
                      {t(`17`)}
                    </CustomLabel>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    width={`calc(100% - 120px)`}>
                    <CustomInput
                      type={`password`}
                      id={`inp-passwordCheck`}
                      {...inputPasswordCheck}
                      placeholder={t(`17`)}
                    />
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            )}

            <Wrapper>
              <CommonButton
                width={`200px`}
                height={`45px`}
                lineHeight={`40px`}
                fontSize={`20px`}
                margin={`50px 0 10px`}
                radius={`8px`}
                bgColor={`#f8459b`}
                color={`#fff`}
                onClick={findPasswordUpdateHandler}>
                {currentTab === 0 ? t(`10`) : t(`18`)}
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
export default Find;
