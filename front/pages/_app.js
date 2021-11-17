import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { ThemeProvider } from "styled-components";
import Theme from "../components/Theme";
import GlobalStyles from "../components/GlobalStyles";
import wrapper from "../store/configureStore";

const Fourleaf = ({ Component }) => {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Head>
          <title>Willmarkets</title>

          <meta name="subject" content="금융 거래 신뢰" />
          <meta name="title" content="Willmarkets" />
          <meta name="author" content="Willmarkets" />
          <meta
            name="keywords"
            content="세계적인 금융 시장 최고의 금융서비스 안전한 거래 환경"
          />
          <meta
            name="description"
            content="Willmarkets aims to provide the best trading experience for both retail and corporate clients."
          />
          {/* <!-- OG tag  --> */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Willmarkets" />
          <meta property="og:site_name" content="Willmarkets" />
          <meta property="og:url" content="https://will-markets.com/" />
          <meta
            property="og:description"
            content="Willmarkets aims to provide the best trading experience for both retail and corporate clients."
          />
          <meta
            property="og:keywords"
            content="세계적인 금융 시장 최고의 금융서비스 안전한 거래 환경"
          />

          <meta property="og:image" content="/og_img.png" />
          <meta property="og:image:width" content="800" />
          <meta property="og:image:height" content="400" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="canonical" href="https://will-markets.com/" />

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
