import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import { Image, RsWrapper, Wrapper } from "../commonComponents";

const Container = styled(Wrapper)`
  width: 100%;
  height: 100vh;
  position: relative;

  & * {
    height: 100vh;
  }
`;

const MainBanner = styled(Wrapper)`
  width: 100%;
  position: relative;
  cursor: pointer;
  background: #000;
`;

const ImgArea = styled(Wrapper)`
  width: 100%;
  position: relative;
`;

const DescArea = styled(Wrapper)`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const DescTitle = styled(Wrapper)`
  height: auto;
  font-size: 60px;
  font-weight: 900;
  margin-bottom: 20px;
  color: ${(props) => props.theme.basicTheme_C};
  @media (max-width: 1000px) {
    font-size: 50px;
  }
  @media (max-width: 800px) {
    font-size: 30px;
  }
  @media (max-width: 700px) {
    font-size: 27px;
  }
`;

const DescContent = styled(Wrapper)`
  height: auto;
  font-size: 60px;
  font-weight: 900;
  margin-bottom: 20px;
  color: ${(props) => props.theme.basicTheme_C};
  @media (max-width: 1000px) {
    font-size: 50px;
  }
  @media (max-width: 800px) {
    font-size: 30px;
  }
  @media (max-width: 700px) {
    font-size: 27px;
  }
`;

const settings = {
  dots: false,
  infinite: true,
  speed: 2500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  pauseOnHover: false,
  autoplaySpeed: 6000,
  arrows: true,

  responsive: [
    {
      breakpoint: 700,
      settings: { dots: true },
    },
  ],
};

export default ({ width }) => {
  return (
    <Container>
      <Slider {...settings}>
        <MainBanner>1</MainBanner>

        <MainBanner>2</MainBanner>
      </Slider>
    </Container>
  );
};
