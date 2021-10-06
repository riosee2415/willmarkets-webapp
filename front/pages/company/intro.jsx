import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import styled from "styled-components";
import { Result, message } from "antd";
import useInput from "../../hooks/useInput";
import { emptyCheck } from "../../components/commonUtils";
import {} from "@ant-design/icons";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { END } from "redux-saga";
import axios from "axios";
import {
  ColWrapper,
  RowWrapper,
  Image,
  Wrapper,
  WholeWrapper,
  RsWrapper,
  Text,
  CommonButton,
} from "../../components/commonComponents";
import ClientLayout from "../../components/ClientLayout";
import Theme from "../../components/Theme";
import SubBanner from "../../components/SubBanner";

const Intro = () => {
  return (
    <ClientLayout>
      <SubBanner />

      <Wrapper padding={`100px 0 130px`}>
        <RsWrapper>
          <Wrapper
            dr={`row`}
            color={`#2c2c2c`}
            fontSize={`28px`}
            lineHeight={`1.4`}
          >
            <Text
              position={`relative`}
              top={`1px`}
              borderBottom={`1px solid #b45b8b`}
            >
              세계적인 금융 시장
            </Text>
            을 노리는 윌마켓
          </Wrapper>

          <Wrapper
            dr={`row`}
            margin={`40px 0 10px`}
            color={`#2c2c2c`}
            fontSize={`20px`}
            lineHeight={`1.4`}
          >
            세계적인 금융 및 IT 전문가들의 노하우와 기술력을 기반으로
            설립되었습니다.
            <Wrapper
              display={`inline`}
              width={`auto`}
              fontSize={`inherit`}
              color={`inherit`}
            >
              고객에게
              <Text
                display={`inline`}
                padding={`0 0 0 5px`}
                color={`inherit`}
                fontWeight={`700`}
              >
                최고의 금융서비스
              </Text>
              를 제공하고 함께 성장하며 나아가 금융시장 발전에 기여하고자 합니다
            </Wrapper>
          </Wrapper>

          <Wrapper color={`#7d7d7d`} fontWeight={`300`}>
            리스크 경고: 당사의 상품들은 증거금 및 고위험을 동반한 거래이고
            심각한 자산 손실을 초래할 수 있습니다.
            <br />
            고객 여러분에게 적합한 자산이 아닐 수 있으므로 상품과 관련된 모든
            위험에 대해 이해하신 후 거래하시길 바랍니다.
          </Wrapper>

          <Wrapper margin={`40px 0 0`}>
            <CommonButton
              padding={`0`}
              width={`160px`}
              height={`45px`}
              lineHeight={`43px`}
              color={`#fff`}
              hoverColor={`#e962ad`}
              bgColor={`#f977bf`}
              hoverBgColor={`#fff`}
              border={`1px solid #e962ad`}
              shadow={`1px 1px 5px #df59a3`}
              radius={`30px`}
              fontSize={`18px`}
              fontWeight={`500`}
            >
              거래 시작
            </CommonButton>
          </Wrapper>
        </RsWrapper>
      </Wrapper>

      <Wrapper color={`#fff`} bgColor={`#000105`}>
        <RsWrapper dr={`row`}>
          <Wrapper al={`flex-start`} width={`50%`} padding={`70px 0 60px`}>
            <Wrapper dr={`row`} width={`auto`} fontSize={`25px`}>
              윌마켓의 궁극적인
              <Text margin={`0 0 0 8px`} padding={`0 2px`} bgColor={`#ea5db1`}>
                목표
              </Text>
            </Wrapper>

            <Wrapper
              dr={`row`}
              width={`auto`}
              margin={`30px 0 0`}
              padding={`0 160px 0 0`}
              fontWeight={`300`}
            >
              Willmarkets은 리테일과 기업 고객 모두에게 최고의 트레이딩 환경을
              제공해드리는 것을 목표로 하고 있습니다.
              <br />
              또한 해외간의 거래 또한 유동적으로 이뤄지고 고객의 편의성에 맞춘
              글로벌 기업이 되려 합니다.
              <Wrapper display={`block`} width={`auto`}>
                이를 위해 Willmarkets은 고객님들께
                <Text
                  display={`inline`}
                  padding={`0 0 0 5px`}
                  fontWeight={`500`}
                >
                  안전한 거래 환경, 경쟁력 있는 스프레드, 빠른 업무지원
                </Text>
                을 제공해 드리고자 노력하고 있습니다.
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper width={`50%`}></Wrapper>
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

export default Intro;
