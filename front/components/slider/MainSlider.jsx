import React from "react";
import styled from "styled-components";
import { Image, RsWrapper, Wrapper, CommonButton } from "../commonComponents";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([Navigation]);

const Container = styled.div`
  width: 100%;
  position: relative;
`;

export default ({ width }) => {
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
                zIndex={`9999`}
              >
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/text_willmarkets.png`}
                />

                <Wrapper
                  width={`auto`}
                  color={`#fff`}
                  fontSize={`30px`}
                  fontWeight={`500`}
                  textAlign={`right`}
                  lineHeight={`1.4`}
                  borderBottom={`1px solid #92165c`}
                >
                  빠른 주문의 스프레드를
                  <br />
                  윌마켓에서 경험해보세요
                </Wrapper>

                <Wrapper dr={`row`} ju={`flex-end`} margin={`60px 0 0`}>
                  <CommonButton
                    kindOf={`pink`}
                    padding={`6px 0 8px`}
                    width={`180px`}
                    radius={`25px`}
                    fontSize={`18px`}
                    fontWeight={`700`}
                  >
                    실거래 계정 개설
                  </CommonButton>

                  <CommonButton
                    kindOf={`yellow`}
                    padding={`6px 0 8px`}
                    margin={`0 0 0 30px`}
                    width={`180px`}
                    radius={`25px`}
                    fontSize={`18px`}
                    fontWeight={`700`}
                  >
                    모의 계정 개설
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </RsWrapper>
          </Wrapper>
        </SwiperSlide>

        <SwiperSlide>
          <Wrapper position={`relative`} height={`100vh`}>
            <Wrapper position={`absolute`} left={`0`} top={`0`}>
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
                zIndex={`9999`}
              >
                <Image
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/main/text_grobal+stock.png`}
                />

                <Wrapper
                  width={`auto`}
                  color={`#fff`}
                  fontSize={`30px`}
                  fontWeight={`500`}
                  textAlign={`right`}
                  lineHeight={`1.4`}
                  borderBottom={`1px solid #92165c`}
                >
                  세계로 뻗어나가는 금융 시대에
                  <br />탑 기술자의 네트워크 연결
                </Wrapper>

                <Wrapper dr={`row`} ju={`flex-end`} margin={`60px 0 0`}>
                  <CommonButton
                    kindOf={`pink`}
                    padding={`6px 0 8px`}
                    width={`180px`}
                    radius={`25px`}
                    fontSize={`18px`}
                    fontWeight={`700`}
                  >
                    실거래 계정 개설
                  </CommonButton>

                  <CommonButton
                    kindOf={`yellow`}
                    padding={`6px 0 8px`}
                    margin={`0 0 0 30px`}
                    width={`180px`}
                    radius={`25px`}
                    fontSize={`18px`}
                    fontWeight={`700`}
                  >
                    모의 계정 개설
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
