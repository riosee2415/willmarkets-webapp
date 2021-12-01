import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { withRouter, useRouter } from "next/router";
import { message } from "antd";
import useInput from "../hooks/useInput";
import useOnlyNumberInput from "../hooks/useOnlyNumberInput";
import { emptyCheck } from "../components/commonUtils";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  LOAD_MY_INFO_REQUEST,
  USER_ID_IMAGE_FILE_REQUEST,
  USER_CHECK_EMAIL_REQUEST,
  USER_SECRET_EMAIL_REQUEST,
  USER_SIGNUP_REQUEST,
  INIT_STATE_REQUEST,
} from "../reducers/user";

import {
  SearchOutlined,
  CaretDownOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import {
  Wrapper,
  CommonButton,
  Label,
  TextInput,
  FileInput,
  RadioInput,
  Combo,
  ComboTitle,
  ComboList,
  ComboListItem,
  Image,
  RsWrapper,
} from "../components/commonComponents";
import ClientLayout from "../components/ClientLayout";
import Theme from "../components/Theme";
import PostCode from "../components/postCode/PostCode";
import useWidth from "../hooks/useWidth";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const TabWrapper = styled(Wrapper)`
  flex-direction: row;
  align-items: normal;
  justify-content: flex-start;
`;

const Tab = styled(Wrapper)`
  padding: 10px 0 8px;
  margin: 0 5px 0 0;
  width: 130px;
  border: 1px solid #e2e2e2;
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
    background: #E2E5FF !important;
    box-shadow: 0px 0px 10px ##E2E5FF;

  `}
`;

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

const Signup = () => {
  ////// VARIABLES //////
  const countryList = [
    {
      name: `Brazil`,
      value: `+55`,
    },
    {
      name: `Chile`,
      value: `+56`,
    },
    {
      name: `Denmark`,
      value: `+45`,
    },
    {
      name: `Ecuador`,
      value: `+593`,
    },
    {
      name: `France`,
      value: `+33`,
    },
    {
      name: `Guatemala`,
      value: `+502`,
    },
    {
      name: `Hong Kong`,
      value: `+852`,
    },
    {
      name: `Italy`,
      value: `+39`,
    },
    {
      name: `Ireland`,
      value: `+353`,
    },
    {
      name: `Japan`,
      value: `+81`,
    },
    {
      name: `Monaco`,
      value: `+377`,
    },
    {
      name: `Mexico`,
      value: `+52`,
    },
    {
      name: `Philippine`,
      value: `+63`,
    },
    {
      name: `Portugal`,
      value: `+351`,
    },
    {
      name: `Paraguay`,
      value: `+595`,
    },
    {
      name: `South Korea`,
      value: `+82`,
    },
    {
      name: `Switzerland`,
      value: `+41`,
    },
    {
      name: `Taiwan`,
      value: `+886`,
    },
    {
      name: `United Kingdom`,
      value: `+44`,
    },
    {
      name: `Vietnam`,
      value: `+84`,
    },
  ];

  const platformList = ["MetaTrader 4", "MetaTrader 5"];

  const typeList = [
    {
      type: "STP Account",
      leverage: ["100:1", "200:1", "500:1"],
    },
    {
      type: "ECN Account",
      leverage: ["100:1", "200:1", "500:1"],
    },
  ];

  ////// HOOKS //////
  const fileRef = useRef();
  const fileRef2 = useRef();

  const router = useRouter();

  const dispatch = useDispatch();

  const { t } = useTranslation(["signup"]);

  const width = useWidth();

  const {
    me,
    filePath,
    fileOriginName,
    secretCode,
    st_userIdImageFileLoading,
    st_userIdImageFileDone,
    st_userIdImageFileError,
    st_userSecretEmailDone,
    st_userSecretEmailError,
    st_userCheckEmailDone,
    st_userCheckEmailError,
    st_userSignupDone,
    st_userSignupError,
  } = useSelector((state) => state.user);

  const [currentTab, setCurrentTab] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const [comboCountryNo, setComboCountryNo] = useState(false);
  const [comboPlatform, setComboPlatform] = useState(false);
  const [comboType, setComboType] = useState(false);
  const [comboLeverage, setComboLeverage] = useState(false);
  const [comboIdType, setComboIdType] = useState(false);
  const [comboAddrType, setComboAddrType] = useState(false);

  const [fileType, setFileType] = useState(0);

  const [isSendEmail, setIsSendEmail] = useState(true);
  const [isConfirmEmail, setIsConfirmEmail] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const inputEmail = useInput("");
  const inputPassword = useInput("");
  const inputUserName = useInput("");
  const inputCountryNo = useInput("");
  const inputMobile = useOnlyNumberInput("");
  const inputGender = useInput("");
  const inputAddress = useInput("");
  const inputDetailAddress = useInput("");
  const inputZoneCode = useInput("");
  const inputIdType = useInput("");
  const inputIdDate1 = useInput("");
  const inputIdDate2 = useInput("");
  const inputIdFilePath = useInput("");
  const inputIdFileOriginName = useInput("");
  const inputAddrType = useInput("");
  const inputAddrFilePath = useInput("");
  const inputAddrFileOriginName = useInput("");
  const inputSecret = useInput("");
  const inputAgree = useInput(false);

  const inputPlatform = useInput("");
  const inputAccountType = useInput("");
  const inputLeverage = useInput("");

  ////// TOGGLE //////

  ////// HANDLER //////
  const moveBackHandler = useCallback(() => {
    setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const toggleAddressModalHandler = useCallback(() => {
    setIsModalVisible(!isModalVisible);
  }, [isModalVisible]);

  const onCompleteHandler = useCallback((data) => {
    inputZoneCode.setValue(data.zonecode);
    inputAddress.setValue(data.address);
    setIsModalVisible(false);
  }, []);

  const checkEmailHandler = useCallback(() => {
    if (!emptyCheck(inputEmail.value)) {
      return message.error(t(`1`));
    }

    dispatch({
      type: USER_CHECK_EMAIL_REQUEST,
      data: {
        language: i18next.language,
        email: inputEmail.value,
      },
    });
  }, [inputEmail]);

  const sendEmailHandler = useCallback(() => {
    if (!emptyCheck(inputEmail.value)) {
      return message.error(t(`1`));
    }

    dispatch({
      type: USER_SECRET_EMAIL_REQUEST,
      data: {
        language: i18next.language,
        email: inputEmail.value,
      },
    });
  }, [inputEmail]);

  const confirmSecretHandler = useCallback(() => {
    if (!emptyCheck(inputSecret.value)) {
      return message.error(t(`2`));
    }

    if (secretCode !== inputSecret.value) {
      setIsConfirmEmail(false);
      return message.error(t(`3`));
    } else {
      setIsConfirmEmail(true);
      message.success(t(`4`));
    }
  }, [inputSecret]);

  const fileChangeHandler = useCallback((e, type) => {
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

    formData.append("language", i18next.language);
    formData.append("image", file);

    setFileType(type);

    dispatch({
      type: USER_ID_IMAGE_FILE_REQUEST,
      data: formData,
    });
  }, []);

  const signupUserHandler = useCallback(() => {
    if (currentStep === 0) {
      if (!emptyCheck(inputEmail.value)) {
        return message.error(t(`1`));
      }

      if (!isConfirmEmail) {
        return message.error(t(`6`));
      }

      if (!emptyCheck(inputUserName.value)) {
        return message.error(t(`7`));
      }

      if (!emptyCheck(inputCountryNo.value)) {
        return message.error(t(`55`));
      }

      if (!emptyCheck(inputMobile.value)) {
        return message.error(t(`56`));
      }

      if (!emptyCheck(inputGender.value)) {
        return message.error(t(`8`));
      }

      if (!emptyCheck(inputAddress.value)) {
        return message.error(t(`9`));
      }

      setCurrentStep(1);
      return;
    }

    if (currentStep === 1) {
      if (!emptyCheck(inputPlatform.value)) {
        return message.error(t(`61`));
      }

      if (!emptyCheck(inputAccountType.value)) {
        return message.error(t(`62`));
      }

      if (!emptyCheck(inputLeverage.value)) {
        return message.error(t(`63`));
      }

      if (currentTab === 0) {
        setCurrentStep(2);
        return;
      }
    }

    if (currentTab === 0) {
      if (!emptyCheck(inputIdType.value)) {
        return message.error(t(`10`));
      }

      if (!emptyCheck(inputIdDate1.value)) {
        return message.error(t(`11`));
      }

      if (!emptyCheck(inputIdDate2.value)) {
        return message.error(t(`12`));
      }

      if (!emptyCheck(inputIdFilePath.value)) {
        return message.error(t(`13`));
      }

      if (!emptyCheck(inputAddrType.value)) {
        return message.error(t(`14`));
      }

      if (!emptyCheck(inputAddrFilePath.value)) {
        return message.error(t(`15`));
      }

      if (st_userIdImageFileLoading) {
        return message.error(t(`16`));
      }
    }

    dispatch({
      type: USER_SIGNUP_REQUEST,
      data: {
        language: i18next.language,
        type: currentTab === 0 ? `2` : `1`,
        email: inputEmail.value,
        password: inputPassword.value,
        username: inputUserName.value,
        countryNo: inputCountryNo.value,
        mobile: inputMobile.value,
        gender: inputGender.value,
        zoneCode: inputZoneCode.value,
        address: inputAddress.value,
        detailAddress: inputDetailAddress.value,
        idType: inputIdType.value,
        idDate1: inputIdDate1.value,
        idDate2: inputIdDate2.value,
        idFilePath: inputIdFilePath.value,
        idFileOriginName: inputIdFileOriginName.value,
        addrType: inputAddrType.value,
        addrFilePath: inputAddrFilePath.value,
        addrFileOriginName: inputAddrFileOriginName.value,
        platform: inputPlatform.value,
        accountType: inputAccountType.value,
        leverage: inputLeverage.value,
      },
    });

    window.scrollTo(0, 0);
  }, [
    currentTab,
    currentStep,
    isSendEmail,
    isConfirmEmail,
    inputEmail.value,
    inputPassword.value,
    inputUserName.value,
    inputCountryNo.value,
    inputMobile.value,
    inputGender.value,
    inputAddress.value,
    inputDetailAddress.value,
    inputZoneCode.value,
    inputIdType.value,
    inputIdDate1.value,
    inputIdDate2.value,
    inputIdFilePath.value,
    inputIdFileOriginName.value,
    inputAddrFileOriginName.value,
    inputAddrFilePath.value,
    inputAddrType.value,
    inputPlatform.value,
    inputAccountType.value,
    inputLeverage.value,
  ]);

  ////// USEEFFECT //////
  useEffect(() => {
    setCurrentStep(0);
    setFileType(0);
    setIsSendEmail(false);
    setIsConfirmEmail(false);

    inputEmail.setValue("");
    inputPassword.setValue("");
    inputUserName.setValue("");
    inputCountryNo.setValue("");
    inputMobile.setValue("");
    inputGender.setValue("");
    inputAddress.setValue("");
    inputDetailAddress.setValue("");
    inputZoneCode.setValue("");
    inputIdType.setValue("");
    inputIdDate1.setValue("");
    inputIdDate2.setValue("");
    inputIdFilePath.setValue("");
    inputIdFileOriginName.setValue("");
    inputAddrType.setValue("");
    inputAddrFilePath.setValue("");
    inputAddrFileOriginName.setValue("");
    inputSecret.setValue("");
    inputPlatform.setValue("");
    inputAccountType.setValue("");
    inputLeverage.setValue("");
  }, [currentTab]);

  useEffect(() => {
    if (st_userIdImageFileDone) {
      if (fileType === 1) {
        inputIdFilePath.setValue(filePath);
        inputIdFileOriginName.setValue(fileOriginName);
      } else if (fileType === 2) {
        inputAddrFilePath.setValue(filePath);
        inputAddrFileOriginName.setValue(fileOriginName);
      }
    }
  }, [st_userIdImageFileDone]);

  useEffect(() => {
    if (st_userIdImageFileError) {
      message.error(st_userIdImageFileError);
    }
  }, [st_userIdImageFileError]);

  useEffect(() => {
    if (st_userCheckEmailDone) {
      inputSecret.setValue("");
      sendEmailHandler();
    }
  }, [st_userCheckEmailDone]);

  useEffect(() => {
    if (st_userCheckEmailError) {
      setIsSendEmail(false);
      setIsConfirmEmail(false);
      message.error(st_userCheckEmailError);
    }
  }, [st_userCheckEmailError]);

  useEffect(() => {
    if (st_userSecretEmailDone) {
      setIsSendEmail(true);
      setIsConfirmEmail(false);
      message.success(t(`17`));
    }
  }, [st_userSecretEmailDone]);

  useEffect(() => {
    if (st_userSecretEmailError) {
      setIsSendEmail(false);
      setIsConfirmEmail(false);
      message.error(st_userSecretEmailError);
    }
  }, [st_userSecretEmailError]);

  useEffect(() => {
    if (st_userSignupDone) {
      router.push("/login");

      dispatch({
        type: INIT_STATE_REQUEST,
      });

      message.success(t(`18`));
      message.success(t(`19`));
    }
  }, [st_userSignupDone]);

  useEffect(() => {
    if (st_userSignupError) {
      message.error(st_userSignupError);
    }
  }, [st_userSignupError]);

  return (
    <ClientLayout>
      <Wrapper
        position={`absolute`}
        top={`0`}
        left={`0`}
        zIndex={`0`}
        minHeight={`100vh`}
      >
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
          minHeight={`100vh`}
        >
          <Wrapper
            margin={`75px 45px 0 0`}
            padding={`25px 20px`}
            width={width < 600 ? `100%` : `550px`}
            bgColor={`#fff`}
            shadow={`1px 1px 8px #dedede`}
          >
            <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 30px`}>
              <Image
                width={`50px`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/logo/logo_big.png`}
              />
              <Wrapper
                width={`auto`}
                margin={`0 0 0 10px`}
                fontSize={`20px`}
                fontWeight={`500`}
                color={`#242424`}
              >
                {t(`20`)}
              </Wrapper>
            </Wrapper>

            <TabWrapper>
              <Tab isActive={currentTab === 0} onClick={() => setCurrentTab(0)}>
                {t(`21`)}
              </Tab>

              <Tab isActive={currentTab === 1} onClick={() => setCurrentTab(1)}>
                {t(`22`)}
              </Tab>
            </TabWrapper>

            <Wrapper
              padding={`40px 20px 45px`}
              border={`1px solid #ececec`}
              shadow={`2px 2px 10px #ebebeb`}
            >
              {currentStep === 0 && (
                <Wrapper>
                  <Wrapper dr={`row`} al={`flex-start`}>
                    <Wrapper
                      dr={width < 600 ? `column` : `row`}
                      margin={`10px 0 0`}
                      al={`flex-start`}
                    >
                      <Wrapper al={`flex-start`} width={`100px`}>
                        <CustomLabel for={`inp-email`}>{t(`23`)}</CustomLabel>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        width={width < 600 ? `100%` : `calc(100% - 100px)`}
                      >
                        <Wrapper
                          dr={width < 600 ? `column` : `row`}
                          ju={`flex-start`}
                        >
                          <CustomInput
                            id={`inp-email`}
                            width={
                              width < 600
                                ? `100%`
                                : i18next.language === `en`
                                ? `calc(100% - 130px)`
                                : `calc(100% - 90px)`
                            }
                            {...inputEmail}
                            placeholder={t(`23`)}
                            readOnly={isConfirmEmail}
                            onChange={(e) => {
                              setIsSendEmail(false);
                              setIsConfirmEmail(false);
                              inputEmail.setValue(e.target.value);
                            }}
                          />
                          <CommonButton
                            width={
                              width < 600
                                ? `100%`
                                : i18next.language === `en`
                                ? `120px`
                                : `80px`
                            }
                            height={`38px`}
                            lineHeight={
                              i18next.language === `en` ? `1.2` : `34px`
                            }
                            margin={width < 600 ? `5px 0 0` : `0 0 0 10px`}
                            bgColor={`#030303`}
                            color={`#fff`}
                            fontWeight={`500`}
                            radius={`5px`}
                            onClick={checkEmailHandler}
                          >
                            {isConfirmEmail ? t(`24`) : t(`25`)}
                          </CommonButton>
                        </Wrapper>

                        {isSendEmail && !isConfirmEmail && (
                          <Wrapper
                            dr={width < 600 ? `column` : `row`}
                            ju={`flex-start`}
                            margin={`10px 0 0`}
                          >
                            <CustomInput
                              width={
                                width < 600
                                  ? `100%`
                                  : i18next.language === `en`
                                  ? `calc(100% - 130px)`
                                  : `calc(100% - 90px)`
                              }
                              {...inputSecret}
                              placeholder={t(`26`)}
                            />
                            <CommonButton
                              width={
                                width < 600
                                  ? `100%`
                                  : i18next.language === `en`
                                  ? `120px`
                                  : `80px`
                              }
                              height={`38px`}
                              lineHeight={`34px`}
                              margin={width < 600 ? `0` : `0 0 0 10px`}
                              bgColor={`#ebebeb`}
                              color={`#030303`}
                              fontWeight={`500`}
                              radius={`5px`}
                              onClick={confirmSecretHandler}
                            >
                              {t(`27`)}
                            </CommonButton>
                          </Wrapper>
                        )}
                      </Wrapper>
                    </Wrapper>

                    {/* password */}
                    <Wrapper
                      dr={width < 600 ? `column` : `row`}
                      margin={`10px 0 0`}
                      al={`flex-start`}
                    >
                      <Wrapper al={`flex-start`} width={`100px`}>
                        <CustomLabel for={`inp-password`}>
                          {t(`28`)}
                        </CustomLabel>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        width={width < 600 ? `100%` : `calc(100% - 100px)`}
                      >
                        <CustomInput
                          type={`password`}
                          id={`inp-password`}
                          width={
                            width < 600
                              ? `100%`
                              : i18next.language === `en`
                              ? `calc(100% - 130px)`
                              : `calc(100% - 90px)`
                          }
                          {...inputPassword}
                          placeholder={t(`28`)}
                        />
                      </Wrapper>
                    </Wrapper>

                    {/* name */}
                    <Wrapper
                      dr={width < 600 ? `column` : `row`}
                      margin={`10px 0 0`}
                      al={`flex-start`}
                    >
                      <Wrapper al={`flex-start`} width={`100px`}>
                        <CustomLabel for={`inp-userName`}>
                          {t(`29`)}
                        </CustomLabel>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        width={width < 600 ? `100%` : `calc(100% - 100px)`}
                      >
                        <CustomInput
                          id={`inp-userName`}
                          width={
                            width < 600
                              ? `100%`
                              : i18next.language === `en`
                              ? `calc(100% - 130px)`
                              : `calc(100% - 90px)`
                          }
                          {...inputUserName}
                          placeholder={t(`29`)}
                        />
                      </Wrapper>
                    </Wrapper>

                    {/* mobile */}
                    <Wrapper
                      dr={width < 600 ? `column` : `row`}
                      margin={`10px 0 0`}
                      al={`flex-start`}
                    >
                      <Wrapper al={`flex-start`} width={`100px`}>
                        <CustomLabel for={`inp-mobile`}>{t(`57`)}</CustomLabel>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        width={width < 600 ? `100%` : `calc(100% - 100px)`}
                      >
                        <Combo
                          isBorder={true}
                          itemAlign={`flex-start`}
                          margin={`0 10px 0 0`}
                          width={width < 600 ? `100%` : `100px`}
                          height={`40px`}
                          listHeight={`270px`}
                          border={`none`}
                          borderBottom={`1px solid #dfdfdf !important`}
                          onClick={() => setComboCountryNo(!comboCountryNo)}
                        >
                          <ComboTitle>
                            <Wrapper>
                              {inputCountryNo.value || `Select`}
                            </Wrapper>
                            <CaretDownOutlined />
                          </ComboTitle>

                          <ComboList
                            isView={comboCountryNo}
                            width={width < 600 ? `100%` : `180%`}
                          >
                            {countryList.map((data, idx) => {
                              return (
                                <ComboListItem
                                  key={idx}
                                  isActive={inputCountryNo.value === data.value}
                                  onClick={() =>
                                    inputCountryNo.setValue(data.value)
                                  }
                                >
                                  {data.name} ({data.value})
                                </ComboListItem>
                              );
                            })}
                          </ComboList>
                        </Combo>

                        <CustomInput
                          id={`inp-mobile`}
                          width={
                            width < 600 ? `100%` : `calc(100% - 90px - 110px)`
                          }
                          {...inputMobile}
                          placeholder={t(`57`)}
                          maxLength={`11`}
                        />
                      </Wrapper>
                    </Wrapper>

                    {/* gender */}
                    <Wrapper
                      dr={width < 600 ? `column` : `row`}
                      margin={`10px 0 0`}
                      al={`flex-start`}
                    >
                      <Wrapper al={`flex-start`} width={`100px`}>
                        <CustomLabel for={`inp-userName`}>
                          {t(`30`)}
                        </CustomLabel>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        width={width < 600 ? `100%` : `calc(100% - 100px)`}
                      >
                        <Wrapper dr={`row`} width={`auto`} margin={`0 10px`}>
                          <RadioInput
                            id={`inp-gender-1`}
                            color={`#313B91`}
                            value={t(`31`)}
                            checked={inputGender.value === t(`31`)}
                            onChange={(e) =>
                              inputGender.setValue(e.target.value)
                            }
                          />
                          <Label
                            for={`inp-gender-1`}
                            fontSize={`15px`}
                            cursor={`pointer`}
                          >
                            {t(`31`)}
                          </Label>
                        </Wrapper>

                        <Wrapper dr={`row`} width={`auto`} margin={`0 10px`}>
                          <RadioInput
                            id={`inp-gender-2`}
                            color={`#313B91`}
                            value={t(`32`)}
                            checked={inputGender.value === t(`32`)}
                            onChange={(e) =>
                              inputGender.setValue(e.target.value)
                            }
                          />
                          <Label
                            for={`inp-gender-2`}
                            fontSize={`15px`}
                            cursor={`pointer`}
                          >
                            {t(`32`)}
                          </Label>
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>

                    {/* address */}
                    <Wrapper
                      dr={width < 600 ? `column` : `row`}
                      margin={`10px 0 0`}
                      al={`flex-start`}
                    >
                      <Wrapper al={`flex-start`} width={`100px`}>
                        <CustomLabel for={`inp-address`}>{t(`33`)}</CustomLabel>
                      </Wrapper>

                      <Wrapper
                        position={`relative`}
                        dr={`row`}
                        ju={`flex-start`}
                        width={width < 600 ? `100%` : `calc(100% - 100px)`}
                        cursor={`pointer`}
                      >
                        <CustomInput
                          id={`inp-address`}
                          width={`100%`}
                          {...inputAddress}
                          placeholder={t(`33`)}
                        />

                        <Wrapper
                          position={`absolute`}
                          right={`15px`}
                          top={`50%`}
                          zIndex={`1`}
                          margin={`-10px 0 0`}
                          width={`auto`}
                        ></Wrapper>
                      </Wrapper>
                    </Wrapper>

                    {/* detailed adress */}
                    <Wrapper
                      dr={width < 600 ? `column` : `row`}
                      margin={`20px 0 0`}
                      al={`flex-start`}
                    >
                      <Wrapper al={`flex-start`} width={`100px`}>
                        <CustomLabel for={`inp-detailAddress`}>
                          {t(`34`)}
                        </CustomLabel>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        width={width < 600 ? `100%` : `calc(100% - 100px)`}
                        cursor={`pointer`}
                      >
                        <CustomInput
                          id={`inp-detailAddress`}
                          width={`100%`}
                          {...inputDetailAddress}
                          placeholder={t(`34`)}
                        />
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              )}

              {currentStep === 1 && (
                <Wrapper>
                  <Wrapper zIndex={`3`} dr={`row`} margin={`0 0 10px`}>
                    <Wrapper
                      al={`flex-start`}
                      width={i18next.language === `en` ? `160px` : `100px`}
                    >
                      <CustomLabel>{t(`58`)}</CustomLabel>
                    </Wrapper>

                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      width={
                        i18next.language === `en`
                          ? `calc(100% - 160px)`
                          : `calc(100% - 100px)`
                      }
                    >
                      <Combo
                        isBorder={true}
                        itemAlign={`flex-start`}
                        width={`100%`}
                        height={`40px`}
                        border={`none`}
                        borderBottom={`1px solid #dfdfdf !important`}
                        onClick={() => setComboPlatform(!comboPlatform)}
                      >
                        <ComboTitle>
                          <Wrapper>{inputPlatform.value || t(`64`)}</Wrapper>
                          <CaretDownOutlined />
                        </ComboTitle>

                        <ComboList isView={comboPlatform}>
                          <ComboListItem
                            isActive={!inputPlatform.value}
                            onClick={() => inputPlatform.setValue("")}
                          >
                            {t(`64`)}
                          </ComboListItem>

                          {platformList.map((data) => {
                            return (
                              <ComboListItem
                                isActive={inputPlatform.value === data}
                                onClick={() => inputPlatform.setValue(data)}
                              >
                                {data}
                              </ComboListItem>
                            );
                          })}
                        </ComboList>
                      </Combo>
                    </Wrapper>
                  </Wrapper>

                  <Wrapper zIndex={`2`} dr={`row`} margin={`0 0 10px`}>
                    <Wrapper
                      al={`flex-start`}
                      width={i18next.language === `en` ? `160px` : `100px`}
                    >
                      <CustomLabel>{t(`59`)}</CustomLabel>
                    </Wrapper>

                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      width={
                        i18next.language === `en`
                          ? `calc(100% - 160px)`
                          : `calc(100% - 100px)`
                      }
                    >
                      <Combo
                        isBorder={true}
                        itemAlign={`flex-start`}
                        width={`100%`}
                        height={`40px`}
                        border={`none`}
                        borderBottom={`1px solid #dfdfdf !important`}
                        onClick={() => setComboType(!comboType)}
                      >
                        <ComboTitle>
                          <Wrapper>{inputAccountType.value || t(`64`)}</Wrapper>
                          <CaretDownOutlined />
                        </ComboTitle>

                        <ComboList isView={comboType}>
                          <ComboListItem
                            isActive={!inputAccountType.value}
                            onClick={() => {
                              inputAccountType.setValue("");
                              inputLeverage.setValue("");
                            }}
                          >
                            {t(`64`)}
                          </ComboListItem>

                          {typeList.map((data) => {
                            return (
                              <ComboListItem
                                isActive={inputAccountType.value === data.type}
                                onClick={() => {
                                  inputAccountType.setValue(data.type);
                                  inputLeverage.setValue("");
                                }}
                              >
                                {data.type}
                              </ComboListItem>
                            );
                          })}
                        </ComboList>
                      </Combo>
                    </Wrapper>
                  </Wrapper>

                  <Wrapper zIndex={`1`} dr={`row`} margin={`0 0 10px`}>
                    <Wrapper
                      al={`flex-start`}
                      width={i18next.language === `en` ? `160px` : `100px`}
                    >
                      <CustomLabel>{t(`60`)}</CustomLabel>
                    </Wrapper>

                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      width={
                        i18next.language === `en`
                          ? `calc(100% - 160px)`
                          : `calc(100% - 100px)`
                      }
                    >
                      <Combo
                        isBorder={true}
                        itemAlign={`flex-start`}
                        width={`100%`}
                        height={`40px`}
                        border={`none`}
                        borderBottom={`1px solid #dfdfdf !important`}
                        onClick={() => setComboLeverage(!comboLeverage)}
                      >
                        <ComboTitle>
                          <Wrapper>{inputLeverage.value || t(`64`)}</Wrapper>
                          <CaretDownOutlined />
                        </ComboTitle>

                        <ComboList isView={comboLeverage}>
                          <ComboListItem
                            isActive={!inputLeverage.value}
                            onClick={() => inputLeverage.setValue("")}
                          >
                            {t(`64`)}
                          </ComboListItem>

                          {inputAccountType.value &&
                            typeList
                              .find(
                                (data) => data.type === inputAccountType.value
                              )
                              .leverage.map((data) => {
                                return (
                                  <ComboListItem
                                    isActive={inputLeverage.value === data}
                                    onClick={() => inputLeverage.setValue(data)}
                                  >
                                    {data}
                                  </ComboListItem>
                                );
                              })}
                        </ComboList>
                      </Combo>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              )}

              {currentStep === 2 && (
                <Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 5px`}
                    fontSize={`22px`}
                    fontWeight={`500`}
                    color={`#030303`}
                  >
                    {t(`35`)}
                  </Wrapper>

                  <Wrapper dr={`row`}>
                    <Wrapper
                      al={`flex-start`}
                      width={i18next.language === `en` ? `185px` : `100px`}
                    >
                      <CustomLabel>{t(`36`)}</CustomLabel>
                    </Wrapper>

                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      width={
                        i18next.language === `en`
                          ? `calc(100% - 185px)`
                          : `calc(100% - 100px)`
                      }
                    >
                      <Combo
                        isBorder={true}
                        itemAlign={`flex-start`}
                        width={`100%`}
                        height={`40px`}
                        border={`none`}
                        borderBottom={`1px solid #dfdfdf !important`}
                        onClick={() => setComboIdType(!comboIdType)}
                      >
                        <ComboTitle>
                          <Wrapper>{inputIdType.value || t(`37`)}</Wrapper>
                          <CaretDownOutlined />
                        </ComboTitle>

                        <ComboList isView={comboIdType}>
                          <ComboListItem
                            isActive={!inputIdType.value}
                            onClick={() => inputIdType.setValue("")}
                          >
                            {t(`37`)}
                          </ComboListItem>
                          <ComboListItem
                            isActive={inputIdType.value === t(`38`)}
                            onClick={() => inputIdType.setValue(t(`38`))}
                          >
                            {t(`38`)}
                          </ComboListItem>
                          <ComboListItem
                            isActive={inputIdType.value === t(`39`)}
                            onClick={() => inputIdType.setValue(t(`39`))}
                          >
                            {t(`39`)}
                          </ComboListItem>
                          <ComboListItem
                            isActive={inputIdType.value === t(`40`)}
                            onClick={() => inputIdType.setValue(t(`40`))}
                          >
                            {t(`40`)}
                          </ComboListItem>
                        </ComboList>
                      </Combo>
                    </Wrapper>
                  </Wrapper>

                  <Wrapper dr={`row`} margin={`10px 0 0`}>
                    <Wrapper
                      al={`flex-start`}
                      width={i18next.language === `en` ? `185px` : `100px`}
                    >
                      <CustomLabel for={`inp-idDate1`}>{t(`41`)}</CustomLabel>
                    </Wrapper>

                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      width={
                        i18next.language === `en`
                          ? `calc(100% - 185px)`
                          : `calc(100% - 100px)`
                      }
                    >
                      <CustomInput
                        id={`inp-idDate1`}
                        width={`100%`}
                        {...inputIdDate1}
                        placeholder={`YYYY-MM-DD`}
                        maxLength={`10`}
                      />
                    </Wrapper>
                  </Wrapper>

                  <Wrapper dr={`row`} margin={`10px 0 0`}>
                    <Wrapper
                      al={`flex-start`}
                      width={i18next.language === `en` ? `185px` : `100px`}
                    >
                      <CustomLabel for={`inp-idDate2`}>{t(`42`)}</CustomLabel>
                    </Wrapper>

                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      width={
                        i18next.language === `en`
                          ? `calc(100% - 185px)`
                          : `calc(100% - 100px)`
                      }
                    >
                      <CustomInput
                        id={`inp-idDate2`}
                        width={`100%`}
                        {...inputIdDate2}
                        placeholder={`YYYY-MM-DD`}
                        maxLength={`10`}
                      />
                    </Wrapper>
                  </Wrapper>

                  <Wrapper dr={`row`} margin={`10px 0 0`}>
                    <Wrapper
                      al={`flex-start`}
                      width={i18next.language === `en` ? `185px` : `100px`}
                    >
                      <CustomLabel>{t(`43`)}</CustomLabel>
                    </Wrapper>

                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      width={
                        i18next.language === `en`
                          ? `calc(100% - 185px)`
                          : `calc(100% - 100px)`
                      }
                    >
                      <FileInput
                        type={`file`}
                        ref={fileRef}
                        onChange={(e) => fileChangeHandler(e, 1)}
                      />
                      <CommonButton
                        width={`100px`}
                        height={`38px`}
                        margin={`0 10px 0 0`}
                        radius={`5px`}
                        onClick={() => fileRef.current.click()}
                      >
                        {t(`44`)}
                      </CommonButton>

                      {inputIdFileOriginName.value && (
                        <Wrapper
                          position={`relative`}
                          dr={`row`}
                          width={`calc(100% - 100px)`}
                        >
                          <Wrapper
                            position={`absolute`}
                            left={`0`}
                            top={`50%`}
                            margin={`-9px 0 0`}
                            zIndex={`2`}
                            width={`auto`}
                          >
                            <FileImageOutlined
                              style={{ fontSize: `18px`, color: `#707070` }}
                            />
                          </Wrapper>
                          <CustomInput
                            id={`inp-idFile`}
                            value={inputIdFileOriginName.value}
                            readOnly
                            placeholder={t(`45`)}
                            padding={`0 0 0 25px`}
                            borderBottom={`none`}
                            hoverBorderBottom={`none`}
                            color={`#707070`}
                          />
                        </Wrapper>
                      )}
                    </Wrapper>
                  </Wrapper>

                  <Wrapper
                    al={`flex-start`}
                    margin={`20px 0 5px`}
                    fontSize={`22px`}
                    fontWeight={`500`}
                    color={`#030303`}
                  >
                    {t(`46`)}
                  </Wrapper>

                  <Wrapper dr={`row`}>
                    <Wrapper
                      al={`flex-start`}
                      width={i18next.language === `en` ? `185px` : `100px`}
                    >
                      <CustomLabel>{t(`36`)}</CustomLabel>
                    </Wrapper>

                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      width={
                        i18next.language === `en`
                          ? `calc(100% - 185px)`
                          : `calc(100% - 100px)`
                      }
                    >
                      <Combo
                        isBorder={true}
                        itemAlign={`flex-start`}
                        width={`100%`}
                        height={`40px`}
                        border={`none`}
                        borderBottom={`1px solid #dfdfdf !important`}
                        onClick={() => setComboAddrType(!comboAddrType)}
                      >
                        <ComboTitle>
                          <Wrapper>{inputAddrType.value || t(`37`)}</Wrapper>
                          <CaretDownOutlined />
                        </ComboTitle>

                        <ComboList isView={comboAddrType}>
                          <ComboListItem
                            isActive={!inputAddrType.value}
                            onClick={() => inputAddrType.setValue("")}
                          >
                            {t(`37`)}
                          </ComboListItem>
                          <ComboListItem
                            isActive={inputAddrType.value === t(`47`)}
                            onClick={() => inputAddrType.setValue(t(`47`))}
                          >
                            {t(`47`)}
                          </ComboListItem>
                          <ComboListItem
                            isActive={inputAddrType.value === t(`48`)}
                            onClick={() => inputAddrType.setValue(t(`48`))}
                          >
                            {t(`48`)}
                          </ComboListItem>
                          <ComboListItem
                            isActive={inputAddrType.value === t(`49`)}
                            onClick={() => inputAddrType.setValue(t(`49`))}
                          >
                            {t(`49`)}
                          </ComboListItem>
                          <ComboListItem
                            isActive={inputAddrType.value === t(`50`)}
                            onClick={() => inputAddrType.setValue(t(`50`))}
                          >
                            {t(`50`)}
                          </ComboListItem>
                        </ComboList>
                      </Combo>
                    </Wrapper>
                  </Wrapper>

                  <Wrapper dr={`row`} margin={`10px 0 0`}>
                    <Wrapper
                      al={`flex-start`}
                      width={i18next.language === `en` ? `185px` : `100px`}
                    >
                      <CustomLabel>{t(`43`)}</CustomLabel>
                    </Wrapper>

                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      width={
                        i18next.language === `en`
                          ? `calc(100% - 185px)`
                          : `calc(100% - 100px)`
                      }
                    >
                      <FileInput
                        type={`file`}
                        ref={fileRef2}
                        onChange={(e) => fileChangeHandler(e, 2)}
                      />
                      <CommonButton
                        width={`100px`}
                        height={`38px`}
                        margin={`0 10px 0 0`}
                        radius={`5px`}
                        onClick={() => fileRef2.current.click()}
                      >
                        {t(`44`)}
                      </CommonButton>

                      {inputAddrFileOriginName.value && (
                        <Wrapper
                          position={`relative`}
                          dr={`row`}
                          width={`calc(100% - 100px)`}
                        >
                          <Wrapper
                            position={`absolute`}
                            left={`0`}
                            top={`50%`}
                            margin={`-9px 0 0`}
                            zIndex={`2`}
                            width={`auto`}
                          >
                            <FileImageOutlined
                              style={{ fontSize: `18px`, color: `#707070` }}
                            />
                          </Wrapper>
                          <CustomInput
                            id={`inp-idFile`}
                            value={inputAddrFileOriginName.value}
                            readOnly
                            placeholder={t(`45`)}
                            padding={`0 0 0 25px`}
                            borderBottom={`none`}
                            hoverBorderBottom={`none`}
                            color={`#707070`}
                          />
                        </Wrapper>
                      )}
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              )}
            </Wrapper>

            <Wrapper dr={`row`} margin={`20px 0 0`}>
              <CommonButton
                width={`110px`}
                height={`40px`}
                lineHeight={`30px`}
                fontSize={`14px`}
                margin={`0 5px`}
                radius={`8px`}
                bgColor={`#313B91`}
                color={`#fff`}
                lineHeight={`1.2`}
                onClick={signupUserHandler}
              >
                {currentTab === 0
                  ? currentStep < 2
                    ? t(`51`)
                    : t(`52`)
                  : currentStep < 1
                  ? t(`51`)
                  : t(`52`)}
              </CommonButton>
              <CommonButton
                width={`110px`}
                height={`40px`}
                lineHeight={`30px`}
                fontSize={`14px`}
                margin={`0 5px`}
                radius={`8px`}
                border={`1px solid #ebebeb`}
                bgColor={`#ebebeb`}
                color={`#030303`}
                lineHeight={`1.2`}
                onClick={moveBackHandler}
              >
                {currentTab === 0
                  ? currentStep === 0
                    ? t(`53`)
                    : t(`54`)
                  : currentStep === 0
                  ? t(`53`)
                  : t(`54`)}
              </CommonButton>
            </Wrapper>
          </Wrapper>
        </RsWrapper>
      </Wrapper>

      <PostCode
        width={width}
        isVisible={isModalVisible}
        toggleModalHandler={toggleAddressModalHandler}
        onCompleteHandler={onCompleteHandler}
      />
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

export default Signup;
