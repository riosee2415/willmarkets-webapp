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

const Mobile = () => {
  const { t } = useTranslation(["platform_mobile"]);

  return (
    <ClientLayout>
      <SubBanner />

      <Wrapper
        padding={`150px 0`}
        color={`#fff`}
        bgImg={`url('https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/back_mobile1_download.png')`}
      >
        <RsWrapper al={`flex-start`}>
          <Wrapper dr={`row`} width={`auto`}>
            <Image
              width={`auto`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_android.png`}
            />

            <Wrapper
              dr={`row`}
              padding={`0 10px`}
              width={`auto`}
              fontSize={`24px`}
            >
              {t(`1`).split(`\n`)[0]}
              <Text padding={`0 5px`} fontWeight={`400`} color={`#ec5bac`}>
                {t(`1`).split(`\n`)[1]}
              </Text>
              {t(`1`).split(`\n`)[2]}
            </Wrapper>
          </Wrapper>

          <Wrapper
            display={`block`}
            width={`auto`}
            margin={`15px 0 0`}
            fontWeight={`300`}
            lineHeight={`1.6`}
          >
            {t(`2`).split(`\n`)[0]}
            <br />
            {t(`2`).split(`\n`)[1]} {t(`3`).split(`\n`)[0]}
            <Text display={`inline`} padding={`0 0 0 5px`} fontWeight={`500`}>
              {t(`3`).split(`\n`)[1]}
            </Text>
            {t(`3`).split(`\n`)[2]}
            <br />
            {t(`3`).split(`\n`)[3]}
            <Text display={`inline`} padding={`0 0 0 5px`} fontWeight={`500`}>
              {t(`3`).split(`\n`)[4]}
            </Text>
            {t(`3`).split(`\n`)[5]}
            <br />
            {t(`3`).split(`\n`)[6]}
          </Wrapper>

          <Wrapper margin={`40px 0 0`} width={`auto`}>
            <CommonButton
              display={`flex`}
              padding={`0`}
              width={`160px`}
              height={`45px`}
              lineHeight={`43px`}
              fontSize={`18px`}
              fontWeight={`500`}
              color={`#2a2925`}
              bgColor={`#f9e96f`}
              hoverBgColor={`#fae648`}
              radius={`10px`}
            >
              {t(`4`)}
              <RightOutlined
                style={{ margin: `0 0 0 5px`, fontSize: `12px` }}
              />
            </CommonButton>
          </Wrapper>
        </RsWrapper>
      </Wrapper>

      <Wrapper
        padding={`150px 0`}
        color={`#fff`}
        bgImg={`url('https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/back_mobile2_download.png')`}
      >
        <RsWrapper al={`flex-end`}>
          <Wrapper dr={`row`} width={`auto`}>
            <Wrapper
              dr={`row`}
              padding={`0 10px`}
              width={`auto`}
              fontSize={`24px`}
            >
              {t(`5`).split(`\n`)[0]}
              <Text padding={`0 5px`} fontWeight={`400`} color={`#ec5bac`}>
                {t(`5`).split(`\n`)[1]}
              </Text>
              {t(`5`).split(`\n`)[2]}
            </Wrapper>

            <Image
              width={`auto`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_ios.png`}
            />
          </Wrapper>

          <Wrapper
            display={`block`}
            width={`auto`}
            margin={`15px 0 0`}
            fontWeight={`300`}
            lineHeight={`1.6`}
            textAlign={`right`}
          >
            {t(`2`).split(`\n`)[0]}
            <br />
            {t(`2`).split(`\n`)[1]} {t(`3`).split(`\n`)[0]}
            <Text display={`inline`} padding={`0 0 0 5px`} fontWeight={`500`}>
              {t(`3`).split(`\n`)[1]}
            </Text>
            {t(`3`).split(`\n`)[2]}
            <br />
            {t(`3`).split(`\n`)[3]}
            <Text display={`inline`} padding={`0 0 0 5px`} fontWeight={`500`}>
              {t(`3`).split(`\n`)[4]}
            </Text>
            {t(`3`).split(`\n`)[5]}
            <br />
            {t(`3`).split(`\n`)[6]}
          </Wrapper>

          <Wrapper margin={`40px 0 0`} width={`auto`}>
            <CommonButton
              display={`flex`}
              padding={`0`}
              width={`160px`}
              height={`45px`}
              lineHeight={`43px`}
              fontSize={`18px`}
              fontWeight={`500`}
              color={`#2a2925`}
              bgColor={`#f9e96f`}
              hoverBgColor={`#fae648`}
              radius={`10px`}
            >
              {t(`4`)}
              <RightOutlined
                style={{ margin: `0 0 0 5px`, fontSize: `12px` }}
              />
            </CommonButton>
          </Wrapper>
        </RsWrapper>
      </Wrapper>

      <Wrapper padding={`100px 0 120px`} bgColor={`#eeeeee`}>
        <RsWrapper>
          <Wrapper
            display={`block`}
            width={`auto`}
            fontSize={`28px`}
            fontWeight={`500`}
          >
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
            fontSize={`17px`}
          >
            {t(`8`).split(`\n`)[0]}
            <br />
            {t(`8`).split(`\n`)[1]}
            <Text display={`inline`} margin={`0 0 0 5px`} fontWeight={`700`}>
              {t(`8`).split(`\n`)[2]}
            </Text>
            {t(`8`).split(`\n`)[3]}
            <br />
            {t(`8`).split(`\n`)[4]}
            {/* <br />
            Willmarkets의 신뢰할 수 있는 MT4 플랫폼으로 외환 거래에 대해
            알아보십시오. */}
          </Wrapper>

          <Wrapper
            dr={`row`}
            margin={`40px 0 70px`}
            padding={`40px 110px`}
            border={`1px solid #707072`}
            radius={`30px`}
            width={`auto`}
            bgColor={`#fff`}
          >
            <Wrapper width={`auto`}>
              <Image
                width={`auto`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_windows2.png`}
              />

              <Wrapper margin={`10px 0 0`} width={`auto`} fontWeight={`700`}>
                Windows
              </Wrapper>
            </Wrapper>

            <Wrapper width={`auto`} margin={`0 100px`}>
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
              width={`auto`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/image_2phone.png`}
            />
          </Wrapper>

          <Wrapper
            dr={`row`}
            al={`normal`}
            position={`relative`}
            bottom={`50px`}
          >
            <Wrapper al={`flex-start`} ju={`space-between`} width={`50%`}>
              <Wrapper al={`flex-start`} width={`auto`}>
                <Wrapper display={`block`} fontSize={`25px`} fontWeight={`500`}>
                  {t(`9`).split(`\n`)[0]}
                  <Text display={`inline`} margin={`0 0 0 5px`}>
                    {t(`9`).split(`\n`)[1]}
                  </Text>
                </Wrapper>

                <Wrapper
                  margin={`20px 0 50px`}
                  width={`auto`}
                  lineHeight={`1.8`}
                >
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

              <Wrapper al={`flex-start`} width={`auto`}>
                <Wrapper dr={`row`} margin={`0 0 20px`} width={`auto`}>
                  <Image
                    margin={`0 10px 0 0`}
                    width={`auto`}
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                  />
                  주문, 포지션, 주식 및 익스포져의 온라인 관리
                </Wrapper>

                <Wrapper dr={`row`} margin={`0 0 20px`} width={`auto`}>
                  <Image
                    margin={`0 10px 0 0`}
                    width={`auto`}
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                  />
                  EA(시스템 매매), 내장된 거래지표 및 맞춤형 거래지표 사용 가능
                </Wrapper>

                <Wrapper dr={`row`} margin={`0 0 20px`} width={`auto`}>
                  <Image
                    margin={`0 10px 0 0`}
                    width={`auto`}
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                  />
                  온라인 뉴스 및 매매 리포트
                </Wrapper>

                <Wrapper dr={`row`} margin={`0 0 20px`} width={`auto`}>
                  <Image
                    margin={`0 10px 0 0`}
                    width={`auto`}
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                  />
                  테크니컬 분석. 다중 계정 관리
                </Wrapper>

                <Wrapper dr={`row`} margin={`0 0 20px`} width={`auto`}>
                  <Image
                    margin={`0 10px 0 0`}
                    width={`auto`}
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                  />
                  모든 매매 기록 보존. 모든 체결 모드 지원
                </Wrapper>

                <Wrapper dr={`row`} margin={`0 0 20px`} width={`auto`}>
                  <Image
                    margin={`0 10px 0 0`}
                    width={`auto`}
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                  />
                  테크니컬 및 펀더멘털 분석
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper al={`flex-start`} ju={`flex-start`} width={`50%`}>
              <Wrapper dr={`row`} margin={`0 0 20px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                실시간 종목 모니터링
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 20px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                50가지 지표의 기술적 분석 및 차트 도구
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 20px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                20가지 거래지표의 기술적 분석 및 차트 도구가 완벽히 구축
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 20px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                다수의 많은 주문을 관리
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 20px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                다양한 맞춤형 지표 및 여러 시간대 생성 가능
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 20px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                거래 내역 데이터 관리 및 데이터 내보내기/불러오기 기능
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 20px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                데이터 백업 및 보안 철저
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 20px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                내부 메일 관리 시스템
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 20px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                실시간 종목가격 모니터
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 20px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                테크니컬 및 펀더멘털 분석
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 20px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                헷지거래 가능. 원-클릭 거래
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

export default Mobile;
