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
              Android에서
              <Text padding={`0 5px`} fontWeight={`400`} color={`#ec5bac`}>
                MT4
              </Text>
              다운로드
            </Wrapper>
          </Wrapper>

          <Wrapper
            display={`block`}
            width={`auto`}
            margin={`15px 0 0`}
            fontWeight={`300`}
            lineHeight={`1.6`}
          >
            가장 신뢰할 수 있는 MT4 플랫폼은 성공적인 온라인 트레이딩을 위해
            <br />
            필요한 다양한 도구들을 제공하고 있습니다. 지금 등록하시고
            <Text display={`inline`} padding={`0 0 0 5px`} fontWeight={`500`}>
              빠른 주문 체결
            </Text>
            과<br />
            0핍부터 시작하는
            <Text display={`inline`} padding={`0 0 0 5px`} fontWeight={`500`}>
              저렴한 스프레드
            </Text>
            , 트레이더 중심의 친환경적인 플랫폼을 통해
            <br />
            성공적인 온라인 트레이딩을 경험할 수 있습니다.
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
              다운로드
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
              IOS에서
              <Text padding={`0 5px`} fontWeight={`400`} color={`#ec5bac`}>
                MT4
              </Text>
              다운로드
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
            가장 신뢰할 수 있는 MT4 플랫폼은 성공적인 온라인 트레이딩을 위해
            <br />
            필요한 다양한 도구들을 제공하고 있습니다. 지금 등록하시고
            <Text display={`inline`} padding={`0 0 0 5px`} fontWeight={`500`}>
              빠른 주문 체결
            </Text>
            과<br />
            0핍부터 시작하는
            <Text display={`inline`} padding={`0 0 0 5px`} fontWeight={`500`}>
              저렴한 스프레드
            </Text>
            , 트레이더 중심의 친환경적인 플랫폼을 통해
            <br />
            성공적인 온라인 트레이딩을 경험할 수 있습니다.
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
              다운로드
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
              업계를 선도
            </Text>
            하는 MT4 플랫폼으로 외환거래를 시작하세요
          </Wrapper>

          <Wrapper
            display={`block`}
            margin={`25px 0`}
            width={`auto`}
            textAlign={`center`}
            fontSize={`17px`}
          >
            업계 최고의 플랫폼으로 자리 매김 한 Metatrader4 거래
            플랫폼(MT4라고도 함)은
            <br />
            트레이더가 사용할 수 있는
            <Text display={`inline`} margin={`0 0 0 5px`} fontWeight={`700`}>
              가장 신뢰
            </Text>
            할 수 있는 플랫폼입니다.
            <br />
            사용자 친화적인 환경으로 온라인 거래 성과에 필요한 필수 도구와
            리소스를 제공합니다.
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
                  MT4의 기능 및
                  <Text display={`inline`} margin={`0 0 0 5px`}>
                    장점
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
