import React from "react";
import styled from "styled-components";
import { Image, RsWrapper, Wrapper, CommonButton } from "../commonComponents";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import { DoubleRightOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

SwiperCore.use([Navigation]);

const Container = styled.div`
  width: 100%;
  position: relative;
`;

export default ({ width }) => {
  const router = useRouter();

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
        autoplay>
        <SwiperSlide>
          <Wrapper position={`relative`} height={`100vh`}>
            <Wrapper position={`absolute`} left={`0`} top={`0`} height={`100%`}>
              <Image
                width={`100%`}
                height={`100%`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/main_banner01.png`}
              />
            </Wrapper>

            <RsWrapper position={`relative`}>
              <Wrapper
                al={`flex-end`}
                position={`absolute`}
                top={`50px`}
                right={`0`}
                width={`auto`}
                height={`100%`}
                zIndex={`9999`}>
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/text_willmarkets.png`}
                />

                <Wrapper
                  width={`auto`}
                  color={`#fff`}
                  fontSize={`30px`}
                  fontWeight={`500`}
                  textAlign={`right`}
                  lineHeight={`1.4`}>
                  {t(`1`).split(`\n`)[0]}
                  <br />
                  {t(`1`).split(`\n`)[1]}
                </Wrapper>

                <Wrapper dr={`row`} ju={`flex-end`} margin={`60px 0 0`}>
                  <CommonButton
                    kindOf={`pink`}
                    padding={`10px 0 12px`}
                    width={`200px`}
                    radius={`30px`}
                    fontSize={`18px`}
                    fontWeight={`700`}
                    onClick={() => moveLinkHandler(`/signup`)}>
                    {t(`2`)}
                    <Wrapper
                      position={`absolute`}
                      right={`15px`}
                      top={`50%`}
                      margin={`-7px 0 0 0`}
                      width={`auto`}>
                      <DoubleRightOutlined />
                    </Wrapper>
                  </CommonButton>

                  <CommonButton
                    kindOf={`yellow`}
                    margin={`0 0 0 30px`}
                    padding={`10px 0 12px`}
                    width={`200px`}
                    radius={`30px`}
                    fontSize={`18px`}
                    fontWeight={`700`}
                    onClick={() => moveLinkHandler(`/signup`)}>
                    {t(`3`)}
                    <Wrapper
                      position={`absolute`}
                      right={`23px`}
                      top={`50%`}
                      margin={`-7px 0 0 0`}
                      width={`auto`}>
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
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/main_banner02.png`}
              />
            </Wrapper>

            <RsWrapper position={`relative`}>
              <Wrapper
                al={`flex-end`}
                position={`absolute`}
                top={`50px`}
                right={`0`}
                width={`auto`}
                height={`100%`}
                zIndex={`9999`}>
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/text_grobal+stock.png`}
                />

                <Wrapper
                  width={`auto`}
                  color={`#fff`}
                  fontSize={`30px`}
                  fontWeight={`500`}
                  textAlign={`right`}
                  lineHeight={`1.4`}>
                  {t(`4`).split(`\n`)[0]}
                  <br />
                  {t(`4`).split(`\n`)[1]}
                </Wrapper>

                <Wrapper dr={`row`} ju={`flex-end`} margin={`60px 0 0`}>
                  <CommonButton
                    kindOf={`pink`}
                    padding={`10px 0 12px`}
                    width={`200px`}
                    radius={`30px`}
                    fontSize={`18px`}
                    fontWeight={`700`}
                    onClick={() => moveLinkHandler(`/signup`)}>
                    {t(`2`)}
                    <Wrapper
                      position={`absolute`}
                      right={`15px`}
                      top={`50%`}
                      margin={`-7px 0 0 0`}
                      width={`auto`}>
                      <DoubleRightOutlined />
                    </Wrapper>
                  </CommonButton>

                  <CommonButton
                    kindOf={`yellow`}
                    margin={`0 0 0 30px`}
                    padding={`10px 0 12px`}
                    width={`200px`}
                    radius={`30px`}
                    fontSize={`18px`}
                    fontWeight={`700`}
                    onClick={() => moveLinkHandler(`/signup`)}>
                    {t(`3`)}
                    <Wrapper
                      position={`absolute`}
                      right={`23px`}
                      top={`50%`}
                      margin={`-7px 0 0 0`}
                      width={`auto`}>
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
