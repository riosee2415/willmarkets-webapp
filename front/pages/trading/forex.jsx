import React from "react";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { END } from "redux-saga";
import axios from "axios";
import {} from "@ant-design/icons";
import {
  Image,
  Wrapper,
  RsWrapper,
  Text,
} from "../../components/commonComponents";
import ClientLayout from "../../components/ClientLayout";
import SubBanner from "../../components/SubBanner";

const Forex = () => {
  return (
    <ClientLayout>
      <SubBanner />

      <Wrapper padding={`80px 0`} bgColor={`#eeeeee`}>
        <RsWrapper>
          <Wrapper display={`block`} width={`auto`} fontSize={`30px`}>
            외환
            <Text display={`inline`} margin={`0 0 0 5px`}>
              (FOREX)
            </Text>
          </Wrapper>

          <Wrapper margin={`40px 0 20px`} width={`auto`}>
            <Image
              width={`auto`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/image_ecn.png`}
            />
          </Wrapper>

          <Wrapper width={`auto`} textAlign={`center`}>
            전 세계에서 일거래 기준 5조 달러 이상 거래되는 Forex 시장은 가장 큰
            국제금융시장입니다.
            <br />각 국의 중앙은행과 상업은행, 기관 투자자 및 금융기관, 기업과
            개인이 손쉽게 시장에
            <br />
            참여하여 주말과 공휴일을 제외한 주 5일 24시간 거래가 이루어 집니다.
          </Wrapper>
        </RsWrapper>
      </Wrapper>

      <Wrapper padding={`60px 0`} color={`#fff`} bgColor={`#000105`}>
        <RsWrapper>
          <Wrapper display={`block`} width={`auto`} fontSize={`26px`}>
            <Text display={`inline`} padding={`0 0 0 5px`} color={`#ff50b0`}>
              통화쌍
            </Text>
            이란 무엇일까요?
          </Wrapper>

          <Wrapper margin={`30px 0 0`} textAlign={`center`} lineHeight={`1.8`}>
            어떠한 통화쌍의 첫번째 나타나는 통화를 '기준통화'라고 일컬으며,
            <br />
            두번째의 통화를 '상대통화'라고 합니다. 어떠한 통화쌍을
            <br />
            사고 팔 때 기준통화를 기초로 하여 거래가 이루어집니다.
          </Wrapper>

          <Wrapper dr={`row`} al={`normal`} margin={`40px 0 0`}>
            <Wrapper al={`flex-start`} ju={`flex-start`} width={`520px`}>
              <Wrapper dr={`row`} margin={`0 0 15px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                메인 통화쌍
              </Wrapper>

              <Wrapper padding={`0 0 0 40px`} color={`#e4e4e4`}>
                메인 통화쌍은 전세계적으로 거래량이 가장 많기 때문에 유동성 또한
                크며, Forex시장에서 가장 널리 거래되는 통화쌍입니다. 
              </Wrapper>

              <Wrapper padding={`15px 0 0 40px`} color={`#e4e4e4`}>
                통화 간의 조합(EUR/USD, USD/JPY, GBP/USD and USD/CHF)으로
                이루어지며, Forex시장에서의 대부분의 거래량을 차지하고 있습니다.
              </Wrapper>

              <Wrapper padding={`15px 0 0 40px`} color={`#e4e4e4`}>
                이런 메인 통화쌍들은 거래량이 많고 유동성이 풍부하므로 다른
                통화쌍에 비해 낮은 스프레드를 갖는 특성이 있습니다.
              </Wrapper>

              <Wrapper dr={`row`} margin={`30px 0 15px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                마이너 통화쌍
              </Wrapper>

              <Wrapper padding={`0 0 0 40px`} color={`#e4e4e4`}>
                마이너 통화쌍은 USD가 포함되어 있지 않지만, EUR, JPY, GBP, CHF,
                AUD, CAD 및 NZD 통화들로 구성된 통화쌍들을 의미합니다. 
              </Wrapper>

              <Wrapper dr={`row`} margin={`30px 0 15px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                이색 통화쌍
              </Wrapper>

              <Wrapper padding={`0 0 0 40px`} color={`#e4e4e4`}>
                이색 통화쌍은 거래량이 상대적으로 적은 통화가 포함되며, 메인
                통화쌍 대비 스프레드가 높습니다. 
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
