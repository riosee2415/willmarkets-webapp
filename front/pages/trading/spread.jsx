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

const Spread = () => {
  return (
    <ClientLayout>
      <SubBanner />

      <Wrapper padding={`80px 0`} bgColor={`#eeeeee`}>
        <RsWrapper>
          <Wrapper display={`block`} width={`auto`} fontSize={`26px`}>
            <Text display={`inline`}>스프레드</Text>와
            <Text display={`inline`} margin={`0 0 0 5px`}>
              스왑
            </Text>
          </Wrapper>

          <Wrapper margin={`40px 0 20px`} width={`auto`}>
            <Image
              width={`auto`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/image_ecn.png`}
            />
          </Wrapper>

          <Wrapper width={`auto`} textAlign={`center`}>
            매도가(Bid)와 매수가(Ask)의 가격 차이를 "스프레드"라고 합니다.
            <br />
            예를 들어, EUR/USD의 Bid 가격이 1.28000, Ask 가격이 1.28017일 때
            <br />그 차이인 1.7 pip이 당시 스프레드입니다. Willmarkets을
            이용하시는 고객님들은
            <br />
            OTC시장에서 가장 경쟁력 높은 스프레드를 통하여 거래를 하실 수
            있습니다.
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

export default Spread;
