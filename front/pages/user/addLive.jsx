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
import {} from "../../components/commonComponents";
import UserLayout from "../../components/user/UserLayout";
import Theme from "../../components/Theme";
import { LIVE_ACCOUNT_CREATE_REQUEST } from "../../reducers/liveAccount";

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
      leverage: ["1:500", "1:400"],
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

  return <UserLayout></UserLayout>;
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
