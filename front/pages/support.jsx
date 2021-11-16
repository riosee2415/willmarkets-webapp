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

const Title = styled(Wrapper)`
  font-weight: 600;
  flex-direction: row;
  justify-content: flex-start;
  padding: 20px 0 0 0;
  color: #000;
  flex-wrap: ${(props) => props.wrap || `wrap`};

  & > div.number {
    width: 30px;
    height: 30px;
    margin: 0 14px 0 0;
    border-radius: 50%;
    background-color: #4877ff;
    color: #fff;
  }
`;

const ViewContent = styled(Wrapper)`
  justify-content: flex-start;
  flex-direction: row;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 2px;
  word-spacing: 1px;
  line-height: 30px;
  font-size: 13px;

  & div {
    font-size: inherit;
  }
`;

const SubTitle = styled(Wrapper)`
  flex-direction: row;
  align-items: baseline;
  padding: ${(props) => props.padding || `14px 0 0 43px`};
  font-size: 40px;
`;

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

const ModalView = styled(Modal)`
  .ant-modal-wrap {
    white-space: pre;
  }
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
            fontSize={width < 570 ? `17px` : `20px`}>
            {t(`8`)}
            <br />
            {t(`9`)}
          </Wrapper>

          <Wrapper
            dr={width < 950 ? `column` : `row`}
            ju={`flex-start`}
            margin={width < 950 ? `30px 0 0 0` : `100px 0 0 0`}>
            <Wrapper width={`55%`}>
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/consulting/image_consulting.png`}
              />
            </Wrapper>

            <Wrapper dr={`row`} width={width < 450 ? `330px` : `400px`}>
              <Wrapper
                bgColor={Theme.white_C}
                radius={`8px`}
                padding={`50px 15px 60px`}
                width={`400px`}>
                <Wrapper dr={`row`} al={`normal`}>
                  <Wrapper width={`85px`} al={`flex-start`} ju={`flex-end`}>
                    <TextLabel margin={`0 25px 0 0 `}>{t(`10`)}</TextLabel>
                  </Wrapper>

                  <Wrapper width={`calc(100% - 90px)`}>
                    <InputText
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

                  <Wrapper dr={`row`} width={`calc(100% - 90px)`}>
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
                  <Wrapper width={`calc(100% - 90px)`}>
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
                  <Wrapper
                    width={`calc(100% - 90px)`}
                    borderBottom={"1px solid #e3e3e3"}>
                    <Content width={`100%`} {...inputContent} />
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper dr={`row`} ju={`center`} margin={`10px 0 0 0`}>
                <RadioInput
                  color={`#313B91`}
                  checked={inputAgree.value}
                  onClick={() => inputAgree.setValue(!inputAgree.value)}
                />
                <Wrapper
                  fontSize={`15px`}
                  color={`white`}
                  margin={width < 450 ? `0 15px 0 0` : `0 30px 0 0`}
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

              <Wrapper margin={`50px 0 0 0`} fontSize={`32px`}>
                <CommonButton
                  bgColor={`#3353F2`}
                  color={`#fff`}
                  fontWeight={`300`}
                  fontSize={width < 450 ? `22px` : `24px`}
                  padding={width < 450 ? `5px 45px 7px` : `6px 50px 8px`}
                  radius={`6px`}
                  onClick={createQuestionHandler}>
                  {t(`7`)}
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </RsWrapper>

        <ModalView
          visible={toggleModal}
          width={width < 700 ? `100%` : `500px`}
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
            ju={`flex-start`}
            width={`auto`}
            height={`450px`}
            overflow={`auto`}
            padding={`10px`}
            wrap={`nowrap`}>
            {i18next.language === "ko" ? (
              <Wrapper>
                <Wrapper al={`flex-start`} fontSize={`22px`} fontWeight={`700`}>
                  WILLMARKETS 의 개인 정보 보호 정책
                </Wrapper>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    1
                  </Wrapper>
                  소개
                </Title>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    1.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    당사는 귀하의 개인 데이터를 보호하고 보호하기 위해 최선을
                    다하고 있습니다. WILLMARKETS (이하 " 회사 ") 의 현재 개인
                    정보 보호 정책은 유럽 ​​연합 거주자에게 혜택을 주는 EU의
                    GDPR(일반 데이터 보호 규정)에 따라 구현되었습니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    1.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    이 개인 정보 보호 정책은 EU에 거주하는 자연인의 개인
                    데이터를 회사에서 처리하고 보호하는 방법에 대한 정보를
                    제공합니다.
                  </ViewContent>
                </SubTitle>
                <ViewContent padding={`40px`} padding={`10px 0 0 26px`}>
                  회사 웹사이트에 접속하여 서비스 이용을 신청하는 EU 거주자는
                  사전에 본 개인정보 보호정책을 읽고 동의해야 합니다. 이
                  웹사이트 또는 서비스에 계속 액세스하고 사용함으로써 귀하는
                  당사의 개인정보 보호정책에 동의함을 명시적으로 확인하는
                  것입니다.
                </ViewContent>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    2
                  </Wrapper>
                  정의
                </Title>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    2.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    <Wrapper
                      fontWeight={`500`}
                      display={`contents`}
                      cursor={`pointer`}>
                      고객
                    </Wrapper>
                    – 회사에서 제공하는 서비스 및 기타 온라인 리소스(예:
                    콘테스트, 온라인 커뮤니티 등)를 사용했거나 사용할 의향이
                    있는 모든 자연인
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    2.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    <Wrapper
                      fontWeight={`500`}
                      display={`contents`}
                      cursor={`pointer`}>
                      개인 정보 보호 정책
                    </Wrapper>
                    – WILLMARKETS의 현재 개인 정보 보호 정책;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    2.3.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    <Wrapper
                      fontWeight={`500`}
                      display={`contents`}
                      cursor={`pointer`}>
                      개인 데이터
                    </Wrapper>
                    – 식별되거나 식별 가능한 개인과 관련된 모든 정보. 자세한
                    내용은 섹션 3을 참조하십시오.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    2.4.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    <Wrapper
                      fontWeight={`500`}
                      display={`contents`}
                      cursor={`pointer`}>
                      처리
                    </Wrapper>
                    – 예를 들어 개인 데이터와 관련된 모든 작업(예: 수집, 기록,
                    저장, 전송, 삭제 등)
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    2.5.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    <Wrapper
                      fontWeight={`500`}
                      display={`contents`}
                      cursor={`pointer`}>
                      서비스
                    </Wrapper>
                    - 회사에서 제공하는 모든 서비스
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    2.6.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    <Wrapper
                      fontWeight={`500`}
                      display={`ViewContents`}
                      cursor={`pointer`}>
                      웹사이트
                    </Wrapper>
                    -&nbsp;
                    <Wrapper
                      color={`#3353f2`}
                      fontWeight={`500`}
                      display={`ViewContents`}
                      cursor={`pointer`}>
                      https://will-markets.com
                    </Wrapper>
                  </ViewContent>
                </SubTitle>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    3
                  </Wrapper>
                  회사가 처리하는 개인 데이터의 범주
                </Title>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    3.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    회사는 섹션 4에 명시된 목적을 위해 특정 개인 데이터를
                    처리합니다. 아래 목록은 완전하지 않으며 필요에 따라 회사는
                    개인 정보 보호 정책 및 기타 관련 법률 제정에 따라 다른 개인
                    데이터를 처리할 수 있습니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 35px` : `14px 0 0 63px`}
                  ju={`space-around`}>
                  <Wrapper
                    width={`70px`}
                    fontWeight={`500`}
                    display={`contents`}>
                    3.2.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 70px)`}>
                    클라이언트로부터 받은 개인 데이터:
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 50px` : `14px 0 0 90px`}>
                  <Wrapper width={`70px`} fontWeight={`500`} al={`flex-start`}>
                    3.2.1.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      자연인 식별 데이터
                    </Wrapper>
                    – 이름, 성, 세금 식별 번호, 생년월일, 식별 문서 세부
                    정보(예: 여권 번호 또는 사본)를 포함하되 이에 국한되지
                    않습니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 50px` : `14px 0 0 90px`}>
                  <Wrapper width={`70px`} fontWeight={`500`} al={`flex-start`}>
                    3.2.1.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      연락처 정보
                    </Wrapper>
                    - 주소, 전화번호, 이메일 주소 및 기타 해당되는 경우
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 50px` : `14px 0 0 90px`}>
                  <Wrapper width={`70px`} fontWeight={`500`} al={`flex-start`}>
                    3.2.1.3.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      재무 정보
                    </Wrapper>
                    – 계좌 번호, 계좌 잔고, 소득, 자산, 거래 및 기타 유사한 정보
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 50px` : `14px 0 0 90px`}>
                  <Wrapper width={`70px`} fontWeight={`500`} al={`flex-start`}>
                    3.2.1.4.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      자금의 배경 및 출처
                    </Wrapper>
                    – 교육, 직장, 직업, 사업 활동(있는 경우), 고용주(있는
                    경우)에 관한 정보
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 50px` : `14px 0 0 90px`}>
                  <Wrapper width={`70px`} fontWeight={`500`} al={`flex-start`}>
                    3.2.1.5.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      <Wrapper fontWeight={`500`} display={`contents`}>
                        서비스 사용 및 고객의 선호도, 습관 등과&nbsp;
                      </Wrapper>
                    </Wrapper>
                    관련된 정보 – 사용된 서비스, 개인 설정, 설문조사, 콘테스트
                    및 고객이 참여한 캠페인에 대한 정보
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 50px` : `14px 0 0 90px`}>
                  <Wrapper width={`70px`} fontWeight={`500`} al={`flex-start`}>
                    3.2.1.6.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      결혼 상태 및 관련 제3자
                    </Wrapper>
                    – 고객 계정에 연결된 개인 및 법인(예: POA 소지자, 승인된
                    사용자 등), 고객 거래의 개시자 또는 수혜자 등
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 35px` : `14px 0 0 63px`}
                  ju={`space-around`}>
                  <Wrapper
                    width={`70px`}
                    fontWeight={`500`}
                    display={`contents`}>
                    3.2.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 70px)`}>
                    회사가 운영하거나 소유하는 웹사이트 또는 모바일 또는 온라인
                    애플리케이션을 사용하는 동안 자동으로 수집되는 정보:
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 50px` : `14px 0 0 90px`}>
                  <Wrapper width={`70px`} fontWeight={`500`} al={`flex-start`}>
                    3.2.2.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      기술 정보 및 고유 식별자
                    </Wrapper>
                    – 인터넷 프로토콜(IP) 주소, 로그인 정보, 브라우저 정보,
                    시간대 등
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 50px` : `14px 0 0 90px`}>
                  <Wrapper width={`70px`} fontWeight={`500`} al={`flex-start`}>
                    3.2.1.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 70px)`}>
                    회사 웹사이트 및 모바일 애플리케이션에서 사용하는
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      쿠키 .&nbsp;
                    </Wrapper>
                    회사가 사용하는 쿠키 및 고유 식별자의 유형과 그 목적에 대한
                    자세한 내용은 섹션 10을 참조하십시오.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    3.3.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    제3자와 관련된 개인 데이터를 회사에 전달할 경우 이 개인 정보
                    보호 정책을 제3자에게 알리는 것은 고객의 의무입니다.
                  </ViewContent>
                </SubTitle>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    4
                  </Wrapper>
                  개인정보 처리의 근거 및 목적
                </Title>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    4.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    회사는 다음 중 하나에 해당하는 경우 개인 데이터를
                    처리합니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 35px` : `14px 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      4.1.1.
                      <br />
                    </Wrapper>
                    계약을 체결하고 이행하기 위해 개인 데이터 처리가 필요합니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      4.1.2.
                      <br />
                    </Wrapper>
                    회사의 법적 의무를 준수하기 위해
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      4.1.3.
                      <br />
                    </Wrapper>
                    회사 또는 제3자의 정당한 이익을 보호하기 위해
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      4.1.4.
                      <br />
                    </Wrapper>
                    회사가 고객의 동의를 받은 경우
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `0px 0 0 10px` : `0px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    4.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    회사는 주로 다음의 목적을 위해 개인정보를 처리합니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      4.2.1.&nbsp;
                      <br />
                    </Wrapper>
                    서비스를 제공하고 온라인 및 모바일 리소스를 무료로
                    제공합니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      4.2.2.&nbsp;
                      <br />
                    </Wrapper>
                    정책 업데이트 및 계약 조건 변경을 포함한 관리 정보 전송
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      4.2.3.&nbsp;
                      <br />
                    </Wrapper>
                    WILLMARKETS Group 제안 및 기타 리소스와 관련하여 고객에게
                    유용할 수 있는 서비스, 제품, 교육 자료, 예정된 이벤트 및
                    기타 관련 정보에 대한 정보를 고객에게 제공하기 위해
                  </ViewContent>
                </SubTitle>{" "}
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      4.2.4.&nbsp;
                      <br />
                    </Wrapper>
                    자금 세탁 방지 및 테러 자금 조달과 관련된 위험과 거래 관련
                    위험을 평가하고 완화합니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      4.2.5.&nbsp;
                      <br />
                    </Wrapper>
                    법적 의무 및/또는 정부 기관의 요청을 준수하기 위해
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper
                      fontWeight={`500`}
                      display={`contents`}
                      margin={`0 10px 0 0 `}>
                      4.2.6.&nbsp;
                      <br />
                    </Wrapper>
                    회사의 정당한 이익과 관련하여.
                  </ViewContent>
                </SubTitle>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    5
                  </Wrapper>
                  고객 개인 데이터 공개
                </Title>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    5.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    회사는 다음을 포함하여 선택된 제3자에게 고객의 개인 데이터를
                    공개할 수 있는 권한이 있습니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      5.1.1.
                      <br />
                    </Wrapper>
                    지리적 위치에 관계없이 회사의 모든 사무소 및 계열사를
                    포함하여 WILLMARKETS Group 내
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      5.1.2.
                      <br />
                    </Wrapper>
                    개인 데이터 처리와 관련하여 적절한 보호 및 제한을 보장하는
                    서면 계약에 따라 WILLMARKETS Group에 서비스를 제공하는
                    제공자를 포함하여 선택된 제3자에게. 여기에는 IT, 지불
                    서비스, 감사 서비스, 신원 확인, 실사 서비스, 데이터 분석,
                    마케팅 지원, 클라우드 서비스 및 기타를 제공하는 회사가
                    포함될 수 있습니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      5.1.3.
                      <br />
                    </Wrapper>
                    권한 있는 정부, 규제 기관 또는 기타 법 집행 기관/당국에
                    전달합니다.
                  </ViewContent>
                </SubTitle>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    6
                  </Wrapper>
                  개인 데이터 전송
                </Title>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    6.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    고객 개인 데이터는 주로 유럽 경제 지역(EEA)과 스위스 연방
                    내에서 처리됩니다. 그러나 필요한 경우 이 개인정보 보호정책에
                    명시된 대로 개인 데이터를 제3국으로 전송할 수 있습니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    6.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    회사는 적절한 보호 장치가 마련되어 있고 다음 중 하나가
                    적용되는 경우에만 EEA 또는 스위스 연방 외부에서 처리하기
                    위해 고객 개인 데이터를 전송하거나 액세스할 수 있도록
                    합니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      6.2.1.
                      <br />
                    </Wrapper>
                    이는 법률 및 규정에 따라 요구됩니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      6.2.2.
                      <br />
                    </Wrapper>
                    이는 서비스에 대한 계약을 체결하거나 이행하는 데 필요합니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      6.2.3.
                      <br />
                    </Wrapper>
                    고객은 EEA 외부에서 데이터를 처리하는 데 동의했습니다.
                  </ViewContent>
                </SubTitle>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    7
                  </Wrapper>
                  보유 기간
                </Title>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    7.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    고객 개인 데이터는 주로 유럽 경제 지역(EEA)과 스위스 연방
                    내에서 처리됩니다. 그러나 필요한 경우 이 개인정보 보호정책에
                    명시된 대로 개인 데이터를 제3국으로 전송할 수 있습니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    7.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    개인 데이터의 보유 기간을 결정할 때 회사는 계약상의 의무,
                    회사의 정당한 이익 및 관련 법률 제정(예: 자금 세탁 방지 및
                    테러 자금 조달에 관한 규정)을 고려합니다.
                  </ViewContent>
                </SubTitle>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    8
                  </Wrapper>
                  고객의 의무
                </Title>
                <ViewContent padding={`40px`} padding={`10px 0 0 26px`}>
                  고객은 회사, WILLMARKETS Group 또는 그 임원, 이사, 직원 및
                  계열사가 고객의 기밀 정보를 제3자가 사용하는 경우 고객이 입은
                  재정적 손실을 포함하여 모든 종류의 손실에 대해 책임을 지지
                  않는다는 데 동의합니다. 예를 들어 클라이언트가 이 제3자에게
                  전달하거나 남용/사기 방식으로 제3자가 클라이언트로부터 얻은
                  로그인 및 비밀번호. 고객은 승인되지 않은 제3자에게 이러한 개인
                  데이터 공개에 대해 전적인 책임을 집니다.
                </ViewContent>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    9
                  </Wrapper>
                  고객의 권리
                </Title>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    9.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    서면 요청 시 고객은 회사에서 처리하는 개인 데이터의 사본을
                    받을 수 있습니다. 그러한 요청이 과도하거나 반복적일 경우,
                    회사는 고객의 개인 데이터 사본 제공을 거부할 수 있으며
                    회사는 그러한 사본을 준비하는 데 필요한 자원을 고려하여
                    합리적인 비용을 요청할 수 있습니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    9.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    고객은 회사에 자신의 개인 데이터를 수정하도록 요청할 수
                    있습니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    9.3.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    고객은 회사에 적용되는 법률 및 기타 규정이 허용하는 범위
                    내에서 자신의 개인 데이터를 삭제하도록 회사에 요청할 수
                    있습니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    9.4.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    고객은 회사에 적용되는 법률 및 기타 규정에서 허용하는 범위
                    내에서 회사의 개인 데이터 처리를 제한할 수 있습니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    9.5.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    고객은 구조화되고 일반적으로 사용되는 전자 형식으로 개인
                    데이터를 수신하고 이를 다른 컨트롤러에게 전송할 권리가
                    있습니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    9.6.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    앞서 언급한 모든 권리는 성실하게 서면 요청에 따라 행사해야
                    합니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    9.7.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    귀하의 요청이나 우려 사항이 당사에서 만족스럽게 해결되지
                    않은 경우 귀하의 서면 요청에 따라 라트비아 공화국의 데이터
                    상태 검사관(Data State Inspectorate)에 접근할 수 있습니다.
                  </ViewContent>
                </SubTitle>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    10
                  </Wrapper>
                  고객의 권리
                </Title>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    10.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    회사는 방문자에게 웹사이트의 효율적인 운영을 제공하기 위해
                    쿠키와 같은 모니터링 기술을 사용합니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    10.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    쿠키는 웹사이트를 방문하는 동안 브라우저에 배치되는 작은
                    시스템 파일을 기반으로 하는 기술입니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    10.3.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    회사는 방문자의 기기에 대한 정보를 수집하고 쿠키를 사용하여
                    다음을 수행합니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      10.3.1.
                    </Wrapper>
                    회사의 웹사이트 기능을 사용자 정의합니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      10.3.2.
                    </Wrapper>
                    방문자 데이터의 재입력을 방지합니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      10.3.3.
                    </Wrapper>
                    방문자의 선호도를 저장합니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      10.3.4.
                    </Wrapper>
                    웹사이트 사용에 대한 정보를 수집합니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    10.4.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    회사는 Google Analytics와 같은 제3자 웹 분석 서비스에서
                    제공하는 제3자 쿠키를 사용합니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    10.5.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    클라이언트와 웹사이트 방문자는 브라우저 기본 설정을 구성하고
                    쿠키를 허용하지 않을 수 있지만 이는 웹사이트의 기능에 영향을
                    미칠 수 있습니다.
                  </ViewContent>
                </SubTitle>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    11
                  </Wrapper>
                  연락처 세부 정보
                </Title>
                <ViewContent padding={`40px`} padding={`10px 0 0 26px`}>
                  고객이 회사의 개인 데이터 처리와 관련하여 질문이나 문의 사항이
                  있는 경우 info@will-markets.com 으로 이메일을 보내 거나 회사
                  웹사이트에 표시된 우편 주소로 편지를 보내야 합니다:
                  <Wrapper
                    color={`#3353f2`}
                    fontWeight={`500`}
                    display={`contents`}
                    cursor={`pointer`}>
                    https://will-markets.com.
                  </Wrapper>
                </ViewContent>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    12
                  </Wrapper>
                  최종 규정
                </Title>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    12.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    고객은 회사가 고객에게 사전 통지 없이 언제든지 개인 정보
                    보호 정책을 변경할 권리가 있다는 데 동의합니다. 회사는
                    웹사이트를 자유롭게 사용하여 개인정보 보호정책의 변경 사항을
                    고객에게 알릴 수 있습니다. 회사 웹사이트에 업데이트된
                    개인정보 보호정책 버전을 게시하는 것은 고객에게 유효한 변경
                    통지로 간주됩니다. 고객은 회사의 웹사이트와 개인정보
                    보호정책 업데이트를 정기적으로 검토할 것을 약속합니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    12.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    개인 정보 보호 정책의 수정 사항은 개인 정보 보호 정책에
                    명시된 날짜에 발효됩니다.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    12.3.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    이 개인 정보 보호 정책은 상단에 표시된 날짜에 마지막으로
                    업데이트되었습니다. 모든 이전 버전을 대체합니다.
                  </ViewContent>
                </SubTitle>
              </Wrapper>
            ) : (
              /////
              <Wrapper padding={`10px`}>
                <Wrapper al={`flex-start`} fontSize={`24px`} fontWeight={`700`}>
                  PRIVACY POLICY OF WILLMARKET
                </Wrapper>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    1
                  </Wrapper>
                  Introduction
                </Title>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    1.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    We are strongly committed to protecting and safeguarding
                    your personal data. The present Privacy Policy of
                    WILLMARKETS (here-after "the Company") has been implemented
                    in light of the EU's General Data Protection Regulation
                    (GDPR) which benefits to the residents of the European
                    Union.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    1.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    This Privacy Policy provides information on the processing
                    and protection by the Company of personal data of natural
                    persons residing in the EU.
                  </ViewContent>
                </SubTitle>
                <ViewContent padding={`40px`} padding={`10px 0 0 26px`}>
                  EU residents accessing the Company's websites and applying for
                  using its services shall preliminarily read and accept the
                  present Privacy Policy. By continuing to access and use this
                  website or services you expressly confirm your acceptance of
                  our Privacy Policy.
                </ViewContent>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    2
                  </Wrapper>
                  Definitions
                </Title>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    2.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    <Wrapper
                      fontWeight={`500`}
                      display={`contents`}
                      cursor={`pointer`}>
                      Client
                    </Wrapper>
                    – any natural person, who has been using or has expressed
                    willingness to use services and other online resources (e.g.
                    contests, online community, etc.) provided by the Company;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    2.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    <Wrapper
                      fontWeight={`500`}
                      display={`contents`}
                      cursor={`pointer`}>
                      Privacy Policy
                    </Wrapper>
                    – the present Privacy Policy of WILLMARKETS
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    2.3.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    <Wrapper
                      fontWeight={`500`}
                      display={`contents`}
                      cursor={`pointer`}>
                      Personal Data
                    </Wrapper>
                    – any information related to an identified or identifiable
                    individual. For further information please see Section 3;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    2.4.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    <Wrapper
                      fontWeight={`500`}
                      display={`contents`}
                      cursor={`pointer`}>
                      Processing
                    </Wrapper>
                    – any actions related to Personal Data for instance, but not
                    limited to collection, recording, storage, transfer,
                    erasure, etc.;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    2.5.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    <Wrapper
                      fontWeight={`500`}
                      display={`contents`}
                      cursor={`pointer`}>
                      Services
                    </Wrapper>
                    - any services offered by the Company;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    2.6.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    <Wrapper
                      fontWeight={`500`}
                      display={`contents`}
                      cursor={`pointer`}>
                      Website
                    </Wrapper>
                    -&nbsp;
                    <Wrapper
                      color={`#3353f2`}
                      fontWeight={`500`}
                      display={`contents`}
                      cursor={`pointer`}>
                      https://will-markets.com/
                    </Wrapper>
                  </ViewContent>
                </SubTitle>
                <Title wrap={`nowrap`}>
                  <Wrapper className={`number`} width={`auto`}>
                    3
                  </Wrapper>
                  Categories of Personal Data That the Company Process
                </Title>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    3.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    The Company processes certain Personal Data for the purposes
                    specified under Section 4. Please note that the below list
                    is not exhaustive and upon necessity the Company may process
                    other Personal Data, according to its Privacy Policy and
                    other relevant legal enactments.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 35px` : `14px 0 0 63px`}
                  ju={`space-around`}>
                  <Wrapper
                    width={`70px`}
                    fontWeight={`500`}
                    display={`contents`}>
                    3.2.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 70px)`}>
                    Personal Data received from the Client:
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 50px` : `14px 0 0 90px`}>
                  <Wrapper width={`70px`} fontWeight={`500`} al={`flex-start`}>
                    3.2.1.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      Natural persons identification data
                    </Wrapper>
                    – including, but not limited to name, surname, tax
                    identification number, date of birth, details of
                    identification document (e.g. passport number or copies);
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 50px` : `0px 0 0 90px`}>
                  <Wrapper width={`70px`} fontWeight={`500`} al={`flex-start`}>
                    3.2.1.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      Contact information
                    </Wrapper>
                    - address, telephone number, e-mail address and other if
                    relevant;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 50px` : `0px 0 0 90px`}>
                  <Wrapper width={`70px`} fontWeight={`500`} al={`flex-start`}>
                    3.2.1.3.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      Financial information
                    </Wrapper>
                    – account number, account balance, income, wealth,
                    transactions and other similar information;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 50px` : `0px 0 0 90px`}>
                  <Wrapper width={`70px`} fontWeight={`500`} al={`flex-start`}>
                    3.2.1.4.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      Background and source of funds
                    </Wrapper>
                    – information regarding the education, the place of work,
                    occupation, business activities if any, employer if any;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 50px` : `0px 0 0 90px`}>
                  <Wrapper width={`70px`} fontWeight={`500`} al={`flex-start`}>
                    3.2.1.5.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      <Wrapper fontWeight={`500`} display={`contents`}>
                        Information relating to the use of services and their
                        relation to Clients preferences, habits etc.&nbsp;
                      </Wrapper>
                    </Wrapper>
                    such as information on services used, personal settings,
                    surveys, contests and campaigns to which the Client has
                    participated;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 50px` : `0px 0 0 90px`}>
                  <Wrapper width={`70px`} fontWeight={`500`} al={`flex-start`}>
                    3.2.1.6.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      Marital status and relevant third parties
                    </Wrapper>
                    – individuals and legal entities connected to the Client
                    account (e.g. POA holders, authorised users, etc.),
                    originators or beneficiaries of the Client's transactions,
                    etc.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 35px` : `14px 0 0 63px`}
                  ju={`space-around`}>
                  <Wrapper
                    width={`70px`}
                    fontWeight={`500`}
                    display={`contents`}>
                    3.2.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 70px)`}>
                    Information collected automatically while using the Website
                    or mobile or online applications operated or owned by the
                    Company:
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 50px` : `0px 0 0 90px`}>
                  <Wrapper width={`70px`} fontWeight={`500`} al={`flex-start`}>
                    3.2.2.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      Technical information and unique identifiers
                    </Wrapper>
                    – Internet protocol (IP) address, login information,
                    information about browser, time zone, etc.;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 50px` : `0px 0 0 90px`}>
                  <Wrapper width={`70px`} fontWeight={`500`} al={`flex-start`}>
                    3.2.1.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      Cookies &nbsp;
                    </Wrapper>
                    used by the Company’s websites and its mobile applications.
                    For more detailed information on the types of cookies and
                    unique identifiers the Company use and for which purposes,
                    please refer to Section 10.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    3.3.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    It is the duty of the Client of informing third parties of
                    this Privacy Policy in case he passes to the Company
                    Personal Data related to such third parties.
                  </ViewContent>
                </SubTitle>
                <Title wrap={`nowrap`}>
                  <Wrapper className={`number`} width={`auto`}>
                    4
                  </Wrapper>
                  Grounds and Purposes for the Processing of Personal Data
                </Title>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    4.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    The Company processes Personal Data if one of the following
                    applies:
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 35px` : `14px 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      4.1.1.
                    </Wrapper>
                    the processing of Personal Data is necessary to enter into
                    and perform a contract;
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      4.1.2.
                    </Wrapper>
                    to comply with the Company’s legal obligations;
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      4.1.3.
                    </Wrapper>
                    to protect the legitimate interests of the Company or of
                    third party;
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      4.1.4.
                    </Wrapper>
                    if the Company receives the Client's consent.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    4.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    The Company primarily processes Personal Data for the
                    following purposes:
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      4.2.1.&nbsp;
                      <br />
                    </Wrapper>
                    to provide Services and free of charge online and mobile
                    resources;
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      4.2.2.&nbsp;
                      <br />
                    </Wrapper>
                    to send administrative information, including updates of
                    policies and changes to contractual terms;
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      4.2.3.&nbsp;
                      <br />
                    </Wrapper>
                    to provide the Client with information about Services,
                    products, educational materials, upcoming events and other
                    related information that may be useful to the Client in
                    relation to WILLMARKETS Group offers and other resources;
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      4.2.4.&nbsp;
                      <br />
                    </Wrapper>
                    to assess and mitigate risks related to anti-money
                    laundering and terrorism financing as well as transaction
                    related risks;
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      4.2.5.&nbsp;
                      <br />
                    </Wrapper>
                    to comply with legal obligations and/ or government
                    authorities’ requests;
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper
                      fontWeight={`500`}
                      display={`contents`}
                      margin={`0 10px 0 0 `}>
                      4.2.6.&nbsp;
                      <br />
                    </Wrapper>
                    in relation to the Company’s legitimate interests.
                  </ViewContent>
                </SubTitle>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    5
                  </Wrapper>
                  Disclosure of Clients Personal Data
                </Title>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    5.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    The Company is entitled to disclose Client’s Personal Data
                    to selected third parties, including:
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      5.1.1.
                      <br />
                    </Wrapper>
                    within WILLMARKETS Group, including all offices and
                    affiliates of the Company, irrespective of their
                    geographical location;
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      5.1.2.
                      <br />
                    </Wrapper>
                    to selected third parties, including providers that deliver
                    services to WILLMARKETS Group under written agreements
                    ensuring proper safeguards and limitations with regards to
                    Personal Data processing. This may include companies
                    providing IT, payment services, audit services, identity
                    verification, due diligence services, data analysis,
                    marketing support, cloud services and others;
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      5.1.3.
                      <br />
                    </Wrapper>
                    to competent governmental, regulatory or other law
                    enforcement agencies/ authorities.
                  </ViewContent>
                </SubTitle>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    6
                  </Wrapper>
                  Personal Data Transfers
                </Title>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    6.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    The Client Personal Data is primarily processed within the
                    European Economic Area (EEA) and the Swiss Confederation.
                    However, when it is necessary, Personal Data may be
                    transferred to third countries, as specified in this Privacy
                    Policy.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    6.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    The Company transfers or makes Client Personal Data
                    accessible for processing outside the EEA or the Swiss
                    Confederation only when appropriate safeguards are in place
                    and if one of the following applies:
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      6.2.1.
                      <br />
                    </Wrapper>
                    This is required under the laws and regulations;
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      6.2.2.
                      <br />
                    </Wrapper>
                    This is necessary to enter into or to perform the agreements
                    for the Services;
                  </ViewContent>
                </SubTitle>
                <SubTitle padding={width < 800 ? `0 0 0 35px` : `0 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      6.2.3.
                      <br />
                    </Wrapper>
                    The Client has given consent to the processing of his data
                    outside the EEA.
                  </ViewContent>
                </SubTitle>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    7
                  </Wrapper>
                  Retention Period
                </Title>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    7.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    The period of retention of Personal Data depends on the
                    purposes specified by the Company.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    7.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    In determining the retention period of Personal Data, the
                    Company takes into account contractual obligations, the
                    legitimate interest of the Company and relevant legal
                    enactments (such as the regulation concerning anti-money
                    laundering and terrorism financing).
                  </ViewContent>
                </SubTitle>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    8
                  </Wrapper>
                  Client’s Obligation
                </Title>
                <ViewContent padding={`40px`} padding={`10px 0 0 43px`}>
                  The Client agrees not to hold the Company nor WILLMARKETS
                  Group or any of their officers, directors, employees and
                  affiliates liable for losses of any kind, including financial,
                  suffered by the Client in case of use by a third party of
                  Client’s confidential information, for example the login and
                  password either communicated to this third party by the Client
                  or obtained by the third party from the Client by an
                  abusive/fraudulent manner. The Client shall be solely liable
                  for any such personal data disclosure to unauthorised third
                  parties.
                </ViewContent>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    9
                  </Wrapper>
                  Client’s Rights
                </Title>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    9.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    Upon written request, the Client may receive a copy of his
                    Personal Data that are processed by the Company. If such
                    request is excessive or repetitive, the Company may refuse
                    to provide the Client with copy of his Personal Data and the
                    Company may request a reasonable fee taking into account the
                    necessary resources for preparing such copy;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    9.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    The Client may request the Company to correct his Personal
                    Data;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    9.3.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    The Client may request the Company to erase his Personal
                    Data to the extent permitted by law and other regulation
                    applicable to the Company;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    9.4.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    The Client may restrict the processing of his Personal Data
                    by the Company to the extent permitted by law and other
                    regulation applicable to the Company;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    9.5.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    The Client has the right to receive his Personal Data in
                    structured, commonly used and electronic format as well as
                    to transmit it to another controller;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    9.6.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    All aforementioned rights should be exercised in good faith
                    and on written request basis;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    9.7.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    If your request or concern is not satisfactorily resolved by
                    us, upon your written demand, you may approach the Data
                    State Inspectorate of the Republic of Latvia.
                  </ViewContent>
                </SubTitle>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    10
                  </Wrapper>
                  Cookies
                </Title>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    10.1.
                  </Wrapper>

                  <ViewContent width={`calc(100% - 60px)`}>
                    The Company uses monitoring technologies such as cookies to
                    provide efficient operation of the Website to its visitors;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    10.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    Cookie is technology based on small system files placed on
                    browser during visit of the Website;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    10.3.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    The Company collects information about visitor’s device and
                    uses cookies to:
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 35px` : `14px 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      10.3.1.
                      <br />
                    </Wrapper>
                    customize Company’s Website features;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 35px` : `14px 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      10.3.2.
                      <br />
                    </Wrapper>
                    avoid re-entry of visitor’s data;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 35px` : `14px 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      10.3.3.
                      <br />
                    </Wrapper>
                    store visitor’s preferences;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 35px` : `14px 0 0 63px`}>
                  <ViewContent width={`calc(100% - 70px)`}>
                    <Wrapper fontWeight={`500`} display={`contents`}>
                      10.3.4.
                      <br />
                    </Wrapper>
                    gather information about usage of the Website.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    10.4.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    The Company uses third party cookies, provided by third
                    party web analytic services such as Google Analytics;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    10.5.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    Clients and Website visitors can configure their browser
                    preferences and not to accept cookies, however this may
                    affect functionality of the Website;
                  </ViewContent>
                </SubTitle>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    11
                  </Wrapper>
                  Contact Details
                </Title>
                <ViewContent padding={`40px`} padding={`10px 0 0 26px`}>
                  Should the Client have any questions or inquiries regarding
                  the processing of his Personal Data by the Company, he shall
                  send an e-mail to: support@will-markets.com or send a letter
                  to the postal address indicated on the Company’s Website:
                  <Wrapper
                    color={`#3353f2`}
                    fontWeight={`500`}
                    display={`contents`}
                    cursor={`pointer`}>
                    https://will-markets.com/ .
                  </Wrapper>
                </ViewContent>
                <Title>
                  <Wrapper className={`number`} width={`auto`}>
                    12
                  </Wrapper>
                  Final Provisions
                </Title>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    12.1.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    The Client agrees that the Company has the right to change
                    its Privacy Policy at any time without prior notice to the
                    Client. The Company may freely use its Websites to inform
                    the Client about any changes in the Privacy Policy. The
                    publishing of an updated version of the Privacy Policy on
                    the Company’s website(s) shall be deemed a valid
                    notification of changes to the Client. The Client undertakes
                    to regularly review the Company’s Website(s) and updates to
                    the Privacy Policy.
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    12.2.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    The amendments to the Privacy Policy shall become effective
                    on the date specified in the Privacy Policy;
                  </ViewContent>
                </SubTitle>
                <SubTitle
                  padding={width < 800 ? `14px 0 0 10px` : `14px 0 0 43px`}>
                  <Wrapper width={`60px`} fontWeight={`500`}>
                    12.3.
                  </Wrapper>
                  <ViewContent width={`calc(100% - 60px)`}>
                    This Privacy Policy was last updated on the date indicated
                    at the top. It supersedes all previous versions.
                  </ViewContent>
                </SubTitle>
              </Wrapper>
            )}
          </Wrapper>
        </ModalView>
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
