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
  const [currentTab, setCurrentTab] = useState(0);
  const [currentFocus, setCurrentFocus] = useState(-1);

  const imageRef = useRef();

  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);

  const inputBankName = useInput(null);
  const inputBankNo = useOnlyNumberInput(null);
  const inputSwiftCode = useInput(null);
  const inputWillAddress = useInput(null);
  const inputBankAddress = useInput(null);
  const inputSelectBank = useInput("");
  const inputPrice = useOnlyNumberInput("");
  const inputFilePath = useInput("");
  const inputFileOriginName = useInput("");

  const dataList = [
    {
      "001": "한국은행",
      "002": "산업은행",
      "003": "기업은행",
      "004": "국민은행",
      "005": "외환은행",
      "006": "국민은행",
      "007": "수협중앙회",
      "008": "수출입은행",
      "009": "수협중앙회",
      "010": "농협은행",
      "011": "농협중앙회",
      "020": "우리은행",
      "023": "제일은행",
      "027": "씨티은행",
      "031": "대구은행",
      "032": "부산은행",
      "034": "광주은행",
      "035": "제주은행",
      "037": "전북은행",
      "039": "경남은행",
    },
    {
      IBK기업은행: "IBKOKRSE",
      NH농협은행: "KODBKRSE",
      한국수출입은행: "EXIKKRSE",
    },
    {
      address: "www.kigkm.com",
    },
    {
      bankAdderss: "주소",
    },
  ];

  const { st_depositCreateDone, st_depositCreateError } = useSelector(
    (state) => state.deposit
  );

  const depositFileHandler = () => {};

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const moveBackHandler = useCallback(() => {
    const tab = currentTab - 1;

    setCurrentFocus(-1);

    if (tab < 0) {
      router.back();
    } else {
      setCurrentTab(tab);
    }
  }, [currentTab]);

  const dePositSubmitHanlder = useCallback(() => {
    setCurrentFocus(-1);

    if (currentTab === 0) {
      if (!emptyCheck(inputBankName.value)) {
        return message.error("은행이름을 입력해주세요.");
      }
      if (!emptyCheck(inputBankNo.value)) {
        return message.error("계좌번호를 입력해주세요.");
      }
      if (!emptyCheck(inputSwiftCode.value)) {
        return message.error("은행 식별코드를 입력해주세요.");
      }
      if (!emptyCheck(inputWillAddress.value)) {
        return message.error("주소를 입력해주세요.");
      }
      if (!emptyCheck(inputBankAddress.value)) {
        return message.error("은행주소를 입력해주세요.");
      }
      setCurrentTab(1);
    } else if (currentTab === 1) {
      if (!emptyCheck(inputSelectBank.value)) {
        return message.error("계좌를 선택 해주세요.");
      }
      if (!emptyCheck(inputPrice.value)) {
        return message.error("금액을 입력해주세요.");
      }
    }

    dispatch({
      type: DEPOSIT_CREATE_REQUEST,
      data: {
        userId: me.id,
        bankName: inputBankName.value,
        price: inputPrice.value,
        swiftCode: inputSwiftCode.value,
        bankAddress: inputBankAddress.value,
        selectBank: inputSelectBank.value,
        bankNo: inputBankNo.value,
        inputWillAddress: inputWillAddress.value,
        filePath: inputFilePath.value,
        fileOriginName: inputFileOriginName.value,
      },
    });
  }, [
    inputWillAddress,
    inputBankNo,
    inputBankName,
    inputPrice,
    inputSwiftCode,
    inputBankAddress,
    inputSelectBank,
    inputFilePath,
    inputFileOriginName,
  ]);

  useEffect(() => {
    if (st_depositCreateDone) {
      inputBankName.setValue(""),
        inputPrice.setValue(""),
        inputBankNo.setValue(""),
        inputSwiftCode.setValue(""),
        inputBankAddress.setValue(""),
        inputSelectBank.setValue(""),
        inputFilePath.setValue(""),
        inputFileOriginName.setValue(""),
        message.success("..?");
    }
  }, [st_depositCreateDone]);

  useEffect(() => {
    dispatch({
      type: LIVE_ACCOUNT_LIST_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (st_depositCreateError) {
      message.error(st_depositCreateError);
    }
  }, [st_depositCreateError]);

  useEffect(() => {}, []);
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
