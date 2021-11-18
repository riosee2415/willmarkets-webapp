import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";
import AdminTop from "../../../components/admin/AdminTop";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import {
  LIVE_ACCOUNT_LIST_REQUEST,
  LIVE_ACCOUNT_UPDATE_PERMIT_REQUEST,
} from "../../../reducers/liveAccount";
import { Table, Button, message, Modal, notification, Input } from "antd";
import useInput from "../../../hooks/useInput";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter, withRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { Wrapper } from "../../../components/commonComponents";
import { numberWithCommas, emptyCheck } from "../../../components/commonUtils";
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

const Live = ({}) => {
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
    liveList,
    liveLen,
    st_liveAccountListError,
    st_liveAccountUpdatePermitDone,
    st_liveAccountUpdatePermitError,
  } = useSelector((state) => state.liveAccount);

  const [currentPage, setCurrentPage] = useState(1);

  const [toggleModal, setToggleModal] = useState(false);

  const [currentData, setCurrentData] = useState(null);

  const inputSearch = useInput("");
  const inputBankNo = useInput("");
  const inputTradePassword = useInput("");
  const inputViewPassword = useInput("");

  ////// USEEFFECT //////
  useEffect(() => {
    searchDataHandler();
  }, []);

  useEffect(() => {
    if (st_liveAccountListError) {
      return message.error(st_liveAccountListError);
    }
  }, [st_liveAccountListError]);

  useEffect(() => {
    if (st_liveAccountUpdatePermitDone) {
      dispatch({
        type: LIVE_ACCOUNT_LIST_REQUEST,
        data: {
          page: currentPage,
          search: inputSearch.value || ``,
        },
      });
      toggleModalHandler();
      inputBankNo.setValue("");
      inputTradePassword.setValue("");
      inputViewPassword.setValue("");

      message.success("정상적으로 처리되었습니다.");
    }
  }, [st_liveAccountUpdatePermitDone]);

  useEffect(() => {
    if (st_liveAccountUpdatePermitError) {
      message.error(st_liveAccountUpdatePermitError);
    }
  }, [st_liveAccountUpdatePermitError]);

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
        type: LIVE_ACCOUNT_LIST_REQUEST,
        data: {
          page: changePage,
          search: inputSearch.value || ``,
        },
      });
    },
    [currentPage]
  );

  const searchDataHandler = () => {
    dispatch({
      type: LIVE_ACCOUNT_LIST_REQUEST,
      data: {
        page: 1,
        search: inputSearch.value || ``,
      },
    });
  };

  const updatePermitHandler = () => {
    if (!emptyCheck(inputBankNo.value)) {
      return LoadNotification("ADMIN SYSTEM ERRLR", "계좌번호를 입력해주세요.");
    }
    if (!emptyCheck(inputViewPassword.value)) {
      return LoadNotification(
        "ADMIN SYSTEM ERRLR",
        "보기용 비밀번호를 입력해주세요"
      );
    }

    if (!emptyCheck(inputTradePassword.value)) {
      return LoadNotification(
        "ADMIN SYSTEM ERRLR",
        "거래용 비밀번호를 입력해주세요."
      );
    }

    dispatch({
      type: LIVE_ACCOUNT_UPDATE_PERMIT_REQUEST,
      data: {
        id: currentData.id,
        userId: currentData.User.id,
        bankNo: inputBankNo.value,
        viewPassword: inputViewPassword.value,
        radePassword: inputTradePassword.value,
      },
    });
  };

  ////// DATAVIEW //////
  const columns = [
    {
      width: 40,
      title: <Wrapper fontSize={`14px`}>번호</Wrapper>,
      fixed: "left",
      render: (data, _, idx) => (
        <Wrapper fontSize={`14px`}>
          {liveLen - ((currentPage - 1) * 10 + idx) + ""}
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
      width: 70,
      title: <Wrapper fontSize={`14px`}>이름</Wrapper>,
      fixed: "left",
      render: (data) => (
        <Wrapper fontSize={`14px`}>{data.User.username}</Wrapper>
      ),
    },
    {
      width: 100,
      title: <Wrapper fontSize={`14px`}>거래플랫폼</Wrapper>,
      render: (data) => <Wrapper fontSize={`14px`}>{data.platform}</Wrapper>,
    },
    {
      width: 100,
      title: <Wrapper fontSize={`14px`}>계좌유형</Wrapper>,
      render: (data) => <Wrapper fontSize={`14px`}>{data.type}</Wrapper>,
    },
    {
      width: 100,
      title: <Wrapper fontSize={`14px`}>레버리지</Wrapper>,
      render: (data) => <Wrapper fontSize={`14px`}>{data.leverage}</Wrapper>,
    },
    {
      width: 100,
      title: <Wrapper fontSize={`14px`}>계좌번호</Wrapper>,
      render: (data) => <Wrapper fontSize={`14px`}>{data.bankNo}</Wrapper>,
    },
    {
      width: 100,
      title: <Wrapper fontSize={`14px`}>상태</Wrapper>,
      fixed: "right",
      render: (data) => (
        <Wrapper dr={`row`} fontSize={`14px`}>
          <Wrapper
            width={`90px`}
            fontSize={`inherit`}
            color={data.isComplete ? `#0d24c4` : `#d62929`}>
            {data.isComplete ? `승인` : `승인대기`}
          </Wrapper>

          <Button
            type="primary"
            disabled={data.isComplete}
            onClick={() => toggleModalHandler(data)}>
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

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["입출금 관리", "라이브계좌 관리"]}
        title={`라이브계좌 리스트`}
        subTitle={`라이브계좌 신청한 목록을 확인할 수 있습니다.`}
      />
      {/* <AdminTop createButton={true} createButtonAction={() => {})} /> */}
      <AdminContent>
        <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 10px`}>
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
          columns={columns}
          dataSource={liveList ? liveList : []}
          size="small"
          scroll={{ x: 2000 }}
          pagination={{
            pageSize: 10,
            total: liveLen,
            onChange: (page) => otherPageCall(page),
          }}
        />
      </AdminContent>

      <Modal
        visible={toggleModal}
        width={`400px`}
        title={`승인`}
        onCancel={toggleModalHandler}
        onOk={updatePermitHandler}>
        <Wrapper padding={`20px`} al={`flex-start`}>
          <Wrapper
            al={`flex-start`}
            padding={`0 0 5px`}
            margin={`0 0 10px`}
            fontSize={`15px`}
            fontWeight={`500`}
            borderBottom={`1px solid #eee`}>
            해당 라이브계좌 신청을 승인하시겠습니까 ?
          </Wrapper>

          <Wrapper width={`auto`} fontSize={`14px`} margin={`8px 0 4px`}>
            계좌번호
          </Wrapper>
          <Input style={{ width: "100%" }} {...inputBankNo} />
          <Wrapper width={`auto`} fontSize={`14px`} margin={`8px 0 4px`}>
            보기용 비밀번호
          </Wrapper>
          <Input
            style={{ width: "100%" }}
            type={`password`}
            {...inputViewPassword}
          />
          <Wrapper width={`auto`} fontSize={`14px`} margin={`8px 0 4px`}>
            거래용 비밀번호
          </Wrapper>
          <Input
            style={{ width: "100%" }}
            type={`password`}
            {...inputTradePassword}
          />
        </Wrapper>
      </Modal>

      <Modal
        visible={false}
        onOk={() => {}}
        onCancel={() => {}}
        title="Ask"></Modal>
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

export default withRouter(Live);
