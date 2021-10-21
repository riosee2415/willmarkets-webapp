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

const Ecn = () => {
  return (
    <ClientLayout>
      <SubBanner />

      <Wrapper padding={`80px 0`} bgColor={`#eeeeee`}>
        <RsWrapper>
          <Wrapper display={`block`} width={`auto`} fontSize={`26px`}>
            <Text display={`inline`}>안정적인 ECN</Text>
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
              width={`300px`}>
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
              width={`300px`}>
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

      <Wrapper padding={`50px 0`} bgColor={`#eeeeee`}>
        <RsWrapper>
          <Wrapper fontSize={`24px`} fontWeight={`500`}>
            ECN과 DDE(Dealing Desk Environment) 비교하기
          </Wrapper>

          <Wrapper margin={`30px 0`} width={`750px`} bgColor={`#fff`}>
            <Wrapper
              dr={`row`}
              al={`normal`}
              padding={`6px 0`}
              borderTop={`1px solid #db4698`}
              borderBottom={`1px solid #db4698`}>
              <Wrapper
                width={`100px`}
                padding={`5px 10px`}
                fontSize={`18px`}
                fontWeight={`500`}
                color={`#dd459a`}>
                ECN
              </Wrapper>
              <Wrapper
                width={`100px`}
                padding={`5px 10px`}
                fontSize={`18px`}
                fontWeight={`500`}
                color={`#565656`}
                borderLeft={`1px solid #6f6f6f`}>
                DDE
              </Wrapper>
              <Wrapper
                width={`200px`}
                padding={`5px 10px`}
                fontSize={`18px`}
                fontWeight={`500`}
                color={`#565656`}
                borderLeft={`1px solid #6f6f6f`}>
                주요 기능
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                width={`calc(100% - 100px - 100px - 200px)`}
                padding={`5px 10px`}
                fontSize={`18px`}
                fontWeight={`500`}
                color={`#565656`}
                borderLeft={`1px solid #6f6f6f`}>
                설명
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              al={`normal`}
              padding={`6px 0`}
              borderBottom={`1px solid #db4698`}>
              <Wrapper width={`100px`} padding={`5px 10px`}>
                <Image
                  width={`44px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_agree.png`}
                />
              </Wrapper>
              <Wrapper
                width={`100px`}
                padding={`5px 10px`}
                borderLeft={`1px solid #6f6f6f`}>
                <Image
                  width={`44px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_disagree.png`}
                />
              </Wrapper>
              <Wrapper
                width={`200px`}
                padding={`5px 10px`}
                fontSize={`18px`}
                color={`#292929`}
                borderLeft={`1px solid #6f6f6f`}
                textAlign={`center`}>
                국제 은행에
                <br />
                직접 연결
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                width={`calc(100% - 100px - 100px - 200px)`}
                padding={`5px 10px`}
                fontSize={`15px`}
                color={`#292929`}
                borderLeft={`1px solid #6f6f6f`}>
                DDE(이하 딜링데스크)는 개개 트레이더의 포지션과 스타일을 알고
                있습니다. 때때로 딜링데스크는 고의적으로 시장으로부터의 연결을
                끊습니다. Willmarkets은 이런 부정거래를 절대 하지 않습니다.
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              al={`normal`}
              padding={`6px 0`}
              borderBottom={`1px solid #db4698`}>
              <Wrapper width={`100px`} padding={`5px 10px`}>
                <Image
                  width={`44px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_agree.png`}
                />
              </Wrapper>
              <Wrapper
                width={`100px`}
                padding={`5px 10px`}
                borderLeft={`1px solid #6f6f6f`}>
                <Image
                  width={`44px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_disagree.png`}
                />
              </Wrapper>
              <Wrapper
                width={`200px`}
                padding={`5px 10px`}
                fontSize={`18px`}
                color={`#292929`}
                borderLeft={`1px solid #6f6f6f`}
                textAlign={`center`}>
                Re-order
                <br />
                제공 요청
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                width={`calc(100% - 100px - 100px - 200px)`}
                padding={`5px 10px`}
                fontSize={`15px`}
                color={`#292929`}
                borderLeft={`1px solid #6f6f6f`}>
                주요 금융 뉴스의 발표 시간에 딜링데스크는 Iot 크기나 스타일의
                이유로 거래 처리를 하지 않습니다. Willmarkets은 이런 부정을
                저지르지 않습니다.
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              al={`normal`}
              padding={`6px 0`}
              borderBottom={`1px solid #db4698`}>
              <Wrapper width={`100px`} padding={`5px 10px`}>
                <Image
                  width={`44px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_disagree.png`}
                />
              </Wrapper>
              <Wrapper
                width={`100px`}
                padding={`5px 10px`}
                borderLeft={`1px solid #6f6f6f`}>
                <Image
                  width={`44px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_agree.png`}
                />
              </Wrapper>
              <Wrapper
                width={`200px`}
                padding={`5px 10px`}
                fontSize={`18px`}
                color={`#292929`}
                borderLeft={`1px solid #6f6f6f`}
                textAlign={`center`}>
                금융 뉴스 거래
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                width={`calc(100% - 100px - 100px - 200px)`}
                padding={`5px 10px`}
                fontSize={`15px`}
                color={`#292929`}
                borderLeft={`1px solid #6f6f6f`}>
                금융 뉴스 시간에 딜링데스크는 Iot 크기나 스타일의 이유로 거래
                처리를 하지 않습니다. Willmarkets은 이런 부정을 저지르지
                않습니다.
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              al={`normal`}
              padding={`6px 0`}
              borderBottom={`1px solid #db4698`}>
              <Wrapper width={`100px`} padding={`5px 10px`}>
                <Image
                  width={`44px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_agree.png`}
                />
              </Wrapper>
              <Wrapper
                width={`100px`}
                padding={`5px 10px`}
                borderLeft={`1px solid #6f6f6f`}>
                <Image
                  width={`44px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_disagree.png`}
                />
              </Wrapper>
              <Wrapper
                width={`200px`}
                padding={`5px 10px`}
                fontSize={`18px`}
                color={`#292929`}
                borderLeft={`1px solid #6f6f6f`}
                textAlign={`center`}>
                처리 지연
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                width={`calc(100% - 100px - 100px - 200px)`}
                padding={`5px 10px`}
                fontSize={`15px`}
                color={`#292929`}
                borderLeft={`1px solid #6f6f6f`}>
                때때로 딜링 데스크는 Order의 주문 처리지연을 통해 고객의 주문을
                처리하지 않습니다. Willmarkets은 이런 부정거래를 하지 않습니다.
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

export default Ecn;
