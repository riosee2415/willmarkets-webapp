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
import { DEMO_ACCOUNT_CREATE_REQUEST } from "../../reducers/demoAccount";

const AddDemo = () => {
  const { t, i18n } = useTranslation();

  const [currentTab, setCurrentTab] = useState(0);
  const [currentFocus, setCurrentFocus] = useState(-1);

  const { me } = useSelector((state) => state.user);

  const { st_demoAccountCreateDone, st_demoAccountCreateError } = useSelector(
    (state) => state.demoAccount
  );
  const dispatch = useDispatch();

  const inputBankNo = useInput("");
  const inputPlatform = useInput("MetaTrader 4");
  const inputType = useInput("Aaccount");
  const inputLeverage = useInput("");
  const inputPrice = useInput("");
  const inputTragePassword = useInput("");
  const inputViewPassword = useInput("");

  const demoAccountCreateSubmit = useCallback(() => {
    if (!emptyCheck(inputPrice.value)) {
      return message.error("환율 금액을 입력해주세요.");
    }
    if (!emptyCheck(inputTragePassword.value)) {
      return message.error("거래 비밀번호를 입력해주세요.");
    }
    if (!emptyCheck(inputViewPassword.value)) {
      return message.error("보기 비밀번호를 입력해주세요.");
    }

    dispatch({
      type: DEMO_ACCOUNT_CREATE_REQUEST,
      data: {
        userId: me.id,
        bankNo: inputBankNo.value,
        platform: inputPlatform.value,
        type: inputType.value,
        leverage: inputLeverage.value,
        price: inputPrice.value,
        tradePassword: inputTragePassword,
        viewPassword: inputViewPassword,
      },
    });
  }, [inputTragePassword, inputViewPassword]);

  const platformHandler = useCallback(
    (value) => {
      if (value === "MetaTrader 4") {
        inputPlatform.setValue(value);
      }
    },
    [inputPlatform]
  );

  console.log(inputPlatform.value, "inputPlatform");

  const AccountTypeHandler = (Account) => {
    console.log(Account);

    if (Account === "STP Account") {
      inputType.setValue(Account);
      setTab(0);
    } else if (Account === "ECN Account") {
      inputType.setValue(Account);
      setTab(1);
    } else if (Account === "Myfxbook AutoTrade") {
      inputType.setValue(Account);
    }
  };

  console.log(inputType.value, "aaaa");

  useEffect(() => {
    if (st_demoAccountCreateDone) {
      inputPrice.setValue("");
      inputTragePassword.setValue("");
      inputViewPassword.setValue("");
      setCurrentFocus(-1);

      message.success("데모 계좌가 개설 되었습니다.");

      // setCurrentTab()
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
