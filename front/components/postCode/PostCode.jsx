import React from "react";
import DaumPostCode from "react-daum-postcode";
import { Wrapper } from "../commonComponents";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import styled from "styled-components";

const PostCodeModal = styled(Modal)`
  & .ant-modal-close,
  & .ant-modal-footer {
    display: none;
  }
  top: 50%;
  margin-top: -215px;
`;

const style = {
  overflow: "hidden",
};

const PostCode = ({
  width,
  //
  isVisible,
  //
  toggleModalHandler,
  onCompleteHandler,
}) => {
  if (!isVisible) return null;

  return (
    <PostCodeModal visible={isVisible}>
      <Wrapper
        height={`32px`}
        al={`flex-end`}
        padding={`0 10px`}
        bgColor={`#eee`}
      >
        <Wrapper width={`auto`} cursor={`pointer`}>
          <CloseOutlined size={18} onClick={() => toggleModalHandler()} />
        </Wrapper>
      </Wrapper>

      <DaumPostCode
        onComplete={onCompleteHandler}
        width={width < 600 ? `100%` : `600px`}
        height={`450px`}
        autoClose
        animation
        style={style}
      />
    </PostCodeModal>
  );
};

export default PostCode;
