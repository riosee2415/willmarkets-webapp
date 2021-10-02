import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import styled from "styled-components";
import { Result, message } from "antd";
import useInput from "../../hooks/useInput";
import { emptyCheck } from "../../components/commonUtils";
import {} from "@ant-design/icons";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { END } from "redux-saga";
import axios from "axios";
import {
  ColWrapper,
  RowWrapper,
  Image,
  Wrapper,
  WholeWrapper,
  RsWrapper,
  CommonButton,
} from "../../components/commonComponents";
import ClientLayout from "../../components/ClientLayout";
import Theme from "../../components/Theme";
import { DEMO_ACCOUNT_LIST_REQUEST } from "../../reducers/demoAccount";
import { WITHDRAW_LIST_SUCCESS } from "../../reducers/withdraw";

const Record = () => {
  ////// VARIABLES //////

  const depositList = [`1`, "2", "3"];
  const withdraw = [`1`, `2`, `3`];

  const dataList = [...depositList, ...withdraw];

  dataList.sort(function (a, b) {
    return b - a;
  });

  console.log(dataList);

  ////// HOOKS //////
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);

  ////// TOGGLE //////

  ////// HANDLER //////

  ////// USEEFFECT //////

  return (
    <ClientLayout>
      <div>Hello Record</div>
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

export default Record;
