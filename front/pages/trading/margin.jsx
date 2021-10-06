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

const Margin = () => {
  return (
    <ClientLayout>
      <SubBanner />

      <Wrapper padding={`80px 0`} bgColor={`#eeeeee`}>
        <RsWrapper>
          <Wrapper display={`block`} width={`auto`} fontSize={`30px`}>
            <Text
              display={`inline`}
              margin={`0 0 0 5px`}
              borderBottom={`1.5px solid #ff98d4`}
            >
              마진
            </Text>
            과
            <Text
              display={`inline`}
              margin={`0 0 0 5px`}
              borderBottom={`1.5px solid #ff98d4`}
            >
              레버리지
            </Text>
          </Wrapper>

          <Wrapper margin={`40px 0 0`} width={`auto`}>
            <Image
              width={`auto`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/image_ecn.png`}
            />
          </Wrapper>
        </RsWrapper>
      </Wrapper>

      <Wrapper padding={`60px 0`} color={`#fff`} bgColor={`#000105`}>
        <RsWrapper>
          <Wrapper display={`block`} width={`auto`} fontSize={`26px`}>
            <Text display={`inline`} padding={`0 0 0 5px`} color={`#ff50b0`}>
              마진
            </Text>
            이란 무엇일까요?
          </Wrapper>

          <Wrapper
            margin={`30px 0 50px`}
            textAlign={`center`}
            lineHeight={`1.8`}
          >
            마진과 레버리지는 외환거래에서 매우 밀접한 관계를 가지고 있습니다.
            <br />
            마진은 레버리지를 이용한 거래를 하고자 할 때 필요한 증거금을
            의미합니다.
            <br />
            예를 들어, 필요마진(Required Margin) 1%는 $1,000,000
            <br />
            거래 시 $10,000의 증거금이 필요하다는 의미입니다.
          </Wrapper>

          <Wrapper display={`block`} width={`auto`} fontSize={`26px`}>
            <Text display={`inline`} padding={`0 0 0 5px`} color={`#ff50b0`}>
              레버리지
            </Text>
            란 무엇일까요?
          </Wrapper>

          <Wrapper margin={`30px 0 0`} textAlign={`center`} lineHeight={`1.8`}>
            레버리지는 거래 시 브로커로부터 빌릴 수 있는 금액의 비율을
            의미합니다.
            <br />
            일반적으로 주식시장에서 주당 10달러짜리 100주를 매수를 한다고 했을
            때,
            <br />
            1,000달러가 필요합니다. 이때 주식브로커가 주식대금 중 50%를 빌려주고
            <br />
            거래를 지원 한다면, 500달러만으로 주당10달러짜리 100주를 매수하는
            <br />
            것이 가능해집니다. 이러한 방식으로 트레이더가 보유한 자금 이상으로
            <br />
            거래할 수 있도록 지원하는 것이 레버리지입니다.
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

export default Margin;
