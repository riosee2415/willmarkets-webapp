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
import axios from "axios";
import {
  LOAD_MY_INFO_REQUEST,
  USER_FIND_PASSWORD_REQUEST,
  USER_FIND_PASSWORD_CONFIRM_REQUEST,
} from "../../reducers/user";
import wrapper from "../../store/configureStore";
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
} from "../../components/commonComponents";
import UserLayout from "../../components/user/UserLayout";
import Theme from "../../components/Theme";
import { DEPOSIT_CREATE_REQUEST } from "../../reducers/deposit";
import { LIVE_ACCOUNT_LIST_REQUEST } from "../../reducers/liveAccount";

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
  width: 250px;
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
      bankName: "은행명",
      bankNo: "계좌번호",
      swiftCode: "Swift Code",
      willAddress: "윌마켓 주소",
      bankAddress: "은행 주소",
    },
    {
      bankName: "은행명2",
      bankNo: "계좌번호2",
      swiftCode: "Swift Code2",
      willAddress: "윌마켓 주소2",
      bankAddress: "은행 주소2",
    },
  ];

  ////// HOOKS //////
  const dispatch = useDispatch();

  const fileRef = useRef();

  const {
    me,
    st_userFindPasswordDone,
    st_userFindPasswordError,
    st_userFindPasswordConfirmDone,
    st_userFindPasswordConfirmError,
    st_userIdImageFileDone,
    st_userIdImageFileError,
    filePath,
    fileOriginName,
    inputEmail,
    secret,
  } = useSelector((state) => state.user);

  const { st_depositCreateDone, st_depositCreateError } = useSelector(
    (state) => state.deposit
  );

  const [currentTab, setCurrentTab] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const [currentBank, setCurrentBank] = useState(null);

  const [comboSelectBank, setComboSelectBank] = useState(false);

  const inputSelectBank = useInput("");
  const inputPrice = useOnlyNumberInput("");
  const inputFilePath = useInput("");
  const inputFileOriginName = useInput("");
  const inputSecret = useInput("");

  ////// TOGGLE //////

  ////// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const moveBackHandler = useCallback(() => {
    setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const selectBankHandler = useCallback((data) => {
    setCurrentBank(data);
    setCurrentStep(1);
  }, []);

  const createDepositHanlder = useCallback(() => {
    if (!currentBank) {
      setCurrentStep(0);
      return message.error("입금은행을 선택 해주세요.");
    }

    if (!emptyCheck(inputSelectBank.value)) {
      return message.error("입금계좌를 선택해주세요.");
    }

    if (!emptyCheck(inputPrice.value)) {
      return message.error("입금금액을 입력해주세요.");
    }

    // currentStep()
  }, [currentBank, inputPrice, inputSelectBank]);

  const sendEmailSecretCodeHandler = useCallback(() => {
    //이메일로 인증번호 보내기
    dispatch({
      type: USER_FIND_PASSWORD_REQUEST,
      data: {
        email: me.email,
      },
    });
  }, [me]);

  const confirmSecretHandler = useCallback(() => {
    if (!emptyCheck(inputSecret.value)) {
      return message.error("인증번호를 입력해주세요.");
    }

    dispatch({
      type: USER_FIND_PASSWORD_CONFIRM_REQUEST,
      data: {
        email: me.email,
        secret: inputSecret.value,
      },
    });
  }, [inputSecret]);

  const clickImageUpload = useCallback(() => {
    fileRef.current.click();
  }, [fileRef.current]);

  const onChangeImages = useCallback((e, type) => {
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

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: USER_ID_IMAGE_FILE_REQUEST,
      data: formData,
    });
  }, []);

  ////// USEEFFECT //////
  useEffect(() => {
    setCurrentStep(0);

    setCurrentBank(null);

    inputPrice.setValue("");
    inputSelectBank.setValue("");
  }, [currentTab]);

  useEffect(() => {
    if (st_userFindPasswordConfirmDone) {
      if (secret) {
        message.success("이메일 인증이 완료되었습니다.");
        dispatch({
          type: DEPOSIT_CREATE_REQUEST,
          data: {
            userId: me.id,
            bankName: currentBank.bankName,
            bankNo: currentBank.bankNo,
            swiftCode: currentBank.swiftCode,
            willAddress: currentBank.willAddress,
            bankAddress: currentBank.bankAddress,
            selectBank: inputSelectBank.value,
            price: inputPrice.value,
          },
        });
        return;
      } else {
        return message.error("이메일 인증에 실패했습니다.");
      }
    }
  }, [st_userFindPasswordConfirmDone]);

  useEffect(() => {
    if (st_userFindPasswordConfirmError) {
      message.error(st_userFindPasswordConfirmError);
    }
  }, [st_userFindPasswordConfirmError]);

  useEffect(() => {
    if (st_userFindPasswordDone) {
      message.success("이메일로 인증코드가 전송되었습니다.");
    }
  }, [st_userFindPasswordDone]);

  useEffect(() => {
    if (st_userFindPasswordError) {
      message.success(st_userFindPasswordError);
    }
  }, [st_userFindPasswordError]);

  useEffect(() => {
    if (st_depositCreateDone) {
      message.success("입금신청이 완료되었습니다.");

      setCurrentBank(null);

      inputPrice.setValue("");
      inputSelectBank.setValue("");
    }
  }, [st_depositCreateDone]);

  useEffect(() => {
    if (st_depositCreateError) {
      message.error(st_depositCreateError);
    }
  }, [st_depositCreateError]);

  useEffect(() => {
    if (st_userIdImageFileDone) {
      inputFilePath.setValue(filePath);
      inputFileOriginName.setValue(fileOriginName);
    }
  }, [st_userIdImageFileDone]);

  return (
    <UserLayout>
      <TabWrapper position={`absolute`} top={`-21px`} left={`20px`}>
        <Tab isActive={currentTab === 0} onClick={() => setCurrentTab(0)}>
          입금신청
        </Tab>
        <Tab isActive={currentTab === 1} onClick={() => setCurrentTab(1)}>
          입금영수 첨부
        </Tab>
      </TabWrapper>

      <Wrapper
        al={`flex-start`}
        ju={`space-between`}
        minHeight={`calc(100vh - 110px)`}
        padding={`20px 30px`}
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
            입금
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
                    입금방식 선택
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
                          height={`225px`}
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
                              width={`90px`}
                              fontSize={`15px`}
                              fontWeight={`700`}
                              color={`#a8559e`}
                            >
                              은행명
                            </Wrapper>

                            <Wrapper
                              al={`flex-start`}
                              width={`calc(100% - 90px)`}
                              fontSize={`14px`}
                            >
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
                              width={`90px`}
                              fontSize={`15px`}
                              fontWeight={`700`}
                              color={`#a8559e`}
                            >
                              계좌번호
                            </Wrapper>

                            <Wrapper
                              al={`flex-start`}
                              width={`calc(100% - 90px)`}
                              fontSize={`14px`}
                            >
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
                              width={`90px`}
                              fontSize={`15px`}
                              fontWeight={`700`}
                              color={`#a8559e`}
                            >
                              Swift Code
                            </Wrapper>

                            <Wrapper
                              al={`flex-start`}
                              width={`calc(100% - 90px)`}
                              fontSize={`14px`}
                            >
                              <Text isEllipsis={true} width={`100%`}>
                                {data.swiftCode}
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
                              width={`90px`}
                              fontSize={`15px`}
                              fontWeight={`700`}
                              color={`#a8559e`}
                            >
                              윌마켓 주소
                            </Wrapper>

                            <Wrapper
                              al={`flex-start`}
                              width={`calc(100% - 90px)`}
                              fontSize={`14px`}
                            >
                              <Text isEllipsis={true} width={`100%`}>
                                {data.willAddress}
                              </Text>
                            </Wrapper>
                          </Wrapper>

                          <Wrapper dr={`row`} al={`normal`} ju={`flex-start`}>
                            <Wrapper
                              al={`flex-start`}
                              ju={`flex-start`}
                              width={`90px`}
                              fontSize={`15px`}
                              fontWeight={`700`}
                              color={`#a8559e`}
                            >
                              은행주소
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
                    입금정보 입력
                  </Wrapper>

                  <CustomLabel for={`inp-price`} margin={`20px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    입금 은행
                  </CustomLabel>

                  <Wrapper dr={`row`} ju={`flex-start`}>
                    {currentBank && (
                      <SelectBox
                        al={`normal`}
                        ju={`flex-start`}
                        padding={`20px`}
                        width={`300px`}
                        height={`225px`}
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
                            width={`90px`}
                            fontSize={`15px`}
                            fontWeight={`700`}
                            color={`#a8559e`}
                          >
                            은행명
                          </Wrapper>

                          <Wrapper
                            al={`flex-start`}
                            width={`calc(100% - 90px)`}
                            fontSize={`14px`}
                          >
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
                            width={`90px`}
                            fontSize={`15px`}
                            fontWeight={`700`}
                            color={`#a8559e`}
                          >
                            계좌번호
                          </Wrapper>

                          <Wrapper
                            al={`flex-start`}
                            width={`calc(100% - 90px)`}
                            fontSize={`14px`}
                          >
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
                            width={`90px`}
                            fontSize={`15px`}
                            fontWeight={`700`}
                            color={`#a8559e`}
                          >
                            Swift Code
                          </Wrapper>

                          <Wrapper
                            al={`flex-start`}
                            width={`calc(100% - 90px)`}
                            fontSize={`14px`}
                          >
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
                            width={`90px`}
                            fontSize={`15px`}
                            fontWeight={`700`}
                            color={`#a8559e`}
                          >
                            윌마켓 주소
                          </Wrapper>

                          <Wrapper
                            al={`flex-start`}
                            width={`calc(100% - 90px)`}
                            fontSize={`14px`}
                          >
                            <Text isEllipsis={true} width={`100%`}>
                              {currentBank.willAddress}
                            </Text>
                          </Wrapper>
                        </Wrapper>

                        <Wrapper dr={`row`} al={`normal`} ju={`flex-start`}>
                          <Wrapper
                            al={`flex-start`}
                            ju={`flex-start`}
                            width={`90px`}
                            fontSize={`15px`}
                            fontWeight={`700`}
                            color={`#a8559e`}
                          >
                            은행주소
                          </Wrapper>

                          <Wrapper
                            al={`flex-start`}
                            width={`calc(100% - 90px)`}
                            fontSize={`14px`}
                          >
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
                    입금 계좌
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
                      onClick={() => setComboSelectBank(!comboSelectBank)}
                    >
                      <ComboTitle>
                        <Wrapper>아이디</Wrapper>
                        <CaretDownOutlined />
                      </ComboTitle>

                      <ComboList isView={comboSelectBank}>
                        <ComboListItem>내정보수정</ComboListItem>
                        <ComboListItem>로그아웃</ComboListItem>
                      </ComboList>
                    </Combo>
                  </Wrapper>

                  <CustomLabel for={`inp-price`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    입금 금액
                  </CustomLabel>

                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <CustomInput id={`inp-price`} />
                  </Wrapper>
                </Wrapper>
              )}
            </Wrapper>
          )}
          {currentTab === 1 && <Wrapper al={`flex-start`}></Wrapper>}
        </Wrapper>

        {currentTab === 0 && currentStep === 1 && (
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
              onClick={moveBackHandler}
            >
              이전
            </CommonButton>
            <CommonButton kindOf={`red`}>입금 신청</CommonButton>
          </Wrapper>
        )}
      </Wrapper>

      {/* <div>
        <input type="text" {...inputSecret} />
        <button onClick={sendEmailSecretCodeHandler}>인증코드</button>
        <button onClick={confirmSecretHandler}>확인</button>
      </div>

      <button onClick={createDepositHanlder}>신청확인</button> */}
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
