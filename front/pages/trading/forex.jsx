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

const Forex = () => {
  const { t } = useTranslation(["trading_forex"]);

  const width = useWidth();

  return (
    <ClientLayout>
      <SubBanner />

      <Wrapper padding={`80px 0`} bgColor={`#eeeeee`}>
        <Wrapper display={`block`} width={`auto`} fontSize={`30px`}>
          {t(`1`).split(`\n`)[0]}
          <Text display={`inline`} margin={`0 0 0 5px`}>
            {t(`1`).split(`\n`)[1]}
          </Text>
        </Wrapper>

        <Wrapper
          dr={width < 700 ? `column` : `row`}
          ju={`flex-start`}
          margin={`50px 0 0 0`}
        >
          <Wrapper margin={`40px 0 20px`} width={width < 700 ? `330px` : `50%`}>
            <Image
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/image_1.png`}
            />
          </Wrapper>

          <Wrapper
            width={width < 700 ? `250px` : `40%`}
            margin={width < 700 ? `0` : `0 0 0 60px`}
            textAlign={`center`}
          >
            {t(`2`)}
            <br />
            {t(`3`).split(`\n`)[0]}
            <br />
            {t(`3`).split(`\n`)[1]}
          </Wrapper>
        </Wrapper>
      </Wrapper>

      <Wrapper padding={`60px 0`} color={`#fff`} bgColor={`#000105`}>
        <RsWrapper>
          <Wrapper display={`block`} width={`auto`} fontSize={`26px`}>
            <Text display={`inline`} padding={`0 0 0 5px`} color={`#3353F2`}>
              {t(`4`).split(`\n`)[0]}
            </Text>
            {t(`4`).split(`\n`)[1]}
          </Wrapper>

          <Wrapper margin={`30px 0 0`} textAlign={`center`} lineHeight={`1.8`}>
            {t(`5`).split(`\n`)[0]}
            <br />
            {t(`5`).split(`\n`)[1]} {t(`6`).split(`\n`)[0]}
            <br />
            {t(`6`).split(`\n`)[1]}
          </Wrapper>

          <Wrapper dr={`row`} al={`normal`} margin={`40px 0 0`}>
            <Wrapper al={`flex-start`} ju={`flex-start`} width={`520px`}>
              <Wrapper
                dr={`row`}
                al={`flex-start`}
                margin={`0 0 15px`}
                width={`auto`}
                wrap={`nowrap`}
              >
                <Image
                  margin={`0 10px 0 0`}
                  width={width < 700 ? `30px` : `auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_check.png`}
                />
                {t(`7`)}
              </Wrapper>

              <Wrapper padding={`0 0 0 40px`} color={`#e4e4e4`}>
                {t(`8`)}
              </Wrapper>

              <Wrapper padding={`15px 0 0 40px`} color={`#e4e4e4`}>
                {t(`9`)}
              </Wrapper>

              <Wrapper padding={`15px 0 0 40px`} color={`#e4e4e4`}>
                {t(`10`)}
              </Wrapper>

              <Wrapper
                dr={`row`}
                al={`flex-start`}
                margin={`30px 0 15px`}
                width={`auto`}
                wrap={`nowrap`}
              >
                <Image
                  margin={`0 10px 0 0`}
                  width={width < 700 ? `30px` : `auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_check.png`}
                />
                {t(`11`)}
              </Wrapper>

              <Wrapper padding={`0 0 0 40px`} color={`#e4e4e4`}>
                {t(`12`)}
              </Wrapper>

              <Wrapper
                dr={`row`}
                al={`flex-start`}
                margin={`30px 0 15px`}
                width={`auto`}
                wrap={`nowrap`}
              >
                <Image
                  margin={`0 10px 0 0`}
                  width={width < 700 ? `30px` : `auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_check.png`}
                />
                {t(`13`)}
              </Wrapper>

              <Wrapper padding={`0 0 0 40px`} color={`#e4e4e4`}>
                {t(`14`)}
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
