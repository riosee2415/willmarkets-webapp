import React, { useState, useEffect, useCallback } from "react";
import {
  RsWrapper,
  Wrapper,
  Combo,
  ComboTitle,
  ComboList,
  ComboListItem,
} from "./commonComponents";
import styled from "styled-components";
import { useRouter } from "next/router";
import useInput from "../hooks/useInput";
import { CaretDownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const SubBanner = ({
  width,
  //
}) => {
  const { t } = useTranslation(["appHeader"]);

  const menuList = [
    {
      menuName: t(`5`),
      menuLink: "/company/intro",
      subMenu: [
        {
          subMenuName: t(`5`),
          subMenuLink: "/company/intro",
        },
        {
          subMenuName: t(`6`),
          subMenuLink: "/company/terms",
        },
        {
          subMenuName: t(`7`),
          subMenuLink: "/company/privacy",
        },
        {
          subMenuName: t(`8`),
          subMenuLink: "/company/moneyPolicy",
        },
      ],
    },
    {
      menuName: t(`9`),
      menuLink: "/trading/forex",
      subMenu: [
        {
          subMenuName: "Forex",
          subMenuLink: "/trading/forex",
        },
        {
          subMenuName: "ECN",
          subMenuLink: "/trading/ecn",
        },
        {
          subMenuName: "STP",
          subMenuLink: "/trading/stp",
        },
        {
          subMenuName: t(`10`),
          subMenuLink: "/trading/spread",
        },
        {
          subMenuName: t(`11`),
          subMenuLink: "/trading/margin",
        },
        {
          subMenuName: t(`12`),
          subMenuLink: "/trading/provider",
        },
        {
          subMenuName: t(`13`),
          subMenuLink: "/trading/time",
        },
      ],
    },
    {
      menuName: t(`14`),
      menuLink: "/platform/pc",
      subMenu: [
        {
          subMenuName: t(`15`),
          subMenuLink: "/platform/pc",
        },
        {
          subMenuName: t(`16`),
          subMenuLink: "/platform/mobile",
        },
      ],
    },
    {
      menuName: t(`18`),
      menuLink: "/support",
      subMenu: [
        {
          subMenuName: t(`18`),
          subMenuLink: "/support",
        },
      ],
    },
  ];

  const router = useRouter();

  const [comboMenu1, setComboMenu1] = useState(false);
  const [comboMenu2, setComboMenu2] = useState(false);

  const inputMenu1 = useInput("");
  const inputMenu2 = useInput("");

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  useEffect(() => {
    const menu = menuList.find(
      (data) =>
        data.subMenu.filter((data2) => data2.subMenuLink === router.pathname)
          .length > 0
    );

    if (menu) {
      inputMenu1.setValue(menu.menuName);
      inputMenu2.setValue(
        menu.subMenu.find((data) => data.subMenuLink === router.pathname)
          .subMenuName
      );
    }
  }, [router.pathname]);

  return (
    <Wrapper
      position={`relative`}
      height={`500px`}
      wrap={`nowrap`}
      bgImg={
        router.pathname.includes(`/company`)
          ? `url('https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/banner/subbanner_introduce.png')`
          : router.pathname.includes(`/trading`)
          ? `url('https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/banner/subbanner_trade.png')`
          : router.pathname.includes(`/platform`)
          ? `url('https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/banner/subbanner_download.png')`
          : router.pathname.includes(`/support`)
          ? `url('https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/banner/subbanner_consulting.png')`
          : null
      }>
      <Wrapper
        position={`absolute`}
        left={`0`}
        top={`0`}
        height={`100%`}
        bgColor={`rgba(0, 0, 0, 0.7)`}
        zIndex={`1`}></Wrapper>

      <RsWrapper position={`relative`}>
        <Wrapper
          position={`relative`}
          top={`20px`}
          width={`auto`}
          color={`#fff`}
          fontSize={`40px`}
          fontWeight={`500`}
          borderBottom={`2px solid #b12774`}
          lineHeight={`1.3`}
          zIndex={`2`}>
          {inputMenu2.value}
        </Wrapper>

        <Wrapper
          position={`absolute`}
          left={`0`}
          bottom={`20px`}
          dr={`row`}
          width={`auto`}>
          <Combo
            isBorder={true}
            itemAlign={`flex-start`}
            margin={`0 10px 0 0`}
            width={`150px`}
            height={`40px`}
            fontWeight={`500`}
            border={`1px solid #c45194`}
            shadow={`0 2px 8px rgb(0 0 0 / 9%)`}
            hoverBorder={`1px solid #ac5a8a`}
            hoverShadow={`0 3px 8px rgb(0 0 0 / 12%)`}
            onClick={() => setComboMenu1(!comboMenu1)}>
            <ComboTitle color={`#fff`}>
              <Wrapper>{inputMenu1.value}</Wrapper>
              <CaretDownOutlined />
            </ComboTitle>

            <ComboList isView={comboMenu1}>
              {menuList.map((data, idx) => {
                return (
                  <ComboListItem
                    key={idx}
                    isActive={inputMenu1.value === data.menuName}
                    onClick={() => moveLinkHandler(data.menuLink)}>
                    {data.menuName}
                  </ComboListItem>
                );
              })}
            </ComboList>
          </Combo>

          <Combo
            isBorder={true}
            itemAlign={`flex-start`}
            width={`180px`}
            height={`40px`}
            fontWeight={`500`}
            border={`1px solid #c45194`}
            shadow={`0 2px 8px rgb(0 0 0 / 9%)`}
            hoverBorder={`1px solid #ac5a8a`}
            hoverShadow={`0 3px 8px rgb(0 0 0 / 12%)`}
            onClick={() => setComboMenu2(!comboMenu2)}>
            <ComboTitle color={`#fff`}>
              <Wrapper>{inputMenu2.value}</Wrapper>
              <CaretDownOutlined />
            </ComboTitle>

            <ComboList isView={comboMenu2}>
              {inputMenu1.value &&
                menuList
                  .find((data) => data.menuName === inputMenu1.value)
                  .subMenu.map((data, idx) => {
                    return (
                      <ComboListItem
                        key={idx}
                        isActive={inputMenu2.value === data.subMenuName}
                        onClick={() => moveLinkHandler(data.subMenuLink)}>
                        {data.subMenuName}
                      </ComboListItem>
                    );
                  })}
            </ComboList>
          </Combo>
        </Wrapper>
      </RsWrapper>
    </Wrapper>
  );
};

export default SubBanner;
