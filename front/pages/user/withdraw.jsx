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
} from "../../components/commonComponents";
import UserLayout from "../../components/user/UserLayout";
import Theme from "../../components/Theme";
import { WITHDRAW_CREATE_REQUEST } from "../../reducers/withdraw";
import { USER_FIND_PASSWORD_CONFIRM_REQUEST } from "../../reducers/user";

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

  ////// HOOKS //////
  const dispatch = useDispatch();

  const {
    me,
    st_userFindPasswordDone,
    st_userFindPasswordError,
    st_userFindPasswordConfirmDone,
    st_userFindPasswordConfirmError,
  } = useSelector((state) => state.user);

  const { st_withdrawCreateDone, st_withdrawCreateError } = useSelector(
    (state) => state.withdraw
  );

  console.log(st_withdrawCreateDone, st_withdrawCreateError);

  const router = useRouter();

  const [currentTab, setCurrentTab] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const [comboSelectBank, setComboSelectBank] = useState(false);

  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isConfirmEmail, setIsConfirmEmail] = useState(false);

  const inputBankName = useInput("");
  const inputBankNo = useInput("");
  const inputSwiftCode = useInput("");
  const inputBankAddress = useInput("");
  const inputSelectBank = useInput("");
  const inputPrice = useOnlyNumberInput("");
  const inputSecret = useInput("");

  ////// TOGGLE //////

  ////// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  // const selectBankHandler = useCallback((data) => {
  //   setCurrentBank(data);
  //   setCurrentStep(1);
  // }, []);

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
  }, []);

  const createWithdrawHanlder = useCallback(() => {
    if (!emptyCheck(inputBankName.value)) {
      return message.error("출금은행을 입력해주세요.");
    }

    if (!emptyCheck(inputBankNo.value)) {
      return message.error("계좌번호를 입력해주세요.");
    }

    if (!emptyCheck(inputSwiftCode.value)) {
      return message.error("SwiftCode를 입력해주세요.");
    }

    if (!emptyCheck(inputBankAddress.value)) {
      return message.error("은행주소를 입력해주세요.");
    }

    if (!emptyCheck(inputSelectBank.value)) {
      return message.error("출금계좌를 선택해주세요.");
    }

    if (!emptyCheck(inputPrice.value)) {
      return message.error("출금금액을 입력해주세요.");
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
      type: WITHDRAW_CREATE_REQUEST,
      data: {
        userId: me.id,
        bankName: inputBankName.value,
        bankNo: inputBankNo.value,
        swiftCode: inputSwiftCode.value,
        bankAddress: inputBankAddress.value,
        selectBank: inputSelectBank.value,
        price: inputPrice.value,
      },
    });
  }, [
    inputBankName,
    inputBankNo,
    inputSwiftCode,
    inputBankAddress,
    inputSelectBank,
    inputPrice,
    inputSecret,
    isSendEmail,
    isConfirmEmail,
  ]);

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
    if (st_withdrawCreateDone) {
      setCurrentStep(1);
      dispatch({
        type: INIT_STATE_REQUEST,
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
      <TabWrapper position={`absolute`} top={`-21px`} left={`20px`}>
        <Tab isActive={currentTab === 0} onClick={() => setCurrentTab(0)}>
          출금신청
        </Tab>
      </TabWrapper>

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
            출금
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
                    fontWeight={`700`}>
                    <Wrapper
                      width={`auto`}
                      margin={`0 10px 0 0`}
                      padding={`5px 10px`}
                      fontSize={`14px`}
                      fontWeight={`700`}
                      bgColor={`#aa28c9`}
                      color={`#fff`}>
                      Step 01
                    </Wrapper>
                    출금신청 완료
                  </Wrapper>
                  <CustomLabel for={`inp-price`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    출금 은행
                  </CustomLabel>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <CustomInput id={`inp-price`} {...inputBankName} />
                  </Wrapper>

                  <CustomLabel for={`inp-price`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    계좌 번호
                  </CustomLabel>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <CustomInput id={`inp-price`} {...inputBankNo} />
                  </Wrapper>

                  <CustomLabel for={`inp-price`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    Swift Code
                  </CustomLabel>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <CustomInput id={`inp-price`} {...inputSwiftCode} />
                  </Wrapper>

                  <CustomLabel for={`inp-price`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    은행 주소
                  </CustomLabel>
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <CustomInput id={`inp-price`} {...inputBankAddress} />
                  </Wrapper>

                  <CustomLabel for={`inp-price`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    출금 계좌
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
                      onClick={() => setComboSelectBank(!comboSelectBank)}>
                      <ComboTitle>
                        <Wrapper>{inputSelectBank.value || `내 지갑`}</Wrapper>
                        <CaretDownOutlined />
                      </ComboTitle>

                      <ComboList isView={comboSelectBank}>
                        <ComboListItem
                          onClick={() => inputSelectBank.setValue("")}>
                          내 지갑
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
                                }>
                                {data.bankNo}
                              </ComboListItem>
                            );
                          })}
                      </ComboList>
                    </Combo>
                  </Wrapper>

                  <CustomLabel for={`inp-price`} margin={`40px 0 15px`}>
                    <Wrapper className={`required`}>*</Wrapper>
                    출금 금액
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
                </Wrapper>
              )}
              {currentStep === 1 && (
                <Wrapper al={`flex-start`}>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    margin={`0 0 20px`}
                    fontSize={`18px`}
                    fontWeight={`700`}>
                    <Wrapper
                      width={`auto`}
                      margin={`0 10px 0 0`}
                      padding={`5px 10px`}
                      fontSize={`14px`}
                      fontWeight={`700`}
                      bgColor={`#aa28c9`}
                      color={`#fff`}>
                      Step 02
                    </Wrapper>
                    출금신청 완료
                  </Wrapper>
                  <Wrapper margin={`80px 0 0`}>
                    <Result
                      status="success"
                      title={
                        <Wrapper
                          fontSize={`25px`}
                          width={`auto`}
                          borderBottom={`1px solid #c9c9c9`}>
                          출금신청 완료 !
                        </Wrapper>
                      }
                      subTitle={
                        <Wrapper
                          margin={`10px 0 0`}
                          padding={`0 15px`}
                          width={`auto`}
                          lineHeight={`1.8`}>
                          정상적으로 출금신청이 완료되었습니다.
                        </Wrapper>
                      }
                      extra={[
                        <CommonButton
                          key="1"
                          kindOf={`white`}
                          width={`180px`}
                          height={`40px`}
                          margin={`0 5px`}
                          onClick={initValueHandler}>
                          처음으로
                        </CommonButton>,

                        <CommonButton
                          key="1"
                          kindOf={`blue`}
                          width={`180px`}
                          height={`40px`}
                          margin={`0 5px`}
                          onClick={() => moveLinkHandler(`/`)}>
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

        {currentTab === 0 && currentStep === 0 && (
          <Wrapper
            dr={`row`}
            ju={`flex-start`}
            margin={`50px 0 0`}
            padding={`20px 0 0`}
            borderTop={`1px solid #ebebeb`}>
            <CommonButton
              kindOf={`white`}
              margin={`0 10px 0 0`}
              onClick={() => moveLinkHandler("/user")}>
              이전
            </CommonButton>

            <CommonButton kindOf={`red`} onClick={createWithdrawHanlder}>
              출금 신청
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
