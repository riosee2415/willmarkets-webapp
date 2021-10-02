import React, { useState, useEffect, useCallback } from "react";
import { Wrapper } from "../commonComponents";
import { withResizeDetector } from "react-resize-detector";
import styled from "styled-components";
import Theme from "../Theme";

const Combo = styled(Wrapper)``;

const ComboTitle = styled(Wrapper)``;

const ComboOption = styled(Wrapper)``;

const UserHeader = ({ children, width }) => {
  ////////////// - USE STATE- ///////////////

  ///////////// - EVENT HANDLER- ////////////

  ////////////// - USE EFFECT- //////////////
  return <Wrapper dr={`row`} ju={`flex-end`} height={`70px`}></Wrapper>;
};

export default withResizeDetector(UserHeader);
