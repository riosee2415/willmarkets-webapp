import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { END } from "redux-saga";
import axios from "axios";
import { RightOutlined } from "@ant-design/icons";
import {
  Image,
  Wrapper,
  RsWrapper,
  CommonButton,
  Text,
} from "../../components/commonComponents";
import ClientLayout from "../../components/ClientLayout";
import SubBanner from "../../components/SubBanner";
import { useTranslation } from "react-i18next";
import useWidth from "../../hooks/useWidth";

const Pc = () => {
  const { t } = useTranslation(["platform"]);

  const width = useWidth();

  return (
    <ClientLayout>
      <SubBanner />

      <Wrapper
        padding={`150px 0`}
        color={`#fff`}
        bgImg={`url('https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/back_download.png')`}>
        <RsWrapper al={width < 600 ? `center` : `flex-start`}>
          <Wrapper dr={width < 600 ? `column` : `row`} width={`auto`}>
            <Image
              width={`auto`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_windows.png`}
            />

            <Wrapper
              dr={`row`}
              padding={`0 10px`}
              width={`auto`}
              fontSize={`24px`}
              textAlign={width < 600 ? `center` : ``}>
              {t(`9`).split(`\n`)[0]}
              <Text padding={`0 5px`} fontWeight={`400`} color={`#6D7BFF`}>
                {t(`9`).split(`\n`)[1]}
              </Text>
              {t(`9`).split(`\n`)[2]}
            </Wrapper>
          </Wrapper>

          <Wrapper
            display={`block`}
            width={`auto`}
            margin={`15px 0 0`}
            fontWeight={`300`}
            lineHeight={`1.6`}
            textAlign={width < 600 ? `center` : `inherit`}>
            {t(`2`).split(`\n`)[0]}
            <br />
            {t(`10`).split(`\n`)[0]}
            <Text display={`inline`} padding={`0 0 0 5px`} fontWeight={`500`}>
              {t(`10`).split(`\n`)[1]}
            </Text>
            {t(`10`).split(`\n`)[2]}
            <br />
            {t(`10`).split(`\n`)[3]}
            <Text display={`inline`} padding={`0 0 0 5px`} fontWeight={`500`}>
              {t(`10`).split(`\n`)[4]}
            </Text>
            {t(`10`).split(`\n`)[5]}
            <br />
            {t(`10`).split(`\n`)[6]}
          </Wrapper>

          <Wrapper
            dr={width < 500 ? `column` : `row`}
            margin={`40px 0 0`}
            width={`auto`}>
            <CommonButton
              display={`flex`}
              padding={`0`}
              width={`160px`}
              height={`45px`}
              lineHeight={`43px`}
              fontSize={`17px`}
              fontWeight={`500`}
              color={`#FFFFFF`}
              bgColor={`#3353F2`}
              hoverBgColor={`#3353F2`}
              radius={`10px`}
              onClick={() =>
                window.open(
                  `https://download.mql5.com/cdn/web/20135/mt4/willmarkets4setup.exe`
                )
              }>
              {t(`4`).split(`\n`)[0]}
              <RightOutlined
                style={{ margin: `0 0 0 5px`, fontSize: `12px` }}
              />
            </CommonButton>

            {/* <CommonButton
              display={`flex`}
              padding={`0`}
              width={`160px`}
              height={`45px`}
              lineHeight={`43px`}
              fontSize={`17px`}
              fontWeight={`500`}
              color={`#FFFFFF`}
              bgColor={`#3353F2`}
              hoverBgColor={`#3353F2`}
              radius={`10px`}
              margin={width < 500 ? `20px 0 0` : `0 0 0 20px`}>
              {t(`4`).split(`\n`)[1]}
              <RightOutlined
                style={{ margin: `0 0 0 5px`, fontSize: `12px` }}
              />
            </CommonButton> */}
          </Wrapper>
        </RsWrapper>
      </Wrapper>

      <Wrapper
        padding={`100px 0 120px`}
        bgColor={`#eeeeee`}
        textAlign={`center`}>
        <RsWrapper>
          <Wrapper
            display={`block`}
            width={`auto`}
            fontSize={`28px`}
            fontWeight={`500`}>
            <Text display={`inline-block`} lineHeight={`1.3`}>
              {t(`7`).split(`\n`)[0]}
            </Text>
            {t(`7`).split(`\n`)[1]}
          </Wrapper>

          <Wrapper
            display={`block`}
            margin={`25px 0`}
            width={`auto`}
            textAlign={`center`}
            fontSize={`17px`}>
            {t(`8`).split(`\n`)[0]}
            <br />
            {t(`8`).split(`\n`)[1]}
            <Text display={`inline`} margin={`0 0 0 5px`} fontWeight={`700`}>
              {t(`8`).split(`\n`)[2]}
            </Text>
            {t(`8`).split(`\n`)[3]}
            <br />
            {t(`8`).split(`\n`)[4]}

            <br />
            {/* Willmarkets의 신뢰할 수 있는 MT4 플랫폼으로 외환 거래에 대해
            알아보십시오. */}
          </Wrapper>

          <Wrapper
            dr={width < 800 ? `column` : `row`}
            margin={`40px 0 70px`}
            padding={width < 800 ? `40px 0` : `40px 110px`}
            border={`1px solid #707072`}
            radius={`30px`}
            width={width < 800 ? `100%` : `auto`}
            bgColor={`#fff`}>
            <Wrapper width={`auto`}>
              <Image
                width={`auto`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_windows2.png`}
              />

              <Wrapper margin={`10px 0 0`} width={`auto`} fontWeight={`700`}>
                Windows
              </Wrapper>
            </Wrapper>

            <Wrapper width={`auto`} margin={`10px 100px`}>
              <Image
                width={`auto`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_android2.png`}
              />

              <Wrapper margin={`10px 0 0`} width={`auto`} fontWeight={`700`}>
                Android
              </Wrapper>
            </Wrapper>

            <Wrapper width={`auto`}>
              <Image
                width={`auto`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_ios2.png`}
              />

              <Wrapper margin={`10px 0 0`} width={`auto`} fontWeight={`700`}>
                Ios
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </RsWrapper>
      </Wrapper>

      <Wrapper padding={`0 0 20px`} color={`#fff`} bgColor={`#000105`}>
        <RsWrapper>
          <Wrapper position={`relative`} bottom={`120px`} width={`auto`}>
            <Image
              width={width < 800 ? `100%` : `auto`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/image_2phone.png`}
            />
          </Wrapper>

          <Wrapper
            dr={width < 800 ? `column` : `row`}
            al={width < 800 ? `center` : `normal`}
            position={`relative`}
            bottom={`50px`}>
            <Wrapper
              al={`flex-start`}
              ju={`flex-start`}
              width={width < 800 ? `100%` : `50%`}>
              <Wrapper
                textAlign={width < 800 ? `center` : ``}
                display={`block`}
                fontSize={width < 500 ? `22px` : `25px`}
                fontWeight={`500`}>
                {t(`15`).split(`\n`)[0]}
                <Text display={`inline`} margin={`0 0 0 5px`} color={`#3353F2`}>
                  {t(`15`).split(`\n`)[1]}
                </Text>
              </Wrapper>

              <Wrapper margin={`30px 0 0`} width={`auto`} lineHeight={`1.6`}>
                {/* IronFX는 MT4 거래의 선구자입니다.
                <br />
                쉬운 사용성 및 설치 Windows 외에도 복잡한 전략을
                <br />
                구현할 수 있습니다. 기능의 이점을 누리고 가격 변동을 따르고
                <br />
                차트에서 추측하면서 트렌드를 따라 자신의 위치를 찾을 수
                있습니다. */}
              </Wrapper>
            </Wrapper>

            <Wrapper
              al={`flex-start`}
              ju={`flex-start`}
              width={width < 800 ? `80%` : `50%`}>
              <Wrapper
                dr={`row`}
                al={`flex-start`}
                margin={`0 0 20px`}
                width={`auto`}
                wrap={`nowrap`}
                fontSize={width < 500 ? `14px` : `1rem`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={width < 500 ? `30px` : `auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_check.png`}
                />
                {t(`16`)}
              </Wrapper>

              <Wrapper
                dr={`row`}
                al={`flex-start`}
                margin={`0 0 20px`}
                width={`auto`}
                wrap={`nowrap`}
                fontSize={width < 500 ? `14px` : `1rem`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={width < 500 ? `30px` : `auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_check.png`}
                />
                {t(`17`)}
              </Wrapper>

              <Wrapper
                dr={`row`}
                al={`flex-start`}
                margin={`0 0 20px`}
                width={`auto`}
                wrap={`nowrap`}
                fontSize={width < 500 ? `14px` : `1rem`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={width < 500 ? `30px` : `auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_check.png`}
                />
                {t(`18`)}
              </Wrapper>

              <Wrapper
                dr={`row`}
                al={`flex-start`}
                margin={`0 0 20px`}
                width={`auto`}
                wrap={`nowrap`}
                fontSize={width < 500 ? `14px` : `1rem`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={width < 500 ? `30px` : `auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_check.png`}
                />
                {t(`19`)}
              </Wrapper>

              <Wrapper
                dr={`row`}
                al={`flex-start`}
                margin={`0 0 20px`}
                width={`auto`}
                wrap={`nowrap`}
                fontSize={width < 500 ? `14px` : `1rem`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={width < 500 ? `30px` : `auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_check.png`}
                />
                {t(`20`)}
              </Wrapper>

              <Wrapper
                dr={`row`}
                al={`flex-start`}
                margin={`0 0 20px`}
                width={`auto`}
                wrap={`nowrap`}
                fontSize={width < 500 ? `14px` : `1rem`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={width < 500 ? `30px` : `auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_check.png`}
                />
                {t(`21`)}
              </Wrapper>

              <Wrapper
                dr={`row`}
                al={`flex-start`}
                margin={`0 0 20px`}
                width={`auto`}
                wrap={`nowrap`}
                fontSize={width < 500 ? `14px` : `1rem`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={width < 500 ? `30px` : `auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_check.png`}
                />
                {t(`22`)}
              </Wrapper>

              <Wrapper
                dr={`row`}
                al={`flex-start`}
                margin={`0 0 20px`}
                width={`auto`}
                wrap={`nowrap`}
                fontSize={width < 500 ? `14px` : `1rem`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={width < 500 ? `30px` : `auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_check.png`}
                />
                {t(`23`)}
              </Wrapper>

              <Wrapper
                dr={`row`}
                al={`flex-start`}
                margin={`0 0 20px`}
                width={`auto`}
                wrap={`nowrap`}
                fontSize={width < 500 ? `14px` : `1rem`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={width < 500 ? `30px` : `auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_check.png`}
                />
                {t(`24`)}
              </Wrapper>

              <Wrapper
                dr={`row`}
                al={`flex-start`}
                margin={`0 0 20px`}
                width={`auto`}
                wrap={`nowrap`}
                fontSize={width < 500 ? `14px` : `1rem`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={width < 500 ? `30px` : `auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_check.png`}
                />
                {t(`25`)}
              </Wrapper>

              <Wrapper
                dr={`row`}
                al={`flex-start`}
                margin={`0 0 20px`}
                width={`auto`}
                wrap={`nowrap`}
                fontSize={width < 500 ? `14px` : `1rem`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={width < 500 ? `30px` : `auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_check.png`}
                />
                {t(`26`)}
              </Wrapper>

              <Wrapper
                dr={`row`}
                al={`flex-start`}
                margin={`0 0 20px`}
                width={`auto`}
                wrap={`nowrap`}
                fontSize={width < 500 ? `14px` : `1rem`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={width < 500 ? `30px` : `auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_check.png`}
                />
                {t(`27`)}
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

export default Pc;
