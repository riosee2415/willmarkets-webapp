import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, useRouter } from "next/router";
import styled from "styled-components";
import { Result, message, Card, button, Avatar, Button, Input } from "antd";
import useInput from "../../hooks/useInput";
import useOnlyNumberInput from "../../hooks/useOnlyNumberInput";
import { emptyCheck } from "../../components/commonUtils";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST, USER_ME_REQUEST } from "../../reducers/user";
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
import { LIVE_ACCOUNT_CREATE_REQUEST } from "../../reducers/liveAccount";

const AddLive = () => {
  const router = useRouter();

  const [currentTab, setCurrentTab] = useState(0);
  const [currentFocus, setCurrentFocus] = useState(-1);
  const [testTab, setTab] = useState(0);

  console.log(testTab, router);

  const { me } = useSelector((state) => state.user);

  const { st_liveAccountCreateDone, st_liveAccountCreateError } = useSelector(
    (state) => state.liveAccount
  );
  const dispatch = useDispatch();
  const inputBank = useInput("");
  const inputPlatform = useInput("MetaTrader 4");
  const inputType = useInput("Aaccount");
  const inputLeverage = useInput("");
  const inputTragePassword = useInput("");
  const inputViewPassword = useInput("");

  console.log(inputTragePassword, inputViewPassword);

  const liveAccountCreateSubmit = useCallback(() => {
    if (!emptyCheck(inputTragePassword.value)) {
      return message.error("거래 비밀번호를 입력해주세요.");
    }
    if (!emptyCheck(inputViewPassword.value)) {
      return message.error("보기 비밀번호를 입력해주세요.");
    }

    dispatch({
      type: LIVE_ACCOUNT_CREATE_REQUEST,
      data: {
        userId: me.id,
        bankNo: inputBank.value,
        platform: inputPlatform.value,
        type: inputType.value,
        leverage: inputLeverage.value,
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

  const lerverageHanlder = (value) => {
    console.log(value);
    if (value === "1:200") {
      inputLeverage.setValue(value);
    } else if (value === "1:300") {
      inputLeverage.setValue(value);
    } else if (value === "1:500") {
      inputLeverage.setValue(value);
    }
  };

  console.log(inputType.value, "aaaa");

  useEffect(() => {
    if (st_liveAccountCreateDone) {
      dispatch({
        type: USER_ME_REQUEST,
      });

      inputTragePassword.setValue("");
      inputViewPassword.setValue("");
      setCurrentFocus(-1);

      message.success("라이브 계좌가 생성되었습니다.");

      // setCurrentTab()
    }
  }, [st_liveAccountCreateDone]);

  useEffect(() => {
    if (st_liveAccountCreateError) {
      message.error(st_liveAccountCreateError);
    }
  }, [st_liveAccountCreateError]);

  return (
    <ClientLayout>
      <div>Hello AddLive</div>

      <Wrapper onClick={() => setCurrentTab(1)} cursor={`pointer`}>
        <PlusCircleOutlined />
      </Wrapper>

      <Wrapper>
        <Wrapper>
          <label>거래 플랫폼</label>
        </Wrapper>
        <Wrapper>
          <div onClick={() => platformHandler("MetaTrader 4")}>
            MetaTrader 4
          </div>
        </Wrapper>
      </Wrapper>

      <Wrapper dr={`row`}>
        <Wrapper>
          <label>계좌유형</label>
        </Wrapper>
        <div onClick={() => AccountTypeHandler("STP Account")}>STP Account</div>
        <div onClick={() => AccountTypeHandler("ECN Account")}>ECN Account</div>
        <div onClick={() => AccountTypeHandler("Myfxbook AutoTrade")}>
          Myfxbook AutoTrade
        </div>
      </Wrapper>
      <Wrapper>
        <Wrapper>
          <label>레버리지</label>
        </Wrapper>

        {testTab === 0 ? (
          <Wrapper dr={`row`}>
            <Wrapper margin={`10px`} width={`auto`}>
              <div onClick={() => lerverageHanlder(`1:500`)}>1:500</div>
            </Wrapper>
            <Wrapper width={`auto`}>
              <div onClick={() => lerverageHanlder(`1:200`)}>1:200</div>
            </Wrapper>
          </Wrapper>
        ) : (
          <Wrapper dr={`row`}>
            <Wrapper width={`auto`}>
              <div onClick={() => lerverageHanlder(`1:300`)}>1:300</div>
            </Wrapper>
          </Wrapper>
        )}
      </Wrapper>

      <Wrapper>
        <Input style={{ width: `20%` }} {...inputTragePassword} />
        <Input style={{ width: `20%` }} {...inputViewPassword} />

        <Button type="primary" danger onClick={liveAccountCreateSubmit}>
          계좌 계설
        </Button>
      </Wrapper>
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

export default AddLive;
