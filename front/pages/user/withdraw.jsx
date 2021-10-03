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

  const {
    st_withdrawCreateDone,
    st_withdrawCreateError,
    st_userFindPasswordConfirmDone,
    st_userFindPasswordConfirmError,
    st_userFindPasswordDone,
    st_userFindPasswordError,
    secret,
  } = useSelector((state) => state.withdraw);

  const inputBankName = useInput("");
  const inputPrice = useOnlyNumberInput("");
  const inputSwiftCode = useInput("");
  const inputBankAddress = useInput("");
  const inputSelectBank = useInput("");
  const inputBankNo = useInput("");
  const inputSecret = useInput("");

  ////// TOGGLE //////

  ////// HANDLER //////

  const sendEmailSecretCodeHandler = useCallback(() => {
    //이메일로 인증번호 보내기
    dispatch({
      type: USER_FIND_PASSWORD_REQUEST,
      data: {
        email: me.email,
      },
    });
  }, []);

  const confirmSecretHandler = useCallback(() => {
    if (!emptyCheck(inputSecret.value)) {
      return message.error("인증번호를 입력해주세요.");
    }

    dispatch({
      type: USER_FIND_PASSWORD_CONFIRM_REQUEST,
      data: {
        email: inputEmail.value,
        secret: inputSecret.value,
      },
    });
  }, [inputSecret]);

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

  useEffect(() => {
    if (st_userFindPasswordDone) {
      message.success("이메일로 인증코드가 전송되었습니다.");
    }
  }, [st_userFindPasswordDone]);

  useEffect(() => {
    if (st_userFindPasswordError) {
      message.success(st_userFindPasswordError);
    }
  }, [st_userFindPasswordError]);

  useEffect(() => {
    if (st_userFindPasswordConfirmDone) {
      if (secret) {
        message.success("이메일 인증이 완료되었습니다.");
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
        return;
      } else {
        return message.error("이메일 인증에 실패했습니다.");
      }
    }
  }, [st_userFindPasswordConfirmError]);

  useEffect(() => {
    if (st_userFindPasswordConfirmError) {
      message.error(st_userFindPasswordConfirmError);
    }
  }, [st_userFindPasswordConfirmError]);

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
