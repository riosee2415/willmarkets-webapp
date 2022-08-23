import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import styled from "styled-components";
import { Result, message } from "antd";
import useInput from "../../hooks/useInput";
import useOnlyNumberInput from "../../hooks/useOnlyNumberInput";
import { emptyCheck } from "../../components/commonUtils";
import { CaretDownOutlined } from "@ant-design/icons";
import { END } from "redux-saga";
import { useRouter } from "next/router";
import axios from "axios";
import {
  LOAD_MY_INFO_REQUEST,
  USER_FIND_PASSWORD_REQUEST,
  USER_FIND_PASSWORD_CONFIRM_REQUEST,
  USER_UPDATE_OTP_REQUEST,
  USER_VERIFY_OTP_REQUEST,
} from "../../reducers/user";
import wrapper from "../../store/configureStore";
import {
  Wrapper,
  SelectBox,
  Label,
  TextInput,
  FileInput,
  Text,
  Combo,
  ComboTitle,
  ComboList,
  ComboListItem,
  CommonButton,
  TabWrapper,
  Tab,
  Image,
} from "../../components/commonComponents";
import UserLayout from "../../components/user/UserLayout";
import Theme from "../../components/Theme";
import {
  DEPOSIT_CREATE_REQUEST,
  DEPOSIT_IMAGE_FILE_REQUEST,
  DEPOSIT_IMAGE_FILE_CREATE_REQUEST,
} from "../../reducers/deposit";
import { INIT_STATE_REQUEST } from "../../reducers/user";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import useWidth from "../../hooks/useWidth";

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

const Deposit = () => {
  ////// VARIABLES //////
  const bankList = [
    {
      bankName: "Quaint Oak Bank",
      bankNo: "9867238934",
      bankAddress: "501 knowles Ave Southampton, PA18966",
      swiftCode: "FFC 20220216002761/WILL MARKETS LTD",
    },
  ];

  const priceTypeList = {
    BTC: [
      "BTC",
      "13242R3baBtwpMbo3PnW14q3pQphMLFqsY",
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/user/qr_btc.png",
      "Omni-Chain",
    ],

    ETH: [
      "ETH",
      "0xb4b96fa365c7440d14e0a26126ff20f6eade4805",
      "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/user/qr_eth.png",
      "ERC-20",
    ],
  };

  ////// HOOKS //////
  const fileRef = useRef();

  const router = useRouter();

  const width = useWidth();

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation(["user_deposit"]);

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
  } = useSelector((state) => state.user);

  const {
    filePath,
    fileOriginName,
    st_depositCreateDone,
    st_depositCreateError,
    st_depositImageFileLoading,
    st_depositImageFileDone,
    st_depositImageFileError,
    st_depositImageFileCreateDone,
    st_depositImageFileCreateError,
  } = useSelector((state) => state.deposit);

  const [currentTab, setCurrentTab] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const [currentBank, setCurrentBank] = useState(null);

  const [comboSelectBank, setComboSelectBank] = useState(false);
  const [comboPriceType, setComboPriceType] = useState(false);

  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isConfirmEmail, setIsConfirmEmail] = useState(false);

  const [isSendOtp, setIsSendOtp] = useState(false);
  const [isReSendOtp, setIsReSendOtp] = useState(false);
  const [isConfirmOtp, setIsConfirmOtp] = useState(false);

  const inputSelectBank = useInput("");
  const inputPrice = useOnlyNumberInput("");
  const inputFilePath = useInput("");
  const inputFileOriginName = useInput("");
  const inputSecret = useInput("");
  const inputOtpSecret = useInput("");

  const inputPriceType = useInput("");
  const inputWalletAddress = useInput("");
  const inputHashAddress = useInput("");

  ////// TOGGLE //////

  ////// HANDLER //////
  const moveLinkHandler = useCallback(
    (link) => {
      router.push(link);
    },
    [me]
  );

  const moveBackHandler = useCallback(() => {
    setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const selectBankHandler = useCallback((data) => {
    setCurrentBank(data);
    setCurrentStep(1);
  }, []);

  const initValueHandler = useCallback(() => {
    setCurrentStep(0);

    setCurrentBank(null);

    setComboSelectBank(false);

    setIsSendEmail(false);
    setIsConfirmEmail(false);

    inputPrice.setValue("");
    inputSelectBank.setValue("");
    inputFilePath.setValue("");
    inputFileOriginName.setValue("");
    inputSecret.setValue("");

    inputPriceType.setValue("");
    inputWalletAddress.setValue("");
    inputHashAddress.setValue("");
  }, []);

  const createDepositHanlder = useCallback(() => {
    if (!currentBank) {
      setCurrentStep(0);
      return message.error(t(`1`));
    }

    if (!emptyCheck(inputSelectBank.value)) {
      return message.error(t(`2`));
    }

    if (!emptyCheck(inputPrice.value)) {
      return message.error(t(`3`));
    }

    if (!emptyCheck(inputPriceType.value)) {
      return message.error(t(`44`));
    }

    if (!emptyCheck(inputFilePath.value)) {
      return message.error(t(`45`));
    }

    if (!emptyCheck(inputWalletAddress.value)) {
      return message.error(t(`46`));
    }

    if (!emptyCheck(inputHashAddress.value)) {
      return message.error(t(`47`));
    }

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
        return message.error(t(`4`));
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

    if (!isSendOtp) {
      setIsSendOtp(true);

      message.success(t(`65`));

      if (!me.otpSecret) {
        dispatch({
          type: USER_UPDATE_OTP_REQUEST,
          data: {
            language: i18next.language,
            id: me.id,
          },
        });
      }
      return;
    }

    if (isSendOtp && !isConfirmOtp) {
      if (!emptyCheck(inputOtpSecret.value)) {
        return message.error(t(`61`));
      }

      return message.error(t(`64`));
    }

    dispatch({
      type: DEPOSIT_CREATE_REQUEST,
      data: {
        language: i18next.language,
        userId: me.id,
        bankName: currentBank.bankName,
        bankNo: currentBank.bankNo,
        swiftCode: currentBank.swiftCode,
        willAddress: currentBank.willAddress,
        bankAddress: currentBank.bankAddress,
        selectBank: inputSelectBank.value,
        price: inputPrice.value,
        priceType: inputPriceType.value,
        filePath: inputFilePath.value,
        fileOriginName: inputFileOriginName.value,
        walletAddress: inputWalletAddress.value,
        hashAddress: inputHashAddress.value,
      },
    });
  }, [
    currentBank,
    inputPrice.value,
    inputSelectBank.value,
    inputSecret.value,
    inputOtpSecret.value,
    inputPriceType.value,
    inputFilePath.value,
    inputFileOriginName.value,
    inputWalletAddress.value,
    inputHashAddress.value,
    isSendEmail,
    isConfirmEmail,
    isSendOtp,
    isConfirmOtp,
  ]);

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
      return message.error(t(`61`));
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

  const fileChangeHandler = useCallback((e) => {
    const file = e.target.files[0];

    if (!file) return;
    const ext = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase();
    if (
      !(
        ext === "jpg" ||
        ext === "jpeg" ||
        ext === "png" ||
        ext === "gif" ||
        ext === "pdf"
      )
    ) {
      message.error(t(`5`));
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    formData.append("language", i18next.language);

    dispatch({
      type: DEPOSIT_IMAGE_FILE_REQUEST,
      data: formData,
    });
  }, []);

  const createImageFileHandler = useCallback(() => {
    setCurrentStep(1);
    if (!emptyCheck(inputFilePath.value)) {
      return message.error(t(`6`));
    }

    if (st_depositImageFileLoading) {
      return message.error(t(`7`));
    }
    dispatch({
      type: DEPOSIT_IMAGE_FILE_CREATE_REQUEST,
      data: {
        userId: me.id,
        filePath: inputFilePath.value,
        fileOriginName: inputFileOriginName.value,
      },
    });
  }, [inputFilePath, inputFileOriginName]);

  ////// USEEFFECT //////
  useEffect(() => {
    if (!me) {
      message.error(t(`8`));
      router.push("/login");
    } else if (me.userType === `1`) {
      router.push("/user?access=false");
    }
  }, [me]);

  useEffect(() => {
    initValueHandler();
  }, [currentTab]);

  useEffect(() => {
    if (st_userFindPasswordDone) {
      setIsSendEmail(true);
      message.success(t(`9`));
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
        createDepositHanlder();
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
    if (st_depositCreateDone) {
      setCurrentStep(1);
      dispatch({
        type: INIT_STATE_REQUEST,
      });
      dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
    }
  }, [st_depositCreateDone]);

  useEffect(() => {
    if (st_depositCreateError) {
      message.error(st_depositCreateError);
    }
  }, [st_depositCreateError]);

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
        message.success(t(`63`));
      } else {
        setIsConfirmOtp(false);
        message.error(t(`62`));
      }
    }
  }, [st_userVerifyOtpDone]);

  useEffect(() => {
    if (st_userVerifyOtpError) {
      setIsConfirmOtp(false);
      message.error(t(`62`));
    }
  }, [st_userVerifyOtpError]);

  useEffect(() => {
    if (st_depositImageFileDone) {
      inputFilePath.setValue(filePath);
      inputFileOriginName.setValue(fileOriginName);
    }
  }, [st_depositImageFileDone]);

  useEffect(() => {
    if (st_depositImageFileError) {
      message.error(st_depositImageFileError);
    }
  }, [st_depositImageFileError]);

  useEffect(() => {
    if (st_depositImageFileCreateDone) {
      setCurrentStep(1);
    }
  }, [st_depositImageFileCreateDone]);

  useEffect(() => {
    if (st_depositImageFileCreateError) {
      message.error(st_depositImageFileCreateError);
    }
  }, [st_depositImageFileCreateError]);

  return (
    <UserLayout>
      <TabWrapper
        position={`absolute`}
        top={width < 900 ? `0` : `-21px`}
        left={`20px`}
      >
        <Tab isActive={currentTab === 0} onClick={() => setCurrentTab(0)}>
          {t(`10`)}
        </Tab>
        {/* <Tab isActive={currentTab === 1} onClick={() => setCurrentTab(1)}>
          {t(`11`)}
        </Tab> */}
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
            {t(`12`)}
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
                      Step 01
                    </Wrapper>
                    {t(`13`)}
                  </Wrapper>

                  <Wrapper dr={`row`} al={`flex-start`} ju={`flex-start`}>
                    {bankList.map((data, idx) => {
                      return (
                        <SelectBox
                          key={idx}
                          al={`normal`}
                          ju={`flex-start`}
                          margin={`0 40px 40px 0`}
                          padding={`20px`}
                          width={`300px`}
                          height={`335px`}
                          radius={`8px`}
                          onClick={() => selectBankHandler(data)}
                        >
                          <Wrapper
                            dr={`row`}
                            al={`normal`}
                            ju={`flex-start`}
                            padding={`0 0 5px`}
                            margin={`0 0 10px`}
                            borderBottom={`1px solid #f3f3f3`}
                          >
                            <Wrapper
                              al={`flex-start`}
                              ju={`flex-start`}
                              fontSize={`15px`}
                              fontWeight={`700`}
                              color={`#a8559e`}
                            >
                              {t(`14`)}
                            </Wrapper>

                            <Wrapper al={`flex-start`} fontSize={`14px`}>
                              <Text isEllipsis={true} width={`100%`}>
                                {data.bankName}
                              </Text>
                            </Wrapper>
                          </Wrapper>

                          <Wrapper
                            dr={`row`}
                            al={`normal`}
                            ju={`flex-start`}
                            padding={`0 0 5px`}
                            margin={`0 0 10px`}
                            borderBottom={`1px solid #f3f3f3`}
                          >
                            <Wrapper
                              al={`flex-start`}
                              ju={`flex-start`}
                              fontSize={`15px`}
                              fontWeight={`700`}
                              color={`#a8559e`}
                            >
                              {t(`15`)}
                            </Wrapper>

                            <Wrapper al={`flex-start`} fontSize={`14px`}>
                              <Text isEllipsis={true} width={`100%`}>
                                {data.bankNo}
                              </Text>
                            </Wrapper>
                          </Wrapper>

                          <Wrapper
                            dr={`row`}
                            al={`normal`}
                            ju={`flex-start`}
                            padding={`0 0 5px`}
                            margin={`0 0 10px`}
                            borderBottom={`1px solid #f3f3f3`}
                          >
                            <Wrapper
                              al={`flex-start`}
                              ju={`flex-start`}
                              fontSize={`15px`}
                              fontWeight={`700`}
                              color={`#a8559e`}
                            >
                              Swift Code
                            </Wrapper>

                            <Wrapper al={`flex-start`} fontSize={`14px`}>
                              <Text isEllipsis={true} width={`100%`}>
                                {data.swiftCode}
                              </Text>
                            </Wrapper>
                          </Wrapper>

                          <Wrapper dr={`row`} al={`normal`} ju={`flex-start`}>
                            <Wrapper
                              al={`flex-start`}
                              ju={`flex-start`}
                              fontSize={`15px`}
                              fontWeight={`700`}
                              color={`#a8559e`}
                            >
                              {t(`17`)}
                            </Wrapper>

                            <Wrapper
                              al={`flex-start`}
                              width={`calc(100% - 90px)`}
                              fontSize={`14px`}
                            >
                              <Text isEllipsis={true} width={`100%`}>
                                {data.bankAddress}
                              </Text>
                            </Wrapper>
                          </Wrapper>
                        </SelectBox>
                      );
                    })}
                  </Wrapper>
                </Wrapper>
              )}

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
                      Step 01
                    </Wrapper>
                    {t(`18`)}
                  </Wrapper>

                  <CustomLabel margin={`20px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    {t(`20`)}
                  </CustomLabel>

                  <Wrapper zIndex={`3`} dr={`row`} ju={`flex-start`}>
                    <Combo
                      isBorder={true}
                      itemAlign={`flex-start`}
                      width={width < 900 ? `170px` : `250px`}
                      height={`40px`}
                      border={`1px solid #f3e4fa`}
                      shadow={`0 2px 8px rgb(0 0 0 / 9%)`}
                      hoverBorder={`1px solid #d7a6ed`}
                      hoverShadow={`0 3px 8px rgb(0 0 0 / 12%)`}
                      onClick={() => setComboSelectBank(!comboSelectBank)}
                    >
                      <ComboTitle>
                        <Wrapper>
                          {inputSelectBank.value || `${t("21")}`}
                        </Wrapper>
                        <CaretDownOutlined />
                      </ComboTitle>

                      <ComboList isView={comboSelectBank}>
                        <ComboListItem
                          isActive={!inputSelectBank.value}
                          onClick={() => inputSelectBank.setValue("")}
                        >
                          {t(`21`)}
                        </ComboListItem>

                        <ComboListItem
                          onClick={() => inputSelectBank.setValue(t(`22`))}
                        >
                          {t(`22`)}
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

                  <CustomLabel margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    {t(`48`)}
                  </CustomLabel>

                  <Wrapper zIndex={`2`} dr={`row`} ju={`flex-start`}>
                    <Combo
                      isBorder={true}
                      itemAlign={`flex-start`}
                      width={width < 900 ? `170px` : `250px`}
                      height={`40px`}
                      border={`1px solid #f3e4fa`}
                      shadow={`0 2px 8px rgb(0 0 0 / 9%)`}
                      hoverBorder={`1px solid #d7a6ed`}
                      hoverShadow={`0 3px 8px rgb(0 0 0 / 12%)`}
                      onClick={() => setComboPriceType(!comboPriceType)}
                    >
                      <ComboTitle>
                        <Wrapper>
                          {inputPriceType.value || `${t("49")}`}
                        </Wrapper>
                        <CaretDownOutlined />
                      </ComboTitle>

                      <ComboList isView={comboPriceType}>
                        <ComboListItem
                          isActive={!inputPriceType.value}
                          onClick={() => inputPriceType.setValue("")}
                        >
                          {t(`49`)}
                        </ComboListItem>

                        {Object.keys(priceTypeList).map((data, idx) => {
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

                  {/* <CustomLabel for={`inp-price`} margin={`20px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    {t(`19`)}
                  </CustomLabel> */}
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    {currentBank && (
                      <SelectBox
                        al={`normal`}
                        ju={`flex-start`}
                        padding={`20px`}
                        width={`300px`}
                        height={`335px`}
                        radius={`8px`}
                      >
                        <Wrapper
                          dr={`row`}
                          al={`normal`}
                          ju={`flex-start`}
                          padding={`0 0 5px`}
                          margin={`0 0 10px`}
                          borderBottom={`1px solid #f3f3f3`}
                        >
                          <Wrapper
                            al={`flex-start`}
                            ju={`flex-start`}
                            fontSize={`15px`}
                            fontWeight={`700`}
                            color={`#a8559e`}
                          >
                            {t(`14`)}
                          </Wrapper>

                          <Wrapper al={`flex-start`} fontSize={`14px`}>
                            <Text isEllipsis={true} width={`100%`}>
                              {currentBank.bankName}
                            </Text>
                          </Wrapper>
                        </Wrapper>

                        <Wrapper
                          dr={`row`}
                          al={`normal`}
                          ju={`flex-start`}
                          padding={`0 0 5px`}
                          margin={`0 0 10px`}
                          borderBottom={`1px solid #f3f3f3`}
                        >
                          <Wrapper
                            al={`flex-start`}
                            ju={`flex-start`}
                            fontSize={`15px`}
                            fontWeight={`700`}
                            color={`#a8559e`}
                          >
                            {t(`15`)}
                          </Wrapper>

                          <Wrapper al={`flex-start`} fontSize={`14px`}>
                            <Text isEllipsis={true} width={`100%`}>
                              {currentBank.bankNo}
                            </Text>
                          </Wrapper>
                        </Wrapper>

                        <Wrapper
                          dr={`row`}
                          al={`normal`}
                          ju={`flex-start`}
                          padding={`0 0 5px`}
                          margin={`0 0 10px`}
                          borderBottom={`1px solid #f3f3f3`}
                        >
                          <Wrapper
                            al={`flex-start`}
                            ju={`flex-start`}
                            fontSize={`15px`}
                            fontWeight={`700`}
                            color={`#a8559e`}
                          >
                            Swift Code
                          </Wrapper>

                          <Wrapper al={`flex-start`} fontSize={`14px`}>
                            <Text isEllipsis={true} width={`100%`}>
                              {currentBank.swiftCode}
                            </Text>
                          </Wrapper>
                        </Wrapper>

                        <Wrapper
                          dr={`row`}
                          al={`normal`}
                          ju={`flex-start`}
                          padding={`0 0 5px`}
                          margin={`0 0 10px`}
                          borderBottom={`1px solid #f3f3f3`}
                        >
                          <Wrapper
                            al={`flex-start`}
                            ju={`flex-start`}
                            fontSize={`15px`}
                            fontWeight={`700`}
                            color={`#a8559e`}
                          >
                            {t(`16`)}
                          </Wrapper>

                          <Wrapper al={`flex-start`} fontSize={`14px`}>
                            <Text isEllipsis={true} width={`100%`}>
                              {currentBank.willAddress}
                            </Text>
                          </Wrapper>
                        </Wrapper>

                        <Wrapper dr={`row`} al={`normal`} ju={`flex-start`}>
                          <Wrapper
                            al={`flex-start`}
                            ju={`flex-start`}
                            fontSize={`15px`}
                            fontWeight={`700`}
                            color={`#a8559e`}
                          >
                            {t(`17`)}
                          </Wrapper>

                          <Wrapper al={`flex-start`} fontSize={`14px`}>
                            <Text isEllipsis={true} width={`100%`}>
                              {currentBank.bankAddress}
                            </Text>
                          </Wrapper>
                        </Wrapper>
                      </SelectBox>
                    )}
                  </Wrapper>
                  <CustomLabel margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    {t(`20`)}
                  </CustomLabel>

                  {inputPriceType.value && (
                    <Wrapper al={`flex-start`} width={`auto`}>
                      <CustomLabel for={`inp-price`} margin={`40px 0 15px`}>
                        <Wrapper className={`required`}>*</Wrapper>
                        {t(`50`)}
                      </CustomLabel>

                      <SelectBox
                        al={`normal`}
                        ju={`flex-start`}
                        wrap={`nowrap`}
                        padding={`20px`}
                        width={width < 900 ? `290px` : `300px`}
                        radius={`8px`}
                      >
                        <Wrapper
                          dr={`row`}
                          al={`normal`}
                          ju={`flex-start`}
                          padding={`0 0 5px`}
                          margin={`0 0 10px`}
                          borderBottom={`1px solid #f3f3f3`}
                        >
                          <Wrapper
                            al={`flex-start`}
                            ju={`flex-start`}
                            fontSize={`15px`}
                            fontWeight={`700`}
                            color={`#a8559e`}
                          >
                            {t(`51`)}
                          </Wrapper>

                          <Wrapper
                            al={`flex-start`}
                            fontSize={`14px`}
                            wordBreak={`break-all`}
                          >
                            {priceTypeList[inputPriceType.value][0]}
                          </Wrapper>
                        </Wrapper>

                        <Wrapper
                          dr={`row`}
                          al={`normal`}
                          ju={`flex-start`}
                          padding={`0 0 5px`}
                          margin={`0 0 10px`}
                          borderBottom={`1px solid #f3f3f3`}
                        >
                          <Wrapper
                            al={`flex-start`}
                            ju={`flex-start`}
                            fontSize={`15px`}
                            fontWeight={`700`}
                            color={`#a8559e`}
                          >
                            {t(`52`)}
                          </Wrapper>

                          <Wrapper
                            al={`flex-start`}
                            fontSize={`14px`}
                            wordBreak={`break-all`}
                          >
                            {priceTypeList[inputPriceType.value][1]}
                          </Wrapper>
                        </Wrapper>

                        <Wrapper
                          dr={`row`}
                          al={`normal`}
                          ju={`flex-start`}
                          padding={`0 0 5px`}
                          margin={`0 0 10px`}
                          borderBottom={`1px solid #f3f3f3`}
                        >
                          <Wrapper
                            al={`flex-start`}
                            ju={`flex-start`}
                            fontSize={`15px`}
                            fontWeight={`700`}
                            color={`#a8559e`}
                          >
                            {t(`53`)}
                          </Wrapper>

                          <Wrapper al={`flex-start`} margin={`5px 0 0`}>
                            <Image
                              width={`90px`}
                              src={priceTypeList[inputPriceType.value][2]}
                            />
                          </Wrapper>
                        </Wrapper>

                        <Wrapper
                          dr={`row`}
                          al={`normal`}
                          ju={`flex-start`}
                          padding={`0 0 5px`}
                          margin={`0 0 10px`}
                          borderBottom={`1px solid #f3f3f3`}
                        >
                          <Wrapper
                            al={`flex-start`}
                            ju={`flex-start`}
                            fontSize={`15px`}
                            fontWeight={`700`}
                            color={`#a8559e`}
                          >
                            {t(`54`)}
                          </Wrapper>

                          <Wrapper
                            al={`flex-start`}
                            fontSize={`14px`}
                            wordBreak={`break-all`}
                          >
                            {priceTypeList[inputPriceType.value][3]}
                          </Wrapper>
                        </Wrapper>
                      </SelectBox>
                    </Wrapper>
                  )}

                  {/* <CustomLabel for={`inp-price`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    {t(`23`)}
                  </CustomLabel>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <CustomInput id={`inp-price`} {...inputPrice} />
                  </Wrapper>

                  <CustomLabel for={`inp-file`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    {t(`55`)}
                  </CustomLabel> */}

                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <FileInput
                      type={`file`}
                      ref={fileRef}
                      onChange={fileChangeHandler}
                    />

                    <CustomInput
                      id={`inp-file`}
                      width={width < 900 ? `170px` : `250px`}
                      value={inputFileOriginName.value}
                      readOnly
                    />

                    <CommonButton
                      kindOf={`black`}
                      height={`38px`}
                      margin={`0 0 0 10px`}
                      onClick={() => fileRef.current.click()}
                    >
                      {t(`33`)}
                    </CommonButton>
                  </Wrapper>

                  <CustomLabel for={`inp-walletAddress`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    {t(`56`)}
                  </CustomLabel>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <CustomInput
                      id={`inp-walletAddress`}
                      width={width < 900 ? `170px` : `250px`}
                      {...inputWalletAddress}
                    />
                  </Wrapper>

                  <CustomLabel for={`inp-hashAddress`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    {t(`57`)}
                  </CustomLabel>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <CustomInput
                      id={`inp-hashAddress`}
                      width={width < 900 ? `170px` : `250px`}
                      {...inputHashAddress}
                    />
                  </Wrapper>

                  {isSendEmail && !isConfirmEmail && (
                    <Wrapper al={`flex-start`}>
                      <CustomLabel for={`inp-secret`} margin={`40px 0 15px`}>
                        <Wrapper className={`required`}>*</Wrapper>
                        {t(`24`)}
                      </CustomLabel>

                      <Wrapper dr={`row`} ju={`flex-start`}>
                        <CustomInput
                          id={`inp-secret`}
                          width={width < 900 ? `170px` : `250px`}
                          maxLength={`6`}
                          {...inputSecret}
                        />
                      </Wrapper>
                    </Wrapper>
                  )}

                  {isSendOtp && !isConfirmOtp && (
                    <Wrapper al={`flex-start`}>
                      <CustomLabel for={`inp-secret`} margin={`40px 0 15px`}>
                        <Wrapper className={`required`}>*</Wrapper>
                        {t(`58`)}
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
                          {t(`59`)}
                        </CommonButton>

                        <CommonButton
                          kindOf={`black`}
                          height={`38px`}
                          margin={`0 0 0 10px`}
                          onClick={resendOtpHandler}
                        >
                          {t(`60`)}
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
                    {t(`25`)}
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
                          {t(`26`)}
                        </Wrapper>
                      }
                      subTitle={
                        <Wrapper
                          margin={`10px 0 0`}
                          padding={`0 15px`}
                          width={`auto`}
                          lineHeight={`1.8`}
                        >
                          {t(`27`)}
                          <br />
                          {t(`39`)}
                          {/* {t(`28`)} */}
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
                            {t(`29`)}
                          </CommonButton>

                          <CommonButton
                            key="1"
                            kindOf={`blue`}
                            width={`180px`}
                            height={`40px`}
                            margin={`0 5px`}
                            onClick={() => moveLinkHandler(`/user`)}
                          >
                            {t(`40`)}
                          </CommonButton>

                          <CommonButton
                            key="1"
                            kindOf={`blue`}
                            width={`180px`}
                            height={`40px`}
                            margin={`0 5px`}
                            padding={`10px`}
                            onClick={() => setCurrentTab(1)}
                          >
                            {t(`30`)}
                          </CommonButton>
                        </Wrapper>,
                      ]}
                    />
                  </Wrapper>
                </Wrapper>
              )}
            </Wrapper>
          )}

          {currentTab === 1 && (
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
                      Step 01
                    </Wrapper>
                    {t(`31`)}
                  </Wrapper>

                  <CustomLabel for={`inp-price`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    {t(`32`)}
                  </CustomLabel>

                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <FileInput
                      type={`file`}
                      ref={fileRef}
                      onChange={fileChangeHandler}
                    />

                    <CustomInput
                      id={`inp-price`}
                      width={`300px`}
                      value={inputFileOriginName.value}
                      readOnly
                    />

                    <CommonButton
                      kindOf={`black`}
                      height={`38px`}
                      margin={`0 0 0 10px`}
                      onClick={() => fileRef.current.click()}
                    >
                      {t(`33`)}
                    </CommonButton>
                  </Wrapper>

                  <Wrapper
                    al={`flex-start`}
                    margin={`10px 0 0`}
                    fontSize={`13px`}
                    color={`#e91448`}
                    lineHeight={`1.8`}
                  >
                    {t(`34`)}
                    <br /> {t(`35`)}
                  </Wrapper>
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
                    {t(`36`)}
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
                          {t(`37`)}
                        </Wrapper>
                      }
                      subTitle={
                        <Wrapper
                          margin={`10px 0 0`}
                          padding={`0 15px`}
                          width={`auto`}
                          lineHeight={`1.8`}
                        >
                          {t(`38`)}
                          <br />
                          {t(`39`)}
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
                            {t(`29`)}
                          </CommonButton>

                          <CommonButton
                            key="1"
                            kindOf={`blue`}
                            width={`180px`}
                            height={`40px`}
                            margin={`0 5px`}
                            padding={`10px`}
                            onClick={() => setCurrentTab(1)}
                          >
                            {t(`40`)}
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
              {t(`41`)}
            </CommonButton>
            <CommonButton kindOf={`red`} onClick={createDepositHanlder}>
              {t(`42`)}
            </CommonButton>
          </Wrapper>
        )}

        {currentTab === 1 && currentStep === 0 && (
          <Wrapper
            dr={`row`}
            ju={`flex-start`}
            margin={`50px 0 0`}
            padding={`20px 0 0`}
            borderTop={`1px solid #ebebeb`}
          >
            <CommonButton kindOf={`red`} onClick={createImageFileHandler}>
              {t(`43`)}
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
export default Deposit;
