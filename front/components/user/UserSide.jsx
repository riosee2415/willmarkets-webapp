import React, { useState, useEffect, useCallback } from "react";
import { Wrapper, Image } from "../commonComponents";
import { withResizeDetector } from "react-resize-detector";
import styled from "styled-components";
import Theme from "../Theme";
import { useRouter } from "next/router";
import {
  DollarOutlined,
  HomeOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import useWidth from "../../hooks/useWidth";

const Submenu = styled(Wrapper)``;

const SubmenuTitle = styled(Wrapper)`
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 20px 13px 30px;
  color: #fff;
  font-size: 14px;
  background-color: #201f1f;
  border-bottom: 1px solid #2b2b2b;
  cursor: pointer;

  &:hover {
    color: #f7e6fc;
  }

  ${(props) =>
    props.isActive &&
    `
     color: #f7e6fc;
  `}

  & > div {
    flex-direction: row;
    width: auto;
    cursor: pointer;
  }

  & > div span {
    margin: 0 10px 0 0;
    position: relative;
    bottom: 1px;
  }

  & > span {
    font-size: 12px;
  }
`;

const SubmenuList = styled(Wrapper)`
  overflow: hidden;
  max-height: 0;

  ${(props) =>
    props.isOpen
      ? `
    max-height: 999px;
    transition: max-height 0.25s ease-in;
  `
      : `
    max-height: 0;
    transition: max-height 0.25s ease-out;
  `}
`;

const SubmenuListItem = styled(Wrapper)`
  flex-direction: row;
  justify-content: flex-start;
  padding: 12px 20px 10px 55px;
  color: #272525;
  font-size: 15px;
  background-color: #f7e6fc;
  border-bottom: 1px solid #dedede;
  box-shadow: 0 1px 4px #c5c5c5;
  cursor: pointer;

  &:hover {
    background-color: #f0d4ef;
  }

  ${(props) =>
    props.isActive &&
    `
     background-color: #f7e6fc;
  `}
`;

const UserSide = () => {
  const router = useRouter();
  const query = router.query;

  const width = useWidth();

  const { t } = useTranslation(["userSide"]);

  const [toggleSubmenu, setToggleSubmenu] = useState(-1);

  const moveLinkHandler = (link) => {
    router.push(link);
  };

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

  const toggleSubMenuListHandler = (idx) => {
    if (toggleSubmenu === idx) {
      setToggleSubmenu(-1);
    } else {
      setToggleSubmenu(-1);

      setTimeout(() => {
        setToggleSubmenu(idx);
      }, 250);
    }
  };

  return (
    <Wrapper>
      <Wrapper position={`relative`} margin={`20px 0 15px`} cursor={`pointer`}>
        {width < 900 && (
          <Wrapper
            position={`absolute`}
            width={`auto`}
            left={`20px`}
            top={`0`}
            cursor={`pointer`}
            onClick={toggleSubMenuHandler}
          >
            <UnorderedListOutlined
              style={{ fontSize: `28px`, color: `#fff` }}
            />
          </Wrapper>
        )}

        <Image
          width={width < 900 ? `90px` : `40%`}
          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/logo/logo_big.png`}
          cursor={`pointer`}
          onClick={() => moveLinkHandler(`/`)}
        />
      </Wrapper>

      <Wrapper>
        <Submenu>
          <SubmenuTitle
            isActive={router.pathname === `/user`}
            onClick={() => moveLinkHandler(`/user`)}
          >
            <Wrapper>
              <HomeOutlined />
              {t(`1`)}
            </Wrapper>
          </SubmenuTitle>
        </Submenu>

        <Submenu>
          <SubmenuTitle
            isActive={[
              `/user/deposit`,
              `/user/withdraw`,
              `/user/record`,
            ].includes(router.pathname)}
            onClick={() => toggleSubMenuListHandler(1)}
          >
            <Wrapper>
              <DollarOutlined />
              {t(`2`)}
            </Wrapper>

            {toggleSubmenu === 1 ? <CaretUpOutlined /> : <CaretDownOutlined />}
          </SubmenuTitle>

          <SubmenuList isOpen={toggleSubmenu === 1}>
            <SubmenuListItem
              isActive={router.pathname === `/user/deposit`}
              onClick={() => moveLinkHandler(`/user/deposit`)}
            >
              {t(`3`)}
            </SubmenuListItem>
            <SubmenuListItem
              isActive={router.pathname === `/user/withdraw`}
              onClick={() => moveLinkHandler(`/user/withdraw`)}
            >
              {t(`4`)}
            </SubmenuListItem>
            <SubmenuListItem
              isActive={router.pathname === `/user/record`}
              onClick={() => moveLinkHandler(`/user/record`)}
            >
              {t(`5`)}
            </SubmenuListItem>
          </SubmenuList>
        </Submenu>

        <Submenu>
          <SubmenuTitle
            isActive={[`/user/info`].includes(router.pathname)}
            onClick={() => toggleSubMenuListHandler(2)}
          >
            <Wrapper>
              <UserOutlined /> {t(`6`)}
            </Wrapper>

            {toggleSubmenu === 2 ? <CaretUpOutlined /> : <CaretDownOutlined />}
          </SubmenuTitle>

          <SubmenuList isOpen={toggleSubmenu === 2}>
            <SubmenuListItem
              isActive={router.pathname === `/user/info`}
              onClick={() => moveLinkHandler(`/user/info`)}
            >
              {t(`7`)}
            </SubmenuListItem>
          </SubmenuList>
        </Submenu>
      </Wrapper>
    </Wrapper>
  );
};

export default withResizeDetector(UserSide);
