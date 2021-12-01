import React from "react";
import styled from "styled-components";
import { Image, RsWrapper, Wrapper, CommonButton } from "../commonComponents";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import { DoubleRightOutlined, WindowsFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import useWidth from "../../hooks/useWidth";
import i18next from "i18next";
SwiperCore.use([Navigation]);

const Container = styled.div`
  width: 100%;
  position: relative;
`;

export default () => {
  const router = useRouter();

  const width = useWidth();

  const { t } = useTranslation(["mainSlider"]);

  const moveLinkHandler = (link) => {
    router.push(link);
  };

  return (
    <Container>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        slidesPerGroup={1}
        slidesPerColumn={1}
        slidesPerColumnFill={"row"}
        navigation={false}
        grabCursor={true}
        loop
        autoplay
      >
        <SwiperSlide>
          <Wrapper position={`relative`} height={`100vh`}>
            <Wrapper position={`absolute`} left={`0`} top={`0`} height={`100%`}>
              <Image
                width={`100%`}
                height={`100%`}
                objectPosition={width < 400 ? `53%` : `50%`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/main_banner01.png`}
              />
            </Wrapper>

            <RsWrapper position={`relative`}>
              <Wrapper
                al={`flex-end`}
                position={`absolute`}
                top={width < 700 ? `-60px` : `50px`}
                right={`0`}
                width={width < 800 ? `340px` : `auto`}
                height={`100%`}
                zIndex={`9999`}
                padding={width < 800 ? `0 20px 0 0` : `0`}
              >
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/text_willmarkets.png`}
                />

                <Wrapper
                  al={`flex-end`}
                  width={width < 800 ? `300px` : `auto`}
                  color={`#fff`}
                  fontSize={width < 800 ? `23px` : `30px`}
                  fontWeight={`500`}
                  textAlign={`right`}
                  lineHeight={`1.4`}
                  margin={width < 800 ? `30px 0 0` : `0`}
                >
                  {t(`1`).split(`\n`)[0]}
                  <br />
                  {t(`1`).split(`\n`)[1]}
                </Wrapper>

                <Wrapper
                  dr={width < 800 ? `column` : `row`}
                  ju={`flex-end`}
                  margin={width < 800 ? `60px -60px 0 0` : `60px 0`}
                >
                  <CommonButton
                    kindOf={`blue1`}
                    padding={`10px 0 12px`}
                    width={`200px`}
                    radius={`30px`}
                    fontSize={`18px`}
                    fontWeight={`700`}
                    onClick={() =>
                      // moveLinkHandler(`/signup`)
                      window.open(`https://clients.will-markets.com`)
                    }
                    margin={width < 800 ? `0 0 10px` : `0`}
                  >
                    {t(`2`)}
                    <Wrapper
                      position={`absolute`}
                      right={`15px`}
                      top={`50%`}
                      margin={`-7px 0 0 0`}
                      width={`auto`}
                    >
                      <DoubleRightOutlined />
                    </Wrapper>
                  </CommonButton>

                  <CommonButton
                    kindOf={`Skyblue`}
                    margin={width < 800 ? `10px 0 0 0` : `0 0 0 30px`}
                    padding={`10px 0 12px`}
                    width={`200px`}
                    radius={`30px`}
                    fontSize={`18px`}
                    fontWeight={`700`}
                    onClick={() =>
                      // moveLinkHandler(`/signup`)
                      window.open(`https://clients.will-markets.com`)
                    }
                  >
                    {t(`3`)}
                    <Wrapper
                      position={`absolute`}
                      right={i18next.language === "en" ? `13px` : `23px`}
                      top={`50%`}
                      margin={`-7px 0 0 0`}
                      width={`auto`}
                    >
                      <DoubleRightOutlined />
                    </Wrapper>
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </RsWrapper>
          </Wrapper>
        </SwiperSlide>

        <SwiperSlide>
          <Wrapper position={`relative`} height={`100vh`}>
            <Wrapper position={`absolute`} left={`0`} top={`0`} height={`100%`}>
              <Image
                width={`100%`}
                height={`100%`}
                objectPosition={width < 400 ? `53%` : `50%`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/main_banner02.png`}
              />
            </Wrapper>

            <RsWrapper position={`relative`}>
              <Wrapper
                al={`flex-end`}
                position={`absolute`}
                top={width < 700 ? `-25px` : `50px`}
                right={`0`}
                width={width < 800 ? `340px` : `auto`}
                height={`100%`}
                zIndex={`9999`}
                padding={width < 800 ? `0 20px 0 0` : `0`}
              >
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/text_grobal+stock.png`}
                />

                <Wrapper
                  al={`flex-end`}
                  width={width < 800 ? `300px` : `auto`}
                  color={`#fff`}
                  fontSize={width < 800 ? `23px` : `30px`}
                  fontWeight={`500`}
                  textAlign={`right`}
                  lineHeight={`1.4`}
                  margin={width < 800 ? `30px 0 0` : `0`}
                >
                  {t(`4`).split(`\n`)[0]}
                  <br />
                  {t(`4`).split(`\n`)[1]}
                </Wrapper>

                <Wrapper
                  position={`relative`}
                  dr={width < 800 ? `column` : `row`}
                  ju={`flex-end`}
                  margin={width < 800 ? `60px -60px 0 0` : `60px 0 0`}
                >
                  <CommonButton
                    position={`relative`}
                    kindOf={`blue`}
                    padding={`10px 0 12px`}
                    width={`200px`}
                    radius={`30px`}
                    fontSize={`18px`}
                    fontWeight={`700`}
                    onClick={() =>
                      // moveLinkHandler(`/signup`)
                      window.open(`https://clients.will-markets.com`)
                    }
                    margin={width < 800 ? `0 0 10px` : `0`}
                  >
                    {t(`2`)}
                    <Wrapper
                      position={`absolute`}
                      right={`15px`}
                      top={`50%`}
                      margin={`-7px 0 0 0`}
                      width={`auto`}
                    >
                      <DoubleRightOutlined />
                    </Wrapper>
                  </CommonButton>

                  <CommonButton
                    position={`relative`}
                    kindOf={`Skyblue1`}
                    margin={width < 800 ? `10px 0 0 0` : `0 0 0 30px`}
                    padding={`10px 0 12px`}
                    width={`200px`}
                    radius={`30px`}
                    fontSize={`18px`}
                    fontWeight={`700`}
                    onClick={() =>
                      // moveLinkHandler(`/signup`)
                      window.open(`https://clients.will-markets.com`)
                    }
                  >
                    {t(`3`)}
                    <Wrapper
                      position={`absolute`}
                      right={i18next.language === `en` ? `13px` : `23px`}
                      top={`50%`}
                      margin={`-7px 0 0 0`}
                      width={`auto`}
                    >
                      <DoubleRightOutlined />
                    </Wrapper>
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </RsWrapper>
          </Wrapper>
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};
