import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import styled from "styled-components";
import { Result, message } from "antd";
import useInput from "../../../hooks/useInput";
import { emptyCheck } from "../../../components/commonUtils";
import {} from "@ant-design/icons";
import {
  ColWrapper,
  RowWrapper,
  Image,
  Wrapper,
  WholeWrapper,
  RsWrapper,
  CommonButton,
} from "../../../components/commonComponents";
import AdminLayout from "../../../components/AdminLayout";
import Theme from "../../../components/Theme";

const Demo = () => {
  return (
    <AdminLayout>
      <div>Hello Demo</div>
    </AdminLayout>
  );
};

export default Demo;
