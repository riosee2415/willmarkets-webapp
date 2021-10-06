import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, useRouter } from "next/router";
import styled from "styled-components";
import { Result, message, Modal, Input, Button } from "antd";
import useInput from "../../hooks/useInput";
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
`;

const Info = () => {
  ////// VARIABLES //////

  ////// HOOKS //////
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
      return message.error("이메일을 입력해주세요.");
    }

    if (inputEmail.value === me.email) {
      return message.error("현재 이메일과 같은 이메일입니다.");
    }

    dispatch({
      type: USER_CHECK_EMAIL_REQUEST,
      data: {
        email: inputEmail.value,
      },
    });
  }, [inputEmail]);

  const sendEmailHandler = useCallback(() => {
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
    console.log(e, type);

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

  const updateUserMeHandler = useCallback(() => {
    if (!emptyCheck(inputEmail.value)) {
      return message.error("이메일을 입력해주세요.");
    }

    if (isSendEmail && !isConfirmEmail) {
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

    if (!emptyCheck(inputDetailAddress.value)) {
      return message.error("상세주소를 입력해주세요.");
    }

    if (!emptyCheck(inputIdType.value)) {
      return message.error("신분증 확인정보를 입력해주세요.");
    }

    if (!emptyCheck(inputIdDate1.value)) {
      return message.error("신분증 확인정보를 입력해주세요.");
    }

    if (!emptyCheck(inputIdDate2.value)) {
      return message.error("신분증 확인정보를 입력해주세요.");
    }

    if (!emptyCheck(inputIdFilePath.value)) {
      return message.error("신분증 확인정보를 입력해주세요.");
    }

    if (!emptyCheck(inputAddrType.value)) {
      return message.error("주소 확인정보를 입력해주세요.");
    }

    if (!emptyCheck(inputAddrFilePath.value)) {
      return message.error("주소 확인정보를 입력해주세요.");
    }

    if (st_userIdImageFileLoading) {
      return message.error("첨부파일을 업로드 중입니다. 잠시 기다려주세요.");
    }

    dispatch({
      type: USER_ME_UPDATE_REQUEST,
      data: {
        id: me.id,
        email: isConfirmEmail ? inputEmail.value : me.email,
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
    if (st_userMeUpdateDone) {
      dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
    }
  }, [st_userMeUpdateDone]);

  useEffect(() => {
    if (me) {
      inputEmail.setValue(me.email);
      inputUserName.setValue(me.username);
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
      message.error(st_userCheckEmailError);
    }
  }, [st_userCheckEmailError]);

  useEffect(() => {
    if (st_userSecretEmailDone) {
      setIsSendEmail(true);
      message.success("입력하신 이메일로 인증번호가 전송되었습니다.");
    }
  }, [st_userSecretEmailDone]);

  useEffect(() => {
    if (st_userSecretEmailError) {
      setIsSendEmail(false);
      message.error(st_userSecretEmailError);
    }
  }, [st_userSecretEmailError]);

  useEffect(() => {
    if (st_userMeUpdateDone) {
      message.success("정상적으로 정보가 변경되었습니다.");

      setComboIdType(false);
      setComboAddrType(false);

      setFileType(0);

      setIsChangeEmail(false);
      setIsSendEmail(false);
      setIsConfirmEmail(false);

      // dispatch({
      //   type: INIT_STATE_REQUEST,
      // });
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
        padding={`20px 30px`}
        bgColor={`#fff`}
        border={`1px solid #ededed`}
        shadow={`2px 2px 10px #e6e6e6`}>
        <Wrapper al={`flex-start`}>
          <Wrapper
            al={`flex-start`}
            margin={`0 0 30px`}
            padding={`0 8px 20px`}
            fontSize={`19px`}
            fontWeight={`700`}
            borderBottom={`1px solid #ebebeb`}>
            내 정보수정
          </Wrapper>

          <AccordionWrapper>
            <AccordionHeader onClick={() => toggleAccordionHandler(0)}>
              <Wrapper width={`auto`}>기본정보 수정</Wrapper>

              <Wrapper width={`auto`}>
                {currentAccordion === 0 ? <UpOutlined /> : <DownOutlined />}
              </Wrapper>
            </AccordionHeader>

            <AccordionBody isOpen={currentAccordion === 0} padding={`0 20px`}>
              <Wrapper
                dr={`row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}>
                <Wrapper al={`flex-start`} width={`120px`}>
                  <CustomLabel for={`inp-email`}>
                    {isChangeEmail ? `변경할 이메일` : `이메일`}
                  </CustomLabel>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  width={`calc(100% - 120px)`}>
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

                  <CommonButton
                    kindOf={isChangeEmail ? `white` : `black`}
                    height={`38px`}
                    margin={`0 0 0 10px`}
                    onClick={() => setIsChangeEmail(!isChangeEmail)}>
                    {isChangeEmail ? `취소` : `변경`}
                  </CommonButton>

                  {isChangeEmail && !isConfirmEmail && (
                    <CommonButton
                      kindOf={`black`}
                      height={`38px`}
                      margin={`0 0 0 10px`}
                      onClick={checkEmailHandler}>
                      확인
                    </CommonButton>
                  )}
                </Wrapper>
              </Wrapper>

              {isSendEmail && !isConfirmEmail && (
                <Wrapper
                  dr={`row`}
                  al={`normal`}
                  padding={`15px 0`}
                  borderBottom={`1px solid #f6f6f6`}>
                  <Wrapper al={`flex-start`} width={`120px`}>
                    <CustomLabel for={`inp-email`}>인증코드</CustomLabel>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    width={`calc(100% - 120px)`}>
                    <CustomInput id={`inp-email`} {...inputSecret} />

                    <CommonButton
                      kindOf={`black`}
                      height={`38px`}
                      margin={`0 0 0 10px`}
                      onClick={confirmSecretHandler}>
                      인증
                    </CommonButton>
                  </Wrapper>
                </Wrapper>
              )}

              <Wrapper
                dr={`row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}>
                <Wrapper al={`flex-start`} width={`120px`}>
                  <CustomLabel for={`inp-password`}>비밀번호</CustomLabel>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  width={`calc(100% - 120px)`}>
                  <CustomInput
                    type={`password`}
                    id={`inp-password`}
                    {...inputPassword}
                  />
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={`row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}>
                <Wrapper al={`flex-start`} width={`120px`}>
                  <CustomLabel for={`inp-userName`}>이름</CustomLabel>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  width={`calc(100% - 120px)`}>
                  <CustomInput id={`inp-userName`} {...inputUserName} />
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={`row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}>
                <Wrapper al={`flex-start`} width={`120px`}>
                  <CustomLabel>성별</CustomLabel>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  width={`calc(100% - 120px)`}>
                  <Wrapper dr={`row`} width={`auto`} margin={`0 10px`}>
                    <RadioInput
                      id={`inp-gender-1`}
                      color={`#e87f5d`}
                      value={`남자`}
                      checked={inputGender.value === `남자`}
                      onChange={(e) => inputGender.setValue(e.target.value)}
                    />
                    <Label
                      for={`inp-gender-1`}
                      fontSize={`15px`}
                      cursor={`pointer`}>
                      남자
                    </Label>
                  </Wrapper>

                  <Wrapper dr={`row`} width={`auto`} margin={`0 10px`}>
                    <RadioInput
                      id={`inp-gender-2`}
                      color={`#e87f5d`}
                      value={`여자`}
                      checked={inputGender.value === `여자`}
                      onChange={(e) => inputGender.setValue(e.target.value)}
                    />
                    <Label
                      for={`inp-gender-2`}
                      fontSize={`15px`}
                      cursor={`pointer`}>
                      여자
                    </Label>
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={`row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}>
                <Wrapper al={`flex-start`} width={`120px`}>
                  <CustomLabel for={`inp-address`}>주소</CustomLabel>
                </Wrapper>

                <Wrapper al={`flex-start`} width={`calc(100% - 120px)`}>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <CustomInput
                      id={`inp-address`}
                      {...inputAddress}
                      readOnly
                    />

                    <CommonButton
                      kindOf={`black`}
                      height={`38px`}
                      margin={`0 0 0 10px`}
                      onClick={toggleAddressModalHandler}>
                      검색
                    </CommonButton>
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
              <Wrapper width={`auto`}>신분증 확인정보 수정</Wrapper>

              <Wrapper width={`auto`}>
                {currentAccordion === 1 ? <UpOutlined /> : <DownOutlined />}
              </Wrapper>
            </AccordionHeader>

            <AccordionBody isOpen={currentAccordion === 1} padding={`0 20px`}>
              <Wrapper
                dr={`row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}>
                <Wrapper al={`flex-start`} width={`120px`}>
                  <CustomLabel>유형선택</CustomLabel>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  width={`calc(100% - 120px)`}>
                  <Combo
                    isBorder={true}
                    itemAlign={`flex-start`}
                    width={`250px`}
                    height={`40px`}
                    border={`1px solid #f3e4fa`}
                    shadow={`0 2px 8px rgb(0 0 0 / 9%)`}
                    hoverBorder={`1px solid #d7a6ed`}
                    hoverShadow={`0 3px 8px rgb(0 0 0 / 12%)`}
                    onClick={() => setComboIdType(!comboIdType)}>
                    <ComboTitle>
                      <Wrapper>{inputIdType.value || `유형 선택`}</Wrapper>
                      <CaretDownOutlined />
                    </ComboTitle>

                    <ComboList isView={comboIdType}>
                      <ComboListItem
                        isActive={!inputIdType.value}
                        onClick={() => inputIdType.setValue("")}>
                        유형 선택
                      </ComboListItem>
                      <ComboListItem
                        isActive={inputIdType.value === `신분증`}
                        onClick={() => inputIdType.setValue(`신분증`)}>
                        신분증
                      </ComboListItem>
                      <ComboListItem
                        isActive={inputIdType.value === `여권`}
                        onClick={() => inputIdType.setValue(`여권`)}>
                        여권
                      </ComboListItem>
                      <ComboListItem
                        isActive={inputIdType.value === `운전면허증`}
                        onClick={() => inputIdType.setValue(`운전면허증`)}>
                        운전면허증
                      </ComboListItem>
                    </ComboList>
                  </Combo>
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={`row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}>
                <Wrapper al={`flex-start`} width={`120px`}>
                  <CustomLabel for={`inp-idDate1`}>문제날짜</CustomLabel>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  width={`calc(100% - 120px)`}>
                  <CustomInput
                    id={`inp-idDate1`}
                    placeholder={`YYYY-MM-DD`}
                    {...inputIdDate1}
                  />
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={`row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}>
                <Wrapper al={`flex-start`} width={`120px`}>
                  <CustomLabel for={`inp-idDate2`}>만료날짜</CustomLabel>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  width={`calc(100% - 120px)`}>
                  <CustomInput
                    id={`inp-idDate2`}
                    placeholder={`YYYY-MM-DD`}
                    {...inputIdDate2}
                  />
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={`row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}>
                <Wrapper al={`flex-start`} width={`120px`}>
                  <CustomLabel for={`inp-idFile`}>파일첨부</CustomLabel>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  width={`calc(100% - 120px)`}>
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
                    margin={`0 0 0 10px`}
                    onClick={() => fileRef.current.click()}>
                    첨부
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </AccordionBody>
          </AccordionWrapper>

          <AccordionWrapper margin={`20px 0 0`}>
            <AccordionHeader onClick={() => toggleAccordionHandler(2)}>
              <Wrapper width={`auto`}>주소 확인정보 수정</Wrapper>

              <Wrapper width={`auto`}>
                {currentAccordion === 2 ? <UpOutlined /> : <DownOutlined />}
              </Wrapper>
            </AccordionHeader>

            <AccordionBody isOpen={currentAccordion === 2} padding={`0 20px`}>
              <Wrapper
                dr={`row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}>
                <Wrapper al={`flex-start`} width={`120px`}>
                  <CustomLabel>유형선택</CustomLabel>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  width={`calc(100% - 120px)`}>
                  <Combo
                    isBorder={true}
                    itemAlign={`flex-start`}
                    width={`250px`}
                    height={`40px`}
                    listHeight={`80px`}
                    border={`1px solid #f3e4fa`}
                    shadow={`0 2px 8px rgb(0 0 0 / 9%)`}
                    hoverBorder={`1px solid #d7a6ed`}
                    hoverShadow={`0 3px 8px rgb(0 0 0 / 12%)`}
                    onClick={() => setComboAddrType(!comboAddrType)}>
                    <ComboTitle>
                      <Wrapper>{inputAddrType.value || `유형 선택`}</Wrapper>
                      <CaretDownOutlined />
                    </ComboTitle>

                    <ComboList isView={comboAddrType}>
                      <ComboListItem
                        isActive={!inputAddrType.value}
                        onClick={() => inputAddrType.setValue("")}>
                        유형 선택
                      </ComboListItem>
                      <ComboListItem
                        isActive={inputAddrType.value === `가스 요금`}
                        onClick={() => inputAddrType.setValue(`가스 요금`)}>
                        가스 요금
                      </ComboListItem>
                      <ComboListItem
                        isActive={inputAddrType.value === `전기 빌`}
                        onClick={() => inputAddrType.setValue(`전기 빌`)}>
                        전기 빌
                      </ComboListItem>
                      <ComboListItem
                        isActive={inputAddrType.value === `워터 빌`}
                        onClick={() => inputAddrType.setValue(`워터 빌`)}>
                        워터 빌
                      </ComboListItem>
                      <ComboListItem
                        isActive={inputAddrType.value === `은행 명세서`}
                        onClick={() => inputAddrType.setValue(`은행 명세서`)}>
                        은행 명세서
                      </ComboListItem>
                    </ComboList>
                  </Combo>
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={`row`}
                al={`normal`}
                padding={`15px 0`}
                borderBottom={`1px solid #f6f6f6`}>
                <Wrapper al={`flex-start`} width={`120px`}>
                  <CustomLabel for={`inp-addrFile`}>파일첨부</CustomLabel>
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  width={`calc(100% - 120px)`}>
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
                    margin={`0 0 0 10px`}
                    onClick={() => fileRef2.current.click()}>
                    첨부
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
          borderTop={`1px solid #ebebeb`}>
          <CommonButton kindOf={`red`} onClick={updateUserMeHandler}>
            정보 수정
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
