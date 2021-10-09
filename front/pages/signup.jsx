import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { withRouter, useRouter } from "next/router";
import { message } from "antd";
import useInput from "../hooks/useInput";
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
    background: #f9edf8 !important;
    box-shadow: 0px 0px 10px #f4c6f2;

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

  ////// HOOKS //////
  const fileRef = useRef();
  const fileRef2 = useRef();

  const router = useRouter();

  const dispatch = useDispatch();

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

  const [comboIdType, setComboIdType] = useState(false);
  const [comboAddrType, setComboAddrType] = useState(false);

  const [fileType, setFileType] = useState(0);

  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isConfirmEmail, setIsConfirmEmail] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const inputEmail = useInput("");
  const inputPassword = useInput("");
  const inputUserName = useInput("");
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
      return message.error("이메일을 입력해주세요.");
    }

    dispatch({
      type: USER_CHECK_EMAIL_REQUEST,
      data: {
        email: inputEmail.value,
      },
    });
  }, [inputEmail]);

  const sendEmailHandler = useCallback(() => {
    if (!emptyCheck(inputEmail.value)) {
      return message.error("이메일을 입력해주세요.");
    }

    dispatch({
      type: USER_SECRET_EMAIL_REQUEST,
      data: {
        email: inputEmail.value,
      },
    });
  }, [inputEmail]);

  const confirmSecretHandler = useCallback(() => {
    if (!emptyCheck(inputSecret.value)) {
      return message.error("인증번호를 입력해주세요.");
    }

    if (secretCode !== inputSecret.value) {
      setIsConfirmEmail(false);
      return message.error("인증번호가 일치하지 않습니다.");
    } else {
      setIsConfirmEmail(true);
      message.success("이메일 인증이 완료되었습니다.");
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
      message.error("지원되지 않는 파일 형식입니다.");
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

  const signupUserHandler = useCallback(() => {
    if (currentStep === 0) {
      if (!emptyCheck(inputEmail.value)) {
        return message.error("이메일을 입력해주세요.");
      }

      if (!isConfirmEmail) {
        return message.error("이메일 인증을 완료해주세요.");
      }

      if (!emptyCheck(inputUserName.value)) {
        return message.error("이름을 입력해주세요.");
      }

      if (!emptyCheck(inputGender.value)) {
        return message.error("성별을 선택해주세요.");
      }

      if (!emptyCheck(inputAddress.value)) {
        return message.error("주소를 선택해주세요.");
      }

      if (currentTab === 0) {
        setCurrentStep(1);
        return;
      }
    }

    if (currentTab === 0) {
      if (!emptyCheck(inputIdType.value)) {
        return message.error("신분증 유형을 선택해주세요.");
      }

      if (!emptyCheck(inputIdDate1.value)) {
        return message.error("신분증 문제날짜를 입력해주세요.");
      }

      if (!emptyCheck(inputIdDate2.value)) {
        return message.error("신분증 만료날짜를 입력해주세요.");
      }

      if (!emptyCheck(inputIdFilePath.value)) {
        return message.error("신분증 파일을 첨부해주세요.");
      }

      if (!emptyCheck(inputAddrType.value)) {
        return message.error("주소 유형을 선택해주세요.");
      }

      if (!emptyCheck(inputAddrFilePath.value)) {
        return message.error("주소 파일을 첨부해주세요.");
      }

      if (st_userIdImageFileLoading) {
        return message.error("첨부파일을 업로드 중입니다. 잠시 기다려주세요.");
      }
    }

    dispatch({
      type: USER_SIGNUP_REQUEST,
      data: {
        type: currentTab === 0 ? `2` : `1`,
        email: inputEmail.value,
        password: inputPassword.value,
        username: inputUserName.value,
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
    setCurrentStep(0);
    setFileType(0);
    setIsSendEmail(false);
    setIsConfirmEmail(false);

    inputEmail.setValue("");
    inputPassword.setValue("");
    inputUserName.setValue("");
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
      message.success("입력하신 이메일로 인증번호가 전송되었습니다.");
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

      message.success("정상적으로 회원가입이 완료되었습니다.");
      message.success("관리자 승인후 이용이 가능합니다.");
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
            margin={`0 45px 0 0`}
            padding={`25px 20px`}
            width={`550px`}
            bgColor={`#fff`}
            shadow={`1px 1px 8px #dedede`}
          >
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
                color={`#242424`}
              >
                회원가입
              </Wrapper>
            </Wrapper>

            <TabWrapper>
              <Tab isActive={currentTab === 0} onClick={() => setCurrentTab(0)}>
                실거래 계정
              </Tab>

              <Tab isActive={currentTab === 1} onClick={() => setCurrentTab(1)}>
                모의 계정
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
                    <Wrapper al={`flex-start`} width={`100px`}>
                      <CustomLabel for={`inp-email`}>이메일</CustomLabel>
                    </Wrapper>

                    <Wrapper width={`calc(100% - 100px)`}>
                      <Wrapper dr={`row`} ju={`flex-start`}>
                        <CustomInput
                          id={`inp-email`}
                          width={`calc(100% - 90px)`}
                          {...inputEmail}
                          placeholder={`이메일`}
                          readOnly={isConfirmEmail}
                          onChange={(e) => {
                            setIsSendEmail(false);
                            setIsConfirmEmail(false);
                            inputEmail.setValue(e.target.value);
                          }}
                        />
                        <CommonButton
                          width={`80px`}
                          height={`38px`}
                          lineHeight={`34px`}
                          margin={`0 0 0 10px`}
                          bgColor={`#030303`}
                          color={`#fff`}
                          fontWeight={`500`}
                          radius={`5px`}
                          onClick={checkEmailHandler}
                        >
                          {isConfirmEmail ? `재인증` : `인증받기`}
                        </CommonButton>
                      </Wrapper>

                      {isSendEmail && !isConfirmEmail && (
                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          margin={`10px 0 0`}
                        >
                          <CustomInput
                            width={`calc(100% - 90px)`}
                            {...inputSecret}
                            placeholder={`인증번호`}
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
                            onClick={confirmSecretHandler}
                          >
                            확인
                          </CommonButton>
                        </Wrapper>
                      )}
                    </Wrapper>

                    <Wrapper dr={`row`} margin={`10px 0 0`}>
                      <Wrapper al={`flex-start`} width={`100px`}>
                        <CustomLabel for={`inp-password`}>비밀번호</CustomLabel>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        width={`calc(100% - 100px)`}
                      >
                        <CustomInput
                          type={`password`}
                          id={`inp-password`}
                          width={`calc(100% - 90px)`}
                          {...inputPassword}
                          placeholder={`비밀번호`}
                        />
                      </Wrapper>
                    </Wrapper>

                    <Wrapper dr={`row`} margin={`10px 0 0`}>
                      <Wrapper al={`flex-start`} width={`100px`}>
                        <CustomLabel for={`inp-userName`}>이름</CustomLabel>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        width={`calc(100% - 100px)`}
                      >
                        <CustomInput
                          id={`inp-userName`}
                          width={`calc(100% - 90px)`}
                          {...inputUserName}
                          placeholder={`이름`}
                        />
                      </Wrapper>
                    </Wrapper>

                    <Wrapper dr={`row`} margin={`10px 0 0`}>
                      <Wrapper al={`flex-start`} width={`100px`}>
                        <CustomLabel for={`inp-userName`}>성별</CustomLabel>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        width={`calc(100% - 100px)`}
                      >
                        <Wrapper dr={`row`} width={`auto`} margin={`0 10px`}>
                          <RadioInput
                            id={`inp-gender-1`}
                            color={`#e87f5d`}
                            value={`남자`}
                            checked={inputGender.value === `남자`}
                            onChange={(e) =>
                              inputGender.setValue(e.target.value)
                            }
                          />
                          <Label
                            for={`inp-gender-1`}
                            fontSize={`15px`}
                            cursor={`pointer`}
                          >
                            남자
                          </Label>
                        </Wrapper>

                        <Wrapper dr={`row`} width={`auto`} margin={`0 10px`}>
                          <RadioInput
                            id={`inp-gender-2`}
                            color={`#e87f5d`}
                            value={`여자`}
                            checked={inputGender.value === `여자`}
                            onChange={(e) =>
                              inputGender.setValue(e.target.value)
                            }
                          />
                          <Label
                            for={`inp-gender-2`}
                            fontSize={`15px`}
                            cursor={`pointer`}
                          >
                            여자
                          </Label>
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>

                    <Wrapper dr={`row`} margin={`10px 0 0`}>
                      <Wrapper al={`flex-start`} width={`100px`}>
                        <CustomLabel for={`inp-address`}>주소</CustomLabel>
                      </Wrapper>

                      <Wrapper
                        position={`relative`}
                        dr={`row`}
                        ju={`flex-start`}
                        width={`calc(100% - 100px)`}
                        cursor={`pointer`}
                        onClick={toggleAddressModalHandler}
                      >
                        <CustomInput
                          id={`inp-address`}
                          width={`100%`}
                          {...inputAddress}
                          placeholder={`주소`}
                          readOnly
                        />

                        <Wrapper
                          position={`absolute`}
                          right={`15px`}
                          top={`50%`}
                          zIndex={`1`}
                          margin={`-10px 0 0`}
                          width={`auto`}
                        >
                          <SearchOutlined style={{ fontSize: `20px` }} />
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>

                    <Wrapper dr={`row`} margin={`10px 0 0`}>
                      <Wrapper al={`flex-start`} width={`100px`}>
                        <CustomLabel for={`inp-detailAddress`}>
                          상세 주소
                        </CustomLabel>
                      </Wrapper>

                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        width={`calc(100% - 100px)`}
                        cursor={`pointer`}
                      >
                        <CustomInput
                          id={`inp-detailAddress`}
                          width={`100%`}
                          {...inputDetailAddress}
                          placeholder={`상세주소`}
                        />
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              )}

              {currentStep === 1 && (
                <Wrapper>
                  <Wrapper
                    al={`flex-start`}
                    margin={`0 0 5px`}
                    fontSize={`22px`}
                    fontWeight={`500`}
                    color={`#030303`}
                  >
                    본인 확인
                  </Wrapper>

                  <Wrapper dr={`row`}>
                    <Wrapper al={`flex-start`} width={`100px`}>
                      <CustomLabel>인증 유형</CustomLabel>
                    </Wrapper>

                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      width={`calc(100% - 100px)`}
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
                          <Wrapper>{inputIdType.value || `유형 선택`}</Wrapper>
                          <CaretDownOutlined />
                        </ComboTitle>

                        <ComboList isView={comboIdType}>
                          <ComboListItem
                            isActive={!inputIdType.value}
                            onClick={() => inputIdType.setValue("")}
                          >
                            유형 선택
                          </ComboListItem>
                          <ComboListItem
                            isActive={inputIdType.value === `신분증`}
                            onClick={() => inputIdType.setValue(`신분증`)}
                          >
                            신분증
                          </ComboListItem>
                          <ComboListItem
                            isActive={inputIdType.value === `여권`}
                            onClick={() => inputIdType.setValue(`여권`)}
                          >
                            여권
                          </ComboListItem>
                          <ComboListItem
                            isActive={inputIdType.value === `운전면허증`}
                            onClick={() => inputIdType.setValue(`운전면허증`)}
                          >
                            운전면허증
                          </ComboListItem>
                        </ComboList>
                      </Combo>
                    </Wrapper>
                  </Wrapper>

                  <Wrapper dr={`row`} margin={`10px 0 0`}>
                    <Wrapper al={`flex-start`} width={`100px`}>
                      <CustomLabel for={`inp-idDate1`}>문제 날짜</CustomLabel>
                    </Wrapper>

                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      width={`calc(100% - 100px)`}
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
                    <Wrapper al={`flex-start`} width={`100px`}>
                      <CustomLabel for={`inp-idDate2`}>만료 날짜</CustomLabel>
                    </Wrapper>

                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      width={`calc(100% - 100px)`}
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
                    <Wrapper al={`flex-start`} width={`100px`}>
                      <CustomLabel>문서 파일</CustomLabel>
                    </Wrapper>

                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      width={`calc(100% - 100px)`}
                    >
                      <FileInput
                        type={`file`}
                        ref={fileRef}
                        onChange={(e) => fileChangeHandler(e, 1)}
                      />
                      <CommonButton
                        width={`80px`}
                        height={`38px`}
                        margin={`0 10px 0 0`}
                        radius={`5px`}
                        onClick={() => fileRef.current.click()}
                      >
                        파일선택
                      </CommonButton>

                      {inputIdFileOriginName.value && (
                        <Wrapper
                          position={`relative`}
                          dr={`row`}
                          width={`calc(100% - 90px)`}
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
                            placeholder={`파일을 첨부해주세요.`}
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
                    주소 확인
                  </Wrapper>

                  <Wrapper dr={`row`}>
                    <Wrapper al={`flex-start`} width={`100px`}>
                      <CustomLabel>인증 유형</CustomLabel>
                    </Wrapper>

                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      width={`calc(100% - 100px)`}
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
                          <Wrapper>
                            {inputAddrType.value || `유형 선택`}
                          </Wrapper>
                          <CaretDownOutlined />
                        </ComboTitle>

                        <ComboList isView={comboAddrType}>
                          <ComboListItem
                            isActive={!inputAddrType.value}
                            onClick={() => inputAddrType.setValue("")}
                          >
                            유형 선택
                          </ComboListItem>
                          <ComboListItem
                            isActive={inputAddrType.value === `가스 요금`}
                            onClick={() => inputAddrType.setValue(`가스 요금`)}
                          >
                            가스 요금
                          </ComboListItem>
                          <ComboListItem
                            isActive={inputAddrType.value === `전기 빌`}
                            onClick={() => inputAddrType.setValue(`전기 빌`)}
                          >
                            전기 빌
                          </ComboListItem>
                          <ComboListItem
                            isActive={inputAddrType.value === `워터 빌`}
                            onClick={() => inputAddrType.setValue(`워터 빌`)}
                          >
                            워터 빌
                          </ComboListItem>
                          <ComboListItem
                            isActive={inputAddrType.value === `은행 명세서`}
                            onClick={() =>
                              inputAddrType.setValue(`은행 명세서`)
                            }
                          >
                            은행 명세서
                          </ComboListItem>
                        </ComboList>
                      </Combo>
                    </Wrapper>
                  </Wrapper>

                  <Wrapper dr={`row`} margin={`10px 0 0`}>
                    <Wrapper al={`flex-start`} width={`100px`}>
                      <CustomLabel>문서 파일</CustomLabel>
                    </Wrapper>

                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      width={`calc(100% - 100px)`}
                    >
                      <FileInput
                        type={`file`}
                        ref={fileRef2}
                        onChange={(e) => fileChangeHandler(e, 2)}
                      />
                      <CommonButton
                        width={`80px`}
                        height={`38px`}
                        margin={`0 10px 0 0`}
                        radius={`5px`}
                        onClick={() => fileRef2.current.click()}
                      >
                        파일선택
                      </CommonButton>

                      {inputAddrFileOriginName.value && (
                        <Wrapper
                          position={`relative`}
                          dr={`row`}
                          width={`calc(100% - 90px)`}
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
                            placeholder={`파일을 첨부해주세요.`}
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
                width={`100px`}
                height={`30px`}
                lineHeight={`30px`}
                fontSize={`14px`}
                margin={`0 5px`}
                radius={`8px`}
                bgColor={`#f8459b`}
                color={`#fff`}
                onClick={signupUserHandler}
              >
                {currentTab === 0
                  ? currentStep === 0
                    ? `다음으로`
                    : `가입하기`
                  : `가입하기`}
              </CommonButton>
              <CommonButton
                width={`100px`}
                height={`30px`}
                lineHeight={`30px`}
                fontSize={`14px`}
                margin={`0 5px`}
                radius={`8px`}
                border={`1px solid #ebebeb`}
                bgColor={`#ebebeb`}
                color={`#030303`}
                onClick={moveBackHandler}
              >
                {currentTab === 0
                  ? currentStep === 0
                    ? `취소`
                    : `이전으로`
                  : `취소`}
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
