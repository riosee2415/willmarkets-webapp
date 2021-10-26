import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { Result, message } from "antd";
import useInput from "../../hooks/useInput";
import { emptyCheck } from "../../components/commonUtils";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { END } from "redux-saga";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {} from "@ant-design/icons";
import {
  Wrapper,
  SelectBox,
  Label,
  TextInput,
  CommonButton,
} from "../../components/commonComponents";
import UserLayout from "../../components/user/UserLayout";
import Theme from "../../components/Theme";
import { DEMO_ACCOUNT_CREATE_REQUEST } from "../../reducers/demoAccount";

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

const InputBox = styled(SelectBox)`
  width: ${(props) => props.width || `250px`};
  height: ${(props) => props.height || `70px`};
  margin: 0 20px 0 0;
  font-size: ${(props) => props.fontSize || `18px`};
  color: #8b2373;
  border: 1px solid #f3e4fa;

  &:hover {
    border: 1px solid #d7a6ed;
  }

  ${(props) =>
    props.isActive &&
    `
     border: 1px solid #c96cf4;
     box-shadow: 3px 3px 8px rgb(0 0 0 / 20%);
  `}
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

const AddDemo = () => {
  ////// VARIABLES //////
  const platformList = ["MetaTrader 4"];

  const typeList = [
    {
      type: "STP Account",
      leverage: ["1:500", "1:400"],
    },
    {
      type: "ECN Account",
      leverage: ["1:500", "1:400", "1:300"],
    },
  ];

  ////// HOOKS //////
  const { t } = useTranslation(["user_addDemo"]);

  const dispatch = useDispatch();

  const router = useRouter();

  const { me } = useSelector((state) => state.user);

  const { st_demoAccountCreateDone, st_demoAccountCreateError } = useSelector(
    (state) => state.demoAccount
  );

  const [currentTab, setCurrentTab] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const inputPlatform = useInput("MetaTrader 4");
  const inputType = useInput("");
  const inputLeverage = useInput("");
  const inputPrice = useInput("");
  const inputTradePassword = useInput("");
  const inputViewPassword = useInput("");

  ////// TOGGLE //////

  ////// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const initValueHandler = useCallback(() => {
    setCurrentStep(0);

    inputType.setValue("");
    inputLeverage.setValue("");
    inputTradePassword.setValue("");
    inputViewPassword.setValue("");
    inputPrice.setValue("");
  }, []);

  const createDemoAccountHandler = useCallback(() => {
    if (!emptyCheck(inputPrice.value)) {
      return message.error(t(`1`));
    }

    if (!emptyCheck(inputTradePassword.value)) {
      return message.error(t(`2`));
    }

    if (!emptyCheck(inputViewPassword.value)) {
      return message.error(t(`3`));
    }

    dispatch({
      type: DEMO_ACCOUNT_CREATE_REQUEST,
      data: {
        userId: me.id,
        platform: inputPlatform.value,
        type: inputType.value,
        leverage: inputLeverage.value,
        price: inputPrice.value,
        tradePassword: inputTradePassword.value,
        viewPassword: inputViewPassword.value,
      },
    });
  }, [
    inputPlatform,
    inputType,
    inputLeverage,
    inputPrice,
    inputTradePassword,
    inputViewPassword,
  ]);

  const changeSelectBoxHandler = useCallback((value, setValue) => {
    setValue(value);
  }, []);

  ////// USEEFFECT //////
  useEffect(() => {
    inputType.setValue(typeList[0].type);
    inputLeverage.setValue(typeList[0].leverage[0]);
  }, []);

  useEffect(() => {
    if (!me) {
      message.error(t(`4`));
      router.push("/login");
    }
  }, [me]);

  useEffect(() => {
    if (st_demoAccountCreateDone) {
      setCurrentStep(1);

      inputType.setValue("");
      inputLeverage.setValue("");
      inputPrice.setValue("");
      inputTradePassword.setValue("");
      inputViewPassword.setValue("");
    }
  }, [st_demoAccountCreateDone]);

  useEffect(() => {
    if (st_demoAccountCreateError) {
      message.error(st_demoAccountCreateError);
    }
  }, [st_demoAccountCreateError]);

  return (
    <>
      <UserLayout>
        <TabWrapper position={`absolute`} top={`-21px`} left={`20px`}>
          <Tab isActive={currentTab === 0} onClick={() => setCurrentTab(0)}>
            {t(`5`)}
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
              {t(`6`)}
            </Wrapper>
            {currentTab === 0 && (
              <Wrapper al={`flex-start`}>
                {currentStep === 0 && (
                  <>
                    <CustomLabel margin={`0 0 15px`}>
                      <Wrapper className={`required`}>*</Wrapper>
                      {t(`7`)}
                    </CustomLabel>

                    {platformList.map((data, idx) => {
                      return (
                        <InputBox
                          isActive={inputPlatform.value === data}
                          onClick={() =>
                            changeSelectBoxHandler(data, inputPlatform.setValue)
                          }>
                          {data}
                        </InputBox>
                      );
                    })}

                    <CustomLabel margin={`40px 0 15px`}>
                      <Wrapper className={`required`}>*</Wrapper>
                      {t(`8`)}
                    </CustomLabel>

                    <Wrapper dr={`row`} ju={`flex-start`}>
                      {typeList.map((data, idx) => {
                        return (
                          <InputBox
                            key={idx}
                            isActive={inputType.value === data.type}
                            onClick={() => {
                              changeSelectBoxHandler(
                                data.type,
                                inputType.setValue
                              );

                              inputLeverage.setValue(
                                typeList.find(
                                  (data2) => data.type === data2.type
                                ).leverage[0]
                              );
                            }}>
                            {data.type}
                          </InputBox>
                        );
                      })}
                    </Wrapper>

                    <CustomLabel margin={`40px 0 15px`}>
                      <Wrapper className={`required`}>*</Wrapper>
                      {t(`9`)}
                    </CustomLabel>

                    <Wrapper dr={`row`} ju={`flex-start`}>
                      {inputType.value &&
                        typeList
                          .find((data) => data.type === inputType.value)
                          .leverage.map((data, idx) => {
                            return (
                              <InputBox
                                key={idx}
                                isActive={inputLeverage.value === data}
                                width={`110px`}
                                height={`50px`}
                                fontSize={`17px`}
                                onClick={() =>
                                  changeSelectBoxHandler(
                                    data,
                                    inputLeverage.setValue
                                  )
                                }>
                                {data}
                              </InputBox>
                            );
                          })}
                    </Wrapper>

                    <CustomLabel
                      for={`inp-trade-password`}
                      margin={`40px 0 15px`}>
                      <Wrapper className={`required`}>*</Wrapper>
                      {t(`10`)}
                    </CustomLabel>

                    <Wrapper dr={`row`} ju={`flex-start`}>
                      <CustomInput id={`inp-trade-password`} {...inputPrice} />
                    </Wrapper>

                    <CustomLabel
                      for={`inp-trade-password`}
                      margin={`40px 0 15px`}>
                      <Wrapper className={`required`}>*</Wrapper>
                      {t(`11`)}
                    </CustomLabel>

                    <Wrapper dr={`row`} ju={`flex-start`}>
                      <CustomInput
                        id={`inp-trade-password`}
                        {...inputTradePassword}
                      />
                    </Wrapper>

                    <CustomLabel
                      for={`inp-view-password`}
                      margin={`40px 0 15px`}>
                      <Wrapper className={`required`}>*</Wrapper>
                      {t(`12`)}
                    </CustomLabel>

                    <Wrapper dr={`row`} ju={`flex-start`}>
                      <CustomInput
                        id={`inp-view-password`}
                        {...inputViewPassword}
                      />
                    </Wrapper>

                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      margin={`50px 0 0`}
                      padding={`20px 0 0`}
                      borderTop={`1px solid #ebebeb`}>
                      <CommonButton
                        kindOf={`white`}
                        margin={`0 10px 0 0`}
                        onClick={() => moveLinkHandler(`/user`)}>
                        {t(`13`)}
                      </CommonButton>

                      <CommonButton
                        kindOf={`red`}
                        onClick={createDemoAccountHandler}>
                        {t(`14`)}
                      </CommonButton>
                    </Wrapper>
                  </>
                )}

                {currentStep === 1 && (
                  <Wrapper margin={`80px 0 0`}>
                    <Result
                      status="success"
                      title={
                        <Wrapper
                          fontSize={`25px`}
                          width={`auto`}
                          borderBottom={`1px solid #c9c9c9`}>
                          {t(`15`)}
                        </Wrapper>
                      }
                      subTitle={
                        <Wrapper
                          margin={`10px 0 0`}
                          padding={`0 15px`}
                          width={`auto`}
                          lineHeight={`1.8`}>
                          {t(`16`)}
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
                          {t(`17`)}
                        </CommonButton>,
                      ]}
                    />
                  </Wrapper>
                )}
              </Wrapper>
            )}
          </Wrapper>
        </Wrapper>
      </UserLayout>
    </>
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

export default AddDemo;
