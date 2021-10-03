import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, useRouter } from "next/router";
import styled from "styled-components";
import { Result, message, Modal, Input, Button } from "antd";
import DaumPostCode from "react-daum-postcode";
import useInput from "../../hooks/useInput";
import { emptyCheck } from "../../components/commonUtils";
import { CaretLeftOutlined } from "@ant-design/icons";
import wrapper from "../../store/configureStore";
import {
  USER_FIND_PASSWORD_CONFIRM_SUCCESS,
  USER_ID_IMAGE_FILE_REQUEST,
  USER_FIND_PASSWORD_REQUEST,
  USER_FIND_PASSWORD_CONFIRM_REQUEST,
} from "../../reducers/user";
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
  ////// VARIABLES //////
  const fileRef = useRef();

  ////// HOOKS //////
  const {
    me,
    secretCode,
    st_userIdImageFileDone,
    st_userIdImageFileError,
    st_userFindPasswordDone,
    st_userFindPasswordError,
    st_userFindPasswordConfirmDone,
    st_userFindPasswordConfirmError,
    filePath,
    fileOriginName,
    secret,
  } = useSelector((state) => state.user);

  const width = useRouter();

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
  const inputSecret = useInput("");

  ////// TOGGLE //////
  const [isModalVisible, setIsModalVisible] = useState(false);
  ////// HANDLER //////

  const dispatch = useDispatch();

  const toggleAdressModalHandler = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onCompleteHandler = useCallback(
    async (data) => {
      inputZoneCode.setValue(data.zonecode);
      inputAddress.setValue(data.address);
      setIsModalVisible(false);
    },
    [inputZoneCode, inputAddress]
  );

  const sendEmailSecretCodeHandler = useCallback(() => {
    //이메일로 인증번호 보내기
    dispatch({
      type: USER_FIND_PASSWORD_REQUEST,
      data: {
        email: inputEmail.value,
      },
    });
  }, [inputEmail]);

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

  const clickImageUpload = useCallback(() => {
    fileRef.current.click();
  }, [fileRef.current]);

  const onChangeImages = useCallback((e, type) => {
    const file = e.target.files[0];

    if (!file) return;

    const ext = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase();

    if (
      !(
        ext === "jpg" ||
        ext === "jpeg" ||
        ext === "png" ||
        ext === "gif" ||
        ext === "pdf"
      )
    ) {
      message.error("지원되지 않는 파일 형식입니다.");
      return;
    }

    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });
    formData.append("type", type);

    dispatch({
      type: USER_ID_IMAGE_FILE_REQUEST,
      data: formData,
    });
  }, []);

  const updateUserMeHandler = useCallback(() => {
    if (!emptyCheck(inputEmail.value)) {
      return message.error("이메일을 입력해주세요.");
    }

    if (!emptyCheck(inputPassword.value)) {
      return message.error("비밀번호를 입력해주세요.");
    }

    if (!emptyCheck(inputUserName.value)) {
      return message.error("유저이름을 입력해주세요.");
    }

    if (!emptyCheck(inputGender.value)) {
      return message.error("성별을 입력해주세요.");
    }

    if (!emptyCheck(inputAddress.value)) {
      return message.error("주소를 입력해주세요.");
    }

    if (!emptyCheck(inputDetailAddress.value)) {
      return message.error("상세주소를 입력해주세요.");
    }

    if (!emptyCheck(inputIdFilePath.value)) {
      return message.error("신분증 첨부파일을 업로드해주세요.");
    }

    if (!emptyCheck(inputAddrFilePath.value)) {
      return message.error("주소 첨부파일을 업로드해주세요.");
    }

    if (st_userIdImageFileDone) {
      return message.error("첨부파일을 업로드 중입니다. 잠시 기다려주세요.");
    }

    dispatch({
      type: USER_ME_UPDATE_REQUEST,
      data: {
        id: me.id,
        type: inputType.value,
        email: inputEmail.value,
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

  ////// USEEFFECT //////
  useEffect(() => {
    if (me) {
      inputType.setValue(me.type);
      inputEmail.setValue(me.email);
      inputPassword.setValue(me.password);
      inputUserName.setValue(me.username);
      inputGender.setValue(me.gender);
      inputZoneCode.setValue(me.zoneCode);
      inputAddress.setValue(me.address);
      inputDetailAddress.setValue(me.detailAddress);
      inputIdType.setValue(me.idType);
      inputIdDate1.setValue(me.idDate1);
      inputIdDate2.setValue(me.idDate2);
      inputIdFilePath.setValue(me.idFilePath);
      inputIdFileOriginName.setValue(me.idFileOriginName);
      inputAddrType.setValue(me.addrType);
      inputAddrFilePath.setValue(me.addrFilePath);
      inputAddrFileOriginName.setValue(me.addrFileOriginName);
    }
  }, [me]);

  useEffect(() => {
    if (st_userIdImageFileDone) {
      if (fileType === 1) {
        inputIdFilePath.setValue(filePath);
        inputIdFileOriginName.setValue(fileOriginName);
      } else if (fileType === 2) {
        inputAddrFilePath.setValue(filePath);
        inputAddrFileOriginName.setValue(fileOriginName);
      }
    }
  }, [st_userIdImageFileDone]);

  useEffect(() => {
    if (st_userIdImageFileError) {
      message.error(st_userIdImageFileError);
    }
  }, [st_userIdImageFileError]);

  useEffect(() => {
    if (st_userFindPasswordConfirmDone) {
      if (secret) {
        message.success("이메일 인증이 완료되었습니다.");
        toggleAdressModalHandler();
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

  return (
    <ClientLayout>
      <div>Hello Info</div>

      <button onClick={toggleAdressModalHandler}>수정</button>

      <Modal
        visible={isModalVisible}
        onCancel={() => toggleAdressModalHandler()}>
        <Wrapper>
          <Input placeholder="Basic usage" {...inputSecret} />
          <Button onClick={sendEmailSecretCodeHandler}> Send code</Button>
        </Wrapper>
      </Modal>

      <Wrapper dr={`row`} al={`flex-start`}>
        <input
          type={`text`}
          placeholder={`inputIdFileOriginName`}
          readOnly
          value={inputIdFileOriginName.value}
        />

        <button
          kindOf={`check`}
          width={`90px`}
          height={`50px`}
          margin={`0 0 0 10px`}
          fontSize={width < 700 ? `15px` : `17px`}
          onClick={clickImageUpload}>
          첨부
        </button>

        <input
          type="file"
          name="image"
          accept=".png, .jpg"
          hidden
          ref={fileRef}
          onChange={(e) => onChangeImages(e, 1)}
        />
      </Wrapper>

      <Wrapper dr={`row`} al={`flex-start`}>
        <input
          type={`text`}
          placeholder={`inputAddrFileOriginName`}
          readOnly
          value={inputAddrFileOriginName.value}
        />

        <button
          kindOf={`check`}
          width={`90px`}
          height={`50px`}
          margin={`0 0 0 10px`}
          fontSize={width < 700 ? `15px` : `17px`}
          onClick={clickImageUpload}>
          첨부
        </button>

        <input
          type="file"
          name="image"
          accept=".png, .jpg"
          hidden
          ref={fileRef}
          onChange={(e) => onChangeImages(e, 2)}
        />
      </Wrapper>

      {/* <Modal
        fullWidth
        maxWidth={`sm`}
        visible={isModalVisible}
        onCancel={() => toggleAdressModalHandler()}>
        <Wrapper
          height={`32px`}
          al={`flex-end`}
          padding={`0 10px`}
          bgColor={`#eee`}>
          <Wrapper width={`auto`} cursor={`pointer`}>
            <CaretLeftOutlined
              size={18}
              onClick={() => toggleAdressModalHandler()}
            />
          </Wrapper>
        </Wrapper>

        <DaumPostCode
          onComplete={onCompleteHandler}
          width={width < 600 ? `100%` : `600px`}
          height={`450px`}
          autoClose
          animation
        />
      </Modal> */}
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
