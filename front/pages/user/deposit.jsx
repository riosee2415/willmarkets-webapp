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
} from "../../components/commonComponents";
import UserLayout from "../../components/user/UserLayout";
import Theme from "../../components/Theme";
import {
  DEPOSIT_CREATE_REQUEST,
  DEPOSIT_IMAGE_FILE_REQUEST,
  DEPOSIT_IMAGE_FILE_CREATE_REQUEST,
} from "../../reducers/deposit";
import { INIT_STATE_REQUEST } from "../../reducers/user";

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
  const fileRef = useRef();

  const router = useRouter();

  const dispatch = useDispatch();

  const {
    me,
    st_userFindPasswordDone,
    st_userFindPasswordError,
    st_userFindPasswordConfirmDone,
    st_userFindPasswordConfirmError,
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

  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isConfirmEmail, setIsConfirmEmail] = useState(false);

  const inputSelectBank = useInput("");
  const inputPrice = useOnlyNumberInput("");
  const inputFilePath = useInput("");
  const inputFileOriginName = useInput("");
  const inputSecret = useInput("");

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

    if (!isSendEmail) {
      dispatch({
        type: USER_FIND_PASSWORD_REQUEST,
        data: {
          email: me.email,
        },
      });
      return;
    }

    if (isSendEmail && !isConfirmEmail) {
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
      return;
    }

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
  }, [
    currentBank,
    inputPrice,
    inputSelectBank,
    inputSecret,
    isSendEmail,
    isConfirmEmail,
  ]);

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
      message.error("지원되지 않는 파일 형식입니다.");
      return;
    }

    const formData = new FormData();

    formData.append("image", file);

    dispatch({
      type: DEPOSIT_IMAGE_FILE_REQUEST,
      data: formData,
    });
  }, []);

  const createImageFileHandler = useCallback(() => {
    setCurrentStep(1);
    if (!emptyCheck(inputFilePath.value)) {
      return message.error("첨부파일을 업로드 해주세요.");
    }

    if (st_depositImageFileLoading) {
      return message.error("첨부파일을 업로드 중입니다. 잠시만 기다려주세요.");
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
      message.error("로그인 후 이용할 수 있습니다.");
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
      message.success("이메일로 인증코드가 전송되었습니다.");
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
      setCurrentStep(2);
      dispatch({
        type: INIT_STATE_REQUEST,
      });
    }
  }, [st_depositCreateDone]);

  useEffect(() => {
    if (st_depositCreateError) {
      message.error(st_depositCreateError);
    }
  }, [st_depositCreateError]);

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
                        <Wrapper>
                          {inputSelectBank.value || `입금계좌 선택`}
                        </Wrapper>
                        <CaretDownOutlined />
                      </ComboTitle>

                      <ComboList isView={comboSelectBank}>
                        <ComboListItem
                          isActive={!inputSelectBank.value}
                          onClick={() => inputSelectBank.setValue("")}
                        >
                          입금계좌 선택
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

                  <CustomLabel for={`inp-price`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    입금 금액
                  </CustomLabel>

                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <CustomInput id={`inp-price`} {...inputPrice} />
                  </Wrapper>

                  {isSendEmail && (
                    <Wrapper al={`flex-start`}>
                      <CustomLabel for={`inp-secret`} margin={`40px 0 15px`}>
                        <Wrapper className={`required`}>*</Wrapper>
                        인증코드
                      </CustomLabel>

                      <Wrapper dr={`row`} ju={`flex-start`}>
                        <CustomInput id={`inp-secret`} {...inputSecret} />
                      </Wrapper>
                    </Wrapper>
                  )}
                </Wrapper>
              )}

              {currentStep === 2 && (
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
                      Step 03
                    </Wrapper>
                    입금신청 완료
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
                          입금신청 완료 !
                        </Wrapper>
                      }
                      subTitle={
                        <Wrapper
                          margin={`10px 0 0`}
                          padding={`0 15px`}
                          width={`auto`}
                          lineHeight={`1.8`}
                        >
                          정상적으로 입금신청이 완료되었습니다.
                          <br />
                          입금 후, 입금 영수증을 첨부해주시면 입금 처리가
                          완료됩니다.
                        </Wrapper>
                      }
                      extra={[
                        <CommonButton
                          key="1"
                          kindOf={`white`}
                          width={`180px`}
                          height={`40px`}
                          margin={`0 5px`}
                          onClick={initValueHandler}
                        >
                          처음으로
                        </CommonButton>,

                        <CommonButton
                          key="1"
                          kindOf={`blue`}
                          width={`180px`}
                          height={`40px`}
                          margin={`0 5px`}
                          onClick={() => setCurrentTab(1)}
                        >
                          입금영수 첨부
                        </CommonButton>,
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
                    파일첨부 하기
                  </Wrapper>

                  <CustomLabel for={`inp-price`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    입금 영수증 파일
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
                      첨부
                    </CommonButton>
                  </Wrapper>

                  <Wrapper
                    al={`flex-start`}
                    margin={`10px 0 0`}
                    fontSize={`13px`}
                    color={`#e91448`}
                    lineHeight={`1.8`}
                  >
                    * 지원되는 파일 형식은 JPG, PNG, GIF, PDF 입니다.
                    <br />* 첨부파일의 크기는 5MB 까지 허용됩니다.
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
                    파일첨부 완료
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
                          파일첨부 완료 !
                        </Wrapper>
                      }
                      subTitle={
                        <Wrapper
                          margin={`10px 0 0`}
                          padding={`0 15px`}
                          width={`auto`}
                          lineHeight={`1.8`}
                        >
                          정상적으로 파일첨부가 완료되었습니다.
                          <br />
                          관리자 확인 후 입금될 예정이오니, 잠시만 기다려주세요.
                        </Wrapper>
                      }
                      extra={[
                        <CommonButton
                          key="1"
                          kindOf={`white`}
                          width={`180px`}
                          height={`40px`}
                          margin={`0 5px`}
                          onClick={initValueHandler}
                        >
                          처음으로
                        </CommonButton>,

                        <CommonButton
                          key="1"
                          kindOf={`blue`}
                          width={`180px`}
                          height={`40px`}
                          margin={`0 5px`}
                          onClick={() => moveLinkHandler(`/user`)}
                        >
                          홈으로
                        </CommonButton>,
                      ]}
                    />
                  </Wrapper>
                </Wrapper>
              )}
            </Wrapper>
          )}
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
            <CommonButton kindOf={`red`} onClick={createDepositHanlder}>
              입금 신청
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
              첨부하기
            </CommonButton>
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
