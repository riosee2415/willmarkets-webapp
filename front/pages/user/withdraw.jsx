import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import styled from "styled-components";
import { Result, message } from "antd";
import useInput from "../../hooks/useInput";
import useOnlyNumberInput from "../../hooks//useOnlyNumberInput";
import { emptyCheck } from "../../components/commonUtils";
import {} from "@ant-design/icons";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
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
import { WITHDRAW_CREATE_SUCCESS } from "../../reducers/withdraw";

const Withdraw = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [currentFocus, setCurrentFocus] = useState(-1);

  const dispatch = useDispatch();

  const { userme } = useSelector((state) => state.user);

  const inputBankName = useInput("");
  const inputBankNo = useOnlyNumberInput("");
  const inputPrice = useOnlyNumberInput("");
  const inputSwiftCode = useInput("");
  const inputBankAddress = useInput("");
  const inputSelectBank = useInput("");

  const { st_withdrawCreateDone, st_withdrawCreateError } = useSelector(
    (state) => state.withdraw
  );

  const withDrawSubmitHanlder = useCallback(() => {
    if (!emptyCheck(inputBankNo.value)) {
      return message.error("계좌번호를 입력해주세요.");
    }
    if (!emptyCheck(inputBankName.value)) {
      return message.error("은행이름을 입력해주세요.");
    }
    if (!emptyCheck(inputPrice.value)) {
      return message.error("금액을 입력해주세요.");
    }
    if (!emptyCheck(inputSwiftCode.value)) {
      return message.error("은행 식별코드를 입력해주세요.");
    }
    if (!emptyCheck(inputBankAddress.value)) {
      return message.error("은행주소를 입력해주세요.");
    }
    dispatch({
      type: WITHDRAW_CREATE_SUCCESS,
      data: {
        userId: userme,
        bankName: inputBankName.value,
        price: inputPrice.value,
        swiftCode: inputSwiftCode.value,
        bankAddress: inputBankAddress.value,
        selectBank: inputSelectBank.value,
        bankNo: inputBankNo.value,
      },
    });
  }, [
    ,
    inputBankNo,
    inputBankName,
    inputPrice,
    inputSwiftCode,
    inputBankAddress,
    inputSelectBank,
  ]);

  useEffect(() => {
    if (st_withdrawCreateDone) {
      inputBankNo.setValue(""),
        inputBankName.setValue(""),
        inputPrice.setValue(""),
        inputSwiftCode.setValue(""),
        inputBankAddress.setValue(""),
        inputSelectBank.setValue(""),
        message.success("..?");
    }
  }, [st_withdrawCreateDone]);

  useEffect(() => {
    if (st_withdrawCreateError) {
      message.error(st_withdrawCreateError);
    }
  }, [st_withdrawCreateError]);

  return (
    <ClientLayout>
      <div>Hello Withdraw</div>
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

export default Withdraw;
