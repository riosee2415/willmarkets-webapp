import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";
import AdminTop from "../../../components/admin/AdminTop";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import {
  DEPOSIT_LIST_REQUEST,
  DEPOSIT_UPDATE_PERMIT_REQUEST,
} from "../../../reducers/deposit";
import { Table, Button, message, Modal, notification, Input } from "antd";
import useInput from "../../../hooks/useInput";
import useOnlyNumberInput from "../../../hooks/useOnlyNumberInput";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter, withRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { Wrapper, TabWrapper, Tab } from "../../../components/commonComponents";
import { numberWithCommas, emptyCheck } from "../../../components/commonUtils";
import { saveAs } from "file-saver";
import moment from "moment";

const AdminContent = styled.div`
  padding: 20px;
`;

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const Deposit = ({}) => {
  // LOAD CURRENT INFO AREA /////////////////////////////////////////////
  const { me, st_loadMyInfoDone } = useSelector((state) => state.user);

  const router = useRouter();

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);

  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////
  const dispatch = useDispatch();

  const {
    depositList,
    depositLen,
    st_depositListError,
    st_depositUpdatePermitDone,
    st_depositUpdatePermitError,
  } = useSelector((state) => state.deposit);

  const [currentPage, setCurrentPage] = useState(1);

  const [currentTab, setCurrentTab] = useState(0);

  const [toggleModal, setToggleModal] = useState(false);

  const [currentData, setCurrentData] = useState(null);

  const inputSearch = useInput("");

  ////// USEEFFECT //////
  useEffect(() => {
    searchDataHandler();
  }, [currentTab]);

  useEffect(() => {
    if (st_depositListError) {
      return message.error(st_depositListError);
    }
  }, [st_depositListError]);

  useEffect(() => {
    if (st_depositUpdatePermitDone) {
      dispatch({
        type: DEPOSIT_LIST_REQUEST,
        data: {
          listType: currentTab === 0 ? 1 : 2,
          page: currentPage,
          search: inputSearch.value || ``,
        },
      });
      toggleModalHandler();

      message.success("정상적으로 처리되었습니다.");
    }
  }, [st_depositUpdatePermitDone]);

  useEffect(() => {
    if (st_depositUpdatePermitError) {
      message.error(st_depositUpdatePermitError);
    }
  }, [st_depositUpdatePermitError]);

  ////// TOGGLE //////
  const toggleModalHandler = (data) => {
    if (toggleModal) {
      setCurrentData(null);
    } else {
      setCurrentData(data);
    }
    setToggleModal(!toggleModal);
  };

  ////// HANDLER //////
  const otherPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);

      dispatch({
        type: DEPOSIT_LIST_REQUEST,
        data: {
          listType: currentTab === 0 ? 1 : 2,
          page: changePage,
          search: inputSearch.value || ``,
        },
      });
    },
    [currentPage]
  );

  const searchDataHandler = () => {
    dispatch({
      type: DEPOSIT_LIST_REQUEST,
      data: {
        listType: currentTab === 0 ? 1 : 2,
        page: 1,
        search: inputSearch.value || ``,
      },
    });
  };

  const updatePermitHandler = () => {
    dispatch({
      type: DEPOSIT_UPDATE_PERMIT_REQUEST,
      data: {
        id: currentData.id,
        userId: currentData.User.id,
      },
    });
  };

  const downloadFileHandler = useCallback(async (filePath, originName) => {
    if (!originName || originName === "-" || originName === "none") {
      return;
    }
    let blob = await fetch(filePath).then((r) => r.blob());

    const file = new Blob([blob]);

    saveAs(file, originName);
  }, []);

  ////// DATAVIEW //////

  const columns1 = [
    {
      width: 40,
      title: <Wrapper fontSize={`14px`}>번호</Wrapper>,
      fixed: "left",
      render: (data, _, idx) => (
        <Wrapper fontSize={`14px`}>
          {depositLen - ((currentPage - 1) * 10 + idx) + ""}
        </Wrapper>
      ),
    },
    {
      width: 70,
      title: <Wrapper fontSize={`14px`}>신청일</Wrapper>,
      fixed: "left",
      render: (data) => (
        <Wrapper fontSize={`14px`}>
          {moment(data.createdAt).format(`YYYY-MM-DD HH:mm:ss`)}
        </Wrapper>
      ),
    },
    {
      width: 80,
      title: <Wrapper fontSize={`14px`}>이름</Wrapper>,
      fixed: "left",
      render: (data) => (
        <Wrapper fontSize={`14px`}>{data.User.username}</Wrapper>
      ),
    },
    {
      width: 70,
      title: <Wrapper fontSize={`14px`}>은행명</Wrapper>,
      render: (data) => <Wrapper fontSize={`14px`}>{data.bankName}</Wrapper>,
    },
    {
      width: 70,
      title: <Wrapper fontSize={`14px`}>계좌번호</Wrapper>,
      render: (data) => <Wrapper fontSize={`14px`}>{data.bankNo}</Wrapper>,
    },
    {
      width: 70,
      title: <Wrapper fontSize={`14px`}>입금 계좌</Wrapper>,
      render: (data) => <Wrapper fontSize={`14px`}>{data.selectBank}</Wrapper>,
    },
    {
      width: 70,
      title: <Wrapper fontSize={`14px`}>입금 금액</Wrapper>,
      render: (data) => (
        <Wrapper fontSize={`14px`}>
          {numberWithCommas(String(data.price || 0))}
        </Wrapper>
      ),
    },
    {
      width: 80,
      title: <Wrapper fontSize={`14px`}>상태</Wrapper>,
      fixed: "right",
      render: (data) => (
        <Wrapper dr={`row`} fontSize={`14px`}>
          <Wrapper
            width={`90px`}
            fontSize={`inherit`}
            color={data.isComplete ? `#0d24c4` : `#d62929`}
          >
            {data.isComplete ? `승인` : `승인대기`}
          </Wrapper>

          <Button
            type="primary"
            disabled={data.isComplete}
            onClick={() => toggleModalHandler(data)}
          >
            승인
          </Button>
        </Wrapper>
      ),
    },
    {
      width: 70,
      title: <Wrapper fontSize={`14px`}>승인일</Wrapper>,
      fixed: "right",
      render: (data) => (
        <Wrapper fontSize={`14px`}>
          {data.isComplete &&
            moment(data.completedAt).format(`YYYY-MM-DD HH:mm:ss`)}
        </Wrapper>
      ),
    },
  ];

  const columns2 = [
    {
      width: 80,
      title: <Wrapper fontSize={`14px`}>번호</Wrapper>,
      render: (data, _, idx) => (
        <Wrapper fontSize={`14px`}>
          {depositLen - ((currentPage - 1) * 10 + idx) + ""}
        </Wrapper>
      ),
    },
    {
      width: 180,
      title: <Wrapper fontSize={`14px`}>등록일</Wrapper>,
      render: (data) => (
        <Wrapper fontSize={`14px`}>
          {moment(data.createdAt).format(`YYYY-MM-DD HH:mm:ss`)}
        </Wrapper>
      ),
    },
    {
      title: <Wrapper fontSize={`14px`}>이름</Wrapper>,
      render: (data) => (
        <Wrapper fontSize={`14px`}>{data.User.username}</Wrapper>
      ),
    },
    {
      width: 150,
      title: <Wrapper fontSize={`14px`}>첨부파일</Wrapper>,
      render: (data) => (
        <Wrapper dr={`row`} fontSize={`14px`}>
          <Button
            type="primary"
            onClick={() =>
              downloadFileHandler(data.filePath, data.fileOriginName)
            }
          >
            다운로드
          </Button>
        </Wrapper>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["입출금 관리", "입금 관리"]}
        title={`입금 리스트`}
        subTitle={`입금 신청한 목록을 확인할 수 있습니다.`}
      />
      {/* <AdminTop createButton={true} createButtonAction={() => {})} /> */}
      <AdminContent>
        <TabWrapper>
          <Tab isActive={currentTab === 0} onClick={() => setCurrentTab(0)}>
            입금정보
          </Tab>

          <Tab isActive={currentTab === 1} onClick={() => setCurrentTab(1)}>
            입금 영수내역
          </Tab>
        </TabWrapper>

        <Wrapper dr={`row`} ju={`space-between`} margin={`15px 0 10px`}>
          <Input.Group compact style={{ width: `auto` }}>
            <Input
              style={{ width: "280px" }}
              placeholder="이름"
              {...inputSearch}
              onKeyDown={(e) => e.keyCode === 13 && searchDataHandler()}
            />

            <Button onClick={searchDataHandler}>
              <SearchOutlined />
              검색
            </Button>
          </Input.Group>
        </Wrapper>

        <Table
          rowKey="id"
          columns={currentTab === 0 ? columns1 : columns2}
          dataSource={depositList ? depositList : []}
          size="small"
          scroll={currentTab === 0 ? { x: 2000 } : null}
          pagination={{
            pageSize: 10,
            total: depositLen,
            onChange: (page) => otherPageCall(page),
          }}
        />
      </AdminContent>

      <Modal
        visible={toggleModal}
        width={`400px`}
        title={`승인`}
        onCancel={toggleModalHandler}
        onOk={updatePermitHandler}
      >
        <Wrapper padding={`20px`} al={`flex-start`}>
          <Wrapper al={`flex-start`} fontSize={`15px`} fontWeight={`500`}>
            해당 입금신청을 승인하시겠습니까 ?
          </Wrapper>
        </Wrapper>
      </Modal>

      <Modal
        visible={false}
        onOk={() => {}}
        onCancel={() => {}}
        title="Ask"
      ></Modal>
    </AdminLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Deposit);
