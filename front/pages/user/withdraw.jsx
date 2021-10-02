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
import {
  LOAD_MY_INFO_REQUEST,
  USER_FIND_EMAIL_FAILURE,
} from "../../reducers/user";
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
import { WITHDRAW_CREATE_REQUEST } from "../../reducers/withdraw";

const Withdraw = () => {
  ////// VARIABLES //////

  ////// HOOKS //////
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);

  const { st_withdrawCreateDone, st_withdrawCreateError } = useSelector(
    (state) => state.withdraw
  );

  const inputBankName = useInput("");
  const inputPrice = useOnlyNumberInput("");
  const inputSwiftCode = useInput("");
  const inputBankAddress = useInput("");
  const inputSelectBank = useInput("");
  const inputBankNo = useInput("");

  ////// TOGGLE //////

  ////// HANDLER //////
  const createWithdrawHanlder = useCallback(() => {
    if (!emptyCheck(inputBankName.value)) {
      return message.error("출금은행을 입력해주세요.");
    }

    if (!emptyCheck(inputPrice.value)) {
      return message.error("출금금액을 입력해주세요.");
    }

    if (!emptyCheck(inputSwiftCode.value)) {
      return message.error("Swift Code를 입력해주세요.");
    }

    if (!emptyCheck(inputBankAddress.value)) {
      return message.error("은행주소를 입력해주세요.");
    }

    if (!emptyCheck(inputSelectBank.value)) {
      return message.error("출금계좌를 선택해주세요.");
    }

    if (!emptyCheck(inputBankNo.value)) {
      return message.error("계좌번호를 입력해주세요.");
    }

    dispatch({
      type: WITHDRAW_CREATE_REQUEST,
      data: {
        userId: me.id,
        bankName: inputBankName.value,
        price: inputPrice.value,
        swiftCode: inputSwiftCode.value,
        bankAddress: inputBankAddress.value,
        selectBank: inputSelectBank.value,
        bankNo: inputBankNo.value,
      },
    });
  }, [
    inputBankName,
    inputPrice,
    inputSwiftCode,
    inputBankAddress,
    inputSelectBank,
    inputBankNo,
  ]);

  useEffect(() => {
    if (st_withdrawCreateDone) {
      message.success("출금신청이 완료되었습니다.");

      inputBankName.setValue("");
      inputPrice.setValue("");
      inputSwiftCode.setValue("");
      inputBankAddress.setValue("");
      inputSelectBank.setValue("");
      inputBankNo.setValue("");
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
