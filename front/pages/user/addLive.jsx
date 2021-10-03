import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, useRouter } from "next/router";
import styled from "styled-components";
import { Result, message, Card, button, Avatar, Button, Input } from "antd";
import useInput from "../../hooks/useInput";
import useOnlyNumberInput from "../../hooks/useOnlyNumberInput";
import { emptyCheck } from "../../components/commonUtils";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { END } from "redux-saga";
import axios from "axios";
import {
  Wrapper,
  SelectBox,
  Label,
  TextInput,
  CommonButton,
} from "../../components/commonComponents";
import UserLayout from "../../components/user/UserLayout";
import Theme from "../../components/Theme";
import { LIVE_ACCOUNT_CREATE_REQUEST } from "../../reducers/liveAccount";

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
  margin: ${(props) => props.margin || `0 20px 0 0`};

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

const AddLive = () => {
  ////// VARIABLES //////
  const platformList = ["MetaTrader 4"];

  const typeList = [
    {
      type: "STP Account",
      leverage: ["1:500", "1:400"],
    },
    {
      type: "ECN Account",
      leverage: ["1:500", "1:400", "1:100", "1:200"],
    },
  ];

  ////// HOOKS //////
  const router = useRouter();

  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);

  const { st_liveAccountCreateDone, st_liveAccountCreateError } = useSelector(
    (state) => state.liveAccount
  );

  const inputPlatform = useInput("MetaTrader 4");
  const inputType = useInput("");
  const inputLeverage = useInput("");
  const inputTradePassword = useInput("");
  const inputViewPassword = useInput("");

  ////// TOGGLE //////

  ////// HANDLER //////
  const createLiveAccountHandler = useCallback(() => {
    if (!emptyCheck(inputTradePassword.value)) {
      return message.error("거래용 비밀번호를 입력해주세요.");
    }

    if (!emptyCheck(inputViewPassword.value)) {
      return message.error("보기용 비밀번호를 입력해주세요.");
    }

    dispatch({
      type: LIVE_ACCOUNT_CREATE_REQUEST,
      data: {
        userId: me.id,
        platform: inputPlatform.value,
        type: inputType.value,
        leverage: inputLeverage.value,
        tradePassword: inputTradePassword.value,
        viewPassword: inputViewPassword.value,
      },
    });
  }, [
    inputPlatform,
    inputType,
    inputLeverage,
    inputTradePassword,
    inputViewPassword,
  ]);

  const changeSelectBoxHandler = useCallback((value, setValue) => {
    setValue(value);
  }, []);

  console.log(inputType, inputLeverage);

  ////// USEEFFECT //////
  useEffect(() => {
    inputType.setValue(typeList[0].type);
    inputLeverage.setValue(typeList[0].leverage[0]);
  }, []);

  useEffect(() => {
    if (st_liveAccountCreateDone) {
      message.success("라이브 계좌가 생성되었습니다.");

      inputType.setValue("");
      inputLeverage.setValue("");
      inputTradePassword.setValue("");
      inputViewPassword.setValue("");
    }
  }, [st_liveAccountCreateDone]);

  useEffect(() => {
    if (st_liveAccountCreateError) {
      message.error(st_liveAccountCreateError);
    }
  }, [st_liveAccountCreateError]);

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
            라이브 계좌 추가
          </Wrapper>

          <CustomLabel margin={`0 0 15px`}>
            <Wrapper className={`required`}>*</Wrapper>
            거래 플랫폼
          </CustomLabel>

          <Wrapper dr={`row`} ju={`flex-start`}>
            <InputBox>Meta Trader 4</InputBox>
          </Wrapper>

          <CustomLabel margin={`40px 0 15px`}>
            <Wrapper className={`required`}>*</Wrapper>
            계좌 유형
          </CustomLabel>

          <Wrapper dr={`row`} ju={`flex-start`}>
            {typeList.map((data, idx) => {
              return (
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  width={`auto`}
                  key={idx}
                  onClick={() => {
                    changeSelectBoxHandler(data.type, inputType.setValue);

                    inputLeverage.setValue(
                      typeList.find((data2) => data.type === data2.type)
                        .leverage[0]
                    );
                  }}>
                  <InputBox>{data.type}</InputBox>
                </Wrapper>
              );
            })}
          </Wrapper>

          <CustomLabel margin={`40px 0 15px`}>
            <Wrapper className={`required`}>*</Wrapper>
            레버리지
          </CustomLabel>
          <Wrapper dr={`row`} ju={`flex-start`}>
            {inputType.value &&
              typeList
                .find((data) => data.type === inputType.value)
                .leverage.map((data) => {
                  return (
                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      width={`auto`}
                      key={data}
                      onClick={() =>
                        changeSelectBoxHandler(data, inputLeverage.setValue)
                      }>
                      <InputBox
                        width={`110px`}
                        height={`50px`}
                        fontSize={`17px`}>
                        {data}
                      </InputBox>
                    </Wrapper>
                  );
                })}
          </Wrapper>

          <CustomLabel for={`inp-trade-password`} margin={`40px 0 15px`}>
            <Wrapper className={`required`}>*</Wrapper>
            거래용 비번
          </CustomLabel>

          <Wrapper dr={`row`} ju={`flex-start`}>
            <CustomInput id={`inp-trade-password`} {...inputTradePassword} />
          </Wrapper>

          <CustomLabel for={`inp-view-password`} margin={`40px 0 15px`}>
            <Wrapper className={`required`}>*</Wrapper>
            보기용 비번
          </CustomLabel>

          <Wrapper dr={`row`} ju={`flex-start`}>
            <CustomInput id={`inp-view-password`} {...inputViewPassword} />
          </Wrapper>
        </Wrapper>

        <Wrapper
          dr={`row`}
          ju={`flex-start`}
          margin={`50px 0 0`}
          padding={`20px 0 0`}
          borderTop={`1px solid #ebebeb`}>
          <CommonButton kindOf={`red`} onClick={createLiveAccountHandler}>
            계좌 개설
          </CommonButton>
        </Wrapper>
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

export default AddLive;
