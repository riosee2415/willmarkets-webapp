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
import { CHANGE_LOCALE } from "../../reducers/locale";
import { END } from "redux-saga";
import axios from "axios";
import {} from "@ant-design/icons";
import {
  ColWrapper,
  RowWrapper,
  Image,
  Wrapper,
  WholeWrapper,
  RsWrapper,
  CommonButton,
} from "../../components/commonComponents";
import UserLayout from "../../components/user/UserLayout";
import Theme from "../../components/Theme";
import { useTranslation } from "react-i18next";

const AddDemo = () => {
  const { t, i18n } = useTranslation();

  return (
    <UserLayout>
      asdasd
      <div>asdasdas</div>
      <div>{t("test")}</div>
      <div>{t("test")}</div>
      <div>{t("test")}</div>
      <button
        onClick={() => {
          i18n.changeLanguage(i18n.language === "en" ? "ko" : "en");
        }}>
        Change Language
      </button>
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

export default AddDemo;
