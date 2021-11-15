import React, { useState, useEffect, useCallback } from "react";
import {
  RowWrapper,
  ColWrapper,
  CommonButton,
  Image,
  ATag,
  RsWrapper,
  Wrapper,
  Combo,
  ComboTitle,
  ComboList,
  ComboListItem,
  WholeWrapper,
} from "./commonComponents";
import { withResizeDetector } from "react-resize-detector";
import styled from "styled-components";
import Theme from "./Theme";
import { Drawer, message } from "antd";
import Link from "next/link";
import {
  CaretDownOutlined,
  BarsOutlined,
  CloseOutlined,
  AlignRightOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { USER_LOGOUT_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const WebRow = styled(RowWrapper)`
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  transition: 0.5s;

  &.background {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

const MobileRow = styled(RowWrapper)`
  display: none;

  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  transition: 0.5s;
  padding: 10px 0;

  &.background {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
  }

  @media (max-width: 700px) {
    display: flex;
  }
`;

const MenuTextWrapper = styled(Wrapper)`
  width: auto;
  height: 100%;
  padding: 0 45px;
  font-size: 17px;
  color: inherit;
  transition: none !important;
  cursor: pointer;
`;

const MenuListWrapper = styled(Wrapper)`
  overflow: hidden;
  position: absolute;
  top: 85px;
  display: none;
  background: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 10px #d2d2d2;
`;

const MenuListItemWrapper = styled(Wrapper)`
  padding: 12px 0;
  color: inherit;
  font-size: 16px;
  cursor: pointer;
  transition: none !important;
  text-align: center;

  &:hover {
    background: #f4f2f3;
    font-weight: 500;
  }
`;

const MenuWrapper = styled(Wrapper)`
  position: relative;
  width: auto;
  height: 100%;
  transition: none !important;

  ${(props) =>
    props.isOpen &&
    `
    & ${MenuTextWrapper} {
      font-weight: 500;
    }

    & ${MenuListWrapper} {
      display: flex;
    }
  `}
`;

const MobileDrawer = styled(Drawer)`
  & .ant-drawer-header {
    padding: 0px;
  }

  & .ant-drawer-body {
    padding: 0px;
  }
`;

const AppHeader = ({ children, width }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation(["appHeader"]);

  const { me, st_userLogoutDone, st_userLogoutError } = useSelector(
    (state) => state.user
  );

  ////////////// - USE STATE- ///////////////
  const [headerScroll, setHeaderScroll] = useState(false);
  const [pageY, setPageY] = useState(0);
  // const documentRef = useRef(document);

  const [drawar, setDrawar] = useState(false);
  const [subMenu, setSubMenu] = useState(``);

  const [visible, setVisible] = useState(false);

  const [comboLanguage, setComboLanguage] = useState(false);

  const [toggleModal, setToggleModal] = useState(false);
  const [toggleMenu01, setToggleMenu01] = useState(false);
  const [toggleMenu02, setToggleMenu02] = useState(false);
  const [toggleMenu03, setToggleMenu03] = useState(false);
  const [toggleMenu04, setToggleMenu04] = useState(false);
  const [toggleMenu05, setToggleMenu05] = useState(false);

  const [MobileSubMenu1, setMobileSubMenu1] = useState(false);
  const [MobileSubMenu2, setMobileSubMenu2] = useState(false);
  const [MobileSubMenu3, setMobileSubMenu3] = useState(false);

  ///////////// - EVENT HANDLER- ////////////

  const DrawToggle = () => {
    setVisible(!visible);

    setMobileSubMenu1(false);
    setMobileSubMenu2(false);
    setMobileSubMenu3(false);
  };

  const handleScroll = useCallback(() => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const headerScroll = pageY && pageYOffset !== 0 && pageYOffset !== pageY;
    setHeaderScroll(headerScroll);
    setPageY(pageYOffset);
  });

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const logoutUserHandler = useCallback(() => {
    dispatch({
      type: USER_LOGOUT_REQUEST,
    });
  }, []);

  const MobileSubMenuToggle = (num) => {
    if (num === `1`) {
      setMobileSubMenu1(!MobileSubMenu1);
    } else if (num === `2`) {
      setMobileSubMenu2(!MobileSubMenu2);
    } else if (num === `3`) {
      setMobileSubMenu3(!MobileSubMenu3);
    }
  };

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [pageY]);

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
    <>
      <WebRow
        justify={`center`}
        position={`fixed`}
        top={`0`}
        left={`0`}
        index={`10000`}
        className={headerScroll && "background"}>
        <Wrapper padding={`5px 0`} bgColor={`#231d21`}>
          <RsWrapper al={`flex-end`}>
            <Wrapper dr={`row`} width={`auto`}>
              {me ? (
                <Wrapper
                  margin={`0 0 0 30px`}
                  width={`auto`}
                  fontSize={`13px`}
                  color={`#fff`}
                  cursor={`pointer`}
                  onClick={logoutUserHandler}>
                  {t(`1`)}
                </Wrapper>
              ) : (
                <>
                  <Wrapper
                    margin={`0 0 0 30px`}
                    width={`auto`}
                    fontSize={`13px`}
                    color={`#fff`}
                    cursor={`pointer`}
                    onClick={() => moveLinkHandler(`/login`)}>
                    {t(`2`)}
                  </Wrapper>
                  <Wrapper
                    margin={`0 0 0 30px`}
                    width={`auto`}
                    fontSize={`13px`}
                    color={`#fff`}
                    cursor={`pointer`}
                    onClick={() => moveLinkHandler(`/signup`)}>
                    {t(`3`)}
                  </Wrapper>
                </>
              )}

              <Wrapper
                position={`relative`}
                top={`2.5px`}
                margin={`0 0 0 30px`}
                width={`auto`}
                fontSize={`13px`}
                cursor={`pointer`}>
                <Combo
                  width={`110px`}
                  padding={`0`}
                  onMouseOver={() => setComboLanguage(true)}>
                  <ComboTitle color={`#fff`}>
                    <Wrapper fontSize={`13px`}>Language</Wrapper>
                    <CaretDownOutlined />
                  </ComboTitle>

                  <ComboList
                    isView={comboLanguage}
                    onClick={() => setComboLanguage(false)}>
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
          </RsWrapper>
        </Wrapper>

        <Wrapper
          bgColor={
            toggleMenu01 ||
            toggleMenu02 ||
            toggleMenu03 ||
            toggleMenu04 ||
            toggleMenu05
              ? `#fff`
              : `none`
          }
          color={
            toggleMenu01 ||
            toggleMenu02 ||
            toggleMenu03 ||
            toggleMenu04 ||
            toggleMenu05
              ? `#2c2c2c`
              : `#fff`
          }>
          <RsWrapper>
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`5px 0`}
              height={`85px`}>
              <Wrapper
                width={`auto`}
                cursor={`pointer`}
                onClick={() => moveLinkHandler(`/`)}>
                <Image
                  width={`auto`}
                  src={
                    toggleMenu01 ||
                    toggleMenu02 ||
                    toggleMenu03 ||
                    toggleMenu04 ||
                    toggleMenu05
                      ? `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/logo/logo_hover.png`
                      : `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/logo/logo.png`
                  }
                />
              </Wrapper>

              <Wrapper dr={`row`} width={`auto`} height={`100%`}>
                <MenuWrapper
                  isOpen={toggleMenu01}
                  onMouseOver={() => {
                    setToggleMenu01(true);
                    setToggleMenu02(false);
                    setToggleMenu03(false);
                    setToggleMenu04(false);
                    setToggleMenu05(false);
                  }}>
                  <MenuTextWrapper
                    onClick={() => moveLinkHandler(`/company/intro`)}>
                    {t(`4`)}
                  </MenuTextWrapper>

                  <MenuListWrapper
                    onMouseOut={() => setToggleMenu01(false)}
                    onClick={() => setToggleMenu01(false)}>
                    <MenuListItemWrapper
                      onClick={() => moveLinkHandler(`/company/intro`)}>
                      {t(`5`)}
                    </MenuListItemWrapper>
                    <MenuListItemWrapper
                      onClick={() => moveLinkHandler(`/company/terms`)}>
                      {t(`6`)}
                    </MenuListItemWrapper>
                    <MenuListItemWrapper
                      onClick={() => moveLinkHandler(`/company/privacy`)}>
                      {t(`7`)}
                    </MenuListItemWrapper>
                    {/* <MenuListItemWrapper
                      onClick={() => moveLinkHandler(`/company/moneyPolicy`)}
                    >
                    {t(`8`)}
                    </MenuListItemWrapper> */}
                  </MenuListWrapper>
                </MenuWrapper>

                <MenuWrapper
                  isOpen={toggleMenu02}
                  onMouseOver={() => {
                    setToggleMenu02(true);
                    setToggleMenu01(false);
                    setToggleMenu03(false);
                    setToggleMenu04(false);
                    setToggleMenu05(false);
                  }}>
                  <MenuTextWrapper
                    onClick={() => moveLinkHandler(`/trading/forex`)}>
                    {t(`9`)}
                  </MenuTextWrapper>

                  <MenuListWrapper
                    onMouseOut={() => setToggleMenu02(false)}
                    onClick={() => setToggleMenu02(false)}>
                    <MenuListItemWrapper
                      onClick={() => moveLinkHandler(`/trading/forex`)}>
                      Forex
                    </MenuListItemWrapper>
                    <MenuListItemWrapper
                      onClick={() => moveLinkHandler(`/trading/ecn`)}>
                      ECN
                    </MenuListItemWrapper>
                    <MenuListItemWrapper
                      onClick={() => moveLinkHandler(`/trading/stp`)}>
                      STP
                    </MenuListItemWrapper>
                    <MenuListItemWrapper
                      onClick={() => moveLinkHandler(`/trading/spread`)}>
                      {t(`10`)}
                    </MenuListItemWrapper>
                    <MenuListItemWrapper
                      onClick={() => moveLinkHandler(`/trading/margin`)}>
                      {t(`11`)}
                    </MenuListItemWrapper>
                    {/* <MenuListItemWrapper
                      onClick={() => moveLinkHandler(`/trading/provider`)}>
                      {t(`12`)}
                    </MenuListItemWrapper> */}
                    <MenuListItemWrapper
                      onClick={() => moveLinkHandler(`/trading/time`)}>
                      {t(`13`)}
                    </MenuListItemWrapper>
                  </MenuListWrapper>
                </MenuWrapper>

                <MenuWrapper
                  isOpen={toggleMenu03}
                  onMouseOver={() => {
                    setToggleMenu03(true);
                    setToggleMenu01(false);
                    setToggleMenu02(false);
                    setToggleMenu04(false);
                    setToggleMenu05(false);
                  }}>
                  <MenuTextWrapper
                    onClick={() => moveLinkHandler(`/platform/pc`)}>
                    {t(`14`)}
                  </MenuTextWrapper>

                  <MenuListWrapper
                    onMouseOut={() => setToggleMenu03(false)}
                    onClick={() => setToggleMenu03(false)}>
                    <MenuListItemWrapper
                      onClick={() => moveLinkHandler(`/platform/pc`)}>
                      {t(`15`)}
                    </MenuListItemWrapper>
                    <MenuListItemWrapper
                      onClick={() => moveLinkHandler(`/platform/mobile`)}>
                      {t(`16`)}
                    </MenuListItemWrapper>
                  </MenuListWrapper>
                </MenuWrapper>

                <MenuWrapper
                  isOpen={toggleMenu04}
                  onMouseOver={() => {
                    setToggleMenu04(true);
                    setToggleMenu01(false);
                    setToggleMenu02(false);
                    setToggleMenu03(false);
                    setToggleMenu05(false);
                  }}
                  onMouseOut={() => setToggleMenu04(false)}>
                  <MenuTextWrapper onClick={() => moveLinkHandler(`/user`)}>
                    {t(`17`)}
                  </MenuTextWrapper>
                </MenuWrapper>

                <MenuWrapper
                  isOpen={toggleMenu05}
                  onMouseOver={() => {
                    setToggleMenu05(true);
                    setToggleMenu01(false);
                    setToggleMenu02(false);
                    setToggleMenu03(false);
                    setToggleMenu04(false);
                  }}
                  onMouseOut={() => setToggleMenu05(false)}>
                  <MenuTextWrapper onClick={() => moveLinkHandler(`/support`)}>
                    {t(`18`)}
                  </MenuTextWrapper>
                </MenuWrapper>
              </Wrapper>
            </Wrapper>
          </RsWrapper>
        </Wrapper>
      </WebRow>

      <Wrapper al={`flex-start`}>
        <Wrapper onClick={DrawToggle} al={`flex-start`} cursor={`pointer`}>
          <BarsOutlined style={{ fontSize: "30px" }} />
        </Wrapper>
        <MobileDrawer
          title={
            <WholeWrapper>
              <Wrapper dr={`row`} ju={`space-between`} padding={`10px 15px`}>
                <Wrapper
                  width={`auto`}
                  onClick={() => moveLinkHandler(`/`)}
                  cursor={`pointer`}>
                  <Image
                    width={`auto`}
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/logo/logo_hover.png`}
                  />
                </Wrapper>
                <Wrapper width={`auto`} onClick={DrawToggle} cursor={`pointer`}>
                  <CloseOutlined style={{ fontSize: "22px" }} />
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={`row`}
                margin={`5px 0 0 0`}
                bgColor={`#231d21`}
                padding={`10px 20px`}>
                {me ? (
                  <Wrapper
                    width={`25%`}
                    cursor={`pointer`}
                    color={`#fff`}
                    onClick={() => logoutUserHandler()}>
                    {t(`1`)}
                  </Wrapper>
                ) : (
                  <Wrapper
                    width={`25%`}
                    cursor={`pointer`}
                    color={`#fff`}
                    onClick={() => moveLinkHandler(`/login`)}>
                    {t(`2`)}
                  </Wrapper>
                )}
                {me && (
                  <Wrapper
                    width={`25%`}
                    color={`#575252`}
                    cursor={`pointer`}
                    color={`#fff`}
                    onClick={() => moveLinkHandler(`/user/mypage`)}>
                    마이페이지
                  </Wrapper>
                )}
                {!me && (
                  <Wrapper
                    width={`25%`}
                    cursor={`pointer`}
                    color={`#fff`}
                    onClick={() => moveLinkHandler(`/signup`)}>
                    {t(`3`)}
                  </Wrapper>
                )}

                <Wrapper
                  width={`25%`}
                  cursor={`pointer`}
                  color={`#fff`}
                  onClick={() => moveLinkHandler(`/support`)}>
                  {t(`18`)}
                </Wrapper>

                <Wrapper width={`25%`} cursor={`pointer`} color={`#fff`}>
                  <Combo
                    width={`110px`}
                    padding={`0`}
                    onMouseOver={() => setComboLanguage(true)}>
                    <ComboTitle color={`#fff`}>
                      <Wrapper fontSize={`13px`}>Language</Wrapper>
                      <CaretDownOutlined />
                    </ComboTitle>

                    <ComboList
                      isView={comboLanguage}
                      onClick={() => setComboLanguage(false)}>
                      <ComboListItem
                        bgColor={`#000`}
                        onClick={() => i18n.changeLanguage("en")}>
                        English
                      </ComboListItem>
                      <ComboListItem
                        bgColor={`#000`}
                        onClick={() => i18n.changeLanguage("ko")}>
                        한국어
                      </ComboListItem>
                    </ComboList>
                  </Combo>
                </Wrapper>
              </Wrapper>
            </WholeWrapper>
          }
          closable={false}
          placement={`left`}
          onClose={DrawToggle}
          visible={visible}
          width={`100%`}>
          <Wrapper al={`flex-start`}>
            <Wrapper
              dr={`row`}
              ju={`space-between`}
              borderBottom={`1px solid #efeaea`}
              padding={`10px 15px`}
              onClick={() => MobileSubMenuToggle(`1`)}
              cursor={`pointer`}>
              <Wrapper
                width={`auto`}
                cursor={`pointer`}
                onClick={() => MobileSubMenuToggle(`1`)}>
                {t(`5`)}
              </Wrapper>

              <Wrapper width={`auto`} cursor={`pointer`}>
                <CaretDownOutlined onClick={() => MobileSubMenuToggle(`1`)} />
              </Wrapper>
              {MobileSubMenu1 && (
                <Wrapper
                  al={`flex-start`}
                  padding={`4px 10px`}
                  cursor={`pointer`}>
                  <Wrapper
                    width={`auto`}
                    fontSize={`13px`}
                    onClick={(e) => {
                      e.stopPropagation();
                      moveLinkHandler(`/company/intro`);
                    }}>
                    • {t(`4`)}
                  </Wrapper>
                  <Wrapper
                    width={`auto`}
                    fontSize={`13px`}
                    onClick={(e) => {
                      e.stopPropagation();
                      moveLinkHandler(`/company/terms`);
                    }}>
                    • {t(`6`)}
                  </Wrapper>
                  <Wrapper
                    width={`auto`}
                    fontSize={`13px`}
                    onClick={(e) => {
                      e.stopPropagation();
                      moveLinkHandler(`/company/privacy`);
                    }}>
                    • {t(`7`)}
                  </Wrapper>
                </Wrapper>
              )}
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              borderBottom={`1px solid #efeaea`}
              padding={`10px 15px`}
              onClick={() => MobileSubMenuToggle(`2`)}
              cursor={`pointer`}>
              <Wrapper
                width={`auto`}
                cursor={`pointer`}
                onClick={() => MobileSubMenuToggle(`2`)}>
                {t(`9`)}
              </Wrapper>

              <Wrapper width={`auto`} cursor={`pointer`}>
                <CaretDownOutlined onClick={() => MobileSubMenuToggle(`2`)} />
              </Wrapper>
              {MobileSubMenu2 && (
                <Wrapper
                  al={`flex-start`}
                  padding={`4px 10px`}
                  cursor={`pointer`}>
                  <Wrapper
                    width={`auto`}
                    fontSize={`13px`}
                    onClick={(e) => {
                      e.stopPropagation();
                      moveLinkHandler(`/trading/forex`);
                    }}>
                    • Forex
                  </Wrapper>
                  <Wrapper
                    width={`auto`}
                    padding={`4px 0`}
                    fontSize={`13px`}
                    onClick={(e) => {
                      e.stopPropagation();
                      moveLinkHandler(`/trading/ecn`);
                    }}>
                    • ECN
                  </Wrapper>

                  <Wrapper
                    width={`auto`}
                    padding={`4px 0`}
                    fontSize={`13px`}
                    onClick={(e) => {
                      e.stopPropagation();
                      moveLinkHandler(`/trading/stp`);
                    }}>
                    • STP
                  </Wrapper>

                  <Wrapper
                    width={`auto`}
                    padding={`4px 0`}
                    fontSize={`13px`}
                    onClick={(e) => {
                      e.stopPropagation();
                      moveLinkHandler(`/trading/spread`);
                    }}>
                    • {t(`10`)}
                  </Wrapper>

                  <Wrapper
                    width={`auto`}
                    padding={`4px 0`}
                    fontSize={`13px`}
                    onClick={(e) => {
                      e.stopPropagation();
                      moveLinkHandler(`/trading/margin`);
                    }}>
                    • {t(`11`)}
                  </Wrapper>

                  <Wrapper
                    width={`auto`}
                    padding={`4px 0`}
                    fontSize={`13px`}
                    onClick={(e) => {
                      e.stopPropagation();
                      moveLinkHandler(`/trading/time`);
                    }}>
                    • {t(`13`)}
                  </Wrapper>
                </Wrapper>
              )}
            </Wrapper>

            <Wrapper
              dr={`row`}
              ju={`space-between`}
              padding={`10px 15px`}
              borderBottom={`1px solid #efeaea`}
              onClick={() => MobileSubMenuToggle(`3`)}
              cursor={`pointer`}>
              <Wrapper
                width={`auto`}
                cursor={`pointer`}
                onClick={() => MobileSubMenuToggle(`3`)}>
                {t(`14`)}
              </Wrapper>

              <Wrapper width={`auto`} cursor={`pointer`}>
                <CaretDownOutlined onClick={() => MobileSubMenuToggle(`3`)} />
              </Wrapper>
              {MobileSubMenu3 && (
                <Wrapper
                  al={`flex-start`}
                  padding={`4px 10px`}
                  cursor={`pointer`}>
                  <Wrapper
                    width={`auto`}
                    padding={`4px 0`}
                    fontSize={`13px`}
                    onClick={(e) => {
                      e.stopPropagation();
                      moveLinkHandler(`/platform/pc`);
                    }}>
                    • {t(`15`)}
                  </Wrapper>
                  <Wrapper
                    width={`auto`}
                    padding={`4px 0`}
                    fontSize={`13px`}
                    onClick={(e) => {
                      e.stopPropagation();
                      moveLinkHandler(`/platform/mobile`);
                    }}>
                    • {t(`16`)}
                  </Wrapper>
                </Wrapper>
              )}
            </Wrapper>

            <Wrapper
              al={`flex-start`}
              width={`100%`}
              cursor={`pointer`}
              padding={`10px 15px`}
              borderBottom={`1px solid #efeaea`}
              onClick={() => moveLinkHandler(`/support`)}>
              {t(`17`)}
            </Wrapper>

            <Wrapper
              al={`flex-start`}
              width={`100%`}
              padding={`10px 15px`}
              cursor={`pointer`}
              borderBottom={`1px solid #efeaea`}
              onClick={() => moveLinkHandler(`/support`)}>
              {t(`18`)}
            </Wrapper>
          </Wrapper>
        </MobileDrawer>
      </Wrapper>
      {/* mobile */}
      {/* <MobileRow justify={`center`} className={headerScroll && "background"}>
        <ColWrapper span={11} al={`flex-start`}>
          <ATag width={`auto`} href="/">
            <Image
              width={`110px`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/SOUL/assets/images/logo/logo_long_white.png`}
            />
          </ATag>
        </ColWrapper>
        <ColWrapper
          span={11}
          al={`flex-end`}
          fontSize={`2rem`}
          color={Theme.white_C}
        >
          <AlignRightOutlined onClick={drawarToggle} />
        </ColWrapper>

        {drawar && (
          <Drawer
            placement="right"
            closable={true}
            onClose={drawarToggle}
            visible={drawarToggle}
            getContainer={false}
          >
            <ColWrapper al={`flex-start`}>
              <ColWrapper
                fontSize={`1.2rem`}
                onClick={() => {
                  setSubMenu(0);
                }}
              >
                한의원 소개
              </ColWrapper>
              {subMenu === 0 && (
                <>
                  <ATag href="about" width={`auto`} color={`initial`}>
                    <ColWrapper margin={`5px 10px 20px`}>
                      의료진 소개 및 진료 시간표
                    </ColWrapper>
                  </ATag>
                </>
              )}
              <ColWrapper
                fontSize={`1.2rem`}
                onClick={() => {
                  setSubMenu(1);
                }}
              >
                진료 과목
              </ColWrapper>
              {subMenu === 1 && (
                <>
                  <ColWrapper margin={`5px 10px 0`}>
                    <Link href="/diagnosis?type=1">체질 의학</Link>
                  </ColWrapper>

                  <ColWrapper margin={`5px 10px 0`}>
                    <Link href="/diagnosis?type=2">소울 다이어트</Link>
                  </ColWrapper>
                  <ColWrapper margin={`5px 10px 0`}>
                    <Link href="/diagnosis?type=3">만성 난치 클리닉</Link>
                  </ColWrapper>
                  <ColWrapper margin={`5px 10px 20px`}>
                    <Link href="/diagnosis?type=4">통증 클리닉</Link>
                  </ColWrapper>
                </>
              )}
              <ATag width={`auto`} href="notice" color={`initial`}>
                <ColWrapper
                  fontSize={`1.2rem`}
                  onClick={() => {
                    setSubMenu(2);
                  }}
                >
                  공지사항
                </ColWrapper>
              </ATag>
              <ATag href="location" width={`auto`} color={`initial`}>
                <ColWrapper
                  fontSize={`1.2rem`}
                  onClick={() => {
                    setSubMenu(3);
                  }}
                >
                  오시는 길
                </ColWrapper>
              </ATag>
            </ColWrapper>
          </Drawer>
        )}
      </MobileRow> */}
    </>
  );
};

export default withResizeDetector(AppHeader);
