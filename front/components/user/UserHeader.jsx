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
import { useRouter } from "next/router";
import { USER_LOGOUT_REQUEST } from "../../reducers/user";
import { useTranslation } from "react-i18next";

const UserHeader = ({ children, width }) => {
  ////// HOOKS //////
  const router = useRouter();

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation(["userHeader"]);

  const { me, st_userLogoutDone, st_userLogoutError } = useSelector(
    (state) => state.user
  );

  const [comboUser, setComboUser] = useState(false);
  const [comboLanguage, setComboLanguage] = useState(false);

  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const logoutUserHandler = useCallback(() => {
    dispatch({
      type: USER_LOGOUT_REQUEST,
    });
  }, []);

  ////// USEEFFECT //////
  useEffect(() => {
    if (st_userLogoutDone) {
      router.push("/");
    }
  }, [st_userLogoutDone]);

  useEffect(() => {
    if (st_userLogoutError) {
      message.error(st_userLogoutError);
    }
  }, [st_userLogoutError]);

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
            {me && me.type === "2" && (
              <ComboListItem onClick={() => moveLinkHandler(`/user/info`)}>
                {t(`1`)}
              </ComboListItem>
            )}
            <ComboListItem onClick={logoutUserHandler}>{t(`2`)}</ComboListItem>
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
          <ComboListItem onClick={() => i18n.changeLanguage("en")}>
            English
          </ComboListItem>
          <ComboListItem onClick={() => i18n.changeLanguage("ko")}>
            한국어
          </ComboListItem>
        </ComboList>
      </Combo>
    </Wrapper>
  );
};

export default withResizeDetector(UserHeader);
