import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST, LOGIN_REQUEST } from "../reducers/user";
import useInput from "../hooks/useInput";
import ClientLayout from "../components/ClientLayout";
import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import { CloseOutlined } from "@ant-design/icons";
import {
  RsWrapper,
  Wrapper,
  Image,
  CommonButton,
} from "../components/commonComponents";
import { withResizeDetector } from "react-resize-detector";
import Theme from "../components/Theme";
import MainSlider from "../components/slider/MainSlider";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const Home = ({ width }) => {
  const router = useRouter();

  const [togle, setTogle] = useState(true);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  return (
    <ClientLayout>
      <Wrapper minHeight={`100vh`}>
        <MainSlider />
      </Wrapper>

      <Wrapper position={`relative`} minHeight={`100vh`}>
        <Wrapper
          position={`absolute`}
          left={`0`}
          top={`0`}
          width={`100%`}
          height={`100%`}
          bgImg={`url('https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/back_download.png')`}
          zIndex={`-2`}></Wrapper>

        <Wrapper
          position={`absolute`}
          left={`0`}
          top={`0`}
          width={`100%`}
          height={`100%`}
          bgColor={`rgba(0, 0, 0, 0.5)`}
          zIndex={`-1`}></Wrapper>

        <Wrapper fontSize={`30px`} fontWeight={`500`} color={`#f776be`}>
          MT4 다운로드
        </Wrapper>

        <Wrapper
          margin={`15px 0 0`}
          fontSize={`19px`}
          fontWeight={`400`}
          color={`#fff`}>
          Android와 Ios 모두 호환하는 완벽한 거래 플랫폼
        </Wrapper>

        <Wrapper dr={`row`} margin={`70px 0 0`}>
          <Wrapper width={`auto`}>
            <Image
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/icon_windows.png`}
            />
            <Wrapper width={`auto`} fontWeight={`500`} color={`#fff`}>
              Windows
            </Wrapper>
          </Wrapper>

          <Wrapper
            width={`auto`}
            margin={`0 80px`}
            color={`#fff`}
            fontSize={`34px`}>
            <PlusOutlined />
          </Wrapper>

          <Wrapper width={`auto`}>
            <Image
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/icon_android.png`}
            />
            <Wrapper width={`auto`} fontWeight={`500`} color={`#fff`}>
              Android
            </Wrapper>
          </Wrapper>

          <Wrapper
            width={`auto`}
            margin={`0 80px`}
            color={`#fff`}
            fontSize={`34px`}>
            <PlusOutlined />
          </Wrapper>

          <Wrapper width={`auto`}>
            <Image
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/icon_ios.png`}
            />
            <Wrapper width={`auto`} fontWeight={`500`} color={`#fff`}>
              Ios
            </Wrapper>
          </Wrapper>
        </Wrapper>

        <Wrapper margin={`70px 0 0`}>
          <CommonButton
            kindOf={`white2`}
            width={`180px`}
            height={`45px`}
            padding={`0`}
            lineHeight={`43px`}
            radius={`30px`}
            fontSize={`17px`}
            fontWeight={`500`}
            onClick={() => moveLinkHandler(`/platform/pc`)}>
            다운로드
            <Wrapper
              position={`absolute`}
              right={`40px`}
              top={`50%`}
              margin={`-6px 0 0 0`}
              width={`auto`}>
              <RightOutlined />
            </Wrapper>
          </CommonButton>
        </Wrapper>

        <Wrapper
          position={`absolute`}
          right={`180px`}
          bottom={`40px`}
          width={`auto`}>
          <Image
            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/iphone.png`}
          />
        </Wrapper>
      </Wrapper>

      <Wrapper position={`relative`} padding={`80px 0`} bgColor={`#000105`}>
        <Wrapper position={`absolute`} left={`0`} top={`0`}>
          <Image
            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/back_line_warning.png`}
          />
        </Wrapper>

        <RsWrapper>
          <Image
            width={`auto`}
            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/icon_warning.png`}
          />

          <Wrapper
            margin={`15px 0`}
            width={`auto`}
            color={`#ffea6b`}
            fontSize={`18px`}
            fontWeight={`500`}>
            ※주의사항※
          </Wrapper>

          <Wrapper
            fontWeight={`300`}
            color={`#fff`}
            textAlign={`center`}
            lineHeight={`1.8`}>
            <Wrapper
              dr={`row`}
              width={`auto`}
              color={`inherit`}
              fontSize={`inherit`}>
              외환 및 레버리지 금융상패 거래는
              <Wrapper
                padding={`0 0 0 5px`}
                width={`auto`}
                fontWeight={`500`}
                color={`inherit`}
                fontSize={`inherit`}>
                투자 위험도가 높아 투자의 일부 또는 저부의 손실 위험
              </Wrapper>
              이 있습니다.
            </Wrapper>
            감당할 수 없는 금액 이상으로 투자를 권장하지 않으며, 관련된 투자
            위험을 충분히 숙지하시길 바랍니다.
            <br />
            일부 투자자는 레버리지 상품 거래가 적합하지 않을 수 있습니다.
            <br />
            거래하기 전에 본인의 투자 경험 및 투자 목적을 고려하되 필요시 별도의
            투자 자문을 구하는 것을 권장해드립니다.
            <br />
            거주 국가의 법률 규정에서 서비스 이용이 허용되어 있는지 확인하는
            것은 전적으로 고객의 책임입니다.
            <br />
            <Wrapper width={`auto`} color={`#c1c1c1`} fontSize={`inherit`}>
              ※ 미국, 캐나다, 이스라엘 및 이란과 같은 특정 지역 거주자에게
              서비스를 제공하지 않습니다.
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
export default withResizeDetector(Home);
