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
import {
  CaretDownOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { USER_LOGOUT_REQUEST } from "../../reducers/user";
import { useTranslation } from "react-i18next";
import useWidth from "../../hooks/useWidth";

const UserHeader = ({ children }) => {
  ////// HOOKS //////
  const router = useRouter();
  const query = router.query;

  const width = useWidth();

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

  const toggleSubMenuHandler = useCallback(async () => {
    let menu = query.menu || `0`;

    if (menu === `1`) {
      menu = `0`;
    } else if (menu === `0`) {
      menu = `1`;
    }

    let url = `${router.pathname}?menu=${menu}`;

    await Promise.all(
      Object.keys(query).map((data) => {
        if (data === "menu") return;

        url += `&${data}=${query[data]}`;
      })
    );

    router.push(url);
  }, [query]);

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
    <Wrapper
      dr={`row`}
      ju={width < 900 ? `space-between` : `flex-end`}
      height={`70px`}
      padding={width < 900 ? `0 10px` : `0 30px`}
    >
      {width < 900 && (
        <Wrapper
          width={`auto`}
          cursor={`pointer`}
          onClick={toggleSubMenuHandler}
        >
          <UnorderedListOutlined style={{ fontSize: `30px` }} />
        </Wrapper>
      )}

      <Wrapper dr={`row`} width={`auto`}>
        <Wrapper
          dr={`row`}
          width={`auto`}
          margin={width < 900 ? `0` : `0 20px 0 0`}
        >
          <Wrapper
            position={`relative`}
            bottom={`2px`}
            margin={width < 900 ? `0` : `0 6px 0 0`}
            width={`auto`}
            padding={`6px`}
            fontSize={width < 900 ? `13px` : `18px`}
            border={`1px solid #858585`}
            radius={`50%`}
            shadow={`0 2px 4px #a1a1a1`}
          >
            <UserOutlined />
          </Wrapper>

          <Combo
            isTitleHover={true}
            width={width < 900 ? `120px` : `150px`}
            onMouseOver={() => width >= 900 && setComboUser(true)}
            onMouseOut={() => width >= 900 && setComboUser(false)}
            onClick={() => width < 900 && setComboUser(!comboUser)}
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
              <ComboListItem onClick={logoutUserHandler}>
                {t(`2`)}
              </ComboListItem>
            </ComboList>
          </Combo>
        </Wrapper>

        <Combo
          isTitleHover={true}
          width={width < 900 ? `110px` : `120px`}
          onMouseOver={() => width >= 900 && setComboLanguage(true)}
          onMouseOut={() => width >= 900 && setComboLanguage(false)}
          onClick={() => width < 900 && setComboLanguage(!comboLanguage)}
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
    </Wrapper>
  );
};

export default withResizeDetector(UserHeader);
