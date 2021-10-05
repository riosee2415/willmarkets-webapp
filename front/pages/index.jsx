import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST, LOGIN_REQUEST } from "../reducers/user";
import useInput from "../hooks/useInput";
import ClientLayout from "../components/ClientLayout";
import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import { RsWrapper, Wrapper, Image } from "../components/commonComponents";
import { withResizeDetector } from "react-resize-detector";
import Theme from "../components/Theme";
import MainSlider from "../components/slider/MainSlider";

const Home = ({ width }) => {
  return (
    <ClientLayout>
      <Wrapper minHeight={`100vh`}>
        <MainSlider />
      </Wrapper>

      <Wrapper
        minHeight={`100vh`}
        bgImg={`url('https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/back_download.png')`}
      >
        <Wrapper fontSize={`30px`} fontWeight={`500`} color={`#ff7cc2`}>
          MT4 다운로드
        </Wrapper>

        <Wrapper
          margin={`15px 0 0`}
          fontSize={`19px`}
          fontWeight={`400`}
          color={`#fff`}
        >
          Android와 Ios 모두 호환하는 완벽한 거래 플랫폼
        </Wrapper>

        <Wrapper dr={`row`} ju={`space-around`}>
          <Wrapper width={`auto`}>
            <Image
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/icon_windows.png`}
            />
            <Wrapper width={`auto`} fontWeight={`500`} color={`#fff`}>
              Windows
            </Wrapper>
          </Wrapper>
        </Wrapper>

        <Wrapper
          position={`absolute`}
          right={`180px`}
          bottom={`40px`}
          width={`auto`}
        >
          <Image
            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/iphone.png`}
          />
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
export default withResizeDetector(Home);
