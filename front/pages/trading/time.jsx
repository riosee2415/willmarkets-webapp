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
import { useTranslation } from "react-i18next";
import useWidth from "../../hooks/useWidth";

const Time = () => {
  const { t } = useTranslation(["trading_time"]);

  const width = useWidth();

  return (
    <ClientLayout>
      <SubBanner />

      <Wrapper padding={`80px 0`} bgColor={`#eeeeee`}>
        <Wrapper>
          <Wrapper display={`block`} width={`auto`} fontSize={`30px`}>
            <Text display={`inline`}>{t(`1`)}</Text>
          </Wrapper>

          <Wrapper
            dr={width < 700 ? `column` : `row`}
            ju={`flex-start`}
            margin={width < 700 ? `0` : `50px 0 0 0`}
          >
            <Wrapper
              margin={`40px 0 20px`}
              width={width < 700 ? `330px` : `50%`}
            >
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/image_7.png`}
              />
            </Wrapper>

            <Wrapper
              width={`40%`}
              margin={width < 700 ? `0` : `0 0 0 60px`}
              textAlign={`center`}
            >
              {t(`2`)}
              <br />
              {t(`3`)}
              <br />
              <br />
              {t(`4`)}
              <br />
              {t(`5`)}
              <br />
              {t(`6`)}
              <br />
              {t(`7`)}
              <br />
              {t(`8`).split(`\n`)[0]}
              <br />
              {t(`8`).split(`\n`)[1]}
            </Wrapper>
          </Wrapper>
        </Wrapper>
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
