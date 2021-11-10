import React from "react";
import styled from "styled-components";
import { CaretDownOutlined } from "@ant-design/icons";

import {
  Wrapper,
  Image,
  TextInput,
  RadioInput,
  WholeWrapper,
  RsWrapper,
  Label,
} from "../../components/commonComponents";
import ClientLayout from "../../components/ClientLayout";
import SubBanner from "../../components/SubBanner";
import Theme from "../../components/Theme";

const SuportImage = styled(Image)`
  width: 100%;
  height: 500px;
  display: flex;
`;

const QnA = styled(Wrapper)`
  width: 425px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 50px 15px 60px;
  justify-content: center;
  margin: 0 0 15px 0;
`;

const QnAInput = styled(TextInput)`
  width: 70%;
  border-bottom: 1px solid rgba(227, 227, 227);
  border-top: none;
  border-right: none;
  border-left: none;

  &:focus {
    border-bottom: 1px solid blue;
  }
`;

const Support = () => {
  return (
    <ClientLayout>
      <Wrapper>
        <SuportImage
          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/banner/subbanner_consulting.png`}
        ></SuportImage>

        <Wrapper
          height={`500px`}
          bgColor={`rgba(0, 0, 0, 0.7)`}
          position={`absolute`}
        >
          <Wrapper
            color={`#fff`}
            margin={`30px 0 0 0`}
            fontSize={`40px`}
            fontWeight={`510`}
          >
            고객지원
          </Wrapper>
        </Wrapper>
      </Wrapper>
      <Wrapper bgColor={`#000105`} padding={`80px 0`}>
        <RsWrapper>
          <Wrapper color={`#3353f2`} fontSize={`28px`} fontWeight={`300`}>
            문의하기
          </Wrapper>

          <Wrapper
            color={`#fff`}
            margin={`22px 0 5px`}
            textAlign={`center`}
            fontSize={`20px`}
          >
            궁금하거나 불편하신 점이 있으시면 아래 정보를 입력 후 문의하시기
            바랍니다.
            <br />
            귀하를 지원하기 위해 최선을 다하는 Willmarkets이 되겠습니다.
          </Wrapper>

          <Wrapper dr={`row`} ju={`flex-start`} margin={`100px 0 0 0`}>
            <Wrapper dr={`row`} width={`60%`}>
              <Image
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/willmarkets/assets/images/consulting/image_consulting.png`}
              />
            </Wrapper>

            <Wrapper width={`40%`}>
              <Wrapper>
                <QnA>
                  <RsWrapper dr={`row`} margin={`15px 0`}>
                    <Label width={`20%`}>성명</Label>
                    <QnAInput></QnAInput>
                  </RsWrapper>
                  <RsWrapper dr={`row`} margin={`15px 0`}>
                    <Label width={`20%`}>연락처</Label>
                    <QnAInput></QnAInput>
                  </RsWrapper>
                  <RsWrapper dr={`row`} margin={`15px 0`}>
                    <Label width={`20%`}>이메일</Label>
                    <QnAInput></QnAInput>
                  </RsWrapper>
                  <RsWrapper dr={`row`} margin={`15px 0`}>
                    <Label width={`20%`}>문의내용</Label>
                    <QnAInput></QnAInput>
                  </RsWrapper>
                </QnA>
                <Wrapper dr={`row`}>
                  <RadioInput />
                  <Label fontWeight={`400`} width={`auto`} color={`gray`}>
                    개인정보 처리방침에 동의합니다.
                  </Label>
                  <CommonButton
                    margin={`0 50px 0 30px`}
                    radius={`5px`}
                    width={`45px`}
                    bgColor={`gray`}
                    color={`#fff`}
                    fontSize={`12px`}
                    padding={`0 0`}
                    fontWeight={`400`}
                  >
                    보기
                  </CommonButton>
                </Wrapper>
                <CommonButton
                  bgColor={`#3353f2`}
                  color={`#fff`}
                  fontWeight={`300`}
                  fontSize={`24px`}
                  padding={`6px 50px 8px`}
                  radius={`6px`}
                  margin={`50px 0 0 0`}
                >
                  문의하기
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </RsWrapper>
      </Wrapper>
    </ClientLayout>
  );
};

export default Support;
