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

const Time = () => {
  return (
    <ClientLayout>
      <SubBanner />

      <Wrapper padding={`80px 0`} bgColor={`#eeeeee`}>
        <RsWrapper>
          <Wrapper display={`block`} width={`auto`} fontSize={`30px`}>
            <Text display={`inline`}>거래시간</Text>
          </Wrapper>

          <Wrapper margin={`40px 0 20px`} width={`auto`}>
            <Image
              width={`auto`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/image_ecn.png`}
            />
          </Wrapper>

          <Wrapper width={`auto`} textAlign={`center`}>
            시장은 잠들지 않습니다. 하나의 주요 forex 장이 마감되면, 또 다른
            장이 열립니다.
            <br />
            예를 들어, GMT에 따라 forex 거래시간은 다음과 같이 움직입니다.
            <br />
            <br />
            01:00 pm – 10:00 pm GMT 사이에 뉴욕에서 거래가 가능합니다.
            <br />
            10:00 pm GMT에는 시드니 환시가 열립니다.
            <br />
            도쿄 환시는 00:00 am에 시작하여 9:00 am GMT에 마감합니다.
            <br />
            순환의 고리를 완벽히 하기 위해 런던 장은 8:00 am에 시작하여 5:00 pm
            GMT에 마감합니다.
            <br />
            이러한 거래 시간은 모든 대륙의 중앙은행들의 참여와 함께 전세계의
            <br />
            브로커들이 매일 24시간 온라인으로 거래할 수 있도록 해줍니다.
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

export default Time;
