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

const SubBanner = ({
  width,
  //
}) => {
  const menuList = [
    {
      menuName: "회사소개",
      menuLink: "/company/intro",
      subMenu: [
        {
          subMenuName: "회사소개",
          subMenuLink: "/company/intro",
        },
        {
          subMenuName: "이용약관",
          subMenuLink: "/company/terms",
        },
        {
          subMenuName: "개인정보 보호정책",
          subMenuLink: "/company/privacy",
        },
      ],
    },
    {
      menuName: "트레이딩",
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
          subMenuName: "스프레드와 스왑",
          subMenuLink: "/trading/spread",
        },
        {
          subMenuName: "마진과 레버리지",
          subMenuLink: "/trading/margin",
        },
        {
          subMenuName: "호가 제공사",
          subMenuLink: "/trading/provider",
        },
      ],
    },
    {
      menuName: "거래플랫폼",
      menuLink: "/platform/pc",
      subMenu: [
        {
          subMenuName: "PC 버전",
          subMenuLink: "/platform/pc",
        },
        {
          subMenuName: "모바일 버전",
          subMenuLink: "/platform/mobile",
        },
      ],
    },
    {
      menuName: "고객지원",
      menuLink: "/support",
      subMenu: [
        {
          subMenuName: "고객지원",
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
      }
    >
      <Wrapper
        position={`absolute`}
        left={`0`}
        top={`0`}
        height={`100%`}
        bgColor={`rgba(0, 0, 0, 0.7)`}
        zIndex={`1`}
      ></Wrapper>

      <RsWrapper position={`relative`}>
        <Wrapper
          position={`relative`}
          top={`20px`}
          width={`auto`}
          color={`#fff`}
          fontSize={`38px`}
          borderBottom={`2px solid #b12774`}
          lineHeight={`1.3`}
          zIndex={`2`}
        >
          {inputMenu2.value}
        </Wrapper>

        <Wrapper
          position={`absolute`}
          left={`0`}
          bottom={`20px`}
          dr={`row`}
          width={`auto`}
        >
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
            onClick={() => setComboMenu1(!comboMenu1)}
          >
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
                    onClick={() => moveLinkHandler(data.menuLink)}
                  >
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
            onClick={() => setComboMenu2(!comboMenu2)}
          >
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
                        onClick={() => moveLinkHandler(data.subMenuLink)}
                      >
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
