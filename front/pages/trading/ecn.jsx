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

const Ecn = () => {
  const { t } = useTranslation(["trading_ecn"]);

  return (
    <ClientLayout>
      <SubBanner />

      <Wrapper padding={`80px 0`} bgColor={`#eeeeee`}>
        <RsWrapper>
          <Wrapper display={`block`} width={`auto`} fontSize={`26px`}>
            <Text display={`inline`}>{t(`1`).split(`\n`)[0]}</Text>
            {t(`1`).split(`\n`)[1]}
          </Wrapper>

          <Wrapper margin={`40px 0 20px`} width={`auto`}>
            <Image
              width={`auto`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/image_ecn.png`}
            />
          </Wrapper>

          <Wrapper width={`auto`} textAlign={`center`}>
            {t(`2`).split(`\n`)[0]}
            <br />
            {t(`2`).split(`\n`)[1]}
            <br />
            {t(`2`).split(`\n`)[2]} {t(`3`).split(`\n`)[0]}
            <br />
            {t(`3`).split(`\n`)[1]}
          </Wrapper>
        </RsWrapper>
      </Wrapper>

      <Wrapper padding={`60px 0 40px`} color={`#fff`} bgColor={`#000105`}>
        <RsWrapper>
          <Wrapper display={`block`} width={`auto`} fontSize={`26px`}>
            {t(`4`).split(`\n`)[0]}
            <Text display={`inline`} padding={`0 0 0 5px`} color={`#ff50b0`}>
              {t(`4`).split(`\n`)[1]}
            </Text>
            {t(`4`).split(`\n`)[2]}
          </Wrapper>

          <Wrapper dr={`row`} al={`normal`} margin={`60px 0 0`}>
            <Wrapper
              al={`flex-start`}
              ju={`flex-start`}
              margin={`0 60px`}
              width={`300px`}
            >
              <Wrapper dr={`row`} margin={`0 0 30px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                {t(`5`)}
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 30px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                {t(`6`)}
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 30px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                {t(`7`)}
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 30px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                {t(`8`)}
              </Wrapper>
            </Wrapper>

            <Wrapper
              al={`flex-start`}
              ju={`flex-start`}
              margin={`0 60px`}
              width={`300px`}
            >
              <Wrapper dr={`row`} margin={`0 0 30px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                {t(`9`)}
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 30px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                {t(`10`)}
              </Wrapper>

              <Wrapper dr={`row`} margin={`0 0 30px`} width={`auto`}>
                <Image
                  margin={`0 10px 0 0`}
                  width={`auto`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/download/icon_check2.png`}
                />
                {t(`11`)}
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </RsWrapper>
      </Wrapper>

      <Wrapper padding={`50px 0`} bgColor={`#eeeeee`}>
        <RsWrapper>
          <Wrapper fontSize={`24px`} fontWeight={`500`}>
            {t(`12`)}
          </Wrapper>

          <Wrapper margin={`30px 0`} width={`750px`} bgColor={`#fff`}>
            <Wrapper
              dr={`row`}
              al={`normal`}
              padding={`6px 0`}
              borderTop={`1px solid #db4698`}
              borderBottom={`1px solid #db4698`}
            >
              <Wrapper
                width={`100px`}
                padding={`5px 10px`}
                fontSize={`18px`}
                fontWeight={`500`}
                color={`#dd459a`}
              >
                ECN
              </Wrapper>
              <Wrapper
                width={`100px`}
                padding={`5px 10px`}
                fontSize={`18px`}
                fontWeight={`500`}
                color={`#565656`}
                borderLeft={`1px solid #6f6f6f`}
              >
                DDE
              </Wrapper>
              <Wrapper
                width={`200px`}
                padding={`5px 10px`}
                fontSize={`18px`}
                fontWeight={`500`}
                color={`#565656`}
                borderLeft={`1px solid #6f6f6f`}
              >
                {t(`13`)}
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                width={`calc(100% - 100px - 100px - 200px)`}
                padding={`5px 10px`}
                fontSize={`18px`}
                fontWeight={`500`}
                color={`#565656`}
                borderLeft={`1px solid #6f6f6f`}
              >
                {t(`14`)}
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              al={`normal`}
              padding={`6px 0`}
              borderBottom={`1px solid #db4698`}
            >
              <Wrapper width={`100px`} padding={`5px 10px`}>
                <Image
                  width={`44px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_agree.png`}
                />
              </Wrapper>
              <Wrapper
                width={`100px`}
                padding={`5px 10px`}
                borderLeft={`1px solid #6f6f6f`}
              >
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
                textAlign={`center`}
              >
                {t(`15`).split(`\n`)[0]}
                <br />
                {t(`15`).split(`\n`)[1]}
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                width={`calc(100% - 100px - 100px - 200px)`}
                padding={`5px 10px`}
                fontSize={`15px`}
                color={`#292929`}
                borderLeft={`1px solid #6f6f6f`}
              >
                {t(`16`)}
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              al={`normal`}
              padding={`6px 0`}
              borderBottom={`1px solid #db4698`}
            >
              <Wrapper width={`100px`} padding={`5px 10px`}>
                <Image
                  width={`44px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_agree.png`}
                />
              </Wrapper>
              <Wrapper
                width={`100px`}
                padding={`5px 10px`}
                borderLeft={`1px solid #6f6f6f`}
              >
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
                textAlign={`center`}
              >
                {t(`17`).split(`\n`)[0]}
                <br />
                {t(`17`).split(`\n`)[1]}
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                width={`calc(100% - 100px - 100px - 200px)`}
                padding={`5px 10px`}
                fontSize={`15px`}
                color={`#292929`}
                borderLeft={`1px solid #6f6f6f`}
              >
                {t(`18`)}
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              al={`normal`}
              padding={`6px 0`}
              borderBottom={`1px solid #db4698`}
            >
              <Wrapper width={`100px`} padding={`5px 10px`}>
                <Image
                  width={`44px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_disagree.png`}
                />
              </Wrapper>
              <Wrapper
                width={`100px`}
                padding={`5px 10px`}
                borderLeft={`1px solid #6f6f6f`}
              >
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
                textAlign={`center`}
              >
                {t(`19`)}
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                width={`calc(100% - 100px - 100px - 200px)`}
                padding={`5px 10px`}
                fontSize={`15px`}
                color={`#292929`}
                borderLeft={`1px solid #6f6f6f`}
              >
                {t(`20`)}
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              al={`normal`}
              padding={`6px 0`}
              borderBottom={`1px solid #db4698`}
            >
              <Wrapper width={`100px`} padding={`5px 10px`}>
                <Image
                  width={`44px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/trade/icon_agree.png`}
                />
              </Wrapper>
              <Wrapper
                width={`100px`}
                padding={`5px 10px`}
                borderLeft={`1px solid #6f6f6f`}
              >
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
                textAlign={`center`}
              >
                {t(`21`)}
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                width={`calc(100% - 100px - 100px - 200px)`}
                padding={`5px 10px`}
                fontSize={`15px`}
                color={`#292929`}
                borderLeft={`1px solid #6f6f6f`}
              >
                {t(`22`)}
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
