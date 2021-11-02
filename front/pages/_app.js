import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { ThemeProvider } from "styled-components";
import Theme from "../components/Theme";
import GlobalStyles from "../components/GlobalStyles";
import wrapper from "../store/configureStore";
import i18n from "../i18n";

const Fourleaf = ({ Component }) => {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Head>
          <title>Willmarket</title>

          <meta name="subject" content="금융 거래 신뢰" />
          <meta name="title" content="Willmarket" />
          <meta name="author" content="[[**4LEAF GEAR SAMPLE**]]" />
          <meta
            name="keywords"
            content="세계적인 금융 시장 최고의 금융서비스 안전한 거래 환경"
          />
          <meta
            name="description"
            content="Willmarkets은 리테일과 기업 고객 모두에게 최고의 트레이딩 환경을 제공해드리는 것을 목표로 하고 있습니다."
          />
          {/* <!-- OG tag  --> */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Willmarket" />
          <meta property="og:site_name" content="Willmarket" />
          <meta property="og:url" content="https://will-markets.com/" />
          <meta
            property="og:description"
            content="Willmarkets은 리테일과 기업 고객 모두에게 최고의 트레이딩 환경을 제공해드리는 것을 목표로 하고 있습니다."
          />
          <meta
            property="og:keywords"
            content="세계적인 금융 시장 최고의 금융서비스 안전한 거래 환경"
          />

          <meta property="og:image" content="/og_img.png" />
          <meta property="og:image:width" content="800" />
          <meta property="og:image:height" content="400" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="canonical" href="https://www.sample.com" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet"></link>
        </Head>
        <Component />
      </ThemeProvider>
    </>
  );
};
Fourleaf.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Fourleaf);
