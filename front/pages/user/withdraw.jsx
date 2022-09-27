import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, useRouter } from "next/router";
import styled from "styled-components";
import { Result, message } from "antd";
import useInput from "../../hooks/useInput";
import useOnlyNumberInput from "../../hooks//useOnlyNumberInput";
import { emptyCheck } from "../../components/commonUtils";
import { CaretDownOutlined, CodeSandboxCircleFilled } from "@ant-design/icons";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  LOAD_MY_INFO_REQUEST,
  USER_FIND_PASSWORD_REQUEST,
  USER_UPDATE_OTP_REQUEST,
  USER_VERIFY_OTP_REQUEST,
  INIT_STATE_REQUEST,
} from "../../reducers/user";

import {
  Wrapper,
  SelectBox,
  Label,
  TextInput,
  Text,
  Combo,
  ComboTitle,
  ComboList,
  ComboListItem,
  CommonButton,
  Image,
} from "../../components/commonComponents";
import UserLayout from "../../components/user/UserLayout";
import Theme from "../../components/Theme";
import { WITHDRAW_CREATE_REQUEST } from "../../reducers/withdraw";
import { USER_FIND_PASSWORD_CONFIRM_REQUEST } from "../../reducers/user";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import useWidth from "../../hooks/useWidth";

const TabWrapper = styled(Wrapper)`
  flex-direction: row;
  align-items: normal;
  justify-content: flex-start;
`;

const Tab = styled(Wrapper)`
  padding: 8px 20px;
  width: auto;
  border: 1px solid #dedede;
  border-left: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: ${(props) => props.fontSize || `15px`};
  color: ${(props) => props.color || `#312f2f`};
  cursor: pointer;

  &:first-child {
    border-left: 1px solid #dedede;
  }

  &:hover {
    background: #f4f4f4;
  }

  ${(props) =>
    props.isActive &&
    `
    background: #f9edf8 !important;
    box-shadow: 0px 0px 8px #f0d4ef;

  `}
`;

const CustomLabel = styled(Label)`
  display: flex;

  & .required {
    width: auto;
    margin: 0 5px 0 0;
    color: #a06ec6;
  }
`;

const CustomInput = styled(TextInput)`
  width: ${(props) => props.width || `250px`};
  height: 40px;
  border: 1px solid #f3e4fa;
  box-shadow: 0 2px 8px rgb(0 0 0 / 9%);

  &:hover,
  &:focus {
    border: 1px solid #d7a6ed;
    box-shadow: 0 3px 8px rgb(0 0 0 / 12%);
  }
`;

const Withdraw = () => {
  ////// VARIABLES //////
  const priceTypeList = ["BTC-BTC", "ETH-ETH", "USDT-USDT"];

  ////// HOOKS //////

  const { t } = useTranslation(["user_withdraw"]);

  const dispatch = useDispatch();

  const {
    me,
    otpData,
    otpResult,
    st_userFindPasswordDone,
    st_userFindPasswordError,
    st_userFindPasswordConfirmDone,
    st_userFindPasswordConfirmError,
    st_userUpdateOtpDone,
    st_userUpdateOtpError,
    st_userVerifyOtpDone,
    st_userVerifyOtpError,
    secretCode,
  } = useSelector((state) => state.user);

  const { st_withdrawCreateDone, st_withdrawCreateError } = useSelector(
    (state) => state.withdraw
  );

  const router = useRouter();

  const width = useWidth();

  const [currentTab, setCurrentTab] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const [comboSelectBank, setComboSelectBank] = useState(false);
  const [comboPriceType, setComboPriceType] = useState(false);

  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isConfirmEmail, setIsConfirmEmail] = useState(false);

  const [isSendOtp, setIsSendOtp] = useState(false);
  const [isReSendOtp, setIsReSendOtp] = useState(false);
  const [isConfirmOtp, setIsConfirmOtp] = useState(false);

  const inputBankName = useInput("");
  const inputBankNo = useInput("");
  const inputSwiftCode = useInput("");
  const inputBankAddress = useInput("");
  const inputSelectBank = useInput("");
  const inputPrice = useInput("");
  const inputSecret = useInput("");
  const inputOtpSecret = useInput("");

  const inputPriceType = useInput("");
  const inputWalletAddress = useInput("");

  const inputPayeeAccount = useInput("");
  const inputPayeeName = useInput("");

  ////// TOGGLE //////

  ////// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const selectBankHandler = useCallback((data) => {
    setCurrentBank(data);
    setCurrentStep(1);
  }, []);

  const initValueHandler = useCallback(() => {
    setCurrentStep(0);

    setComboSelectBank(false);

    setIsSendEmail(false);
    setIsConfirmEmail(false);

    inputBankName.setValue("");
    inputBankNo.setValue("");
    inputSwiftCode.setValue("");
    inputBankAddress.setValue("");
    inputSelectBank.setValue("");
    inputPrice.setValue("");
    inputSecret.setValue("");

    inputPriceType.setValue("");
    inputWalletAddress.setValue("");
    inputPayeeAccount.setValue("");
    inputPayeeName.setValue("");
  }, []);

  const createWithdrawHanlder = useCallback(() => {
    // if (!emptyCheck(inputBankName.value)) {
    //   return message.error(t(`1`));
    // }

    // if (!emptyCheck(inputBankNo.value)) {
    //   return message.error(t(`2`));
    // }

    // if (!emptyCheck(inputSwiftCode.value)) {
    //   return message.error(t(`3`));
    // }

    // if (!emptyCheck(inputBankAddress.value)) {
    //   return message.error(t(`4`));
    // }

    // if (!emptyCheck(inputSelectBank.value)) {
    //   return message.error(t(`5`));
    // }

    // if (!emptyCheck(inputPriceType.value)) {
    //   return message.error(t(`33`));
    // }

    // if (!emptyCheck(inputWalletAddress.value)) {
    //   return message.error(t(`34`));
    // }

    // if (!emptyCheck(inputPrice.value)) {
    //   return message.error(t(`6`));
    // }

    // if (parseFloat(me.priceWallet) < parseFloat(inputPrice.value)) {
    //   return message.error(t(`38`));
    // }

    if (!isSendEmail) {
      dispatch({
        type: USER_FIND_PASSWORD_REQUEST,
        data: {
          language: i18next.language,
          email: me.email,
        },
      });
      return;
    }

    if (isSendEmail && !isConfirmEmail) {
      if (!emptyCheck(inputSecret.value)) {
        return message.error(t(`7`));
      }

      dispatch({
        type: USER_FIND_PASSWORD_CONFIRM_REQUEST,
        data: {
          language: i18next.language,
          email: me.email,
          secret: inputSecret.value,
        },
      });
      return;
    }

    if (isSendOtp && !isConfirmOtp) {
      if (!emptyCheck(inputOtpSecret.value)) {
        return message.error(t(`42`));
      }

      return message.error(t(`45`));
    }

    dispatch({
      type: WITHDRAW_CREATE_REQUEST,
      data: {
        language: i18next.language,
        userId: me.id,
        bankName: inputBankName.value,
        bankNo: inputBankNo.value,
        swiftCode: inputSwiftCode.value,
        bankAddress: inputBankAddress.value,
        selectBank: inputSelectBank.value,
        price: inputPrice.value,
        priceType: inputPriceType.value,
        walletAddress: inputWalletAddress.value,
        payeeAccount: inputPayeeAccount.value,
        payeeName: inputPayeeName.value,
      },
    });
  }, [
    inputBankName.value,
    inputBankNo.value,
    inputSwiftCode.value,
    inputBankAddress.value,
    inputSelectBank.value,
    inputPrice.value,
    inputSecret.value,
    inputOtpSecret.value,
    inputPriceType.value,
    inputWalletAddress.value,
    inputPayeeAccount.value,
    inputPayeeName.value,
    isSendEmail,
    isConfirmEmail,
    isSendOtp,
    isConfirmOtp,
    t,
  ]);

  const confirmSecretHandler = useCallback(() => {
    if (!emptyCheck(inputSecret.value)) {
      return message.error(t(`7`));
    }
    if (secretCode.UUID !== inputSecret.value) {
      setIsConfirmEmail(false);
      return message.error(t(`8`));
    } else {
      setIsConfirmEmail(true);
      setIsSendOtp(true);

      message.success(t(`9`));

      if (!me.otpSecret) {
        dispatch({
          type: USER_UPDATE_OTP_REQUEST,
          data: {
            language: i18next.language,
            id: me.id,
          },
        });
      }
    }
  }, [t, me, inputSecret.value, secretCode]);

  const resendOtpHandler = useCallback(() => {
    dispatch({
      type: USER_UPDATE_OTP_REQUEST,
      data: {
        language: i18next.language,
        id: me.id,
      },
    });
  }, [me]);

  const confirmOtpHandler = useCallback(() => {
    if (!emptyCheck(inputOtpSecret.value)) {
      return message.error(t(`42`));
    }

    setIsReSendOtp(false);

    dispatch({
      type: USER_VERIFY_OTP_REQUEST,
      data: {
        language: i18next.language,
        otpSecret: me.otpSecret,
        otpCode: inputOtpSecret.value,
      },
    });
  }, [t, me, inputOtpSecret.value]);

  ////// USE EFFECT //////
  useEffect(() => {
    if (!me) {
      message.error(t(`10`));
      router.push("/login");
    } else if (me.userType === `1`) {
      router.push("/user?access=false");
    }
  }, [me, t]);

  useEffect(() => {
    initValueHandler();
  }, [currentTab]);

  useEffect(() => {
    if (st_userFindPasswordDone) {
      setIsSendEmail(true);
      message.success(t(`11`));
    }
  }, [st_userFindPasswordDone]);

  useEffect(() => {
    if (st_userFindPasswordError) {
      setIsSendEmail(false);
      message.error(st_userFindPasswordError);
    }
  }, [st_userFindPasswordError]);

  useEffect(() => {
    if (st_userFindPasswordConfirmDone) {
      setIsConfirmEmail(true);

      setTimeout(() => {
        createWithdrawHanlder();
      }, 100);
    }
  }, [st_userFindPasswordConfirmDone]);

  useEffect(() => {
    if (st_userFindPasswordConfirmError) {
      setIsConfirmEmail(false);
      message.error(st_userFindPasswordConfirmError);
    }
  }, [st_userFindPasswordConfirmError]);

  useEffect(() => {
    if (st_userUpdateOtpDone) {
      dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      setIsReSendOtp(true);
    }
  }, [st_userUpdateOtpDone]);

  useEffect(() => {
    if (st_userUpdateOtpError) {
      setIsReSendOtp(false);
      message.error(st_userUpdateOtpError);
    }
  }, [st_userUpdateOtpError]);

  useEffect(() => {
    if (st_userVerifyOtpDone) {
      if (otpResult) {
        setIsConfirmOtp(true);
        message.success(t(`44`));
      } else {
        setIsConfirmOtp(false);
        message.error(t(`43`));
      }
    }
  }, [st_userVerifyOtpDone]);

  useEffect(() => {
    if (st_userVerifyOtpError) {
      setIsConfirmOtp(false);
      message.error(t(`43`));
    }
  }, [st_userVerifyOtpError]);

  useEffect(() => {
    if (st_withdrawCreateDone) {
      setCurrentStep(1);
      dispatch({
        type: INIT_STATE_REQUEST,
      });
      dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
    }
  }, [st_withdrawCreateDone]);

  useEffect(() => {
    if (st_withdrawCreateError) {
      message.error(st_withdrawCreateError);
    }
  }, [st_withdrawCreateError]);

  return (
    <UserLayout>
      <TabWrapper
        position={`absolute`}
        top={width < 900 ? `0` : `-21px`}
        left={`20px`}
      >
        <Tab isActive={currentTab === 0} onClick={() => setCurrentTab(0)}>
          {t(`12`)}
        </Tab>
      </TabWrapper>

      <Wrapper
        al={`flex-start`}
        ju={`space-between`}
        minHeight={`calc(100vh - 110px)`}
        margin={width < 900 ? `20px 0 0` : ``}
        padding={width < 900 ? `20px` : `20px 30px`}
        bgColor={`#fff`}
        border={`1px solid #ededed`}
        shadow={`2px 2px 10px #e6e6e6`}
      >
        <Wrapper al={`flex-start`}>
          <Wrapper
            al={`flex-start`}
            margin={`0 0 30px`}
            padding={`0 8px 20px`}
            fontSize={`19px`}
            fontWeight={`700`}
            borderBottom={`1px solid #ebebeb`}
          >
            {t(`13`)}
          </Wrapper>

          {currentTab === 0 && (
            <Wrapper al={`flex-start`}>
              {currentStep === 0 && (
                <Wrapper al={`flex-start`}>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    margin={`0 0 20px`}
                    fontSize={`18px`}
                    fontWeight={`700`}
                  >
                    <Wrapper
                      width={`auto`}
                      margin={`0 10px 0 0`}
                      padding={`5px 10px`}
                      fontSize={`14px`}
                      fontWeight={`700`}
                      bgColor={`#aa28c9`}
                      color={`#fff`}
                    >
                      {t(`69`)}
                    </Wrapper>
                  </Wrapper>
                  <CustomLabel for={`inp-price`} margin={`10px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    {t(`18`)}
                  </CustomLabel>
                  <Wrapper
                    margin={`0px 0px 30px 0px`}
                    dr={`row`}
                    ju={`flex-start`}
                  >
                    <Combo
                      isBorder={true}
                      itemAlign={`flex-start`}
                      width={`250px`}
                      height={`40px`}
                      border={`1px solid #f3e4fa`}
                      shadow={`0 2px 8px rgb(0 0 0 / 9%)`}
                      hoverBorder={`1px solid #d7a6ed`}
                      hoverShadow={`0 3px 8px rgb(0 0 0 / 12%)`}
                      onClick={() => setComboSelectBank(!comboSelectBank)}
                    >
                      <ComboTitle>
                        <Wrapper>{inputSelectBank.value || t(`19`)}</Wrapper>
                        <CaretDownOutlined />
                      </ComboTitle>

                      <ComboList isView={comboSelectBank}>
                        <ComboListItem
                          onClick={() => inputSelectBank.setValue("")}
                        >
                          {t(`19`)}
                        </ComboListItem>

                        <ComboListItem
                          onClick={() => inputSelectBank.setValue(t(`20`))}
                        >
                          {t(`20`)}
                        </ComboListItem>

                        {me &&
                          me.LiveAccounts &&
                          me.LiveAccounts.map((data) => {
                            if (!data.isComplete) {
                              return null;
                            }
                            return (
                              <ComboListItem
                                key={data.id}
                                isActive={inputSelectBank.value === data.bankNo}
                                onClick={() =>
                                  inputSelectBank.setValue(data.bankNo)
                                }
                              >
                                {data.bankNo}
                              </ComboListItem>
                            );
                          })}
                      </ComboList>
                    </Combo>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    margin={`0 0 20px`}
                    fontSize={`18px`}
                    fontWeight={`700`}
                  >
                    <Wrapper
                      width={`auto`}
                      margin={`0 10px 0 0`}
                      padding={`5px 10px`}
                      fontSize={`14px`}
                      fontWeight={`700`}
                      bgColor={`#aa28c9`}
                      color={`#fff`}
                    >
                      Select 01
                    </Wrapper>
                    {t(`70`)}
                  </Wrapper>

                  <Wrapper
                    al={`flex-start`}
                    margin={`10px 0 0`}
                    fontSize={`13px`}
                    color={`#e91448`}
                    lineHeight={`1.8`}
                  >
                    {t(`74`)}
                    <br /> {t(`75`)}
                    <br /> {t(`76`)}
                  </Wrapper>

                  <CustomLabel for={`inp-price`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    {t(`15`)}
                  </CustomLabel>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <CustomInput id={`inp-price`} {...inputBankName} />
                  </Wrapper>

                  <CustomLabel for={`inp-price`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    {t(`16`)}
                  </CustomLabel>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <CustomInput id={`inp-price`} {...inputBankNo} />
                  </Wrapper>

                  <CustomLabel for={`inp-price`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    {t(`72`)}
                  </CustomLabel>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <CustomInput id={`inp-price`} {...inputPayeeAccount} />
                  </Wrapper>

                  <CustomLabel for={`inp-price`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    {t(`73`)}
                  </CustomLabel>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <CustomInput id={`inp-price`} {...inputPayeeName} />
                  </Wrapper>

                  <CustomLabel for={`inp-price`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    {t(`17`)}
                  </CustomLabel>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <CustomInput id={`inp-price`} {...inputBankAddress} />
                  </Wrapper>

                  <CustomLabel for={`inp-price`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    Swift Code
                  </CustomLabel>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <CustomInput id={`inp-price`} {...inputSwiftCode} />
                  </Wrapper>

                  {/* /////////////////////////////// */}
                  {/* 가상화폐 출금 신청파트 */}
                  {/* /////////////////////////////// */}

                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    margin={`30px 0 20px`}
                    fontSize={`18px`}
                    fontWeight={`700`}
                  >
                    <Wrapper
                      width={`auto`}
                      margin={`0 10px 0 0`}
                      padding={`5px 10px`}
                      fontSize={`14px`}
                      fontWeight={`700`}
                      bgColor={`#aa28c9`}
                      color={`#fff`}
                    >
                      Select 02
                    </Wrapper>
                    {t(`71`)}
                  </Wrapper>

                  <CustomLabel for={`inp-priceType`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    {t(`31`)}
                  </CustomLabel>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <Combo
                      isBorder={true}
                      itemAlign={`flex-start`}
                      width={`250px`}
                      height={`40px`}
                      border={`1px solid #f3e4fa`}
                      shadow={`0 2px 8px rgb(0 0 0 / 9%)`}
                      hoverBorder={`1px solid #d7a6ed`}
                      hoverShadow={`0 3px 8px rgb(0 0 0 / 12%)`}
                      onClick={() => setComboPriceType(!comboPriceType)}
                    >
                      <ComboTitle>
                        <Wrapper>
                          {inputPriceType.value || `${t("35")}`}
                        </Wrapper>
                        <CaretDownOutlined />
                      </ComboTitle>

                      <ComboList isView={comboPriceType}>
                        <ComboListItem
                          isActive={!inputPriceType.value}
                          onClick={() => inputPriceType.setValue("")}
                        >
                          {t(`35`)}
                        </ComboListItem>

                        {priceTypeList.map((data, idx) => {
                          return (
                            <ComboListItem
                              key={idx}
                              isActive={inputPriceType.value === data}
                              onClick={() => inputPriceType.setValue(data)}
                            >
                              {data}
                            </ComboListItem>
                          );
                        })}
                      </ComboList>
                    </Combo>
                  </Wrapper>

                  <CustomLabel for={`inp-walletAddress`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    {t(`32`)}
                  </CustomLabel>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <CustomInput
                      id={`inp-walletAddress`}
                      {...inputWalletAddress}
                    />
                  </Wrapper>

                  <CustomLabel
                    for={`inp-walletAddress`}
                    margin={`40px 0 5px`}
                    fontSize={`0.9em`}
                  >
                    {t(`36`)}
                  </CustomLabel>
                  <Wrapper dr={`row`} ju={`flex-start`} fontSize={`0.9em`}>
                    {me && parseFloat(me.priceWallet).toFixed(2)} USD (USD)
                  </Wrapper>

                  <CustomLabel for={`inp-price`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    {t(`21`)}
                  </CustomLabel>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <CustomInput
                      id={`inp-price`}
                      margin={`10px 10px 10px 0`}
                      {...inputPrice}
                    />

                    <Wrapper width={`auto`} fontSize={`0.8em`}>
                      {t(`37`)} 20.00
                    </Wrapper>
                  </Wrapper>

                  {isSendEmail && !isConfirmEmail && (
                    <Wrapper al={`flex-start`}>
                      <CustomLabel for={`inp-secret`} margin={`40px 0 15px`}>
                        <Wrapper className={`required`}>*</Wrapper>
                        {t(`22`)}
                      </CustomLabel>

                      <Wrapper dr={`row`} ju={`flex-start`}>
                        <CustomInput
                          id={`inp-secret`}
                          maxLength={`6`}
                          {...inputSecret}
                        />

                        <CommonButton
                          kindOf={`black`}
                          height={`38px`}
                          margin={`0 0 0 10px`}
                          onClick={confirmSecretHandler}
                        >
                          {t(`23`)}
                        </CommonButton>
                      </Wrapper>
                    </Wrapper>
                  )}

                  {isSendOtp && !isConfirmOtp && (
                    <Wrapper al={`flex-start`}>
                      <CustomLabel for={`inp-secret`} margin={`40px 0 15px`}>
                        <Wrapper className={`required`}>*</Wrapper>
                        {t(`39`)}
                      </CustomLabel>

                      <Wrapper dr={`row`} ju={`flex-start`}>
                        <CustomInput
                          id={`inp-secret`}
                          maxLength={`6`}
                          {...inputOtpSecret}
                        />

                        <CommonButton
                          kindOf={`black`}
                          height={`38px`}
                          margin={`0 0 0 10px`}
                          onClick={confirmOtpHandler}
                        >
                          {t(`40`)}
                        </CommonButton>

                        <CommonButton
                          kindOf={`black`}
                          height={`38px`}
                          margin={`0 0 0 10px`}
                          onClick={resendOtpHandler}
                        >
                          {t(`41`)}
                        </CommonButton>
                      </Wrapper>
                    </Wrapper>
                  )}

                  {isReSendOtp && !isConfirmOtp && otpData && (
                    <Wrapper
                      al={`flex-start`}
                      margin={`10px 0 0`}
                      border={`1px solid #b6b6b6`}
                      width={`auto`}
                    >
                      <Image src={otpData.imageData} width={`100px`} />
                    </Wrapper>
                  )}
                </Wrapper>
              )}
              {currentStep === 1 && (
                <Wrapper al={`flex-start`}>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    margin={`0 0 20px`}
                    fontSize={`18px`}
                    fontWeight={`700`}
                  >
                    <Wrapper
                      width={`auto`}
                      margin={`0 10px 0 0`}
                      padding={`5px 10px`}
                      fontSize={`14px`}
                      fontWeight={`700`}
                      bgColor={`#aa28c9`}
                      color={`#fff`}
                    >
                      Step 02
                    </Wrapper>
                    {t(`24`)}
                  </Wrapper>
                  <Wrapper margin={`80px 0 0`}>
                    <Result
                      status="success"
                      title={
                        <Wrapper
                          fontSize={`25px`}
                          width={`auto`}
                          borderBottom={`1px solid #c9c9c9`}
                        >
                          {t(`25`)}
                        </Wrapper>
                      }
                      subTitle={
                        <Wrapper
                          margin={`10px 0 0`}
                          padding={`0 15px`}
                          width={`auto`}
                          lineHeight={`1.8`}
                        >
                          {t(`26`)}
                        </Wrapper>
                      }
                      extra={[
                        <Wrapper dr={`row`}>
                          <CommonButton
                            key="1"
                            kindOf={`white`}
                            width={`180px`}
                            height={`40px`}
                            margin={`0 5px`}
                            onClick={initValueHandler}
                          >
                            {t(`27`)}
                          </CommonButton>

                          <CommonButton
                            key="1"
                            kindOf={`blue`}
                            width={`180px`}
                            height={`40px`}
                            margin={`0 5px`}
                            onClick={() => moveLinkHandler(`/user`)}
                          >
                            {t(`28`)}
                          </CommonButton>
                        </Wrapper>,
                      ]}
                    />
                  </Wrapper>
                </Wrapper>
              )}
            </Wrapper>
          )}
        </Wrapper>

        {currentTab === 0 && currentStep === 0 && (
          <Wrapper
            dr={`row`}
            ju={`flex-start`}
            margin={`50px 0 0`}
            padding={`20px 0 0`}
            borderTop={`1px solid #ebebeb`}
          >
            <CommonButton
              kindOf={`white`}
              margin={`0 10px 0 0`}
              onClick={() => moveLinkHandler("/user")}
            >
              {t(`29`)}
            </CommonButton>

            <CommonButton kindOf={`red`} onClick={createWithdrawHanlder}>
              {t(`30`)}
            </CommonButton>
          </Wrapper>
        )}
      </Wrapper>
    </UserLayout>
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

export default Withdraw;
