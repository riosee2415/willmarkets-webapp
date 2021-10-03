import React, { useState, useEffect, useCallback } from "react";
import {
  Wrapper,
  Combo,
  ComboTitle,
  ComboList,
  ComboListItem,
} from "../commonComponents";
import { withResizeDetector } from "react-resize-detector";
import styled from "styled-components";
import Theme from "../Theme";
import { CaretDownOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

const UserHeader = ({ children, width }) => {
  ////// HOOKS //////
  const { me } = useSelector((state) => state.user);

  const [comboUser, setComboUser] = useState(false);
  const [comboLanguage, setComboLanguage] = useState(false);

  ////// HANDLER //////

  ////// USEEFFECT //////

  return (
    <Wrapper dr={`row`} ju={`flex-end`} height={`70px`} padding={`0 30px`}>
      <Wrapper dr={`row`} width={`auto`} margin={`0 20px 0 0`}>
        <Wrapper
          position={`relative`}
          bottom={`2px`}
          margin={`0 6px 0 0`}
          width={`auto`}
          padding={`6px`}
          fontSize={`18px`}
          border={`1px solid #858585`}
          radius={`50%`}
          shadow={`0 2px 4px #a1a1a1`}
        >
          <UserOutlined />
        </Wrapper>

        <Combo
          isTitleHover={true}
          width={`150px`}
          onMouseOver={() => setComboUser(true)}
          onMouseOut={() => setComboUser(false)}
        >
          <ComboTitle>
            <Wrapper>{me && me.username}</Wrapper>
            <CaretDownOutlined />
          </ComboTitle>

          <ComboList isView={comboUser} onClick={() => setComboUser(false)}>
            {me && me.type === "2" && <ComboListItem>내정보수정</ComboListItem>}
            <ComboListItem>로그아웃</ComboListItem>
          </ComboList>
        </Combo>
      </Wrapper>

      <Combo
        isTitleHover={true}
        width={`120px`}
        onMouseOver={() => setComboLanguage(true)}
        onMouseOut={() => setComboLanguage(false)}
      >
        <ComboTitle>
          <Wrapper>Language</Wrapper>
          <CaretDownOutlined />
        </ComboTitle>

        <ComboList
          isView={comboLanguage}
          onClick={() => setComboLanguage(false)}
        >
          <ComboListItem>한국어</ComboListItem>
          <ComboListItem>English</ComboListItem>
        </ComboList>
      </Combo>
    </Wrapper>
  );
};

export default withResizeDetector(UserHeader);
