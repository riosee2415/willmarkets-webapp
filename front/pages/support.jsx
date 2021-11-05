import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import styled from "styled-components";
import { Result, message, Modal } from "antd";
import useInput from "../hooks/useInput";
import { emptyCheck } from "../components/commonUtils";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { CaretDownOutlined } from "@ant-design/icons";
import useWidth from "../hooks/useWidth";
import {
  Image,
  Wrapper,
  RsWrapper,
  CommonButton,
  Label,
  TextInput,
  RadioInput,
  Combo,
  ComboList,
  ComboListItem,
  ComboTitle,
} from "../components/commonComponents";
import ClientLayout from "../components/ClientLayout";
import Theme from "../components/Theme";
import SubBanner from "../components/SubBanner";
import { QUESTION_CREATE_REQUEST } from "../reducers/question";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const CustomInput = styled(TextInput)`
  width: ${(props) => props.width || `350px`};
  height: 40px;
  border: none;
  border-bottom: ${(props) => props.borderBottom || `1px solid #dfdfdf`};

  &:hover,
  &:focus {
    border-bottom: ${(props) => props.hoverBorderBottom || `1px solid #e6c0d4`};
  }
`;

const TextLabel = styled(Label)``;

const InputText = styled(TextInput)`
  border: none;
  border-bottom: ${(props) => props.borderBottom};
  &:focus {
    border-bottom: 1px solid #635cf3;
  }
`;

const Content = styled.textarea`
  font-size: 16px;
  color: #8b8686;
  font-weight: 400;
  padding: 0 10px;
  border: none;
  outline: none;
  resize: none;
  width: 100%;
  border-bottom: ${(props) => props.borderBottom};
  &:focus {
    border-bottom: 1px solid #635cf3;
  }
`;

const PreText = styled.pre`
  white-space: pre-line;
  margin: 0;
  padding: 0;
  font-size: 13px;
`;

const FormButton = styled(CommonButton)`
  padding: 0;
  font-size: ${(props) => props.fontSize || `18px`};
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;

  ${(props) =>
    props.kindOf === `type1` &&
    `
      color: #576096;
      background: #F2EFFE;
      box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);

      &:hover,
      &:focus {
        color: #576096;
        background: #F2EFFE;
        box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);
      }
  `}

  ${(props) =>
    props.kindOf === `type2` &&
    `
      color: #576096;
      background: #E7E6F1;
      box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);

      &:hover,
      &:focus {
        color: #576096;
        background: #E7E6F1;
        box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);
      }
  `}

  ${(props) =>
    props.kindOf === `type3` &&
    `
      background: #342CDF;
      color: #fff;
      box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);

      &:hover,
      &:focus {
        background: #342CDF;
        color: #fff;
        box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);
      }
  `}

  @media (max-width: 700px) {
    font-size: ${(props) => props.fontSize || `16px`};
  }
`;

const Support = () => {
  ////// VARIABLES //////

  const countryList = [
    {
      name: `Brazil`,
      value: `+55`,
    },
    {
      name: `Chile`,
      value: `+56`,
    },
    {
      name: `Denmark`,
      value: `+45`,
    },
    {
      name: `Ecuador`,
      value: `+593`,
    },
    {
      name: `France`,
      value: `+33`,
    },
    {
      name: `Guatemala`,
      value: `+502`,
    },
    {
      name: `Hong Kong`,
      value: `+852`,
    },
    {
      name: `Italy`,
      value: `+39`,
    },
    {
      name: `Ireland`,
      value: `+353`,
    },
    {
      name: `Japan`,
      value: `+81`,
    },
    {
      name: `Monaco`,
      value: `+377`,
    },
    {
      name: `Mexico`,
      value: `+52`,
    },
    {
      name: `Philippine`,
      value: `+63`,
    },
    {
      name: `Portugal`,
      value: `+351`,
    },
    {
      name: `Paraguay`,
      value: `+595`,
    },
    {
      name: `South Korea`,
      value: `+82`,
    },
    {
      name: `Switzerland`,
      value: `+41`,
    },
    {
      name: `Taiwan`,
      value: `+886`,
    },
    {
      name: `United Kingdom`,
      value: `+44`,
    },
    {
      name: `Vietnam`,
      value: `+84`,
    },
  ];

  ////// HOOKS //////
  const dispatch = useDispatch();

  const { t } = useTranslation(["support"]);

  const width = useWidth();

  const { st_questionCreateDone, st_questionCreateError } = useSelector(
    (state) => state.question
  );

  const inputName = useInput("");
  const inputNumber = useInput("");
  const inputEmail = useInput("");
  const inputContent = useInput("");
  const inputAgree = useInput(false);
  const inputCountryNo = useInput("");
  const inputMobile = useInput("");

  const [toggleModal, setToggleModal] = useState(false);
  const [comboCountryNo, setComboCountryNo] = useState(false);

  ////// TOGGLE //////

  ////// HANDLER //////

  const createQuestionHandler = useCallback(() => {
    if (!emptyCheck(inputName.value)) {
      return message.error(t(`1`));
    }

    if (!emptyCheck(inputNumber.value)) {
      return message.error(t(`2`));
    }

    if (!emptyCheck(inputEmail.value)) {
      return message.error(t(`3`));
    }

    if (!emptyCheck(inputContent.value)) {
      return message.error(t(`4`));
    }

    if (!inputAgree.value) {
      return message.error(t(`5`));
    }

    dispatch({
      type: QUESTION_CREATE_REQUEST,
      data: {
        language: i18next.language,
        name: inputName.value,
        mobile: `${inputCountryNo.value} ${inputNumber.value}`,
        email: inputEmail.value,
        content: inputContent.value,
      },
    });
  }, [inputName, inputNumber, inputEmail, inputContent, inputAgree]);

  const toggleModalHandler = useCallback(() => {
    setToggleModal(!toggleModal);
  }, [toggleModal]);

  ///////////// USEEFCT ///////////
  useEffect(() => {
    if (st_questionCreateDone) {
      message.success(t(`6`));

      inputName.setValue("");
      inputNumber.setValue("");
      inputEmail.setValue("");
      inputContent.setValue("");
      inputAgree.setValue(false);
      inputCountryNo.setValue("");
    }
  }, [st_questionCreateDone]);

  useEffect(() => {
    if (st_questionCreateError) {
      return message.error(st_questionCreateError);
    }
  }, [st_questionCreateError]);

  return (
    <ClientLayout>
      <SubBanner />

      <Wrapper bgColor={`#000105`} padding={`80px 0`}>
        <RsWrapper>
          <Wrapper color={"#3353F2"} fontSize={`28px`} fontWeight={`300`}>
            {t(`7`)}
          </Wrapper>

          <Wrapper
            color={`#fff`}
            margin={`22px 0 5px`}
            textAlign={`center`}
            fontSize={`20px`}>
            {t(`8`)}
            <br />
            {t(`9`)}
          </Wrapper>

          <Wrapper dr={`row`} ju={`flex-start`} margin={`100px 0 0 0`}>
            <Wrapper width={`60%`}>
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/consulting/image_consulting.png`}
              />
            </Wrapper>

            <Wrapper dr={`row`} width={`40%`}>
              <Wrapper
                bgColor={Theme.white_C}
                radius={`8px`}
                padding={`50px 15px 60px`}
                width={`425px`}>
                <Wrapper dr={`row`} al={`normal`}>
                  <Wrapper width={`85px`} al={`flex-start`} ju={`flex-end`}>
                    <TextLabel margin={`0 25px 0 0 `}>{t(`10`)}</TextLabel>
                  </Wrapper>

                  <Wrapper width={`250px`}>
                    <InputText
                      width={width < 700 ? `calc(100% - 85px)` : ``}
                      borderBottom={"1px solid #e3e3e3"}
                      fontSize={`16px`}
                      color={`#8b8686`}
                      fontWeight={`400`}
                      {...inputName}
                    />
                  </Wrapper>
                </Wrapper>

                <Wrapper dr={`row`} al={`normal`} margin={`30px 0 0 0`}>
                  <Wrapper width={`85px`} al={"flex-start"} ju={`flex-end`}>
                    <TextLabel margin={`0 25px 0 0 `}>{t(`11`)}</TextLabel>
                  </Wrapper>

                  <Wrapper dr={`row`} width={`250px`}>
                    <Combo
                      isBorder={true}
                      itemAlign={`flex-start`}
                      margin={`0 10px 0 0`}
                      width={`100px`}
                      height={`35px`}
                      listHeight={`270px`}
                      border={`none`}
                      borderBottom={`1px solid #dfdfdf !important`}
                      onClick={() => setComboCountryNo(!comboCountryNo)}>
                      <ComboTitle>
                        <Wrapper>{inputCountryNo.value || `Select`}</Wrapper>
                        <CaretDownOutlined />
                      </ComboTitle>

                      <ComboList isView={comboCountryNo} width={`180%`}>
                        {countryList.map((data, idx) => {
                          return (
                            <ComboListItem
                              key={idx}
                              isActive={inputCountryNo.value === data.value}
                              onClick={() =>
                                inputCountryNo.setValue(data.value)
                              }>
                              {data.name} ({data.value})
                            </ComboListItem>
                          );
                        })}
                      </ComboList>
                    </Combo>

                    <InputText
                      width={`calc(100% - 110px)`}
                      maxLength={`13`}
                      borderBottom={"1px solid #e3e3e3"}
                      fontSize={`16px`}
                      color={`#8b8686`}
                      fontWeight={`400`}
                      {...inputNumber}
                    />
                  </Wrapper>
                </Wrapper>

                <Wrapper dr={`row`} al={`normal`} margin={`30px 0 0 0`}>
                  <Wrapper width={`85px`} al={"flex-start"} ju={`flex-end`}>
                    <TextLabel margin={`0 25px 0 0 `}>{t(`12`)}</TextLabel>
                  </Wrapper>
                  <Wrapper width={`250px`}>
                    <InputText
                      borderBottom={"1px solid #e3e3e3"}
                      fontSize={`16px`}
                      color={`#8b8686`}
                      fontWeight={`400`}
                      {...inputEmail}
                    />
                  </Wrapper>
                </Wrapper>

                <Wrapper dr={`row`} al={`baseline`} margin={`40px 0 0 0`}>
                  <Wrapper width={`85px`} al={`flex-start`} ju={`flex-end`}>
                    <TextLabel margin={`0 25px 0 0 `}>{t(`13`)}</TextLabel>
                  </Wrapper>
                  <Wrapper width={`250px`} borderBottom={"1px solid #e3e3e3"}>
                    <Content width={`100%`} {...inputContent} />
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper margin={`10px 0`}>
                <Wrapper ju={`flex-start`} width={`475px`} margin={`0 30px`}>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    margin={`0px 10px 0 14px`}>
                    <RadioInput
                      color={`#313B91`}
                      checked={inputAgree.value}
                      onClick={() => inputAgree.setValue(!inputAgree.value)}
                    />
                    <Wrapper
                      fontSize={`15px`}
                      color={`white`}
                      margin={`0 30px 0 0`}
                      width={`auto`}
                      opacity={`0.6`}
                      cursor={`pointer`}
                      onClick={() => inputAgree.setValue(!inputAgree.value)}>
                      {t(`14`)}
                    </Wrapper>
                    <Wrapper
                      cursor={`pointer`}
                      fontSize={`13px`}
                      color={`white`}
                      width={`auto`}
                      radius={`5px`}
                      padding={`0 6px`}
                      bgColor={"#8b8686"}
                      onClick={toggleModalHandler}>
                      {t(`15`)}
                    </Wrapper>
                  </Wrapper>

                  <Wrapper margin={`50px 80px 0 0`} fontSize={`32px`}>
                    <CommonButton
                      bgColor={`#3353F2`}
                      color={`#fff`}
                      fontWeight={`300`}
                      fontSize={`24px`}
                      padding={`6px 50px 8px`}
                      radius={`6px`}
                      onClick={createQuestionHandler}>
                      {t(`7`)}
                    </CommonButton>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </RsWrapper>

        <Modal
          visible={toggleModal}
          width={width < 700 ? `350px` : `500px`}
          title={`개인정보 수집 및 이용`}
          onCancel={toggleModalHandler}
          footer={[
            <FormButton
              kindOf={`type1`}
              width={`70px`}
              height={`35px`}
              fontSize={`15px`}
              onClick={toggleModalHandler}>
              확인
            </FormButton>,
          ]}>
          <Wrapper
            width={`auto`}
            height={`300px`}
            overflow={`auto`}
            padding={`10px`}>
            <PreText>
              {i18next.language === `en`
                ? `
                PRIVACY POLICY OF WILLMARKETS
                1.Introduction
                1.We are strongly committed to protecting and safeguarding your personal data. The
                present Privacy Policy of will-markets (here-after "the Company") has been
                implemented in light of the EU's General Data Protection Regulation (GDPR) which
                benefits to the residents of the European Union.       
                2. This Privacy Policy provides information on the processing and protection by the
                Company of personal data of natural persons residing in the EU 
                EU residents accessing the Company's websites and applying for using its services shall
                preliminarily read and accept the present Privacy Policy. By continuing to access and use
                this website or services you expressly confirm your acceptance of our Privacy Policy.
                2. Definitions 
                1. Client – any natural person, who has been using or has expressed
                willingness to use services and other online resources (e.g. contests, online 
                community, etc.) provided by the Company
                2.Privacy Policy – the present Privacy Policy of Dukascopy Bank 
                3. Personal Data – any information related to an identified or identifiable
                individual. For further information please see Section 3
                4.Processing – any actions related to Personal Data for instance,
                but not limited to collection, recording, storage, transfer, erasure,
                etc. 
                5.Services – any services offered by the Company 
                6. Website – www.will-markets.com 
                3. Categories of Personal Data That the Company Process 
                1.The Company processes certain Personal Data for the purposes specified under
                Section 4. Please note that the below list is not exhaustive and upon necessity
                the Company may process other Personal Data, according to its Privacy Policy
                and other relevant legal enactments. 
                1.Personal Data received from the Client: 
                1.Natural persons identification data – including,
                but not limited to name, surname, tax identification
                number, date of birth, details of identification
                document (e.g. passport number or copies) 
                2.Contact information – address, telephone number,
                e-mail address and other if relevant; 
                3.Financial information – account number, account
                balance, income, wealth, transactions and other similar
                information; 
                4.Background and source of funds – information
                regarding the education, the place of work,
                occupation, business activities if any, employer if any 
                5.Information relating to the use of services and their
                relation to Clients preferences, habits etc. – such as
                information on services used, personal settings, surveys,
                contests and campaigns to which the Client has
                participated 
                6.Marital status and relevant third parties – individuals
                and legal entities connected to the Client account (e.g.
                POA holders, authorised users, etc.), originators or
                beneficiaries of the Client's transactions, etc. 
                2.Information collected automatically while using the Website or mobile or
                online applications operated or owned by the Company: 
                1.Technical information and unique identifiers –
                Internet protocol (IP) address, login information,
                information about browser, time zone, etc.; 
                2.Cookies used by the Company’s websites and its
                mobile applications. For more detailed information on
                the types of cookies and unique identifiers the
                Company use and for which purposes, please refer
                to Section 10. 
                3. It is the duty of the Client of informing third parties of this Privacy 
                Policy in case he passes to the Company Personal Data related
                to such third parties.
                4.Grounds and Purposes for the Processing of Personal Data
                1.The Company processes Personal Data if one of the following applies: 
                1.the processing of Personal Data is necessary to enter into
                and perform a contract 
                2.to comply with the Company’s legal obligations 
                3. to protect the legitimate interests of the Company or of third
                party 
                4. if the Company receives the Client's consent. 
                2.The Company primarily processes Personal Data for the following purposes: 
                1.to provide Services and free of charge online and mobile
                resources; 
                2.to send administrative information, including updates of
                policies and changes to contractual terms; 
                3.to provide the Client with information about Services, products,
                educational materials, upcoming events and other related
                information that may be useful to the Client in relation to willmarkets offers and other resources; 
                4.to assess and mitigate risks related to anti-money
                laundering and terrorism financing as well as transaction
                related risks; 
                5.to comply with legal obligations and/ or government
                authorities’ requests; 
                6.in relation to the Company’s legitimate interests. 
                5.Disclosure of Clients Personal Data 
                1.The Company is entitled to disclose Client’s Personal Data to selected third
                parties, including: 
                1.within will-markets, including all offices and affiliates of the 
                Company, irrespective of their geographical location;
                2.to selected third parties, including providers that deliver
                services to Dukascopy Group under written agreements
                ensuring proper safeguards and limitations with regards to
                Personal Data processing. This may include companies
                providing IT, payment services, audit services, identity
                verification, due diligence services, data analysis,
                marketing support, cloud services and others; 
                3.to competent governmental, regulatory or other law
                enforcement agencies/ authorities. 
                6.Personal Data Transfers 
                1.The Client Personal Data is primarily processed within the
                European Economic Area (EEA) and the Swiss Confederation.
                However, when it is necessary, Personal Data may be transferred
                to third countries, as specified in this Privacy Policy. 
                2.The Company transfers or makes Client Personal Data accessible for
                processing outside the EEA or the Swiss Confederation only when appropriate
                safeguards are in place and if one of the following applies: 
                1.This is required under the laws and regulations 
                2.This is necessary to enter into or to perform the agreements
                for the Services 
                3.The Client has given consent to the processing of his data
                outside the EEA. 
                7.Retention Period 
                1. The period of retention of Personal Data depends on the purposes
                specified by the Company.
                2.In determining the retention period of Personal Data, the Company
                takes into account contractual obligations, the legitimate interest of
                the Company and relevant legal enactments (such as the regulation
                concerning anti-money laundering and terrorism financing).  
                8.Client’s Obligation 
                The Client agrees not to hold the Company nor will-markets or any of their officers, directors,
                employees and affiliates liable for losses of any kind, including financial, suffered by the
                Client in case of use by a third party of Client’s confidential information, for example the
                login and password either communicated to this third party by the Client or obtained by the
                third party from the Client by an abusive/fraudulent manner. The Client shall be solely liable
                for any such personal data disclosure to unauthorised third parties.
                9.Client’s Rights 
                1.Upon written request, the Client may receive a copy of his
                Personal Data that are processed by the Company. If such
                request is excessive or repetitive, the Company may refuse to
                provide the Client with copy of his Personal Data and the
                Company may request a reasonable fee taking into account the
                necessary resources for preparing such copy 
                2.The Client may request the Company to correct his Personal Data; 
                3.The Client may request the Company to erase his Personal Data
                to the extent permitted by law and other regulation applicable to
                the Company
                4.The Client may restrict the processing of his Personal Data by the
                Company to the extent permitted by law and other regulation
                applicable to the Company 
                5.The Client has the right to receive his Personal Data in structured,
                commonly used and electronic format as well as to transmit it to
                another controller
                6.All aforementioned rights should be exercised in good faith and
                on written request basis
                7.If your request or concern is not satisfactorily resolved by us,
                upon your written demand, you may approach the Data State
                Inspectorate of the Republic of Latvia. 
                10.Cookies 
                1.The Company uses monitoring technologies such as cookies to
                provide efficient operation of the Website to its visitors; 
                2.Cookie is technology based on small system files placed on
                browser during visit of the Website; 
                3.The Company collects information about visitor’s device and uses cookies to: 
                1.customize Company’s Website features; 
                2. avoid re-entry of visitor’s data 
                3.store visitor’s preferences 
                4.gather information about usage of the Website. 
                4.The Company uses third party cookies, provided by third party
                web analytic services such as Google Analytics 
                5.Clients and Website visitors can configure their browser
                preferences and not to accept cookies, however this may affect
                functionality of the Website 
                11.Contact Details
                Should the Client have any questions or inquiries regarding the processing of his Personal
                Data by the Company, he shall send an e-mail to: support@dukascopy.com or send a letter
                to the postal address indicated on the Company’s Website: https://www.will-markets.com.
                12.Final Provisions 
                The Client agrees that the Company has the right to change its
                Privacy Policy at any time without prior notice to the Client. The
                Company may freely use its Websites to inform the Client about
                any changes in the Privacy Policy. The publishing of an updated
                version of the Privacy Policy on the Company’s website(s) shall
                be deemed a valid notification of changes to the Client. The Client
                undertakes to regularly review the Company’s Website(s) and
                updates to the Privacy Policy.
                2.The amendments to the Privacy Policy shall become effective on
                the date specified in the Privacy Policy 
                3.This Privacy Policy was last updated on the date indicated at the
                top. It supersedes all previous versions. 

                `
                : `웰마켓의 개인정보보호정책
                1.소개
                당사는 귀하의 개인 데이터를 보호하고 보호하기 위해 최선을 다하고
                있습니다. WILL-MARKETS 의 현재 개인정보 보호 정책은 유럽 연합
                거주자에게 혜택을 제공하는 EU 의 일반 데이터 보호 규정(GDPR)에
                비추어 시행되었습니다.
                본 개인정보 보호정책은 EU 에 거주하는 자연인의 개인정보처리 및
                보호에 관한 정보를 제공합니다.
                회사의 웹사이트에 접속하고 서비스 이용을 신청하는 EU 거주자는 본 개인정보
                보호정책을 예열적으로 읽고 수락해야 합니다. 이 웹 사이트 또는 서비스에 계속
                액세스하고 사용함으로써 귀하는 당사의 개인 정보 보호 정책에 대한 귀하의
                동의를 명시적으로 확인합니다.
                2.정의
                고객 – 회사가 제공하는 서비스 및 기타 온라인 리소스(예: 콘테스트,
                온라인 커뮤니티 등)를 사용하거나 기꺼이 사용하겠다는 의사를 밝힌
                자연인;
                개인정보 보호정책 – WILL-MARKETS 본 개인정보 보호정책;
                개인 데이터 - 식별된 개인 또는 식별 가능한 개인과 관련된 모든 정보.
                자세한 내용은 섹션 3 을 참조하십시오.
                처리 – 예를 들어 개인 데이터와 관련된 모든 행위는 수집, 기록, 저장,
                전송, 삭제 등에 국한되지 않습니다.
                서비스 – 회사가 제공하는 모든 서비스;
                웹사이트 – www.will-markets.com
                3 회사가 처리하는 개인 데이터 범주
                회사는 섹션 4 에 명시된 목적을 위해 특정 개인 데이터를 처리합니다.
                아래 목록은 완전하지 않으며, 필요에 따라 회사는 개인정보 보호정책
                및 기타 관련 법률 제정에 따라 기타 개인 데이터를 처리할 수 있습니다.
                1. 클라이언트로부터 받은 개인 데이터:
                1. 이름, 성, 세금 식별 번호, 생년월일, 신분증 세부 정보
                (예: 여권 번호 또는 사본)를 포함하되 이에 국한되지 않는 자연인 식별 데이터
                2. 연락처 정보 – 주소, 전화 번호, 전자 메일 주소 및 기타
                관련이 있는 경우;
                3. 재무 정보 – 계정 번호, 계정 잔액, 소득, 부, 거래 및
                기타 유사한 정보;
                4. 자금의 배경 및 출처 - 교육, 직장, 직업, 비즈니스
                활동에 관한 정보, 고용주가 있는 경우;
                5. 서비스 이용 및 고객 선호도, 습관 등에 대한 관계와
                관련된 정보 – 사용되는 서비스, 개인 설정, 설문 조사, 콘테스트 및 고객이
                참여한 캠페인에 대한 정보와 같은 경우
                6. 결혼 여부 및 관련 제 3 자 – 고객 계정에 연결된 개인 및
                법인(예: POA 소지자, 공인 된 사용자 등), 고객 거래의 출발자 또는 수혜자 등
                2. 회사가 운영하거나 소유한 웹사이트 또는 모바일 또는 온라인
                애플리케이션을 사용하는 동안 자동으로 수집된 정보:
                1. 기술 정보 및 고유 식별자 – 인터넷 프로토콜(IP) 주소,
                로그인 정보, 브라우저, 시간대 등에 대한 정보;
                2. 회사의 웹 사이트 및 모바일 응용 프로그램에서
                사용하는 쿠키. 회사가 사용하는 쿠키 및 고유 식별자의 유형및 목적에 대한
                자세한 내용은 섹션 10 을 참조하십시오.
                2. 제 3 자와 관련된 회사 개인 데이터를 전달할 경우 본 개인정보
                보호정책의 제 3 자에게 알리는 것은 고객의 의무입니다.
                1. 개인정보 처리 근거 및 목적
                1. 회사는 다음 중 하나가 적용되는 경우 개인 데이터를 처리합니다.
                1. 계약을 체결하고 수행하기 위해서는 개인 데이터 처리가 필요합니다.
                2. 회사의 법적 의무를 준수하기 위해
                3. 회사 또는 제 3 자의 정당한 이익을 보호하기 위해
                4. 회사가 고객의 동의를 받는 경우.
                2. 회사는 주로 다음과 같은 목적으로 개인 데이터를 처리합니다.
                1. 서비스를 무료로 제공하고 온라인 및 모바일 리소스를 무료로 제공합니다.
                2. 정책 업데이트 및 계약 약관 변경 사항을 포함한 관리 정보를 전송하는
                행위
                3. Dukascopy Group 제공 및 기타 리소스와 관련하여 고객에게 유용할 수
                있는 서비스, 제품, 교육 자료, 예정된 이벤트 및 기타 관련 정보에 대한 정보를 고객에게
                제공하기 위해;
                4. 자금 세탁 방지 및 테러 자금 조달과 관련된 위험뿐만 아니라 거래 관련
                위험을 평가하고 완화하기 위해;
                5. 법적 의무 및/또는 정부 당국의 요청을 준수하기 위해;
                6. 회사의 정당한 이익과 관련하여.
                2. 고객 개인 데이터 공개
                1. 회사는 고객의 개인정보를 다음과 같은 선택된 제 3 자에게 공개할
                권리가 있습니다.
                1. WILL-MARKETS 그룹 내에서, 회사의 모든 사무실과
                계열사를 포함, 지리적 위치에 관계없이;
                2. 개인 데이터 처리와 관련하여 적절한 보호 장치 및 제한을
                보장하는 서면 계약에 따라 WILL-MARKETS 에 서비스를 제공하는 제공업체를 
                포함하여 선택된 제 3 자에게. 여기에는 IT, 결제 서비스, 감사 서비스, 신원 확인,
                실사 서비스, 데이터 분석, 마케팅 지원, 클라우드 서비스 등을 제공하는 회사가
                포함될 수 있습니다.
                3. 정부, 규제 또는 기타 법 집행 기관/ 당국에 대한 권한을 가진
                다.
                3. 개인 데이터 전송
                1. 클라이언트 개인 데이터는 주로 유럽 경제 지역(EEA) 및 스위스
                연맹 내에서 처리됩니다. 그러나 필요한 경우 개인 데이터는 본 개인정보
                보호정책에 명시된 대로 제 3 국으로 전송될 수 있습니다.
                2. 회사는 적절한 안전 장치가 마련된 경우에만 EEA 또는 스위스 연맹
                외부에서 처리하기 위해 클라이언트 개인 데이터를 전송하거나 액세스할 수
                있도록 하며 다음 중 하나가 적용되는 경우에만 다음 중 하나가 적용되는
                경우에만 사용할 수 있습니다.
                1. 이는 법률 및 규정에 따라 요구됩니다.
                2. 이는 서비스에 대한 계약을 체결하거나 이행하기 위해
                필요합니다.
                3. 고객은 EEA 외부에서 자신의 데이터를 처리하는 데
                동의했습니다.
                4. 보존 기간
                1. 개인정보 보유 기간은 회사가 지정한 목적에 따라 다릅니다.
                2. 회사는 개인정보보유기간을 결정할 때 계약상 의무, 회사의 정당한
                이익, 관련 법률 제정(예: 자금세탁 방지 및 테러자금 조달에 관한 규정)을
                고려합니다.
                5. 고객의 의무
                고객은 고객의 기밀 정보의 제 3 자가 사용하는 경우, 예를 들어 고객이 이 제 3
                자에게 전달하거나 고객이 고객으로부터 얻은 로그인 및 비밀번호와 같이 금융을
                포함한 모든 종류의 손실에 대해 회사 또는 WILL-MARKETS 또는 임원, 이사,
                직원 및 계열사를 보유하지 않기로 동의합니다. 고객은 승인되지 않은 제 3 자에게
                그러한 개인 데이터 공개에 대해전적으로 책임을 집니다.
                6. 고객의 권리
                1. 서면 요청시 고객은 회사가 처리하는 개인 데이터의 사본을 받을 수
                있습니다. 이러한 요청이 과도하거나 반복적인 경우 회사는 고객에게 개인
                데이터의 사본을 제공하는 것을 거부할 수 있으며, 회사는 해당 사본을 준비하는
                데 필요한 자원을 고려하여 합리적인 수수료를 요구할 수 있습니다.
                2. 고객은 회사에 자신의 개인 데이터를 수정하도록 요청할 수
                있습니다.
                3. 고객은 회사가 적용되는 법률 및 기타 규정에서 허용하는 범위
                내에서 자신의 개인 데이터를 삭제하도록 요청할 수 있습니다.
                4. 고객은 회사가 허용하는 범위 내에서 회사가 자신의 개인정보
                처리및 기타 규정이 적용되는 범위 내에서 제한할 수 있습니다.
                5. 클라이언트는 구조화되고 일반적으로 사용되는 전자 형식으로 개인
                데이터를 수신하고 다른 컨트롤러에게 전송할 권리가 있습니다.
                6. 앞서 언급한 모든 권리는 선의와 서면 요청에 따라 행사되어야 한다.
                7. 귀하의 요청이나 우려가 당사에 의해 만족스럽게 해결되지 않는
                경우, 귀하의 서면 요구에 따라 라트비아 공화국의 데이터 국가 검사에 접근할 수
                있습니다.
                7. 쿠키
                1. 회사는 쿠키와 같은 모니터링 기술을 사용하여 방문자에게
                웹사이트의 효율적인 운영을 제공합니다.
                2. 쿠키는 웹 사이트를 방문하는 동안 브라우저에 배치 된 작은 시스템
                파일을 기반으로 기술입니다.
                3. 회사는 방문자의 기기에 대한 정보를 수집하고 쿠키를 사용하여
                다음을 수행합니다.
                1. 회사의 웹 사이트 기능을 사용자 정의;
                2. 방문자의 데이터의 재입국을 피하십시오.
                3. 매장 방문자의 취향;
                4. 웹사이트 사용에 대한 정보를 수집합니다.
                4. 회사는 구글 애널리틱스와 같은 제 3 자 웹 분석 서비스에서
                제공하는 제 3 자 쿠키를 사용합니다.
                5. 클라이언트 및 웹사이트 방문자는 브라우저 기본 설정을 구성하고
                쿠키를 수락하지 않을 수 있지만 이는 웹 사이트의 기능에 영향을 줄 수 있습니다.
                8. 연락처 정보
                고객이 회사가 개인 데이터 처리에 관한 질문이나 문의사항이 있는 경우,
                www.will-markets.com 또는 help@will-markets.com 편지를 보내야 합니다.
                9. 최종 조항
                1. 고객은 고객에게 사전 통보 없이 언제든지 개인정보 취급방침을
                변경할 권리가 있다는 데 동의합니다. 회사는 개인정보 보호정책의 변경 사항에
                대해 고객에게 자유롭게 통지할 수 있습니다. 회사의 웹사이트에 업데이트된
                버전의 개인정보 보호정책이 게시되는 것은 고객에게 변경사항에 대한 유효한
                통지로 간주됩니다. 고객은 회사의 웹사이트와 개인 정보 보호 정책에 대한
                업데이트를 정기적으로 검토할 것을 의뢰합니다.
                2. 개인정보보호정책 개정은 개인정보보호정책에 명시된 날에 효력을
                가지게 됩니다.
                3. 본 개인정보 보호정책은 맨 위에 표시된 날짜에 마지막으로
                업데이트되었습니다. 그것은 모든 이전 버전을 대체합니다.`}
            </PreText>
          </Wrapper>
        </Modal>
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

export default Support;
