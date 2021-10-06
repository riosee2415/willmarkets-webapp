import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
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
  Text,
} from "../../components/commonComponents";
import ClientLayout from "../../components/ClientLayout";
import Theme from "../../components/Theme";
import SubBanner from "../../components/SubBanner";

const Forex = () => {
  return (
    <ClientLayout>
      <SubBanner />

      <Wrapper padding={`80px 0`} bgColor={`#eeeeee`}>
        <RsWrapper>
          <Wrapper display={`block`} width={`auto`} fontSize={`26px`}>
            <Text display={`inline`} borderBottom={`1.5px solid #ff98d4`}>
              안정적인 ECN
            </Text>
            으로 거래해보세요
          </Wrapper>

          <Wrapper margin={`40px 0 20px`} width={`auto`}>
            <Image
              width={`auto`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/image_ecn.png`}
            />
          </Wrapper>

          <Wrapper width={`auto`} textAlign={`center`}>
            ECN(Electronic Communication Network)은 일반 고객님들이
            <br />
            기관/증권사들이 제공받는 가장 전문적인 ECN 계정의 거래 조건을
            <br />
            제공 받으실 수 있습니다. ECN 계정은 낮은 스프레드와 낮은
            <br />
            수수료로 고객님들의 거래에 최적화된 환경을 제공합니다.
          </Wrapper>
        </RsWrapper>
      </Wrapper>

      <Wrapper padding={`60px 0 40px`} color={`#fff`} bgColor={`#000105`}>
        <RsWrapper>
          <Wrapper display={`block`} width={`auto`} fontSize={`26px`}>
            왜
            <Text display={`inline`} padding={`0 0 0 5px`} color={`#ff50b0`}>
              ECN
            </Text>
            으로 거래할까요?
          </Wrapper>

          <Wrapper dr={`row`} al={`normal`} margin={`60px 0 0`}>
            <Wrapper
              al={`flex-start`}
              ju={`flex-start`}
              margin={`0 60px`}
              width={`300px`}
            >
              <Wrapper dr={`row`} margin={`0 0 30px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                스프레드 : 0.1pip 부터
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 30px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                Spot Gold : 2pip 부터
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 30px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                레버리지 : 200:1 까지 선택 가능
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 30px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                최소 입금금액 : US$2,000
              </Wrapper>
            </Wrapper>

            <Wrapper
              al={`flex-start`}
              ju={`flex-start`}
              margin={`0 60px`}
              width={`300px`}
            >
              <Wrapper dr={`row`} margin={`0 0 30px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                햇지 거래 : 가능
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 30px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                최소 거래랏 : 0.1 랏부터
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 30px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                수수료 : 0.3 pip/Lot
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </RsWrapper>
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

export default Forex;
