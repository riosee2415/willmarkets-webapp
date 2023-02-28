import React, { useCallback } from "react";
import { Wrapper, RsWrapper } from "./commonComponents";
import Theme from "./Theme";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import useWidth from "../hooks/useWidth";

const AppFooter = () => {
  const router = useRouter();

  const width = useWidth();

  const { t } = useTranslation(["appFooter"]);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  });

  return (
    <Wrapper>
      <Wrapper height={width < 900 ? `auto` : `60px`} bgColor={`#222222`}>
        <RsWrapper dr={width < 900 ? `column` : `row`} ju={`space-between`}>
          <Wrapper
            dr={width < 900 ? `column` : `row`}
            width={`auto`}
            color={`#fff`}
            fontSize={width < 900 ? `15px` : `17px`}
            fontWeight={`500`}
          >
            <Wrapper
              margin={width < 900 ? `20px 0 5px 0` : `0 50px 0 0`}
              borderBottom={width < 900 ? `1px solid #e2e2e2` : ``}
              width={`auto`}
              color={`inherit`}
              fontSize={`inherit`}
              cursor={`pointer`}
              onClick={() => moveLinkHandler(`/company/intro`)}
            >
              {t(`1`)}
            </Wrapper>
            <Wrapper
              margin={width < 900 ? `0 0 5px 0` : `0 50px 0 0`}
              borderBottom={width < 900 ? `1px solid #e2e2e2` : ``}
              width={`auto`}
              color={`inherit`}
              fontSize={`inherit`}
              cursor={`pointer`}
              onClick={() => moveLinkHandler(`/signup`)}
            >
              {t(`2`)}
            </Wrapper>
            <Wrapper
              margin={width < 900 ? `0 0 5px 0` : `0 50px 0 0`}
              borderBottom={width < 900 ? `1px solid #e2e2e2` : ``}
              width={`auto`}
              color={`inherit`}
              fontSize={`inherit`}
              cursor={`pointer`}
              onClick={() => moveLinkHandler(`/support`)}
            >
              {t(`3`)}
            </Wrapper>
          </Wrapper>

          <Wrapper
            width={`auto`}
            fontSize={`13px`}
            fontWeight={`500`}
            color={`#fff`}
            margin={width < 900 ? `20px 0` : `0`}
          >
            The website is owned by Will Markets Ltd
          </Wrapper>
        </RsWrapper>
      </Wrapper>

      <Wrapper
        padding={`40px 0`}
        bgColor={`#040404`}
        color={`#fff`}
        lineHeight={`1.7`}
      >
        <RsWrapper al={`flex-start`}>
          <Wrapper
            width={`auto`}
            color={`inherit`}
            fontSize={`inherit`}
            fontWeight={`700`}
          >
            willmarkets Ltd
          </Wrapper>

          <Wrapper
            width={`auto`}
            color={`inherit`}
            fontSize={`inherit`}
            fontWeight={`300`}
          >
            {t(`4`)}
            <br />
            {t(`5`)}
            <br />
            {t(`11`)}
          </Wrapper>

          <Wrapper
            width={`auto`}
            color={`#a7a7a7`}
            fontSize={`inherit`}
            fontWeight={`300`}
          >
            {/* PETER ELISH INVESTMENTS SECURITIES는 willmarkets이 승인 한
            상호입니다. */}
          </Wrapper>

          <Wrapper
            margin={`20px 0 0`}
            width={`auto`}
            color={`inherit`}
            fontSize={`inherit`}
            fontWeight={`700`}
          >
            {t(`6`)}
          </Wrapper>

          <Wrapper
            width={`auto`}
            color={`inherit`}
            fontSize={`inherit`}
            fontWeight={`300`}
          >
            {t(`7`)}
            <br />
            {t(`8`)}
          </Wrapper>

          <Wrapper
            margin={`20px 0 0`}
            width={`auto`}
            color={`inherit`}
            fontSize={`inherit`}
            fontWeight={`700`}
          >
            {t(`9`)}
          </Wrapper>

          <Wrapper
            width={`auto`}
            color={`inherit`}
            fontSize={`inherit`}
            fontWeight={`300`}
          >
            {t(`10`)}
          </Wrapper>
        </RsWrapper>
      </Wrapper>
    </Wrapper>
  );
};

export default AppFooter;
