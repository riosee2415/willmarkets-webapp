import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST, LOGIN_REQUEST } from "../reducers/user";
import useInput from "../hooks/useInput";
import ClientLayout from "../components/ClientLayout";
import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import { CloseOutlined, CaretDownOutlined } from "@ant-design/icons";
import { emptyCheck } from "../components/commonUtils";
import { message } from "antd";
import {
  RsWrapper,
  Wrapper,
  Image,
  CommonButton,
  TextInput,
  Combo,
  ComboList,
  ComboListItem,
  ComboTitle,
} from "../components/commonComponents";
import { withResizeDetector } from "react-resize-detector";
import Theme from "../components/Theme";
import MainSlider from "../components/slider/MainSlider";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import styled from "styled-components";
import { QUESTION_CREATE_REQUEST } from "../reducers/question";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import useWidth from "../hooks/useWidth";
import Popup from "../components/Popup";

const CustomInput = styled(TextInput)`
  width: ${(props) => props.width};
  border-radius: ${(props) => props.radius};
  border: 1px solid #e9dae1;
  border-radius: 6px;
  color: #8e8b80;
  font-size: 14px;
  font-weight: 400;
`;

const Content = styled.textarea`
  width: 100%;
  height: 72px;
  font-size: 14px;
  font-weight: 400;
  color: #8e8b80;
  padding: 4px 10px;
  border: none;
  outline: none;
  resize: none;
  border: 1px solid #e9dae1;
  border-radius: 6px;
`;

const QuestionWrapper = styled(Wrapper)`
  animation-name: bounce;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  @keyframes bounce {
    0%,
    100% {
      bottom: 20px;
    }
    50% {
      bottom: 25px;
    }
  }
`;

const Home = () => {
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

  const router = useRouter();

  const width = useWidth();

  const dispatch = useDispatch();

  const { t } = useTranslation(["main"]);

  const [toggle, setToggle] = useState(false);
  const [comboCountryNo, setComboCountryNo] = useState(false);

  const inputName = useInput("");
  const inputPhone = useInput("");
  const inputEmail = useInput("");
  const inputText = useInput("");

  const inputCountryNo = useInput("");

  const { st_questionCreateDone, st_questionCreateError } = useSelector(
    (state) => state.question
  );

  const createQuestionHandler = useCallback(() => {
    if (!emptyCheck(inputName.value)) {
      return message.error(t(`1`));
    }

    if (!emptyCheck(inputPhone.value)) {
      return message.error(t(`2`));
    }

    if (!emptyCheck(inputEmail.value)) {
      return message.error(t(`3`));
    }

    if (!emptyCheck(inputText.value)) {
      return message.error(t(`4`));
    }

    dispatch({
      type: QUESTION_CREATE_REQUEST,
      data: {
        language: i18next.language,
        name: inputName.value,
        mobile: `${inputCountryNo.value} ${inputPhone.value}`,
        email: inputEmail.value,
        content: inputText.value,
      },
    });
  }, [
    inputName.value,
    inputEmail.value,
    inputPhone.value,
    inputText.value,
    inputCountryNo.value,
  ]);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const onClickToggleHanlder = useCallback(() => {
    setToggle(!toggle);
  }, [toggle]);

  useEffect(() => {
    if (st_questionCreateDone) {
      message.success(t(`5`));

      onClickToggleHanlder();

      inputName.setValue("");
      inputPhone.setValue("");
      inputEmail.setValue("");
      inputText.setValue("");
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
      <Wrapper minHeight={`100vh`}>
        <MainSlider />
      </Wrapper>

      {toggle ? (
        <Wrapper
          position={`fixed`}
          bottom={`30px`}
          right={`30px`}
          zIndex={`7`}
          width={`auto`}
          bgColor={`#E9EDFF`}
          radius={`6px`}
          shadow={"2px 2px 10px #a9a9b7"}
        >
          <Wrapper
            dr={`row`}
            ju={`space-between`}
            padding={`5px 10px`}
            bgColor={`#fff`}
            radius={`6px`}
          >
            <Wrapper width={`auto`} fontSize={`14px`} fontWeight={`600`}>
              {t(`6`)}
            </Wrapper>
            <CloseOutlined onClick={onClickToggleHanlder} />
          </Wrapper>

          <Wrapper
            radius={`6px`}
            margin={`38px 10px 10px 10px`}
            width={`280px`}
            bgColor={`#fff`}
            padding={`12px`}
            zIndex={`5`}
          >
            <Image
              top={`40px`}
              position={`absolute`}
              objectFit={`fill`}
              background-size={`cover`}
              width={`51px`}
              height={`46px`}
              src={
                "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/logo/logo_big.png"
              }
            />

            <Wrapper>
              <Wrapper
                lineHeight={`18px`}
                fontSize={`13px`}
                margin={`24px 0 0 0`}
              >
                {t(`7`)}
              </Wrapper>
              <Wrapper>
                <Wrapper
                  fontSize={`12px`}
                  al={`flex-start`}
                  fontWeight={`600`}
                  margin={`10px 0 4px 0`}
                >
                  {t(`8`)}
                </Wrapper>
                <CustomInput {...inputName} />
              </Wrapper>

              <Wrapper>
                <Wrapper
                  fontSize={`12px`}
                  al={`flex-start`}
                  margin={`10px 0 4px 0`}
                  fontWeight={`600`}
                >
                  {t(`9`)}
                </Wrapper>

                <Wrapper dr={`row`} ju={`flex-start`}>
                  <Combo
                    isBorder={true}
                    itemAlign={`flex-start`}
                    margin={`0 10px 0 0`}
                    width={`90px`}
                    height={`35px`}
                    listHeight={`270px`}
                    border={`none`}
                    borderBottom={`1px solid #dfdfdf !important`}
                    onClick={() => setComboCountryNo(!comboCountryNo)}
                  >
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
                            onClick={() => inputCountryNo.setValue(data.value)}
                          >
                            {data.name} ({data.value})
                          </ComboListItem>
                        );
                      })}
                    </ComboList>
                  </Combo>

                  <CustomInput {...inputPhone} width={`145px`} />
                </Wrapper>
              </Wrapper>
              <Wrapper>
                <Wrapper
                  fontSize={`12px`}
                  al={`flex-start`}
                  margin={`10px 0 4px 0`}
                  fontWeight={`600`}
                >
                  {t(`10`)}
                </Wrapper>
                <CustomInput {...inputEmail} />
              </Wrapper>
              <Wrapper>
                <Wrapper
                  fontSize={`12px`}
                  al={`flex-start`}
                  margin={`10px 0 4px 0`}
                  fontWeight={`600`}
                >
                  {t(`11`)}
                </Wrapper>
                <Content {...inputText} />
              </Wrapper>
            </Wrapper>
          </Wrapper>
          <Wrapper>
            <CommonButton
              fontSize={`16px`}
              padding={`5px 24px`}
              radius={`6px`}
              fontWeight={`500`}
              margin={`0 0 10px 0`}
              color={`#fff`}
              bgColor={`#000104`}
              onClick={createQuestionHandler}
            >
              {t(`12`)}
            </CommonButton>
          </Wrapper>
        </Wrapper>
      ) : (
        <QuestionWrapper
          position={`fixed`}
          right={`30px`}
          zIndex={`7`}
          color={`#fff`}
          width={`auto`}
          cursor={`pointer`}
          onClick={onClickToggleHanlder}
        >
          <Wrapper dr={`row`}>
            <Wrapper width={`auto`}>
              <Image
                cursor={`pointer`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/icon_question.png`}
              />
            </Wrapper>
          </Wrapper>
          <Wrapper fontSize={`15px`} al={`flex-end`} margin={`2px 0 0 0`}>
            {t(`12`)}
          </Wrapper>
        </QuestionWrapper>
      )}

      <Wrapper position={`relative`} minHeight={`100vh`}>
        <Wrapper
          position={`absolute`}
          left={`0`}
          top={`0`}
          width={`100%`}
          height={`100%`}
          bgImg={`url('https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/back_download.png')`}
          zIndex={`-2`}
        ></Wrapper>

        <Wrapper
          position={`absolute`}
          left={`0`}
          top={`0`}
          width={`100%`}
          height={`100%`}
          bgColor={`rgba(0, 0, 0, 0.5)`}
          zIndex={`-1`}
        ></Wrapper>

        <Wrapper fontSize={`30px`} fontWeight={`500`} color={`#3353F2`}>
          {t(`13`)}
        </Wrapper>

        <Wrapper
          margin={`15px 0 0`}
          fontSize={width < 700 ? `15px` : `19px`}
          fontWeight={`400`}
          color={`#fff`}
          padding={`0 20px`}
          textAlign={`center`}
        >
          {t(`14`)}
        </Wrapper>

        <Wrapper dr={width < 750 ? `column` : `row`} margin={`70px 0 0`}>
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
            fontSize={`34px`}
            zIndex={width < 750 ? `-3` : `0`}
          >
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
            fontSize={`34px`}
            zIndex={width < 750 ? `-3` : `0`}
          >
            <PlusOutlined />
          </Wrapper>

          <Wrapper width={`auto`}>
            <Image
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/icon_ios.png`}
            />
            <Wrapper width={`auto`} fontWeight={`500`} color={`#fff`}>
              Ios/Mac
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
            onClick={() => moveLinkHandler(`/platform/pc`)}
          >
            {t(`15`)}
            <Wrapper
              position={`absolute`}
              right={`40px`}
              top={`50%`}
              margin={`-6px 0 0 0`}
              width={`auto`}
            >
              <RightOutlined />
            </Wrapper>
          </CommonButton>
        </Wrapper>

        <Wrapper
          position={`absolute`}
          right={`180px`}
          bottom={`40px`}
          width={`auto`}
          zIndex={width < 1200 ? `-3` : `0`}
        >
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
            fontWeight={`500`}
          >
            ※{t(`16`)}※
          </Wrapper>

          <Wrapper
            fontSize={`15px`}
            fontWeight={`300`}
            color={`#fff`}
            textAlign={`center`}
            lineHeight={`1.8`}
            display={`block`}
          >
            <Wrapper
              display={`inline`}
              dr={`row`}
              width={`auto`}
              color={`inherit`}
              fontSize={`inherit`}
            >
              {t(`17`).split(`\n`)[0]}
              <Wrapper
                display={`inline`}
                padding={`0 0 0 5px`}
                width={`auto`}
                fontWeight={`500`}
                color={`inherit`}
                fontSize={`inherit`}
              >
                {t(`17`).split(`\n`)[1]}
              </Wrapper>
              {t(`17`).split(`\n`)[2]}
            </Wrapper>
            {t(`18`)}
            <br />
            {t(`19`)}
            <br />
            {t(`20`)}
            <br />
            {t(`21`)}

            <br />
            <Wrapper
              display={`inline`}
              width={`auto`}
              color={`#c1c1c1`}
              fontSize={`inherit`}
            >
              ※ {t(`22`)}
            </Wrapper>
          </Wrapper>
        </RsWrapper>
      </Wrapper>
      <Popup />
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
