import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import styled from "styled-components";
import { Result, message } from "antd";
import useInput from "../../hooks/useInput";
import { emptyCheck } from "../../components/commonUtils";
import {} from "@ant-design/icons";
import wrapper from "../../store/configureStore";
import {
  LOAD_MY_INFO_REQUEST,
  USER_ME_REQUEST,
  USER_ME_UPDATE_REQUEST,
} from "../../reducers/user";
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

const Info = () => {
  const { me } = useSelector((state) => state.user);

  const inputType = useInput("");
  const inputEmail = useInput("");
  const inputPassword = useInput("");
  const inputUserName = useInput("");
  const inputGender = useInput("");
  const inputZoneCode = useInput("");
  const inputAddress = useInput("");
  const inputDetailAddress = useInput("");
  const inputIdType = useInput("");
  const inputIdDate1 = useInput("");
  const inputIdDate2 = useInput("");
  const inputIdFilePath = useInput("");
  const inputIdFileOriginName = useInput("");
  const inputAddrType = useInput("");
  const inputAddrFilePath = useInput("");
  const inputAddrFileOriginName = useInput("");

  const myInfoUpdateHandler = useCallback(() => {}, []);

  const nextStepHandler = useCallback(() => {
    setCurrentFocus(-1);

    if (currentTab === 0) {
      if (!emptyCheck(inputConfirmPassword.value)) {
        return message.error("비밀번호를 입력해주세요.");
      }
    } else if (currentTab === 1) {
      if (!emptyCheck(inputUsername.value)) {
        return message.error("이름을 입력해주세요.");
      }

      if (!emptyCheck(inputMobile.value)) {
        return message.error("휴대폰을 입력해주세요.");
      }

      if (!emptyCheck(inputAddress.value)) {
        return message.error("주소를 입력해주세요.");
      }

      if (!emptyCheck(inputDetailAddress.value)) {
        return message.error("상세주소를 입력해주세요.");
      }

      if (!emptyCheck(inputPinNumber.value)) {
        return message.error("핀번호를 입력해주세요.");
      }

      if (!emptyCheck(inputIdFilePath.value)) {
        return message.error("KYC 첨부파일을 업로드해주세요.");
      }

      if (st_idFileUploadLoading) {
        return message.error("첨부파일을 업로드 중입니다. 잠시 기다려주세요.");
      }
    }
    dispatch({
      type: USER_ME_UPDATE_REQUEST,
      data: {
        id: me.id,
        type: inputType.value,
        email: inputEmail,
        password: inputPassword.value,
        username: inputUserName.value,
        gender: inputGender.value,
        zoneCode: inputZoneCode.value,
        address: inputAddress.value,
        detailAddress: inputDetailAddress.value,
        idType: inputIdType.value,
        idDate1: inputIdDate1.value,
        idDate2: inputIdDate2.value,
        idFilePath: inputIdFilePath,
        idFileOriginName: inputIdFileOriginName.value,
        addrType: inputAddrType.value,
        addrFilePath: inputAddrFilePath.value,
        addrFileOriginName: inputAddrFileOriginName.value,
      },
    });

    window.scrollTo(0, 0);
  }, [
    inputIdDate1,
    inputIdDate2,
    inputType,
    inputEmail,
    inputPassword,
    inputUserName,
    inputGender,
    inputIdFilePath,
    inputZoneCode,
    inputAddress,
    inputDetailAddress,
    inputAddrFileOriginName,
    inputAddrFilePath,
    inputAddrType,
    inputIdFileOriginName,
    inputIdType,
  ]);

  useEffect(() => {
    if (me) {
    }
  }, [me]);

  useEffect(() => {
    if (st_userMeUpdateDone) {
    }
  }, [st_userMeUpdateDone]);

  useEffect(() => {
    if (st_userIdImageFileDone) {
    }
  }, [st_userMeUpdateDone]);

  return (
    <ClientLayout>
      <div>Hello Info</div>
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

export default Info;
