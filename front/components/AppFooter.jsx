import React, { useCallback } from "react";
import { Wrapper, RsWrapper } from "./commonComponents";
import Theme from "./Theme";
import styled from "styled-components";
import { useRouter } from "next/router";

const AppFooter = () => {
  const router = useRouter();

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  });

  return (
    <Wrapper>
      <Wrapper height={`60px`} bgColor={`#222222`}>
        <RsWrapper dr={`row`} ju={`space-between`}>
          <Wrapper
            dr={`row`}
            width={`auto`}
            color={`#fff`}
            fontSize={`17px`}
            fontWeight={`500`}
          >
            <Wrapper
              margin={`0 50px 0 0`}
              width={`auto`}
              color={`inherit`}
              fontSize={`inherit`}
              cursor={`pointer`}
              onClick={() => moveLinkHandler(`/company/intro`)}
            >
              Willmarkets 소개
            </Wrapper>
            <Wrapper
              margin={`0 50px 0 0`}
              width={`auto`}
              color={`inherit`}
              fontSize={`inherit`}
              cursor={`pointer`}
              onClick={() => moveLinkHandler(`/signup`)}
            >
              계좌 개설
            </Wrapper>
            <Wrapper
              margin={`0 50px 0 0`}
              width={`auto`}
              color={`inherit`}
              fontSize={`inherit`}
              cursor={`pointer`}
              onClick={() => moveLinkHandler(`/support`)}
            >
              고객지원
            </Wrapper>
          </Wrapper>

          <Wrapper
            width={`auto`}
            fontSize={`13px`}
            fontWeight={`500`}
            color={`#fff`}
          >
            Copyright 2021. Willmarkets inc. all rights reserved.
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
            willmarkets
          </Wrapper>

          <Wrapper
            width={`auto`}
            color={`inherit`}
            fontSize={`inherit`}
            fontWeight={`300`}
          >
            주소가 0000, 00000, United States에 등록된 회사입니다.
            <br />
            willmarkets은 미국 SEC 및 FINRA가 규제하는 브로커입니다. 규정 번호는
            CRD : 00000 / SEC : 0-000000입니다.
          </Wrapper>

          <Wrapper
            width={`auto`}
            color={`#a7a7a7`}
            fontSize={`inherit`}
            fontWeight={`300`}
          >
            PETER ELISH INVESTMENTS SECURITIES는 willmarkets이 승인 한
            상호입니다.
          </Wrapper>

          <Wrapper
            margin={`20px 0 0`}
            width={`auto`}
            color={`inherit`}
            fontSize={`inherit`}
            fontWeight={`700`}
          >
            이용약관
          </Wrapper>

          <Wrapper
            width={`auto`}
            color={`inherit`}
            fontSize={`inherit`}
            fontWeight={`300`}
          >
            이 사이트는 어떤 실체도 특정하지 않고 전세계 범위내에서 접근할 수
            있습니다. 이는 정보의 집중된 전시와 대비의 편의를 위해서 이며
            실질적인 권리와 의무는 당신이 선택한 실체가 감독으로부터 위임받은
            권한과 감독기관에 의해 결정됩니다. 당신은 반드시 만 18세가 되어야만
            우리 사이트의 상품과 서비스를 방문할 수 있습니다. 저희 사이트에
            방문하여 연령 조건에 부합되는지 확인해주세요.
            <br />
            일부 현지 법규는 본 사이트에 게시된 모든 문서와 정보를 접근,
            다운로드, 배포, 공유, 다른 방법으로 사용할 수 있는 권리를 금지하거나
            제한하고 있습니다.
          </Wrapper>

          <Wrapper
            margin={`20px 0 0`}
            width={`auto`}
            color={`inherit`}
            fontSize={`inherit`}
            fontWeight={`700`}
          >
            고위험 거래종목 위험공시
          </Wrapper>

          <Wrapper
            width={`auto`}
            color={`inherit`}
            fontSize={`inherit`}
            fontWeight={`300`}
          >
            기초 금융수단의 가치와 가격에는 급격한 변동이 생기기 때문에 주식,
            증권, 선물, 차익계약과 기타 금융상품 거래는 고위험에 관련되어
            단기간에 당신의 초기 투자금을 초과하는 대규모 손실이 발생할 수
            있습니다. 우리와 어떠한 거래도 하기 전에 당신이 해당 금융기구를
            이용한 거래의 위험을 완전히 알 수 있도록 해주세요. 만약 당신이
            여기에서 설명한 리스크를 알지 못한다면 반드시 독립적인 전문적인
            의견을 구해야 합니다.
          </Wrapper>
        </RsWrapper>
      </Wrapper>
    </Wrapper>
  );
};

export default AppFooter;
