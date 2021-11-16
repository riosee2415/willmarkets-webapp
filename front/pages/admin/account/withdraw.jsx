import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";
import AdminTop from "../../../components/admin/AdminTop";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import {
  WITHDRAW_LIST_REQUEST,
  WITHDRAW_UPDATE_PERMIT_REQUEST,
} from "../../../reducers/withdraw";
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
import { CopyToClipboard } from "react-copy-to-clipboard";

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

const Withdraw = ({}) => {
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
    withdrawList,
    withdrawLen,
    st_withdrawListError,
    st_withdrawUpdatePermitDone,
    st_withdrawUpdatePermitError,
  } = useSelector((state) => state.withdraw);

  const [currentPage, setCurrentPage] = useState(1);

  const [toggleModal, setToggleModal] = useState(false);

  const [currentData, setCurrentData] = useState(null);

  const inputSearch = useInput("");

  ////// USEEFFECT //////
  useEffect(() => {
    searchDataHandler();
  }, []);

  useEffect(() => {
    if (st_withdrawListError) {
      return message.error(st_withdrawListError);
    }
  }, [st_withdrawListError]);

  useEffect(() => {
    if (st_withdrawUpdatePermitDone) {
      dispatch({
        type: WITHDRAW_LIST_REQUEST,
        data: {
          page: currentPage,
          search: inputSearch.value || ``,
        },
      });
      toggleModalHandler();

      message.success("정상적으로 처리되었습니다.");
    }
  }, [st_withdrawUpdatePermitDone]);

  useEffect(() => {
    if (st_withdrawUpdatePermitError) {
      message.error(st_withdrawUpdatePermitError);
    }
  }, [st_withdrawUpdatePermitError]);

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
        type: WITHDRAW_LIST_REQUEST,
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
      type: WITHDRAW_LIST_REQUEST,
      data: {
        page: 1,
        search: inputSearch.value || ``,
      },
    });
  };

  const updatePermitHandler = () => {
    dispatch({
      type: WITHDRAW_UPDATE_PERMIT_REQUEST,
      data: {
        id: currentData.id,
        userId: currentData.User.id,
      },
    });
  };

  const copyHashWalletHandler = (text, result, msg) => {
    if (result) {
      message.success(msg);
    }
  };

  ////// DATAVIEW //////

  const columns = [
    {
      width: 40,
      title: <Wrapper fontSize={`14px`}>번호</Wrapper>,
      fixed: "left",
      render: (data, _, idx) => (
        <Wrapper fontSize={`14px`}>
          {withdrawLen - ((currentPage - 1) * 10 + idx) + ""}
        </Wrapper>
      ),
    },
    {
      width: 90,
      title: <Wrapper fontSize={`14px`}>신청일</Wrapper>,
      fixed: "left",
      render: (data) => (
        <Wrapper fontSize={`14px`}>
          {moment(data.createdAt).format(`YYYY-MM-DD HH:mm:ss`)}
        </Wrapper>
      ),
    },
    {
      width: 100,
      title: <Wrapper fontSize={`14px`}>이름</Wrapper>,
      fixed: "left",
      render: (data) => (
        <Wrapper fontSize={`14px`}>{data.User.username}</Wrapper>
      ),
    },
    {
      width: 130,
      title: <Wrapper fontSize={`14px`}>주소</Wrapper>,
      render: (data) => (
        <Wrapper
          fontSize={`14px`}
        >{`${data.User.address} ${data.User.detailAddress}`}</Wrapper>
      ),
    },
    // {
    //   width: 80,
    //   title: <Wrapper fontSize={`14px`}>출금은행</Wrapper>,
    //   render: (data) => <Wrapper fontSize={`14px`}>{data.bankName}</Wrapper>,
    // },
    // {
    //   width: 80,
    //   title: <Wrapper fontSize={`14px`}>계좌번호</Wrapper>,
    //   render: (data) => <Wrapper fontSize={`14px`}>{data.bankNo}</Wrapper>,
    // },
    // {
    //   width: 80,
    //   title: <Wrapper fontSize={`14px`}>Swift Code</Wrapper>,
    //   render: (data) => <Wrapper fontSize={`14px`}>{data.swiftCode}</Wrapper>,
    // },
    // {
    //   width: 130,
    //   title: <Wrapper fontSize={`14px`}>은행 주소</Wrapper>,
    //   render: (data) => <Wrapper fontSize={`14px`}>{data.bankAddress}</Wrapper>,
    // },
    {
      width: 80,
      title: <Wrapper fontSize={`14px`}>출금 계좌</Wrapper>,
      render: (data) => <Wrapper fontSize={`14px`}>{data.selectBank}</Wrapper>,
    },
    {
      width: 80,
      title: <Wrapper fontSize={`14px`}>암호 화폐</Wrapper>,
      render: (data) => <Wrapper fontSize={`14px`}>{data.priceType}</Wrapper>,
    },
    {
      width: 80,
      title: <Wrapper fontSize={`14px`}>월릿 주소</Wrapper>,
      render: (data) => (
        <Wrapper fontSize={`14px`}>
          <CopyToClipboard
            text={`${data.walletAddress}`}
            onCopy={(text, result) =>
              copyHashWalletHandler(text, result, `월릿주소가 복사되었습니다.`)
            }
          >
            <Button type="primary">복사</Button>
          </CopyToClipboard>
        </Wrapper>
      ),
    },
    {
      width: 80,
      title: <Wrapper fontSize={`14px`}>출금 금액</Wrapper>,
      render: (data) => (
        <Wrapper fontSize={`14px`}>{parseFloat(data.price).toFixed(2)}</Wrapper>
      ),
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
      width: 90,
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
        breadcrumbs={["입출금 관리", "출금 관리"]}
        title={`출금 리스트`}
        subTitle={`출금 신청한 목록을 확인할 수 있습니다.`}
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
          dataSource={withdrawList ? withdrawList : []}
          size="small"
          scroll={{ x: 2000 }}
          pagination={{
            pageSize: 10,
            total: withdrawLen,
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
            해당 출금신청을 승인하시겠습니까 ?
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

export default withRouter(Withdraw);
