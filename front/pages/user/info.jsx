import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, useRouter } from "next/router";
import styled from "styled-components";
import { Result, message, Modal, Input, Button } from "antd";
import { useTranslation } from "react-i18next";
import useInput from "../../hooks/useInput";
import useOnlyNumberInput from "../../hooks/useOnlyNumberInput";
import { emptyCheck } from "../../components/commonUtils";
import { UpOutlined, DownOutlined, CaretDownOutlined } from "@ant-design/icons";
import wrapper from "../../store/configureStore";
import {
  USER_ID_IMAGE_FILE_REQUEST,
  USER_FIND_PASSWORD_REQUEST,
  USER_CHECK_EMAIL_REQUEST,
  USER_SECRET_EMAIL_REQUEST,
} from "../../reducers/user";
import {
  LOAD_MY_INFO_REQUEST,
  USER_ME_REQUEST,
  USER_ME_UPDATE_REQUEST,
  INIT_STATE_REQUEST,
} from "../../reducers/user";
import { END } from "redux-saga";
import axios from "axios";
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
  AccordionWrapper,
  AccordionHeader,
  AccordionBody,
} from "../../components/commonComponents";
import UserLayout from "../../components/user/UserLayout";
import Theme from "../../components/Theme";
import useWidth from "../../hooks/useWidth";
import PostCode from "../../components/postCode/PostCode";
import i18next from "i18next";

const CustomLabel = styled(Label)`
  display: flex;
  align-items: center;
  width: auto;
  background: #feeae3;
  box-shadow: 2px 2px 5px #ffe4da;
  border: 1px solid #fae2da;
  padding: 4px 10px;
  font-size: 14px;

  & .required {
    width: auto;
    margin: 0 5px 0 0;
    color: #a06ec6;
  }
`;

const CustomInput = styled(TextInput)`
  width: ${(props) => props.width || `350px`};
  height: 40px;
  border: 1px solid #f3e4fa;
  box-shadow: 0 2px 8px rgb(0 0 0 / 9%);

  &:hover,
  &:focus {
    border: 1px solid #d7a6ed;
    box-shadow: 0 3px 8px rgb(0 0 0 / 12%);
  }

  @media (max-width: 900px) {
    width: ${(props) => props.width || `270px`};
  }
`;

const Info = () => {
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

  ////// HOOKS //////
  const { t } = useTranslation(["user_info"]);

  const dispatch = useDispatch();

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
    st_userMeUpdateDone,
    st_userMeUpdateError,
  } = useSelector((state) => state.user);

  const fileRef = useRef();
  const fileRef2 = useRef();

  const router = useRouter();

  const width = useWidth();

  const [currentAccordion, setCurrentAccordion] = useState(0);

  const [comboCountryNo, setComboCountryNo] = useState(false);
  const [comboIdType, setComboIdType] = useState(false);
  const [comboAddrType, setComboAddrType] = useState(false);

  const [fileType, setFileType] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isConfirmEmail, setIsConfirmEmail] = useState(false);

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

  ////// TOGGLE //////

  ////// HANDLER //////
  const toggleAccordionHandler = useCallback(
    (idx) => {
      if (currentAccordion === idx) {
        setCurrentAccordion(-1);
      } else {
        setCurrentAccordion(-1);

        setTimeout(() => {
          setCurrentAccordion(idx);
        }, 250);
      }
    },
    [currentAccordion]
  );

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

    if (inputEmail.value === me.email) {
      return message.error(t(`2`));
    }

    dispatch({
      type: USER_CHECK_EMAIL_REQUEST,
      data: {
        language: i18next.language,
        email: inputEmail.value,
      },
    });
  }, [inputEmail, t]);

  const sendEmailHandler = useCallback(() => {
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
      return message.error(t(`3`));
    }

    if (secretCode !== inputSecret.value) {
      setIsConfirmEmail(false);
      return message.error(t(`4`));
    } else {
      setIsConfirmEmail(true);
      message.success(t(`5`));
    }
  }, [inputSecret, t]);

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
      message.error(t(`6`));
      return;
    }

    const formData = new FormData();

    formData.append("image", file);

    setFileType(type);

    dispatch({
      type: USER_ID_IMAGE_FILE_REQUEST,
      data: formData,
    });
  }, []);

  const updateUserMeHandler = useCallback(() => {
    if (!emptyCheck(inputEmail.value)) {
      return message.error(t(`7`));
    }

    if (isSendEmail && !isConfirmEmail) {
      return message.error(t(`8`));
    }

    if (!emptyCheck(inputUserName.value)) {
      return message.error(t(`9`));
    }

    if (!emptyCheck(inputCountryNo.value)) {
      return message.error(t(`51`));
    }

    if (!emptyCheck(inputMobile.value)) {
      return message.error(t(`52`));
    }

    if (!emptyCheck(inputGender.value)) {
      return message.error(t(`10`));
    }

    if (!emptyCheck(inputAddress.value)) {
      return message.error(t(`11`));
    }

    if (!emptyCheck(inputDetailAddress.value)) {
      return message.error(t(`12`));
    }

    if (!emptyCheck(inputIdType.value)) {
      return message.error(t(`13`));
    }

    if (!emptyCheck(inputIdDate1.value)) {
      return message.error(t(`13`));
    }

    if (!emptyCheck(inputIdDate2.value)) {
      return message.error(t(`13`));
    }

    if (!emptyCheck(inputIdFilePath.value)) {
      return message.error(t(`13`));
    }

    if (!emptyCheck(inputAddrType.value)) {
      return message.error(t(`14`));
    }

    if (!emptyCheck(inputAddrFilePath.value)) {
      return message.error(t(`14`));
    }

    if (st_userIdImageFileLoading) {
      return message.error(t(`15`));
    }

    dispatch({
      type: USER_ME_UPDATE_REQUEST,
      data: {
        language: i18next.language,
        id: me.id,
        email: isConfirmEmail ? inputEmail.value : me.email,
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
      },
    });

    window.scrollTo(0, 0);
  }, [
    isSendEmail,
    isConfirmEmail,
    inputEmail,
    inputPassword,
    inputUserName,
    inputCountryNo,
    inputMobile,
    inputGender,
    inputAddress,
    inputDetailAddress,
    inputZoneCode,
    inputIdType,
    inputIdDate1,
    inputIdDate2,
    inputIdFilePath,
    inputIdFileOriginName,
    inputAddrFileOriginName,
    inputAddrFilePath,
    inputAddrType,
  ]);

  ////// USEEFFECT //////
  useEffect(() => {
    if (!me) {
      message.error(t(`16`));
      router.push("/login");
    } else if (me.userType === `1`) {
      router.push("/user?access=false");
    } else {
      inputEmail.setValue(me.email);
      inputUserName.setValue(me.username);
      inputCountryNo.setValue(me.countryNo);
      inputMobile.setValue(me.mobile);
      inputGender.setValue(me.gender);
      inputZoneCode.setValue(me.zoneCode);
      inputAddress.setValue(me.address);
      inputDetailAddress.setValue(me.detailAddress);
      inputIdType.setValue(me.idType);
      inputIdDate1.setValue(me.idDate1);
      inputIdDate2.setValue(me.idDate2);
      inputIdFilePath.setValue(me.idFilePath);
      inputIdFileOriginName.setValue(me.idFileOriginName);
      inputAddrType.setValue(me.addrType);
      inputAddrFilePath.setValue(me.addrFilePath);
      inputAddrFileOriginName.setValue(me.addrFileOriginName);
    }
  }, [me]);

  useEffect(() => {
    if (st_userMeUpdateDone) {
      dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
    }
  }, [st_userMeUpdateDone]);

  useEffect(() => {
    if (me && !isChangeEmail) {
      setIsSendEmail(false);
      setIsConfirmEmail(false);

      inputEmail.setValue(me.email);
    }
  }, [me, isChangeEmail]);

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
    if (st_userMeUpdateDone) {
      dispatch({
        type: INIT_STATE_REQUEST,
      });

      setComboIdType(false);
      setComboAddrType(false);

      setFileType(0);

      setIsChangeEmail(false);
      setIsSendEmail(false);
      setIsConfirmEmail(false);

      message.success(t(`18`));
    }
  }, [st_userMeUpdateDone]);

  useEffect(() => {
    if (st_userMeUpdateError) {
      message.error(st_userMeUpdateError);
    }
  }, [st_userMeUpdateError]);

  return (
    <UserLayout>
      <Wrapper
        al={`flex-start`}
        ju={`space-between`}
        minHeight={`calc(100vh - 110px)`}
        padding={width < 900 ? `20px 15px` : `20px 30px`}
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
            {t(`19`)}
          </Wrapper>

          <AccordionWrapper>
            <AccordionHeader onClick={() => toggleAccordionHandler(0)}>
              <Wrapper width={`calc(100% - 30px)`} al={`flex-start`}>
                {t(`20`)}
              </Wrapper>

              <Wrapper width={`30px`} al={`flex-end`}>
                {currentAccordion === 0 ? <UpOutlined /> : <DownOutlined />}
              </Wrapper>
            </AccordionHeader>

            <AccordionBody
              isOpen={currentAccordion === 0}
              padding={width < 900 ? `0 10px` : `0 20px`}
            >
              <Wrapper
                dr={width < 900 ? `column` : `row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}
              >
                <Wrapper
                  al={`flex-start`}
                  width={width < 900 ? `100%` : `120px`}
                  padding={`0 10px 0 0`}
                >
                  <CustomLabel for={`inp-email`}>
                    {isChangeEmail ? t(`21`) : t(`22`)}
                  </CustomLabel>
                </Wrapper>

                <Wrapper
                  dr={width < 900 ? `column` : `row`}
                  ju={`flex-start`}
                  al={width < 900 ? `flex-start` : `center`}
                  margin={width < 900 ? `10px 0 0` : `0`}
                  width={width < 900 ? `100%` : `calc(100% - 120px)`}
                >
                  <CustomInput
                    id={`inp-email`}
                    {...inputEmail}
                    onChange={(e) => {
                      setIsSendEmail(false);
                      setIsConfirmEmail(false);
                      inputEmail.setValue(e.target.value);
                    }}
                    readOnly={!isChangeEmail}
                  />

                  <Wrapper dr={`row`} width={`auto`}>
                    <CommonButton
                      kindOf={isChangeEmail ? `white` : `black`}
                      height={`38px`}
                      margin={width < 900 ? `10px 0 0` : `0 0 0 10px`}
                      onClick={() => setIsChangeEmail(!isChangeEmail)}
                    >
                      {isChangeEmail ? t(`23`) : t(`24`)}
                    </CommonButton>

                    {isChangeEmail && !isConfirmEmail && (
                      <CommonButton
                        kindOf={`black`}
                        height={`38px`}
                        margin={width < 900 ? `10px 0 0 10px` : `0 0 0 10px`}
                        onClick={checkEmailHandler}
                      >
                        {t(`25`)}
                      </CommonButton>
                    )}
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              {isSendEmail && !isConfirmEmail && (
                <Wrapper
                  dr={width < 900 ? `column` : `row`}
                  al={`normal`}
                  padding={`15px 0`}
                  borderBottom={`1px solid #f6f6f6`}
                >
                  <Wrapper
                    al={`flex-start`}
                    width={width < 900 ? `100%` : `120px`}
                    padding={`0 10px 0 0`}
                  >
                    <CustomLabel for={`inp-email`}>{t(`26`)}</CustomLabel>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    margin={width < 900 ? `10px 0 0` : `0`}
                    width={width < 900 ? `100%` : `calc(100% - 120px)`}
                  >
                    <CustomInput id={`inp-email`} {...inputSecret} />

                    <CommonButton
                      kindOf={`black`}
                      height={`38px`}
                      margin={`0 0 0 10px`}
                      onClick={confirmSecretHandler}
                    >
                      {t(`27`)}
                    </CommonButton>
                  </Wrapper>
                </Wrapper>
              )}

              <Wrapper
                dr={width < 900 ? `column` : `row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}
              >
                <Wrapper
                  al={`flex-start`}
                  width={width < 900 ? `100%` : `120px`}
                  padding={`0 10px 0 0`}
                >
                  <CustomLabel for={`inp-password`}>{t(`28`)}</CustomLabel>
                </Wrapper>

                <Wrapper
                  dr={width < 900 ? `column` : `row`}
                  ju={`flex-start`}
                  al={width < 900 ? `flex-start` : `center`}
                  margin={width < 900 ? `10px 0 0` : `0`}
                  width={width < 900 ? `100%` : `calc(100% - 120px)`}
                >
                  <CustomInput
                    type={`password`}
                    id={`inp-password`}
                    {...inputPassword}
                  />
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={width < 900 ? `column` : `row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}
              >
                <Wrapper
                  al={`flex-start`}
                  width={width < 900 ? `100%` : `120px`}
                >
                  <CustomLabel for={`inp-userName`}>{t(`29`)}</CustomLabel>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  margin={width < 900 ? `10px 0 0` : `0`}
                  width={width < 900 ? `100%` : `calc(100% - 120px)`}
                >
                  <CustomInput id={`inp-userName`} {...inputUserName} />
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={width < 900 ? `column` : `row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}
              >
                <Wrapper
                  al={`flex-start`}
                  width={width < 900 ? `100%` : `120px`}
                  padding={`0 10px 0 0`}
                >
                  <CustomLabel for={`inp-mobile`}>{t(`53`)}</CustomLabel>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  margin={width < 900 ? `10px 0 0` : `0`}
                  width={width < 900 ? `100%` : `calc(100% - 120px)`}
                >
                  <Combo
                    isBorder={true}
                    itemAlign={`flex-start`}
                    margin={`0 5px 0 0`}
                    width={width < 900 ? `80px` : `100px`}
                    height={`40px`}
                    listHeight={`250px`}
                    border={`1px solid #f3e4fa`}
                    shadow={`0 2px 8px rgb(0 0 0 / 9%)`}
                    hoverBorder={`1px solid #d7a6ed`}
                    hoverShadow={`0 3px 8px rgb(0 0 0 / 12%)`}
                    onClick={() => setComboCountryNo(!comboCountryNo)}
                  >
                    <ComboTitle>
                      <Wrapper>{inputCountryNo.value || `Select`}</Wrapper>
                      <CaretDownOutlined />
                    </ComboTitle>

                    <ComboList isView={comboCountryNo} width={`180%`}>
                      {countryList.map((data, idx) => {
                        return (
                          <ComboListItem
                            key={idx}
                            isActive={inputCountryNo.value === data.value}
                            onClick={() => inputCountryNo.setValue(data.value)}
                          >
                            {data.name} ({data.value})
                          </ComboListItem>
                        );
                      })}
                    </ComboList>
                  </Combo>

                  <CustomInput
                    id={`inp-mobile`}
                    width={width < 900 ? `185px` : `245px`}
                    maxLength={`11`}
                    {...inputMobile}
                  />
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={width < 900 ? `column` : `row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}
              >
                <Wrapper
                  al={`flex-start`}
                  width={width < 900 ? `100%` : `120px`}
                  padding={`0 10px 0 0`}
                >
                  <CustomLabel>{t(`30`)}</CustomLabel>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  margin={width < 900 ? `10px 0 0` : `0`}
                  width={width < 900 ? `100%` : `calc(100% - 120px)`}
                >
                  <Wrapper dr={`row`} width={`auto`} margin={`0 10px`}>
                    <RadioInput
                      id={`inp-gender-1`}
                      color={`#e87f5d`}
                      value={t(`31`)}
                      checked={inputGender.value === t(`31`)}
                      onChange={(e) => inputGender.setValue(e.target.value)}
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
                      color={`#e87f5d`}
                      value={t(`32`)}
                      checked={inputGender.value === t(`32`)}
                      onChange={(e) => inputGender.setValue(e.target.value)}
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

              <Wrapper
                dr={width < 900 ? `column` : `row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}
              >
                <Wrapper
                  al={`flex-start`}
                  width={width < 900 ? `100%` : `120px`}
                  padding={`0 10px 0 0`}
                >
                  <CustomLabel for={`inp-address`}>{t(`33`)}</CustomLabel>
                </Wrapper>

                <Wrapper
                  al={`flex-start`}
                  margin={width < 900 ? `10px 0 0` : `0`}
                  width={width < 900 ? `100%` : `calc(100% - 120px)`}
                >
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <CustomInput id={`inp-address`} {...inputAddress} />
                  </Wrapper>

                  <Wrapper dr={`row`} ju={`flex-start`} margin={`5px 0 0`}>
                    <CustomInput {...inputDetailAddress} />
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </AccordionBody>
          </AccordionWrapper>

          <AccordionWrapper margin={`20px 0 0`}>
            <AccordionHeader onClick={() => toggleAccordionHandler(1)}>
              <Wrapper width={`calc(100% - 30px)`} al={`flex-start`}>
                {t(`34`)}
              </Wrapper>

              <Wrapper width={`30px`} al={`flex-end`}>
                {currentAccordion === 1 ? <UpOutlined /> : <DownOutlined />}
              </Wrapper>
            </AccordionHeader>

            <AccordionBody
              isOpen={currentAccordion === 1}
              padding={width < 900 ? `0 10px` : `0 20px`}
            >
              <Wrapper
                dr={width < 900 ? `column` : `row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}
              >
                <Wrapper
                  al={`flex-start`}
                  width={
                    width < 900
                      ? `100%`
                      : i18next.language === "en"
                      ? `200px`
                      : `120px`
                  }
                  padding={`0 10px 0 0`}
                >
                  <CustomLabel>{t(`35`)}</CustomLabel>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  margin={width < 900 ? `10px 0 0` : `0`}
                  width={
                    width < 900
                      ? `100%`
                      : i18next.language === "en"
                      ? `calc(100% - 200px)`
                      : `calc(100% - 120px)`
                  }
                >
                  <Combo
                    isBorder={true}
                    itemAlign={`flex-start`}
                    width={width < 900 ? `270px` : `250px`}
                    height={`40px`}
                    border={`1px solid #f3e4fa`}
                    shadow={`0 2px 8px rgb(0 0 0 / 9%)`}
                    hoverBorder={`1px solid #d7a6ed`}
                    hoverShadow={`0 3px 8px rgb(0 0 0 / 12%)`}
                    onClick={() => setComboIdType(!comboIdType)}
                  >
                    <ComboTitle>
                      <Wrapper>{inputIdType.value || t(`35`)}</Wrapper>
                      <CaretDownOutlined />
                    </ComboTitle>

                    <ComboList isView={comboIdType}>
                      <ComboListItem
                        isActive={!inputIdType.value === t(`36`)}
                        onClick={() => inputIdType.setValue(t(`36`))}
                      >
                        {t(`36`)}
                      </ComboListItem>
                      <ComboListItem
                        isActive={inputIdType.value === t(`37`)}
                        onClick={() => inputIdType.setValue(t(`37`))}
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
                    </ComboList>
                  </Combo>
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={width < 900 ? `column` : `row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}
              >
                <Wrapper
                  al={`flex-start`}
                  width={
                    width < 900
                      ? `100%`
                      : i18next.language === "en"
                      ? `200px`
                      : `120px`
                  }
                  padding={`0 10px 0 0`}
                >
                  <CustomLabel for={`inp-idDate1`}>{t(`40`)}</CustomLabel>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  margin={width < 900 ? `10px 0 0` : `0`}
                  width={
                    width < 900
                      ? `100%`
                      : i18next.language === "en"
                      ? `calc(100% - 200px)`
                      : `calc(100% - 120px)`
                  }
                >
                  <CustomInput
                    id={`inp-idDate1`}
                    placeholder={`YYYY-MM-DD`}
                    {...inputIdDate1}
                  />
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={width < 900 ? `column` : `row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}
              >
                <Wrapper
                  al={`flex-start`}
                  width={
                    width < 900
                      ? `100%`
                      : i18next.language === "en"
                      ? `200px`
                      : `120px`
                  }
                  padding={`0 10px 0 0`}
                >
                  <CustomLabel for={`inp-idDate2`}>{t(`41`)}</CustomLabel>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  margin={width < 900 ? `10px 0 0` : `0`}
                  width={
                    width < 900
                      ? `100%`
                      : i18next.language === "en"
                      ? `calc(100% - 200px)`
                      : `calc(100% - 120px)`
                  }
                >
                  <CustomInput
                    id={`inp-idDate2`}
                    placeholder={`YYYY-MM-DD`}
                    {...inputIdDate2}
                  />
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={width < 900 ? `column` : `row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}
              >
                <Wrapper
                  al={`flex-start`}
                  width={
                    width < 900
                      ? `100%`
                      : i18next.language === "en"
                      ? `200px`
                      : `120px`
                  }
                  padding={`0 10px 0 0`}
                >
                  <CustomLabel for={`inp-idFile`}>{t(`42`)}</CustomLabel>
                </Wrapper>

                <Wrapper
                  dr={width < 900 ? `column` : `row`}
                  ju={`flex-start`}
                  al={width < 900 ? `flex-start` : `center`}
                  margin={width < 900 ? `10px 0 0` : `0`}
                  width={
                    width < 900
                      ? `100%`
                      : i18next.language === "en"
                      ? `calc(100% - 200px)`
                      : `calc(100% - 120px)`
                  }
                >
                  <FileInput
                    type={`file`}
                    ref={fileRef}
                    onChange={(e) => fileChangeHandler(e, 1)}
                  />
                  <CustomInput
                    id={`inp-idFile`}
                    value={inputIdFileOriginName.value}
                    readOnly
                  />
                  <CommonButton
                    kindOf={`black`}
                    height={`38px`}
                    margin={width < 900 ? `10px 0 0 0` : `0 0 0 10px`}
                    onClick={() => fileRef.current.click()}
                  >
                    {t(`43`)}
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </AccordionBody>
          </AccordionWrapper>

          <AccordionWrapper margin={`20px 0 0`}>
            <AccordionHeader onClick={() => toggleAccordionHandler(2)}>
              <Wrapper width={`calc(100% - 30px)`} al={`flex-start`}>
                {t(`44`)}
              </Wrapper>

              <Wrapper width={`30px`} al={`flex-end`}>
                {currentAccordion === 2 ? <UpOutlined /> : <DownOutlined />}
              </Wrapper>
            </AccordionHeader>

            <AccordionBody
              isOpen={currentAccordion === 2}
              padding={width < 900 ? `0 10px` : `0 20px`}
            >
              <Wrapper
                dr={width < 900 ? `column` : `row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}
              >
                <Wrapper
                  al={`flex-start`}
                  width={
                    width < 900
                      ? `100%`
                      : i18next.language === "en"
                      ? `200px`
                      : `120px`
                  }
                  padding={`0 10px 0 0`}
                >
                  <CustomLabel>{t(`45`)}</CustomLabel>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  margin={width < 900 ? `10px 0 0` : `0`}
                  width={
                    width < 900
                      ? `100%`
                      : i18next.language === "en"
                      ? `calc(100% - 200px)`
                      : `calc(100% - 120px)`
                  }
                >
                  <Combo
                    isBorder={true}
                    itemAlign={`flex-start`}
                    width={width < 900 ? `270px` : `250px`}
                    height={`40px`}
                    listHeight={`80px`}
                    border={`1px solid #f3e4fa`}
                    shadow={`0 2px 8px rgb(0 0 0 / 9%)`}
                    hoverBorder={`1px solid #d7a6ed`}
                    hoverShadow={`0 3px 8px rgb(0 0 0 / 12%)`}
                    onClick={() => setComboAddrType(!comboAddrType)}
                  >
                    <ComboTitle>
                      <Wrapper>{inputAddrType.value || t(`36`)}</Wrapper>
                      <CaretDownOutlined />
                    </ComboTitle>

                    <ComboList isView={comboAddrType}>
                      <ComboListItem
                        isActive={!inputAddrType.value}
                        onClick={() => inputAddrType.setValue("")}
                      >
                        {t(`36`)}
                      </ComboListItem>
                      <ComboListItem
                        isActive={inputAddrType.value === t(`46`)}
                        onClick={() => inputAddrType.setValue(t(`46`))}
                      >
                        {t(`46`)}
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
                    </ComboList>
                  </Combo>
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={width < 900 ? `column` : `row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}
              >
                <Wrapper
                  al={`flex-start`}
                  width={
                    width < 900
                      ? `100%`
                      : i18next.language === "en"
                      ? `200px`
                      : `120px`
                  }
                  padding={`0 10px 0 0`}
                >
                  <CustomLabel for={`inp-addrFile`}>{t(`42`)}</CustomLabel>
                </Wrapper>

                <Wrapper
                  dr={width < 900 ? `column` : `row`}
                  ju={`flex-start`}
                  al={width < 900 ? `flex-start` : `center`}
                  margin={width < 900 ? `10px 0 0` : `0`}
                  width={
                    width < 900
                      ? `100%`
                      : i18next.language === "en"
                      ? `calc(100% - 200px)`
                      : `calc(100% - 120px)`
                  }
                >
                  <FileInput
                    type={`file`}
                    ref={fileRef2}
                    onChange={(e) => fileChangeHandler(e, 2)}
                  />
                  <CustomInput
                    id={`inp-addrFile`}
                    value={inputAddrFileOriginName.value}
                    readOnly
                  />
                  <CommonButton
                    kindOf={`black`}
                    height={`38px`}
                    margin={width < 900 ? `10px 0 0 0` : `0 0 0 10px`}
                    onClick={() => fileRef2.current.click()}
                  >
                    {t(`43`)}
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </AccordionBody>
          </AccordionWrapper>
        </Wrapper>

        <Wrapper
          dr={`row`}
          ju={`flex-start`}
          margin={`50px 0 0`}
          padding={`20px 0 0`}
          borderTop={`1px solid #ebebeb`}
        >
          <CommonButton kindOf={`red`} onClick={updateUserMeHandler}>
            {t(`50`)}
          </CommonButton>
        </Wrapper>
      </Wrapper>

      {/* <div>Hello Info</div>

      <button onClick={toggleAdressModalHandler}>수정</button>

      <Modal
        visible={isModalVisible}
        onCancel={() => toggleAdressModalHandler()}
      >
        <Wrapper>
          <Input placeholder="Basic usage" {...inputSecret} />
          <Button onClick={sendEmailSecretCodeHandler}> Send code</Button>
        </Wrapper>
      </Modal>

      <Wrapper dr={`row`} al={`flex-start`}>
        <input
          type={`text`}
          placeholder={`inputIdFileOriginName`}
          readOnly
          value={inputIdFileOriginName.value}
        />

        <button
          kindOf={`check`}
          width={`90px`}
          height={`50px`}
          margin={`0 0 0 10px`}
          fontSize={width < 700 ? `15px` : `17px`}
          onClick={clickImageUpload}
        >
          첨부
        </button>

        <input
          type="file"
          name="image"
          accept=".png, .jpg"
          hidden
          ref={fileRef}
          onChange={(e) => onChangeImages(e, 1)}
        />
      </Wrapper>

      <Wrapper dr={`row`} al={`flex-start`}>
        <input
          type={`text`}
          placeholder={`inputAddrFileOriginName`}
          readOnly
          value={inputAddrFileOriginName.value}
        />

        <button
          kindOf={`check`}
          width={`90px`}
          height={`50px`}
          margin={`0 0 0 10px`}
          fontSize={width < 700 ? `15px` : `17px`}
          onClick={clickImageUpload}
        >
          첨부
        </button>

        <input
          type="file"
          name="image"
          accept=".png, .jpg"
          hidden
          ref={fileRef}
          onChange={(e) => onChangeImages(e, 2)}
        />
      </Wrapper> */}

      <PostCode
        width={width}
        isVisible={isModalVisible}
        toggleModalHandler={toggleAddressModalHandler}
        onCompleteHandler={onCompleteHandler}
      />
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

export default Info;
