import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter, useRouter } from "next/router";
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
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import useWidth from "../../hooks/useWidth";
const Intro = () => {
  const router = useRouter();
  const width = useWidth();

  const { t } = useTranslation(["company_intro"]);

  const moveLinkHandler = useCallback((link) => {
    router.push(`${link}`);
  }, []);

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
            textAlign={`center`}
          >
            <Text position={`relative`} top={`1px`}>
              {t(`1`).split(`\n`)[0]}
            </Text>
            {t(`1`).split(`\n`)[1]}
          </Wrapper>

          <Wrapper
            dr={`row`}
            margin={`40px 0 10px`}
            color={`#2c2c2c`}
            fontSize={`20px`}
            lineHeight={`1.4`}
            textAlign={`center`}
          >
            {t(`2`)}
            <Wrapper
              display={`inline`}
              width={`auto`}
              fontSize={`inherit`}
              color={`inherit`}
            >
              {t(`3`).split(`\n`)[0]}
              <Text
                display={`inline`}
                padding={`0 0 0 5px`}
                color={`inherit`}
                fontWeight={`700`}
              >
                {t(`3`).split(`\n`)[1]}
              </Text>
              {t(`3`).split(`\n`)[2]}
            </Wrapper>
          </Wrapper>

          <Wrapper color={`#7d7d7d`} fontWeight={`300`}>
            {/* 리스크 경고: 당사의 상품들은 증거금 및 고위험을 동반한 거래이고
            심각한 자산 손실을 초래할 수 있습니다.
            <br />
            고객 여러분에게 적합한 자산이 아닐 수 있으므로 상품과 관련된 모든
            위험에 대해 이해하신 후 거래하시길 바랍니다. */}
          </Wrapper>

          <Wrapper margin={`40px 0 0`}>
            <CommonButton
              padding={`0`}
              width={`160px`}
              height={`45px`}
              lineHeight={`43px`}
              color={`#fff`}
              hoverColor={`#3353F2`}
              bgColor={`#3353F2`}
              hoverBgColor={`#fff`}
              border={`1px solid #3353F2`}
              shadow={`1px 1px 5px #3353F2`}
              radius={`30px`}
              fontSize={`18px`}
              fontWeight={`500`}
              onClick={() =>
                //  moveLinkHandler(`/signup`)
                window.open(`https://clients.will-markets.com`)
              }
            >
              {t(`4`)}
            </CommonButton>
          </Wrapper>
        </RsWrapper>
      </Wrapper>

      <Wrapper color={`#fff`} bgColor={`#000105`}>
        <RsWrapper dr={width < 900 ? `column` : `row`} al={`normal`}>
          <Wrapper
            textAlign={width < 900 ? `center` : ``}
            al={width < 900 ? `center` : `flex-start`}
            width={width < 900 ? `100%` : `50%`}
            padding={`70px 0 60px`}
            zIndex={`1`}
          >
            <Wrapper dr={`row`} width={`auto`} fontSize={`25px`}>
              {t(`5`).split(`\n`)[0]}
              <Text margin={`0 0 0 8px`} padding={`0 2px`} lineHeight={`1.3`}>
                {t(`5`).split(`\n`)[1]}
              </Text>
            </Wrapper>

            <Wrapper
              dr={`row`}
              width={`auto`}
              margin={`30px 0 0`}
              padding={width < 900 ? `0 20px 0` : `0 157px 0 0`}
              fontWeight={`300`}
            >
              {t(`6`)}
              <br />
              {t(`7`)}
              <Wrapper display={`block`} width={`auto`}>
                {t(`8`).split(`\n`)[0]}
                <Text
                  display={`inline`}
                  padding={`0 0 0 5px`}
                  fontWeight={`500`}
                >
                  {t(`8`).split(`\n`)[1]}
                </Text>
                {t(`8`).split(`\n`)[2]}
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper
            position={`relative`}
            width={width < 900 ? `100%` : `50%`}
            padding={`30px 0 0`}
          >
            <Wrapper
              position={`absolute`}
              top={width < 900 ? `-120px` : `-50px`}
              left={width < 900 ? `10px` : `-60px`}
              width={width < 500 ? `280px` : `auto`}
              zIndex={`0`}
            >
              <Image
                width={width < 500 ? `280px` : `auto`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/logo/logo_company.png`}
              />
            </Wrapper>

            <Wrapper
              position={`relative`}
              zIndex={`1`}
              width={width < 500 ? `280px` : `auto`}
              left={width < 900 ? `30px` : ``}
            >
              <Image
                width={width < 500 ? `280px` : `auto`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/introduce/image_worldwide.png`}
              />
            </Wrapper>
          </Wrapper>
        </RsWrapper>
      </Wrapper>

      <Wrapper color={`#282828`} bgColor={`#eeeeee`}>
        <RsWrapper dr={width < 700 ? `column-reverse` : `row`} al={`normal`}>
          <Wrapper
            position={`relative`}
            al={`flex-start`}
            width={width < 700 ? `320px` : `50%`}
            padding={width < 700 ? `20px 0` : `70px 0`}
          >
            <Wrapper
              position={`relative`}
              zIndex={`1`}
              width={width < 700 ? `320px` : `auto`}
            >
              <Image
                width={width < 700 ? `320px` : `auto`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/introduce/image_phone.png`}
              />
            </Wrapper>
          </Wrapper>

          <Wrapper
            al={`flex-end`}
            width={width < 700 ? `100%` : `50%`}
            padding={`70px 0 60px`}
          >
            <Wrapper
              dr={`row`}
              width={`auto`}
              fontSize={`25px`}
              fontWeight={`500`}
              lineHeight={`1.3`}
            >
              {t(`9`).split(`\n`)[0]}
              <Text margin={`0 0 0 8px`} padding={`0 2px`}>
                {t(`9`).split(`\n`)[1]}
              </Text>
            </Wrapper>

            <Wrapper
              dr={`row`}
              width={`auto`}
              margin={`30px 0 0`}
              padding={
                width < 800
                  ? "0 0 0 80px"
                  : i18next.language === `en`
                  ? `0 0 0 120px`
                  : `0 0 0 170px`
              }
              fontWeight={`300`}
              textAlign={`right`}
            >
              <Wrapper display={`block`} width={`auto`}>
                {t(`10`).split(`\n`)[0]}
                <Text
                  display={`inline`}
                  padding={`0 0 0 5px`}
                  fontWeight={`500`}
                >
                  {t(`10`).split(`\n`)[1]}
                </Text>
                {t(`10`).split(`\n`)[2]}
              </Wrapper>
              {t(`11`)}
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

export default Intro;
