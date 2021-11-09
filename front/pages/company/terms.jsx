import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { END } from "redux-saga";
import axios from "axios";
import {} from "@ant-design/icons";
import {
  ColWrapper,
  RowWrapper,
  Image,
  Wrapper,
  WholeWrapper,
  RsWrapper,
  CommonButton,
} from "../../components/commonComponents";
import ClientLayout from "../../components/ClientLayout";
import Theme from "../../components/Theme";
import SubBanner from "../../components/SubBanner";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";

const Title = styled(Wrapper)`
  font-weight: 600;
  padding: 20px 0 0 0;
  & > div.number {
    width: 30px;
    height: 30px;
    margin: 0 14px 0 0;
    border-radius: 50%;
    background-color: #4877ff;
    color: #fff;
  }
`;

const Content = styled(Wrapper)`
  align-items: flex-start;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 2px;
  word-spacing: 1px;
`;

const PreText = styled.pre`
  white-space: pre-line;
  margin: 0;
  padding: 80px;
  font-size: 13px;
`;

const Terms = () => {
  const { t } = useTranslation(["privacy"]);

  const width = useWidth();
  const router = useRouter();

  const moveLinkHandler = useCallback((link) => {
    window.scroll(0, 0);
    router.push(link);
  }, []);

  return (
    <ClientLayout>
      <SubBanner />
      <WholeWrapper>
        {i18next.language === "ko" ? (
          <RsWrapper padding={width < 1100 ? `50px 100px` : `50px 245px`}>
            <Wrapper
              fontSize={width < 600 ? `30px` : `36px`}
              fontWeight={`700`}>
              WILLMARKETS 웹사이트 접속 및 사용에 적용되는 이용 약관
            </Wrapper>

            <Content padding={`20px 0 0 0`}>
              이 사이트를 사용하기 전에 이 웹사이트("TCU")에 대한 다음 사용
              조건을 모두 읽으십시오. 이 웹사이트 또는 이 웹사이트를 통해
              액세스할 수 있는 모든 서비스에 계속 액세스, 연결 또는 사용함으로써
              귀하는 TCU에 동의하는 것입니다. WILLMARKETS ("WILLMARKETS")는
              언제든지 TCU를 수정, 제거 또는 추가할 수 있는 권한을 보유합니다.
              그러한 수정은 즉시 효력을 발생합 니다. 따라서 WILLMARKETS의
              웹사이트(이하 "웹사이트")에 액세스, 링크 또는 사용할 때마다 TCU를
              계속 검토하십시오. 웹 사 이트 또는 웹 사이트에서 액세스할 수 있는
              서비스에 대한 귀하의 액세스, 링크 또는 사용, TCU에 수정 사항을
              게시한 후 수정된 대로 TCU에 동의하는 것으로 간주됩니다. 언제든지
              TCU를 수락하지 않으려면 웹 사이트에 액세스하거나 링크하거나 웹
              사이트 를 사용할 수 없습니다. TCU에 추가되거나 TCU와 충돌하는
              귀하가 제안한 모든 이용 약관은 WILLMARKETS에 의해 명시적으로
              거부되며 효력이 없습니다.
            </Content>

            <Wrapper al={`flex-start`} fontSize={`22px`} padding={`39px 0 0 0`}>
              일반 약관
            </Wrapper>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                1
              </Wrapper>
              TCU에 대한 사용자 동의
            </Title>
            <Content padding={`14px 0 0 43px`}>
              귀하는 TCU를 읽었으며 이에 동의함을 나타냅니다.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                2
              </Wrapper>
              지적 재산권
            </Title>
            <Content padding={`14px 0 0 43px`}>
              텍스트, 콘텐츠, 사진, 비디오, 오디오, 링크, 소프트웨어 및 그래픽을
              포함하되 이에 국한되지 않는 웹사이트는 저작권, 상표, 서비스 마크,
              국제 조약 및/또는 기타 소유권과 스위스 및 기타 국가의 법률에 의해
              보호됩니다. . 웹사이트는 또한 스위스 저작권 및 기타 법률 및 조약에
              따라 집합적 저작물 또는 편집물로 보호됩니다. 웹사이트를 구성하는
              모든 개별 기사, 칼럼 및 기타 요소도 저작권이 있는 저작물입니다.
              귀하는 모든 해당 저작권 및 기타 법률은 물론 웹사이트에 포함된 추가
              저작권 고지 또는 제한 사항을 준수하는 데 동의합니다. 귀하는
              WILLMARKETS, WILLMARKETS의 일반 및 유한 파트너, 자회사, 각각의
              일반 파트너 및 계열사(총칭하여 "WILLMARKETS")가 웹사이트를 개발,
              편집, 준비, 수정, 선택 및 배열했음을 인정합니다. 귀하는 개인이나
              단체가 웹사이트에 무단으로 액세스하거나 사용하거나 웹사이트가
              저작권, 상표 또는 기타 계약, 법적 또는 법률상의 권리를 침해한다는
              주장을 알게 되는 즉시 WILLMARKETS에 서면으로 통지하는 데
              동의합니다. 국내외 모든 정부 기관의 법률에 따른 영업 비밀, 특허,
              저작권, 상표, 서비스 마크, 노하우 및 기타 소유권에 대한 현재 및
              미래의 모든 권리, 웹사이트와 관련된 모든 응용 프로그램 및 등록에
              대한 권리("지적 재산권")는 귀하와 WILLMARKETS 사이에서 항상
              WILLMARKETS의 독점적이고 독점적인 자산입니다. 웹사이트에 대한 현재
              및 미래의 모든 권리와 소유권(현재 또는 미래의 기술에 대해 웹사이트
              및 웹사이트의 모든 부분을 이용할 수 있는 권리 포함)은 독점적
              사용을 위해 WILLMARKETS에 있습니다. TCU에서 특별히 허용하는 경우를
              제외하고, 귀하는 웹사이트 또는 그 일부를 복사하거나 사용할 수
              없습니다. 여기에 명시적으로 허용된 경우를 제외하고, 귀하는
              WILLMARKETS의 사전 서면 승인 없이 지적 재산권 또는 웹사이트,
              웹사이트에 참여하거나 기여한 개인의 이름, 그 변형 또는 파생물을
              어떠한 목적으로도 사용할 수 없습니다.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                3
              </Wrapper>
              사용 제한
            </Title>
            <Content padding={`14px 0 0 43px`}>
              불법적인 목적, 법률 또는 규정 위반 촉진 또는 TCU와 일치하지 않는
              방식으로 웹사이트를 사용할 수 없습니다. 귀하와 WILLMARKETS 사이의
              서면 동의를 제외하고, 귀하는 귀하 자신의 비상업적 사용 및 이익을
              위해서만 웹사이트를 사용하는 데 동의하며 다른 사람이나 단체에 대한
              재판매 또는 양도 또는 처분을 위해 사용하지 않을 것에 동의합니다. .
              귀하는 사용, 양도, 배포하지 않을 것에 동의합니다.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              귀하는 웹사이트의 어떤 부분도 복사, 재생산, 재컴파일, 디컴파일,
              분해, 역설계, 배포, 게시, 표시, 수행, 수정, 업로드, 파생물 생성,
              전송 또는 어떤 식으로든 악용할 수 없습니다. 귀하가 모든 저작권 및
              기타 소유권 고지를 보유하는 경우 웹사이트에서 자료를
              다운로드하거나 개인적, 비상업적 용도로 인쇄본 한 부를 만들 수
              있습니다. 재순환이 안될 수 있으며, WILLMARKETS의 사전 서면 동의
              없이 웹사이트에 포함된 분석 및 프레젠테이션을 재배포하거나 게시할
              수 없습니다. 귀하는 WILLMARKETS의 사전 서면 동의 없이 웹사이트의
              어떤 부분도 판매용으로 제공하거나 공중파 텔레비전 또는 라디오
              방송, 컴퓨터 네트워크 또는 인터넷상의 하이퍼링크 프레이밍을
              포함하되 이에 국한되지 않는 다른 매체를 통해 배포할 수 없습니다.
              웹사이트와 웹사이트에 포함된 정보는 어떤 종류의 데이터베이스를
              구축하는 데 사용할 수 없습니다. 또한 귀하 또는 제3자가
              액세스하거나 웹사이트의 전체 또는 일부를 포함하는 데이터베이스
              웹사이트를 배포하기 위해 웹사이트를 데이터베이스에 (전체 또는
              일부) 저장해서는 안 됩니다. 귀하는 귀하가 제3자에게 판매하거나
              제공한 데이터의 품질을 개선하기 위해 웹사이트를 어떤 식으로든
              사용할 수 없습니다.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              귀하는 다음과 같은 콘텐츠를 웹사이트를 통해 입력, 배포, 업로드,
              게시, 이메일 전송, 전송 또는 기타 방식으로 제공할 수 없습니다.
              정크 메일, 스팸, 행운의 편지, 피라미드 방식 등; (ii) 불법, 유해,
              위협, 학대, 괴롭힘, 불법 행위, 명예 훼손, 저속, 외설, 비방, 타인의
              사생활 침해, 증오, 인종, 민족 또는 기타 불쾌감을 주는 콘텐츠;
              (iii) 귀하는 법률 또는 계약 또는 신탁 관계(고용 관계 또는 비공개
              계약의 일부로 알게 되거나 공개된 내부 정보, 독점 및 기밀 정보)에
              따라 제공할 권리가 없습니다. (iv) 당사자의 특허, 상표, 영업 비밀,
              저작권 또는 기타 소유권을 침해합니다. (v) 방해하도록 설계된
              소프트웨어 바이러스 또는 기타 컴퓨터 코드, 파일 또는 프로그램,
              컴퓨터 소프트웨어나 하드웨어 또는 통신 장비의 기능을 파괴하거나
              제한합니다. (vi) 미성년자에게 유해합니다. 또는 (vii) 그 사람이
              귀하에게 공개하도록 승인하지 않은 다른 사람의 개인 식별 정보를
              구성합니다.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              귀하는 WILLMARKETS의 상표, 상호, 서비스 마크, 저작권 또는 로고를
              그러한 항목이 귀하에게 속하거나 귀하와 관련되어 있거나
              WILLMARKETS의 동의 하에 사용된다는 인상을 주는 방식으로 사용할 수
              없으며 귀하는 귀하가 그러한 항목에 대한 소유권이 없습니다.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              귀하는 웹사이트 또는 웹사이트에 연결된 서버 또는 네트워크에서 또는
              웹사이트를 통해 수행되는 모든 활동, 웹사이트의 적절한 작동을
              방해하거나 방해하려고 시도하거나 방해를 시도해서는 안 됩니다.
              귀하는 웹사이트에 공개적으로 표시하거나 웹사이트에 표시되는 링크를
              통해 액세스할 수 있도록 의도적으로 공개되지 않은 웹사이트의 자료
              또는 정보를 획득하거나 획득하려고 시도할 수 없습니다. 해킹, DDoS
              공격, 암호 타이밍 또는 기타 수단을 통해 웹 사이트의 보안을
              위반하거나 웹 사이트, 데이터, 자료, 정보, 컴퓨터 시스템 또는 웹
              사이트와 연결된 서버에 연결된 네트워크에 대한 무단 액세스를
              시도해서는 안 됩니다. . 귀하는 WILLMARKETS의 단독 재량에 따라 웹
              사이트 또는 웹 사이트의 기반 시설에 불합리하거나 불균형적으로 큰
              부하 또는 부담을 부과하거나 부과할 수 있는 조치를 취하거나 시도할
              수 없습니다.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                4
              </Wrapper>
              면허
            </Title>
            <Content padding={`14px 0 0 43px`}>
              (i) 귀하는 TCU에 따라 웹사이트를 사용할 수 있는 제한된 권리를
              제외하고는 웹사이트 및 웹사이트에 포함된 자료에 대한 어떠한 권리나
              라이선스도 취득하지 않습니다. 웹사이트에서 콘텐츠를 다운로드하기로
              선택한 경우 TCU에 따라 다운로드해야 합니다. 이러한 다운로드는
              TCU에 따라 개인적이고 비상업적인 용도로만 WILLMARKETS에 의해
              귀하에게 라이선스가 부여되며 다른 권리를 귀하에게 양도하지
              않습니다.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              제한 없이 광고, 상업, 판촉 및 홍보 목적) WILLMARKETS의 재량에 따라
              귀하 또는 다른 사람이나 단체에 대한 추가 통지, 귀속 또는 고려
              없이. 또한 귀하는 다른 웹사이트 사용자가 해당 사용자의 개인적인
              사용을 위해 해당 자료에 액세스, 저장 또는 복제할 수 있도록
              허용합니다. 귀하는 그러한 콘텐츠와 관련하여 귀하가 제출한 이름을
              사용할 권리를 WILLMARKETS에 부여합니다. 귀하는 귀하가 제출한
              자료에 대한 모든 권리를 소유하거나 통제할 수 있음을 진술하고
              보증합니다. 귀하가 제출하는 자료가 진실되고 정확하다는 것; 귀하가
              제공하는 자료의 사용은 이 TCU를 위반하지 않으며 개인이나 단체에
              상해를 입히지 않습니다. 그리고 귀하는 귀하가 제공한 자료로 인해
              발생하는 모든 청구에 대해 WILLMARKETS 및 그 공급자, 대리인, 이사,
              임원, 직원, 대리인, 승계인 및 양수인을 면책합니다. WILLMARKETS 및
              그 공급업체, 대리인, 이사, 임원, 직원, 대표자, 후계자 및 할당은
              책임을 부인하며 귀하 또는 제3자가 제출한 자료에 대해 어떠한 책임도
              지지 않습니다.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                5
              </Wrapper>
              수수료
            </Title>
            <Content padding={`14px 0 0 43px`}>
              명시적인 서면 동의를 제외하고 웹사이트에 대한 액세스 및 사용은
              무료이며 WILLMARKETS 또는 그룹 회사의 고객일 필요가 없습니다.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                6
              </Wrapper>
              거주 및 법적 제한
            </Title>
            <Content padding={`14px 0 0 43px`}>
              웹사이트 조항은 어떤 이유로든 웹사이트 또는 그 일부에 대한 액세스
              및 사용이 금지되거나 엄격하게 규제되는 관할 구역의 거주자를
              대상으로 하지 않습니다. 그러한 제한이 적용되는 경우 웹 사이트 또는
              그 일부에 액세스하거나 사용할 수 없습니다. 웹사이트의 모든 거래
              관련 정보는 벨기에 거주자를 위한 것이 아닙니다.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                7
              </Wrapper>
              책임의 부인 및 제한
            </Title>
            <Content padding={`14px 0 0 43px`}>
              (i) 귀하는 서비스 사용에 따른 위험 부담이 전적으로 귀하에게 있다는
              데 동의하고 콘텐츠 또는 광고를 포함하되 이에 국한되지 않는 서비스
              및 웹사이트에 포함된 모든 것이 "있는 그대로" 제공된다는 점을
              인정합니다. WILLMARKETS는 상품성, 비침해, 소유권 또는 특정
              목적이나 사용에 대한 적합성을 포함하되 이에 국한되지 않는
              웹사이트에 대해 명시적이든 묵시적이든 어떠한 종류의 보증도 하지
              않습니다.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              (ii) WILLMARKETS는 웹 사이트가 귀하의 장비와 호환되거나 웹 사이트
              또는 WILLMARKETS 또는 그 대리인이 보낸 전자 메일에 오류나
              바이러스, 웜 또는 "트로이 목마" 또는 기타 유해한 요소가 없음을
              보증하지 않습니다. 침입적이거나 손상된 파일을 포함하지 않으며
              이러한 파괴적인 기능의 결과로 귀하가 입을 수 있는 손상에 대해
              책임을 지지 않습니다. 귀하는 WILLMARKETS와 그 공급업체, 주주,
              대리인, 이사, 임원, 직원, 대리인, 승계인 및 양수인이 다음에 대해
              책임을 지지 않는다는 데 동의합니다. (i) WILLMARKETS, 해당 계열사,
              공급업체, 대리인, 이사, 임원, 직원, 대리인, 무한책임사원, 자회사,
              승계인 및 양수인의 과실로 인해 발생했거나 웹사이트와 관련하여
              발생하는 모든 부상 또는 손해 손실된 이익, 손실, 징벌적, 우발적
              또는 결과적 손해 또는 다른 당사자의 WILLMARKETS에 대한 청구에 대해
              책임을 지지 않습니다. 또는 (ii) 모든 결함, 부정확성, 누락, 지연,
              또는 귀하의 컴퓨터 장비로 인해 발생하거나 그러한 장비에서
              웹사이트를 사용함으로써 발생하는 웹사이트의 기타 오류. 웹사이트에
              링크될 수 있는 다른 웹사이트, 서비스, 상품 또는 광고의 콘텐츠는
              WILLMARKETS에서 유지 관리하거나 통제하지 않습니다. 따라서
              WILLMARKETS는 웹사이트에 링크되거나 광고될 수 있는 다른 웹사이트,
              서비스 또는 상품의 가용성, 콘텐츠 또는 정확성에 대해 책임을 지지
              않습니다. WILLMARKETS는 (a) 어떠한 보증도 하지 않습니다.
              웹사이트에 또는 웹사이트에 제공된 링크의 사용과 관련하여 명시적
              또는 묵시적, (b) 웹사이트에 링크될 수 있는 다른 웹사이트, 서비스,
              상품 또는 광고의 정확성, 완전성, 유용성 또는 적절성을 보장합니다.
              또는 (c) 웹사이트에 링크될 수 있는 다른 웹사이트, 서비스, 상품
              또는 광고를 명시적이든 묵시적이든 보증합니다. WILLMARKETS는 또한
              전화선, 무선 서비스, 통신 매체, 및 웹 사이트에 액세스하는 데
              사용하는 장비. 귀하는 WILLMARKETS 및/또는 웹사이트의 제3자
              기고자가 TCU에 따라 콘텐츠에 액세스하는 것을 언제든지 금지하거나
              금지할 수 있음을 이해하고 인정합니다.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              (iii) 귀하는 다음을 인정합니다. (i) 웹사이트는 정보 제공의
              목적으로만 제공됩니다. (ii) 웹사이트에는 증권 거래소 및 전 세계의
              기타 출처에서 가져온 특정 정보가 포함될 수 있습니다. (iii)
              WILLMARKETS는 웹사이트의 순서, 정확성, 완전성, 특정 목적에 대한
              적합성 또는 적시성을 보장하지 않습니다. (iv) 웹사이트의 특정
              부분의 제공은 WILLMARKETS가 당사자인 다른 계약의 조건을 따릅니다.
              (v) 웹사이트에 포함된 어떠한 정보도 WILLMARKETS가 증권 또는 기타
              금융 상품 또는 서비스를 사용, 구매 또는 판매하거나 법률, 세금,
              회계 또는 투자 조언을 제공하기 위한 권유, 제안, 의견 또는 추천을
              구성하지 않습니다. 또는 보안 또는 서비스의 수익성 또는 적합성에
              관한 서비스 (vi) 웹사이트에 제공된 정보는 그러한 사용 또는 배포가
              법률 또는 규정에 반하는 관할권 또는 국가의 모든 개인 또는 단체.
              따라서 여기에 명시된 것과 상반되는 모든 사항에도 불구하고
              WILLMARKETS, WILLMARKETS의 공급업체, 대리인, 이사, 임원, 직원,
              대표자, 후임자 및 양수인은 귀하 또는 다른 사람에 대해 어떤
              식으로든 직간접적으로 책임을 지지 않습니다. (a) 다음을 포함하되
              이에 국한되지 않는 웹사이트의 부정확성 또는 오류 또는 누락, 시세
              및 재무 데이터; (b) 웹사이트 및/또는 그 콘텐츠의 일부 전송 또는
              전달의 지연, 오류 또는 중단; 또는 (c) 이로 인해 발생하거나 이로
              인해 발생하거나 불이행으로 인한 손실 또는 손해.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              (iv) 과실을 포함하되 이에 국한되지 않는 어떠한 경우에도
              WILLMARKETS의, 공급업체, 대리인, 이사, 임원, 직원, 대표자, 후임자
              또는 대리인, 대리인, 후계자 또는 대리인이 직접, 간접, 부수적,
              결과적, 특별, 징벌적 또는 예견된 손해에 대해 귀하에게 책임을 져야
              하며, WILLMARKETS의는 웹사이트 또는 웹사이트의 웹사이트 또는
              링크의 사용 또는 무능력으로 인해 발생하는 손해의 가능성에 대해
              구체적으로 통보된 경우에도 예를 들어, 매출 손실 또는 예상 이익
              또는 손실 사업 손실과 같이 이에 국한되지 않습니다. 관련 법률은
              책임 또는 부수적 또는 결과적 손해의 제한 또는 배제를 허용하지 않을
              수 있습니다. 어떠한 경우에도 WILLMARKETS의는 모든 손해, 손실 및
              행동 원인에 대해 귀하에게 전적인 책임을 지지 않습니다(계약 또는
              불법 행위의 경우, 과실을 포함하되 이에 국한되지 않음)은 귀하가 웹
              사이트에 액세스하기 위해 WILLMARKETS의에 지불한 금액을 초과합니다.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                8
              </Wrapper>
              이 TCU에 동의할 수 있는 권한
            </Title>
            <Content padding={`14px 0 0 43px`}>
              귀하는 12조에 따라 본 계약을 체결할 권한과 권한이 있음을 진술,
              보증 및 서약합니다. 스위스 민법.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                9
              </Wrapper>
              보증
            </Title>
            <Content padding={`14px 0 0 43px`}>
              귀하는 자신의 비용으로 WILLMARKETS를 면책, 방어 및 무해한 상태로
              유지하는 데 동의합니다. 공급업체, 대리인, 이사, 임원, 직원,
              대리인, 승계인 및 양수인은 다음을 포함하되 이에 국한되지 않는
              웹사이트 또는 웹사이트의 모든 링크: (i) 귀하 또는 귀하의 컴퓨터를
              사용하는 누군가가 웹사이트를 사용하는 경우; (ii) 귀하 또는 귀하의
              컴퓨터(또는 해당되는 경우 계정)를 사용하는 사람의 TCU 위반 (iii)
              귀하 또는 귀하의 컴퓨터를 사용하는 누군가가 웹사이트를 사용하는
              것이 제3자의 지적 재산권 또는 사생활 보호 또는 퍼블리시티권을
              침해하거나 명예를 훼손하거나 명예를 훼손하거나 다른 사람에게 상해
              또는 손해를 입힌다는 주장 제3자; (iv) 귀하 또는 귀하의 컴퓨터를
              사용하는 누군가에 의한 웹사이트의 삭제, 추가, 삽입 또는 변경 또는
              무단 사용; (v) 여기에 포함된 귀하의 허위 진술 또는 진술 또는 보증
              위반; 또는 (vi) 귀하가 본 계약에 따라 수행할 모든 계약 또는 계약의
              위반. 귀하는 그러한 청구, 소송, 소송 또는 소송과 관련하여 또는
              이와 관련하여 또는 이와 관련하여 발생한 합리적인 변호사 수임료 및
              비용을 포함하되 이에 국한되지 않는 모든 비용, 손해 및 경비를
              지불하는 데 동의합니다. 그러한 주장에 기인합니다. WILLMARKETS는
              권리를 보유합니다. 자체 비용으로 귀하가 면책해야 하는 모든 문제에
              대한 배타적 방어 및 통제를 가정합니다. 이 경우 귀하는
              WILLMARKETS와 함께 사용 가능한 방어를 주장하는 데 전적으로
              협력합니다. 귀하는 TCU 및 웹사이트 액세스 및 사용에 적용되는 기타
              조건에 따라 WILLMARKETS가 귀하에게 제기한 모든 소송과 관련하여
              발생한 WILLMARKETS의 합리적인 변호사 비용을 인정하고 이에
              동의합니다.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                10
              </Wrapper>
              종료
            </Title>
            <Content padding={`14px 0 0 43px`}>
              귀하는 이유가 있든 없든 웹 사이트에 대한 액세스 및 사용을 중단하고
              웹 사이트에서 얻은 모든 자료를 파기하여 언제든지 TCU를 종료할 수
              있습니다.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              귀하는 사전 통지 없이 WILLMARKETS가 이유 유무에 관계없이 TCU를
              종료하거나 웹사이트에 대한 귀하의 액세스를 일시 중지할 수 있으며
              즉시 효력이 발생한다는 데 동의합니다. TCU는 WILLMARKETS의 단독
              재량으로 TCU의 조항을 준수하지 않는 경우 WILLMARKETS의 통지 없이
              즉시 종료됩니다.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              WILLMARKETS는 웹사이트의 종료 또는 중지 및/또는 후자에 대한 액세스
              또는 웹사이트의 종료 또는 중지와 관련된 청구에 대해 귀하 또는
              제3자에 대해 책임을 지지 않습니다. 귀하 또는 WILLMARKETS가 TCU를
              종료하면 귀하는 웹사이트 액세스 및 사용을 중단하고 웹사이트 및 그
              사본에서 얻은 모든 자료를 즉시 파기해야 합니다.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                11
              </Wrapper>
              준거법 및 관할
            </Title>
            <Content padding={`14px 0 0 43px`}>
              TCU 및 TCU에서 발생하는 모든 의무의 이행 장소는 스위스
              제네바입니다.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              TCU는 유일하고 배타적인 준거법으로서 스위스 국제사법법과 같은
              국제사법 규정을 참조하지 않고 스위스 법의 적용을 받으며 그에 따라
              해석됩니다.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              TCU로 인해 또는 TCU와 관련하여 발생하는 모든 분쟁, 논쟁 또는
              청구는 유효성, 무효, 위반 또는 종료를 포함하여 스위스 상공 회의소
              중재의 스위스 국제 중재 규칙에 따라 중재에 의해 해결됩니다. 이
              규칙에 따라 중재 통지가 제출된 날짜에 유효한 기관. 규칙에 달리
              명시되지 않는 한 중재인의 수는 3명입니다. 중재 장소는 스위스
              제네바입니다.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              이 섹션은 TCU의 종료 후에도 유지됩니다.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                12
              </Wrapper>
              여러 가지 잡다한
            </Title>
            <Content padding={`14px 0 0 43px`}>
              귀하는 WILLMARKETS가 WILLMARKETS의 단독 재량으로 언제든지
              웹사이트의 모든 측면에 대한 접근성, 콘텐츠 또는 기술 사양을 변경할
              권리가 있음을 인정합니다. 또한 이러한 변경으로 인해 웹 사이트에
              액세스 및/또는 사용하지 못할 수 있음을 인정합니다. WILLMARKETS가
              TCU의 권리 또는 조항을 행사하거나 집행하지 않는다고 해서 그러한
              권리 또는 조항의 포기를 구성하지 않습니다. 섹션 2-13은 TCU가
              종료된 후에도 유효합니다.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              웹 사이트의 영어 버전과 웹 사이트의 다른 언어 버전 간에 불일치가
              있는 경우 영어 버전이 우선합니다. 다른 언어로 된 웹사이트 번역은
              WILLMARKETS에 구속력이 없습니다.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                13
              </Wrapper>
              제목
            </Title>
            <Content padding={`14px 0 0 43px`}>
              TCU의 섹션 제목은 귀하와 WILLMARKETS의 편의를 위해서만 사용되며
              법적 또는 계약상 의미가 없습니다.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                14
              </Wrapper>
              분리 가능성
            </Title>
            <Content padding={`14px 0 0 43px`}>
              TCU의 어떤 조항이 어떤 관할권의 법률에 따라 어떤 면에서든 불법,
              무효 또는 집행 불가능한 경우, 해당 조항은 허용되는 최대 범위까지
              집행되며 나머지 조항의 합법성, 유효성 또는 집행 가능성은 없습니다.
              해당 관할권의 법률에 따른 TCU 또는 다른 관할권의 법률에 따른 해당
              조항의 합법성, 유효성 또는 집행 가능성은 어떤 식으로든 영향을
              받습니다.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                15
              </Wrapper>
              전체 계약
            </Title>
            <Content padding={`14px 0 0 43px`}>
              TCU 및 웹사이트 및 그 승계인의 기타 사용 약관은 귀하와 WILLMARKETS
              간의 완전한 합의를 구성하고 귀하의 웹사이트 사용을 규율합니다.
            </Content>

            <Wrapper al={`flex-start`} fontSize={`22px`} padding={`39px 0 0 0`}>
              웹사이트 링크
            </Wrapper>
            <Content padding={`14px 0 0 43px`}>
              여기에 제공된 경우 또는 WILLMARKETS의 사전 명시적이고 입증된
              동의가 있는 경우를 제외하고 웹 사이트 또는 그 일부에 링크하거나
              프레임을 만들 수 없습니다.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                1
              </Wrapper>
              지적 재산권
            </Title>
            <Content padding={`14px 0 0 43px`}>
              TCU에 따라 웹사이트에 연결하면 웹사이트에서 밑줄이 그어진 텍스트
              링크를 제공하기 위한 용도로만 WILLMARKETS 가 소유한 WILLMARKETS
              마크를 사용할 수 있는 비독점적이고 양도할 수 없으며 로열티 없는
              하위 라이선스가 부여됩니다. 에&nbsp;
              <Wrapper
                color={`#3353f2`}
                display={`contents`}
                cursor={`pointer`}
                onClick={() => moveLinkHandler(`/`)}>
                www.will-markets.com
              </Wrapper>
              . WILLMARKETS의 명시적인 서면 허가 없이 WILLMARKETS의 마크, 이름
              또는 로고를 다른 용도로 사용할 수 없습니다.
            </Content>
            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                2
              </Wrapper>
              WEBSITE에 대한 링크 제한
            </Title>
            <Content padding={`14px 0 0 43px`}>
              TCU에 포함된 다른 조항을 제한하지 않고 웹사이트에&nbsp;
              <Wrapper
                color={`#3353f2`}
                display={`contents`}
                cursor={`pointer`}
                onClick={() => moveLinkHandler(`/`)}>
                www.will-markets.com&nbsp;
              </Wrapper>
              공개적으로 액세스 가능한 웹 페이지 에 대한 링크를 포함할 수
              있습니다 . 귀하는 해당 지적 재산권을 침해하는 사진, 비디오 또는
              정보를 포함하되 이에 국한되지 않는 부적절하고, 모독적이거나,
              명예를 훼손하거나, 침해하거나, 외설적이거나, 외설적이거나 불법적인
              주제, 이름, 자료를 포함하는 사이트를 &nbsp;
              <Wrapper
                color={`#3353f2`}
                display={`contents`}
                cursor={`pointer`}
                onClick={() => moveLinkHandler(`/`)}>
                www.will-markets.com
              </Wrapper>
              에 연결할 수 없습니다 . 소유권, 개인 정보 보호 또는 퍼블리시티권.
            </Content>
          </RsWrapper>
        ) : (
          <RsWrapper padding={width < 1100 ? `50px 100px` : `50px 245px`}>
            <Wrapper
              fontSize={width < 600 ? `30px` : `36px`}
              fontWeight={`700`}>
              TERMS OF USE GOVERNING THE ACCESS TO AND USE OF WILLMARKETS
              WEBSITE
            </Wrapper>

            <Content padding={`20px 0 0 0`}>
              PLEASE READ ALL OF THE FOLLOWING TERMS AND CONDITIONS OF USE FOR
              THIS WEBSITE ("TCU") BEFORE USING THIS SITE. By continuing to
              access, link to, or use this website, or any service accessible
              via this website, you signify YOUR ACCEPTANCE OF THE TCU.
              WILLMARKETS ("WILLMARKETS") reserves the right to amend, remove,
              or add to the TCU at any time. Such modifications shall be
              effective immediately. Accordingly, please continue to review the
              TCU whenever accessing, linking to, or using WILLMARKETS's website
              (the "WEBSITE"). Your access, link to, or use of the WEBSITE, or
              any service accessible from the WEBSITE, after the posting of
              modifications to the TCU will constitute YOUR ACCEPTANCE OF THE
              TCU, as modified. If, at any time, you do not wish to accept the
              TCU, you may not access, link to, or use the WEBSITE. Any terms
              and conditions proposed by you which are in addition to or which
              conflict with the TCU are expressly rejected by WILLMARKETS and
              shall be of no force or effect.
            </Content>

            <Wrapper al={`flex-start`} fontSize={`22px`} padding={`39px 0 0 0`}>
              GENERAL TERMS
            </Wrapper>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                1
              </Wrapper>
              User Consent to the TCU
            </Title>
            <Content padding={`14px 0 0 43px`}>
              You represent that you have read and agree to be bound by the TCU.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                2
              </Wrapper>
              Intellectual Property
            </Title>
            <Content padding={`14px 0 0 43px`}>
              The WEBSITE, including but not limited to text, content,
              photographs, video, audio, links, software and graphics, is
              protected by copyrights, trademarks, service marks, international
              treaties, and/or other proprietary rights and laws of Switzerland
              and other countries. The WEBSITE is also protected as a collective
              work or compilation under Swiss copyright and other laws and
              treaties. All individual articles, columns and other elements
              making up the WEBSITE are also copyrighted works. You agree to
              abide by all applicable copyright and other laws, as well as any
              additional copyright notices or restrictions contained in the
              WEBSITE. You acknowledge that the WEBSITE has been developed,
              compiled, prepared, revised, selected, and arranged by
              WILLMARKETS, its general and limited partners, and its
              subsidiaries, and their respective general partners and affiliates
              (collectively "WILLMARKETS") and others (including certain other
              information sources) through the application of methods and
              standards of judgment developed and applied through the
              expenditure of substantial time, effort, and money and constitutes
              valuable intellectual property of WILLMARKETS and such others. You
              agree to protect the proprietary rights of WILLMARKETS and all
              others having rights in the WEBSITE during and after the term of
              this agreement and to comply with all reasonable written requests
              made by WILLMARKETS or its suppliers and licensors of content,
              equipment, or otherwise ("Suppliers") to protect their and others'
              contractual, statutory, and law rights in the WEBSITE. You agree
              to notify WILLMARKETS in writing promptly upon becoming aware of
              any unauthorized access or use of the WEBSITE by any individual or
              entity or of any claim that the WEBSITE infringes upon any
              copyright, trademark, or other contractual, statutory, or law
              rights. All present and future rights in and to trade secrets,
              patents, copyrights, trademarks, service marks, know-how, and
              other proprietary rights of any type under the laws of any
              governmental authority, domestic or foreign, including rights in
              and to all applications and registrations relating to the WEBSITE
              (the "Intellectual Property Rights") shall, as between you and
              WILLMARKETS, at all times be and remain the sole and exclusive
              property of WILLMARKETS. All present and future rights in and
              title to the WEBSITE (including the right to exploit the WEBSITE
              and any portions of the WEBSITE over any present or future
              technology) are reserved to WILLMARKETS for its exclusive use.
              Except as specifically permitted by the TCU, you may not copy or
              make any use of the WEBSITE or any portion thereof. Except as
              specifically permitted herein, you shall not use the Intellectual
              Property Rights or the WEBSITE, or the names of any individual
              participant in, or contributor to, the WEBSITE, or any variations
              or derivatives thereof, for any purpose, without WILLMARKETS's
              prior written approval.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                3
              </Wrapper>
              Restrictions on Use
            </Title>
            <Content padding={`14px 0 0 43px`}>
              You may not use the WEBSITE for any illegal purpose, for the
              facilitation of the violation of any law or regulation, or in any
              manner inconsistent with the TCU. Except written agreement between
              you and WILLMARKETS, you agree to use the WEBSITE solely for your
              own non-commercial use and benefit, and not for resale or other
              transfer or disposition to, or use by or for the benefit of, any
              other person or entity. You agree not to use, transfer,
              distribute, or dispose of any information contained in the WEBSITE
              in any manner that could compete with the business of WILLMARKETS
              or any of its Suppliers.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              You may not copy, reproduce, recompile, decompile, disassemble,
              reverse engineer, distribute, publish, display, perform, modify,
              upload to, create derivative works from, transmit, or in any way
              exploit any part of the WEBSITE, except that you may download
              material from the WEBSITE and/or make one print copy for your own
              personal, non-commercial use, provided that you retain all
              copyright and other proprietary notices. You may not recirculate,
              redistribute or publish the analysis and presentation included in
              the WEBSITE without WILLMARKETS's prior written consent. You may
              not offer any part of the WEBSITE for sale or distribute it over
              any other medium including but not limited to over-the-air
              television or radio broadcast, a computer network or hyperlink
              framing on the Internet without the prior written consent of
              WILLMARKETS. The WEBSITE and the information contained therein may
              not be used to construct a database of any kind. Nor may the
              WEBSITE be stored (in its entirety or in any part) in databases
              for access by you or any third party or to distribute any database
              WEBSITEs containing all or part of the WEBSITE. You may not use
              the WEBSITE in any way to improve the quality of any data sold or
              contributed by you to any third party.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              You may not input, distribute, upload, post, email, transmit or
              otherwise make available any content through the WEBSITE that: (i)
              is promotional in nature, including solicitations for funds or
              business, without the prior written authorization of WILLMARKETS,
              or constitutes junk mail, spam, chain letters, pyramid schemes or
              the like; (ii) is unlawful, harmful, threatening, abusive,
              harassing, tortious, defamatory, vulgar, obscene, libellous,
              invasive of another's privacy, hateful, or racially, ethnically or
              otherwise objectionable; (iii) you do not have the right to make
              available under any law or under contractual or fiduciary
              relationships (such as inside information, proprietary and
              confidential information learned or disclosed as part of
              employment relationships or under nondisclosure agreements); (iv)
              infringes any patent, trademark, trade secret, copyright or other
              proprietary rights of any party; (v) contains software viruses or
              any other computer code, files or programs designed to interrupt,
              destroy or limit the functionality of any computer software or
              hardware, or telecommunications equipment; (vi) is harmful to
              minors; or (vii) constitutes the personally identifiable
              information of any other person that such person has not
              authorized you to disclose.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              You may neither interfere with nor attempt to interfere with nor
              otherwise disrupt the proper working of the WEBSITE, any
              activities conducted on or through the WEBSITE or any servers or
              networks connected to the WEBSITE. You may neither obtain nor
              attempt to obtain through any means any materials or information
              on the WEBSITE that have not been intentionally made publicly
              available either by public display on the WEBSITE or through
              accessibility by a visible link on the WEBSITE. You shall not
              violate the security of the WEBSITE or attempt to gain
              unauthorized access to the WEBSITE, data, materials, information,
              computer systems or networks connected to any server associated
              with the WEBSITE, through hacking, DDoS attack, password timing or
              any other means. You may neither take nor attempt any action that,
              in the sole discretion of WILLMARKETS, imposes or may impose an
              unreasonable or disproportionately large load or burden on the
              WEBSITE or the infrastructure of the WEBSITE. You shall not use or
              attempt to use any "scraper," "robot," "bot," "spider," "data
              mining," "computer code," or any other automate device, program,
              tool, algorithm, process or methodology to access, acquire, copy,
              or monitor any portion of the WEBSITE, any data or content found
              on or accessed through the WEBSITE, or any other WEBSITE
              information without the prior express written consent of
              WILLMARKETS. You may not forge headers or otherwise manipulate
              identifiers in order to disguise the origin of any other content.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              You confirm having been informed and understood that the WEBSITE
              does not constitute in itself a service of WILLMARKETS.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                4
              </Wrapper>
              License
            </Title>
            <Content padding={`14px 0 0 43px`}>
              (i) You acquire absolutely no rights or licenses in or to the
              WEBSITE and materials contained within the WEBSITE other than the
              limited right to use the WEBSITE in accordance with the TCU.
              Should you choose to download content from the WEBSITE, you must
              do so in accordance with the TCU. Such download is licensed to you
              by WILLMARKETS ONLY for your own personal, non-commercial use in
              accordance with the TCU and does not transfer any other rights to
              you.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              (ii) If you submit material to the WEBSITE or to WILLMARKETS or
              its representative, unless WILLMARKETS indicates otherwise, you
              grant to WILLMARKETS a perpetual, nonexclusive, irrevocable, fully
              paid, royalty-free, sub-licensable and transferable (in whole or
              in part) worldwide right and license in any and all media, now
              known or later developed, to use, publish, reproduce, display,
              modify, transmit digitally, create derivative works based upon,
              distribute, copy, and otherwise exploit, such content for any
              purpose whatsoever (including, without limitation, advertising,
              commercial, promotional and publicity purposes) in WILLMARKETS's
              discretion without additional notice, attribution or consideration
              to you or to any other person or entity. You also permit any other
              WEBSITE'S user to access, store, or reproduce such material for
              that user's personal use. You grant WILLMARKETS the right to use
              the name that you submit in connection with such content. You
              represent and warrant that you own or otherwise control all of the
              rights to the material that you submit; that the material you
              submit is truthful and accurate; that use of the material you
              supply does not violate this TCU and will not cause injury to any
              person or entity; and that you will indemnify WILLMARKETS and its
              Suppliers, agents, directors, officers, employees,
              representatives, successors, and assigns for all claims resulting
              from material you supply. WILLMARKETS and its Suppliers, agents,
              directors, officers, employees, representatives, successors, and
              assigns disclaim any responsibility and assume no liability for
              any material submitted by you or any third party.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                5
              </Wrapper>
              Fees
            </Title>
            <Content padding={`14px 0 0 43px`}>
              Except express written agreement, the access to and use of the
              WEBSITE is free of charge and does not require to be a client of
              WILLMARKETS or of its Group companies.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                6
              </Wrapper>
              Residence and Legal Restrictions
            </Title>
            <Content padding={`14px 0 0 43px`}>
              The WEBSITE provision is not aimed at residents of jurisdictions
              from which for whatever reason the access to and use of the
              WEBSITE or any part thereof is either prohibited or strictly
              regulated. If you are subject to such restrictions, you may not
              access and use the WEBSITE or any part thereof. Please note that
              all trading related information on the WEBSITE is not intented for
              Belgium residents.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                7
              </Wrapper>
              Disclaimer and Limitation of Liability
            </Title>
            <Content padding={`14px 0 0 43px`}>
              (i) YOU AGREE THAT YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK
              AND ACKNOWLEDGE THAT THE SERVICE AND ANYTHING CONTAINED WITHIN THE
              WEBSITE, INCLUDING, BUT NOT LIMITED TO, CONTENT OR ADVERTISEMENTS
              ARE PROVIDED "AS IS" AND "AS AVAILABLE," AND THAT WILLMARKETS
              MAKES NO WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE
              WEBSITE, INCLUDING, BUT NOT LIMITED TO, MERCHANTABILITY,
              NON-INFRINGEMENT, TITLE, OR FITNESS FOR A PARTICULAR PURPOSE OR
              USE.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              (ii) WILLMARKETS does not warrant that the WEBSITE is compatible
              with your equipment or that the WEBSITE, or e-mail sent by
              WILLMARKETS or its representative, is free of errors or viruses,
              worms or "Trojan horses," or any other harmful, invasive, or
              corrupted files, and is not liable for any damage you may suffer
              as a result of such destructive features. You agree that
              WILLMARKETS and its Suppliers, shareholders, agents, directors,
              officers, employees, representatives, successors, and assigns
              shall have no responsibility or liability for: (i) any injury or
              damages, whether caused by the negligence of WILLMARKETS, their
              respective affiliates, Suppliers, agents, directors, officers,
              employees, representatives, general partner, subsidiaries,
              successors, and assigns, or otherwise arising in connection with
              the WEBSITE and shall not be liable for any lost profits, losses,
              punitive, incidental or consequential damages, or any claim
              against WILLMARKETS by any other party; or (ii) any fault,
              inaccuracy, omission, delay, or any other failure in the WEBSITE
              caused by your computer equipment or arising from your use of the
              WEBSITE on such equipment. The content of other websites,
              services, goods, or advertisements that may be linked to the
              WEBSITE is not maintained or controlled by WILLMARKETS.
              WILLMARKETS is therefore not responsible for the availability,
              content, or accuracy of other websites, services, or goods that
              may be linked to, or advertised on the WEBSITE. WILLMARKETS does
              not: (a) make any warranty, express or implied, with respect to
              the use of the links provided on, or to, the WEBSITE; (b)
              guarantee the accuracy, completeness, usefulness or adequacy of
              any other websites, services, goods, or advertisements that may be
              linked to the WEBSITE; or (c) make any endorsement, express or
              implied, of any other websites, services, goods, or advertisements
              that may be linked to the WEBSITE. WILLMARKETS is also not
              responsible for the reliability or continued availability of the
              telephone lines, wireless services, communications media, and
              equipment you use to access the WEBSITE. You understand and
              acknowledge that WILLMARKETS and/or third-party contributors to
              the WEBSITE may choose at any time to inhibit or prohibit their
              content from being accessed under the TCU.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              (iii) You acknowledge that: (i) the WEBSITE is provided for
              information purposes only; (ii) the WEBSITE may include certain
              information taken from stock exchanges and other sources from
              around the world; (iii) WILLMARKETS does not guarantee the
              sequence, accuracy, completeness, fitness for a specific purpose
              or timeliness of the WEBSITE; (iv) the provision of certain parts
              of the WEBSITE is subject to the terms and conditions of other
              agreements to which WILLMARKETS is a party; (v) none of the
              information contained on the WEBSITE constitutes a solicitation,
              offer, opinion, or recommendation by WILLMARKETS to use, buy or
              sell any security or other financial instrument or service, or to
              provide legal, tax, accounting, or investment advice or services
              regarding the profitability or suitability of any security or
              service; and (vi) the information provided on the WEBSITE is not
              intended for use by, or distribution to, any person or entity in
              any jurisdiction or country where such use or distribution would
              be contrary to law or regulation. Accordingly, anything to the
              contrary herein set forth notwithstanding, WILLMARKETS, its
              Suppliers, agents, directors, officers, employees,
              representatives, successors, and assigns shall not, directly or
              indirectly, be liable, in any way, to you or any other person for
              any: (a) inaccuracies or errors in or omissions from the WEBSITE
              including, but not limited to, quotes and financial data; (b)
              delays, errors, or interruptions in the transmission or delivery
              of the WEBSITE and/or any part of its content; or (c) loss or
              damage arising therefrom or occasioned thereby, or by any reason
              of non-performance.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              (iv) UNDER NO CIRCUMSTANCES, INCLUDING BUT NOT LIMITED TO
              NEGLIGENCE, SHALL DUKASCOPY, ITS SUPPLIERS, AGENTS, DIRECTORS,
              OFFICERS, EMPLOYEES, REPRESENTATIVES, SUCCESSORS, OR ASSIGNS BE
              LIABLE TO YOU FOR DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL,
              SPECIAL, PUNITIVE, OR EXEMPLARY DAMAGES EVEN IF DUKASCOPY HAS BEEN
              ADVISED SPECIFICALLY OF THE POSSIBILITY OF SUCH DAMAGES, ARISING
              FROM THE USE OF OR INABILITY TO USE THE WEBSITE OR ANY LINKS OR
              ITEMS ON THE WEBSITE OR ANY PROVISION OF THE TCU, SUCH AS, BUT NOT
              LIMITED TO, LOSS OF REVENUE OR ANTICIPATED PROFITS OR LOST
              BUSINESS. APPLICABLE LAW MAY NOT ALLOW THE LIMITATION OR EXCLUSION
              OF LIABILITY OR INCIDENTAL OR CONSEQUENTIAL DAMAGES. IN NO EVENT
              SHALL DUKASCOPY'S TOTAL LIABILITY TO YOU FOR ALL DAMAGES, LOSSES
              AND CAUSES OF ACTION (WHETHER IN CONTRACT OR TORT, INCLUDING BUT
              NOT LIMITED TO, NEGLIGENCE) EXCEED THE AMOUNT PAID BY YOU TO
              DUKASCOPY, IF ANY, FOR ACCESSING THE WEBSITE.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                8
              </Wrapper>
              Your Authority to Agree to this TCU
            </Title>
            <Content padding={`14px 0 0 43px`}>
              You represent, warrant and covenant that you have the power and
              authority to enter into this agreement according to article 12 ff.
              of the Swiss Civil Code.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                9
              </Wrapper>
              Indemnification
            </Title>
            <Content padding={`14px 0 0 43px`}>
              You agree, at your own expense, to indemnify, defend and hold
              harmless WILLMARKETS, its Suppliers, agents, directors, officers,
              employees, representatives, successors, and assigns from and
              against any and all claims, damages, liabilities, costs, and
              expenses, including reasonable attorneys' and experts' fees,
              arising out of or in connection with the WEBSITE, or any links on
              the WEBSITE, including, but not limited to: (i) your use or
              someone using your computer's use of the WEBSITE; (ii) a violation
              of the TCU by you or anyone using your computer (or account, where
              applicable); (iii) a claim that any use of the WEBSITE by you or
              someone using your computer infringes any intellectual property
              right of any third party, or any right of privacy or publicity, is
              libellous or defamatory, or otherwise results in injury or damage
              to any third party; (iv) any deletions, additions, insertions or
              alterations to, or any unauthorized use of the WEBSITE by you or
              someone using your computer; (v) any misrepresentation or breach
              of representation or warranty made by you contained herein; or
              (vi) any breach of any covenant or agreement to be performed by
              you hereunder. You agree to pay any and all costs, damages, and
              expenses, including, but not limited to, reasonable attorneys'
              fees and costs awarded against or otherwise incurred by or in
              connection with or arising from any such claim, suit, action, or
              proceeding attributable to any such claim. WILLMARKETS reserves
              the right, at its own expense, to assume the exclusive defence and
              control of any matter otherwise subject to indemnification by you,
              in which event you will fully cooperate with WILLMARKETS in
              asserting any available defence. You acknowledge and agree to pay
              WILLMARKETS's reasonable attorneys' fees incurred in connection
              with any and all lawsuits brought against you by WILLMARKETS under
              the TCU and any other terms and conditions applicable to the
              access and use of the WEBSITE, including without limitation,
              lawsuits arising from your failure to indemnify WILLMARKETS
              pursuant to the TCU.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                10
              </Wrapper>
              Termination
            </Title>
            <Content padding={`14px 0 0 43px`}>
              You may terminate the TCU, with or without cause and at any time,
              by discontinuing your access and use of the WEBSITE and destroying
              all materials obtained from the WEBSITE.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              You agree that, without notice, WILLMARKETS may terminate the TCU,
              or suspend your access to the WEBSITE, with or without cause at
              any time and effective immediately. The TCU will terminate
              immediately without notice from WILLMARKETS if you, in
              WILLMARKETS's sole discretion, fail to comply with any provision
              of the TCU.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              WILLMARKETS shall not be liable to you or any third party for the
              termination or suspension of the WEBSITE and/or access to the
              latter, or any claims related to the termination or suspension of
              the WEBSITE. Upon termination of the TCU by you or WILLMARKETS,
              you must discontinue your access and use of the WEBSITE and
              destroy promptly all materials obtained from the WEBSITE and any
              copies thereof.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                11
              </Wrapper>
              Applicable Law and Jurisdiction
            </Title>
            <Content padding={`14px 0 0 43px`}>
              The place of performance of the TCU and of all the obligations
              arising from the TCU is Geneva, Switzerland.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              The TCU are subject to and shall be construed in accordance with
              Swiss law without reference to its conflict of law rules, such as
              the Swiss Private International Law act, as the sole and exclusive
              governing law.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              Any dispute, controversy or claim arising out of, or in relation
              to, the TCU, including the validity, invalidity, breach, or
              termination thereof, shall be resolved by arbitration in
              accordance with the Swiss Rules of International Arbitration of
              the Swiss Chambers' Arbitration Institution in force on the date
              on which the Notice of Arbitration is submitted in accordance with
              these Rules. The number of Arbitrators shall be three, unless the
              Rules specify otherwise. The seat of the Arbitration shall be
              Geneva, Switzerland. The arbitral proceedings shall be conducted
              in English.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              This Section shall survive any termination of the TCU.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                12
              </Wrapper>
              Miscellaneous
            </Title>
            <Content padding={`14px 0 0 43px`}>
              You accept that WILLMARKETS has the right to change the
              accessibility, content or technical specifications of any aspect
              of the WEBSITE at any time in WILLMARKETS's sole discretion. You
              further accept that such changes may result in you being unable to
              access and/or use the WEBSITE. The failure of WILLMARKETS to
              exercise or enforce any right or provision of the TCU shall not
              constitute a waiver of such right or provision. Sections 2 through
              13 shall survive any termination of the TCU.
            </Content>
            <Content padding={`14px 0 0 43px`}>
              In case of discrepancy between the English version of the WEBSITE
              and other language versions of the WEBSITE, the English version
              shall prevail. Translations of the WEBSITE in other languages are
              not binding on WILLMARKETS.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                13
              </Wrapper>
              Headings
            </Title>
            <Content padding={`14px 0 0 43px`}>
              The section titles in the TCU are used solely for the convenience
              of you and WILLMARKETS and have no legal or contractual
              significance.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                14
              </Wrapper>
              Severability
            </Title>
            <Content padding={`14px 0 0 43px`}>
              If at any time any provision of the TCU is or becomes illegal,
              invalid or unenforceable in any respect under the law of any
              jurisdiction, that provision will be enforced to the maximum
              extent permissible and neither the legality, validity or
              enforceability of the remaining provisions of the TCU under the
              law of that jurisdiction nor the legality, validity or
              enforceability of such provision under the law of any other
              jurisdiction shall be in any way affected
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                15
              </Wrapper>
              Entire Agreement
            </Title>
            <Content padding={`14px 0 0 43px`}>
              The TCU and any other terms and conditions of use on the WEBSITE,
              and its successor, constitute the entire agreement between you and
              WILLMARKETS and govern your use of the WEBSITE.
            </Content>

            <Wrapper al={`flex-start`} fontSize={`22px`} padding={`39px 0 0 0`}>
              LINK THE WEBSITE
            </Wrapper>
            <Content padding={`14px 0 0 43px`}>
              YOU MAY NOT LINK TO OR FRAME THE WEBSITE, OR ANY PORTION THEREOF,
              EXCEPT AS PROVIDED HEREIN OR WITH PRELIMINARY EXPRESS AND
              EVIDENCED CONSENT OF WILLMARKETS.
            </Content>

            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                1
              </Wrapper>
              Intellectual Property
            </Title>
            <Content padding={`14px 0 0 43px`}>
              Upon linking to the WEBSITE pursuant to the TCU, you will be
              granted a non-exclusive, non-transferable, royalty-free
              sub-license to use the WILLMARKETS mark owned by WILLMARKETS
              solely for providing an underlined, textual link from your website
              to&nbsp;
              <Wrapper
                color={`#3353f2`}
                display={`contents`}
                cursor={`pointer`}
                onClick={() => moveLinkHandler(`/`)}>
                www.will-markets.com
              </Wrapper>
              . No other use of WILLMARKETS's marks, names or logos is permitted
              without express written permission from WILLMARKETS.
            </Content>
            <Title dr={`row`} ju={`flex-start`} color={`#000`}>
              <Wrapper className={`number`} width={`auto`}>
                2
              </Wrapper>
              Restrictions on Linking to the WEBSITE
            </Title>
            <Content padding={`14px 0 0 43px`}>
              Without limiting other provisions contained in the TCU, you may
              include a link(s) on your website to&nbsp;
              <Wrapper
                color={`#3353f2`}
                display={`contents`}
                cursor={`pointer`}
                onClick={() => moveLinkHandler(`/`)}>
                www.will-markets.com&nbsp;
              </Wrapper>
              publicly accessible Web pages. You may not link to &nbsp;
              <Wrapper
                color={`#3353f2`}
                display={`contents`}
                cursor={`pointer`}
                onClick={() => moveLinkHandler(`/`)}>
                www.will-markets.com&nbsp;
              </Wrapper>
              any site containing an inappropriate, profane, defamatory,
              infringing, obscene, indecent or unlawful topic, name, material
              including but not limited to pictures, videos, or information that
              violates any applicable intellectual property, proprietary,
              privacy or publicity rights.
            </Content>
          </RsWrapper>
        )}
      </WholeWrapper>
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

export default Terms;
