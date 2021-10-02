import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withResizeDetector } from "react-resize-detector";
import UserHeader from "./UserHeader";
import UserSide from "./UserSide";
import { Wrapper } from "../commonComponents";

const UserLayout = ({ children }) => {
  return (
    <section>
      {/* HEADER */}

      {/* content */}
      <Wrapper dr={`row`} al={`normal`} minHeight={`100vh`}>
        <Wrapper
          ju={`flex-start`}
          width={`250px`}
          bgColor={`#373737`}
          shadow={`3px 0px 5px #a39e9e`}
          zIndex={`9999`}
        >
          <UserSide />
        </Wrapper>

        <Wrapper
          ju={`flex-start`}
          width={`calc(100% - 250px)`}
          bgColor={`#f9f9f9`}
        >
          <UserHeader />
          {children}
        </Wrapper>
      </Wrapper>
    </section>
  );
};

UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withResizeDetector(UserLayout);
