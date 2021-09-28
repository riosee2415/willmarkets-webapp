import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import AdminMenu from "./admin/AdminMenu";
import styled from "styled-components";

const AdminCol = styled(Col)`
  height: 100vh;
  & .ant-menu-inline {
    height: 100%;
  }
`;

const AdminLayout = ({ children }) => {
  return (
    <Row>
      <AdminCol span={3}>
        <AdminMenu />
      </AdminCol>
      <Col span={21}>{children}</Col>
    </Row>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
