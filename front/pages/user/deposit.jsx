import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import styled from "styled-components";
import { Result, message } from "antd";
import useInput from "../../hooks/useInput";
import useOnlyNumberInput from "../../hooks/useOnlyNumberInput";
import { emptyCheck } from "../../components/commonUtils";
import {} from "@ant-design/icons";
import { END } from "redux-saga";
import axios from "axios";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import wrapper from "../../store/configureStore";
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
import { DEPOSIT_CREATE_REQUEST } from "../../reducers/deposit";
import { LIVE_ACCOUNT_LIST_REQUEST } from "../../reducers/liveAccount";

const Deposit = () => {
  ////// VARIABLES //////
  const bankList = [
    {
      bankName: "은행명",
      bankNo: "계좌번호",
      swiftCode: "Swift Code",
      willAddress: "윌마켓 주소",
      bankAddress: "은행 주소",
    },
    {
      bankName: "은행명2",
      bankNo: "계좌번호2",
      swiftCode: "Swift Code2",
      willAddress: "윌마켓 주소2",
      bankAddress: "은행 주소2",
    },
  ];

  ////// HOOKS //////
  const dispatch = useDispatch();

  const {
    me,
    st_userFindPasswordDone,
    st_userFindPasswordError,
    st_userFindPasswordConfirmDone,
    st_userFindPasswordConfirmError,
  } = useSelector((state) => state.user);

  const { st_depositCreateDone, st_depositCreateError } = useSelector(
    (state) => state.deposit
  );

  const [currentTab, setCurrentTab] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const [currentBank, setCurrentBank] = useState(null);

  const inputSelectBank = useInput("");
  const inputPrice = useOnlyNumberInput("");
  const inputFilePath = useInput("");
  const inputFileOriginName = useInput("");
  const inputSecret = useInput("");

  ////// TOGGLE //////

  ////// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const moveBackHandler = useCallback(() => {
    setCurrentStep(currentTab - 1);
  }, [currentTab]);

  const selectBankHandler = useCallback((data) => {
    setCurrentBank(data);
    setCurrentStep(1);
  }, []);

  const createDepositHanlder = useCallback(() => {
    if (!currentBank) {
      setCurrentStep(0);
      return message.error("입금은행을 선택 해주세요.");
    }

    if (!emptyCheck(inputSelectBank.value)) {
      return message.error("입금계좌를 선택해주세요.");
    }

    if (!emptyCheck(inputPrice.value)) {
      return message.error("입금금액을 입력해주세요.");
    }

    dispatch({
      type: USER_FIND_PASSWORD_REQUEST,
      data: {
        email: me.inputEmail,
      },
    });
  }, [currentBank, inputPrice, inputSelectBank]);

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

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_userFindPasswordConfirmDone) {
      if (secret) {
        message.success("이메일 인증이 완료되었습니다.");
        dispatch({
          type: DEPOSIT_CREATE_REQUEST,
          data: {
            userId: me.id,
            bankName: currentBank.bankName,
            bankNo: currentBank.bankNo,
            swiftCode: currentBank.swiftCode,
            willAddress: currentBank.willAddress,
            bankAddress: currentBank.bankAddress,
            selectBank: inputSelectBank.value,
            price: inputPrice.value,
          },
        });
        return;
      } else {
        return message.error("이메일 인증에 실패했습니다.");
      }
    }
  }, [st_userFindPasswordConfirmDone]);

  useEffect(() => {
    if (st_userFindPasswordConfirmError) {
      message.error(st_userFindPasswordConfirmError);
    }
  }, [st_userFindPasswordConfirmError]);

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
    if (st_depositCreateDone) {
      message.success("입금신청이 완료되었습니다.");

      setCurrentBank(null);

      inputPrice.setValue("");
      inputSelectBank.setValue("");
    }
  }, [st_depositCreateDone]);

  useEffect(() => {
    if (st_depositCreateError) {
      message.error(st_depositCreateError);
    }
  }, [st_depositCreateError]);

  return (
    <ClientLayout>
      <div>Hello Deposit</div>
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
export default Deposit;
