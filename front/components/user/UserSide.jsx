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
} from "@ant-design/icons";

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
    color: #f7b1ff;
  }

  ${(props) =>
    props.isActive &&
    `
     color: #f7b1ff;
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
  background-color: #fcf0f6;
  border-bottom: 1px solid #dedede;
  box-shadow: 0 1px 4px #c5c5c5;
  cursor: pointer;

  &:hover {
    background-color: #ffe8fe;
  }

  ${(props) =>
    props.isActive &&
    `
     background-color: #FFE8FE;
  `}
`;

const UserSide = () => {
  const router = useRouter();

  const [toggleSubmenu, setToggleSubmenu] = useState(-1);

  const moveLinkHandler = (link) => {
    router.push(link);
  };

  const toggleSubmenuHandler = (idx) => {
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
      <Wrapper margin={`20px 0 40px`} cursor={`pointer`}>
        <Image
          width={`40%`}
          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/logo/logo_2.png`}
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
              홈페이지
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
            onClick={() => toggleSubmenuHandler(1)}
          >
            <Wrapper>
              <DollarOutlined />
              자금
            </Wrapper>

            {toggleSubmenu === 1 ? <CaretUpOutlined /> : <CaretDownOutlined />}
          </SubmenuTitle>

          <SubmenuList isOpen={toggleSubmenu === 1}>
            <SubmenuListItem
              isActive={router.pathname === `/user/deposit`}
              onClick={() => moveLinkHandler(`/user/deposit`)}
            >
              입금
            </SubmenuListItem>
            <SubmenuListItem
              isActive={router.pathname === `/user/withdraw`}
              onClick={() => moveLinkHandler(`/user/withdraw`)}
            >
              출금
            </SubmenuListItem>
            <SubmenuListItem
              isActive={router.pathname === `/user/record`}
              onClick={() => moveLinkHandler(`/user/record`)}
            >
              심사기록
            </SubmenuListItem>
          </SubmenuList>
        </Submenu>

        <Submenu>
          <SubmenuTitle
            isActive={[`/user/info`].includes(router.pathname)}
            onClick={() => toggleSubmenuHandler(2)}
          >
            <Wrapper>
              <UserOutlined />내 계정
            </Wrapper>

            {toggleSubmenu === 2 ? <CaretUpOutlined /> : <CaretDownOutlined />}
          </SubmenuTitle>

          <SubmenuList isOpen={toggleSubmenu === 2}>
            <SubmenuListItem
              isActive={router.pathname === `/user/info`}
              onClick={() => moveLinkHandler(`/user/info`)}
            >
              내 정보 관리
            </SubmenuListItem>
          </SubmenuList>
        </Submenu>
      </Wrapper>
    </Wrapper>
  );
};

export default withResizeDetector(UserSide);
