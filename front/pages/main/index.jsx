import React from "react";
import ClientLayout from "../../components/ClientLayout";
import { Row, Col } from "antd";
import styled from "styled-components";
import { withResizeDetector } from "react-resize-detector";

const CustomCol = styled(Col)`
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.rignt};
  z-index: ${(props) => props.zIndex};

  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};

  display: ${(props) => props.display || `flex`};
  flex-direction: ${(props) => props.dr || `column`};
  justify-content: ${(props) => props.ju || `center`};
  align-items: ${(props) => props.al || `center`};
  margin: ${(props) => props.margin};

  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background: ${(props) => props.bgColor};
  padding: ${(props) => props.padding};
`;

const CustomRow = styled(Row)`
  position: relative;
  height: 100vh;
`;

const Main = ({ width }) => {
  return (
    <ClientLayout>
      <CustomRow span={24} justify={`center`}>
        <CustomCol
          width={`100%`}
          position={`absolute`}
          top={`0`}
          left={`0`}
          bgColor={`rgba(0,0,0,0.4)`}
          height={`100vh`}
        ></CustomCol>

        <CustomCol
          position={`absolute`}
          top={`0`}
          left={`0`}
          zIndex={`-1`}
          width={`100%`}
          height={`100vh`}
        >
          <img
            width={`100%`}
            height={`100%`}
            src={
              width < 700
                ? `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SOUL%2Fassets%2Fimages%2Fbanner%2Fmobile_banner.png?alt=media&token=d00e8fd7-cae2-4709-9f4e-b4ee5d682f5b`
                : `https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SOUL%2Fassets%2Fimages%2Fbanner%2Fbanner.png?alt=media&token=c12d963d-f88f-4034-9392-524cac91ab39`
            }
          />
        </CustomCol>

        <CustomCol
          al={`flex-end`}
          width={width < 700 ? `100%` : `1100px`}
          padding={width < 700 ? `0 10px` : `0`}
        >
          <img
            width={width < 700 ? `300px` : `500px`}
            src={`https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/SOUL%2Fassets%2Fimages%2Flogo%2Flogo_banner.png?alt=media&token=f6175e08-75fa-405b-91a4-bcf82ea4e144`}
          />

          <CustomCol
            color={`rgb(255,255,255)`}
            fontSize={width < 700 ? `1.8rem` : `2.2rem`}
            fontWeight={`bold`}
            margin={`30px 0 20px`}
          >
            진심을 내건 소울 한의원
          </CustomCol>

          <CustomCol
            color={`rgb(255,255,255)`}
            fontSize={width < 700 ? `0.7rem` : `1.2rem`}
          >
            저희 소울 한의원은 대표 박정재 원장님과 공동대표 김주익 원장님의
          </CustomCol>
          <CustomCol
            color={`rgb(255,255,255)`}
            fontSize={width < 700 ? `0.7rem` : `1.2rem`}
          >
            가장 한의학다운 환자중심의 의료를 실현하는 공동 프로젝트입니다.
          </CustomCol>
          <CustomCol
            color={`rgb(255,255,255)`}
            fontSize={width < 700 ? `0.7rem` : `1.2rem`}
          >
            통합의학에 기반하여 진짜 한의학 개념을 환자와 함께 나눌 수 있는
            한의원,
          </CustomCol>
          <CustomCol
            color={`rgb(255,255,255)`}
            fontSize={width < 700 ? `0.7rem` : `1.2rem`}
          >
            이제 시작합니다.
          </CustomCol>
        </CustomCol>
      </CustomRow>
    </ClientLayout>
  );
};

export default withResizeDetector(Main);
