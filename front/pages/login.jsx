import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import styled from "styled-components";
import { Result, message, Modal, Button } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import useInput from "../hooks/useInput";
import { emptyCheck } from "../components/commonUtils";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { LOAD_MY_INFO_REQUEST, USER_SIGNIN_REQUEST } from "../reducers/user";
import {
  Image,
  Wrapper,
  WholeWrapper,
  RsWrapper,
  Combo,
} from "../components/commonComponents";
import ClientLayout from "../components/ClientLayout";
import Theme from "../components/Theme";

export const CommonButton = styled(Button)`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontSize || `15px`};
  color: ${(props) => props.color || props.theme.grey_C};
  border-radius: ${(props) => props.radius};

  ${(props) => !props.kindOf && `background : ${props.theme.white_C};`}
  ${(props) => props.kindOf === `red` && `background : ${props.theme.red_C};`}
  ${(props) => props.kindOf === `red` && `color : ${props.theme.white_C};`}
  ${(props) => props.kindOf === `blue` && `background : ${props.theme.blue_C};`}
  ${(props) => props.kindOf === `blue` && `color : ${props.theme.white_C};`}
  ${(props) =>
    props.kindOf === `black` && `background : ${props.theme.black_C};`}
  ${(props) => props.kindOf === `black` && `color : ${props.theme.white_C};`}
  ${(props) =>
    props.kindOf === `white` && `border : 1px solid ${props.theme.black_C};`}
     
 
  &:hover {
    background: ${(props) => props.theme.white_C};
    color: ${(props) => props.theme.grey_C};
    ${(props) => !props.kindOf && `border :1px solid ${props.theme.grey_C};`}
    ${(props) =>
      props.kindOf === `white` && `background ${props.theme.white_C};`}
         ${(props) =>
      props.kindOf === `white` && `color ${props.theme.grey_C};`}

  ${(props) => props.kindOf === `red` && `color : ${props.theme.red_C};`}
  ${(props) =>
      props.kindOf === `red` && `border : 1px solid ${props.theme.red_C};`}
  ${(props) => props.kindOf === `blue` && `color : ${props.theme.blue_C};`}
  ${(props) =>
      props.kindOf === `blue` && `border : 1px solid ${props.theme.blue_C};`}
  ${(props) =>
      props.kindOf === `black` && `border : 1px solid ${props.theme.black_C};`}
  }

  @media (max-width: 700px) {
    font-size: ${(props) => props.fontSize || `16px`};
  }
`;

export const TextInput = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin || `0 8px 0 0`};
  padding: ${(props) => props.padding || `4px 30px 4px 8px`};
  font-size: ${(props) => props.fontSize || `14px`};
  color: ${(props) => props.color || props.theme.grey_C};
  border: ${(props) => props.border || `1px solid #e5e5e5;`};
  border-radius: ${(props) => props.radius || `2px`};
  box-shadow: ${(props) => props.boxShadow || `1px 1px 3px #e5e5e5`};
  transition: ${(props) => props.transition || `0.3s`};
  outline: none;
  &:hover {
    border: 1px solid ${Theme.red_C};
  }

  &::placeholder {
    color: #c4c4c4;
  }

  &:hover::placeholder {
    color: #727272;
  }

  ${(props) =>
    props.isFocus &&
    `
    color: #6e6e6e;

    &::placeholder {
      color: #727272;
    }
  `}

  @media (max-width: 700px) {
    font-size: 14px;
  }
`;

const SelecetBox = styled.select`
  outline: none;

  &:hover {
    border: 1px solid ${Theme.red_C};
  }
`;

const CommonModal = styled(Modal)`
  & .ant-modal-content {
    padding: 20px;
    height: 100%;
    border: 2px solid #9d9d9d;
  }

  & .ant-modal-footer {
    padding: 10px 0 0;
  }

  & .ant-btn:hover {
    border-color: ${Theme.basicTheme_C};
  }

  & .ant-btn > span {
    color: ${Theme.black_C};
  }

  & .ant-btn:hover > span {
    color: ${Theme.basicTheme_C};
  }

  & .ant-btn-primary {
    border-color: ${Theme.basicTheme_C};
    background: ${Theme.basicTheme_C};
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
  }

  & .ant-btn-primary > span {
    color: ${Theme.white_C};
  }

  & .ant-btn-primary:hover {
    background: ${Theme.white_C};
  }

  & .ant-btn-primary:hover > span {
    color: ${Theme.basicTheme_C};
  }
`;

const Pagenation = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  cursor: pointer;
  margin: 0px 5px;
  border-radius: 4px;
  border: 1px solid ${Theme.lightGrey_C};
  &.active {
    background: ${(props) => props.theme.red_C};
    color: ${(props) => props.theme.white_C};
  }
  &:hover {
    background: ${(props) => props.theme.white_C};
    color: ${(props) => props.theme.red_C};
    border: 1px solid ${Theme.red_C};
  }
`;

const Tab = styled(Wrapper)`
  padding: 20px 0 15px;
  font-size: 20px;
  cursor: pointer;
  border-bottom: 5px solid transparent;

  ${(props) =>
    props.isActive &&
    `
    border-bottom: 5px solid ${Theme.basicTheme_C};
  `}

  &:hover {
    color: ${Theme.red_C};
  }

  @media (max-width: 700px) {
    font-size: 17px;
  }
`;

const File = styled.input`
  display: none;
`;

const Label = styled.label`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight};
  display: ${(props) => props.display};
  flex-direction: ${(props) => props.dr};
  align-items: ${(props) => props.al};
  justify-content: ${(props) => props.ju};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  line-height: ${(props) => props.lineHeight};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background: ${(props) => props.bgColor};
  text-align: ${(props) => props.textAlign};
  font-style: ${(props) => props.fontStyle};
  cursor: ${(props) => props.cursor};
  opacity: ${(props) => props.opacity};
  color: rgba(0, 0, 0, 0.85);
`;

const Login = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);

  const changeCaptchaHandler = useCallback((value) => {
    console.log(value);
  }, []);

  useEffect(() => {
    if (!me) {
      dispatch({
        type: USER_SIGNIN_REQUEST,
        data: {
          email: "4leaf.lsh@gmail.com",
          password: "fourleaf0309!!",
        },
      });
    }
  }, []);

  return (
    <ClientLayout>
      <div>Hello Login</div>
      <Wrapper>
        <ReCAPTCHA
          sitekey={`6LfrU5kcAAAAAPksd-pntn_n9L8LEof76kCO8_ED`}
          hl={`en`}
          onChange={changeCaptchaHandler}
        />
      </Wrapper>
      <Wrapper dr={`row`}>
        <TextInput placeholder={`주문 번호를 입력해주세요.`} />

        <CommonButton kindOf={`blue`} placeholder="주문번호를 입력해주세요.">
          버튼
        </CommonButton>
        <CommonButton kindOf={`red`} placeholder="주문번호를 입력해주세요.">
          버튼
        </CommonButton>
        <CommonButton kindOf={`black`} placeholder="주문번호를 입력해주세요.">
          버튼
        </CommonButton>
        <CommonButton>버튼</CommonButton>
      </Wrapper>
      <Tab isActive>자금</Tab>
      <Tab>거래</Tab>
      <Tab>분석</Tab>

      <CommonModal visible={false}>
        <p>모달</p>
      </CommonModal>
      <Wrapper>
        <Label>라벨</Label>
      </Wrapper>
      <Wrapper>
        <SelecetBox>
          <option>모든</option>
          <option>하나</option>
          <option>둘이</option>
        </SelecetBox>
      </Wrapper>

      <Pagenation className={`active`}>1</Pagenation>
      <Pagenation>2</Pagenation>
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
export default Login;
