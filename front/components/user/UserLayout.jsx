import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withResizeDetector } from "react-resize-detector";
import UserHeader from "./UserHeader";
import UserSide from "./UserSide";
import { Wrapper } from "../commonComponents";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";

const UserLayout = ({ children }) => {
  const width = useWidth();

  const router = useRouter();
  const query = router.query;

  return (
    <section>
      {/* HEADER */}

      {/* content */}
      <Wrapper dr={`row`} al={`normal`} minHeight={`100vh`}>
        <Wrapper
          position={width < 900 && `absolute`}
          left={width < 900 && query.menu === `1` ? `0` : `-260px`}
          top={width < 900 && `0`}
          ju={`flex-start`}
          width={`250px`}
          minHeight={`100vh`}
          bgColor={`#373737`}
          shadow={`3px 0px 5px #a39e9e`}
          zIndex={`99999`}
        >
          <UserSide />
        </Wrapper>

        <Wrapper
          ju={`flex-start`}
          width={width < 900 ? `100%` : `calc(100% - 250px)`}
          bgColor={`#f9f9f9`}
        >
          <UserHeader />

          <Wrapper
            position={`relative`}
            padding={width < 900 ? `20px 10px` : `20px`}
          >
            {children}
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </section>
  );
};

UserLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withResizeDetector(UserLayout);
