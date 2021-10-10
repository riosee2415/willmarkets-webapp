import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";
import AdminTop from "../../../components/admin/AdminTop";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import {
  QUESTION_LIST_REQUEST,
  QUESTION_UPDATE_COMPLETE_REQUEST,
} from "../../../reducers/question";
import { Table, Button, message, Modal, notification, Input } from "antd";
import useInput from "../../../hooks/useInput";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter, withRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { Wrapper, TabWrapper, Tab } from "../../../components/commonComponents";
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

const QuestionList = ({}) => {
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
    questionList,
    questionLen,
    st_questionListError,
    st_questionUpdateCompleteDone,
    st_questionUpdateCompleteError,
  } = useSelector((state) => state.question);

  const [currentTab, setCurrentTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [toggleModal, setToggleModal] = useState(false);

  const [currentData, setCurrentData] = useState(null);

  const inputSearch = useInput("");

  ////// USEEFFECT //////
  useEffect(() => {
    searchDataHandler();
  }, [currentTab]);

  useEffect(() => {
    if (st_questionListError) {
      return message.error(st_questionListError);
    }
  }, [st_questionListError]);

  useEffect(() => {
    if (st_questionUpdateCompleteDone) {
      dispatch({
        type: QUESTION_LIST_REQUEST,
        data: {
          listType: currentTab === 0 ? `1` : currentTab === 1 ? `2` : `3`,
          page: currentPage,
          search: inputSearch.value || ``,
        },
      });
      toggleModalHandler();

      message.success("정상적으로 처리되었습니다.");
    }
  }, [st_questionUpdateCompleteDone]);

  useEffect(() => {
    if (st_questionUpdateCompleteError) {
      message.error(st_questionUpdateCompleteError);
    }
  }, [st_questionUpdateCompleteError]);

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
        type: QUESTION_LIST_REQUEST,
        data: {
          listType: currentTab === 0 ? `1` : currentTab === 1 ? `2` : `3`,
          page: changePage,
          search: inputSearch.value || ``,
        },
      });
    },
    [currentPage]
  );

  const searchDataHandler = () => {
    dispatch({
      type: QUESTION_LIST_REQUEST,
      data: {
        listType: currentTab === 0 ? `1` : currentTab === 1 ? `2` : `3`,
        page: 1,
        search: inputSearch.value || ``,
      },
    });
  };

  const updateCompleteHandler = () => {
    dispatch({
      type: QUESTION_UPDATE_COMPLETE_REQUEST,
      data: {
        id: currentData.id,
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
          {questionLen - ((currentPage - 1) * 10 + idx) + ""}
        </Wrapper>
      ),
    },
    {
      width: 80,
      title: <Wrapper fontSize={`14px`}>등록일</Wrapper>,
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
      render: (data) => <Wrapper fontSize={`14px`}>{data.name}</Wrapper>,
    },
    {
      width: 100,
      title: <Wrapper fontSize={`14px`}>연락처</Wrapper>,
      render: (data) => <Wrapper fontSize={`14px`}>{data.mobile}</Wrapper>,
    },
    {
      width: 100,
      title: <Wrapper fontSize={`14px`}>이메일</Wrapper>,
      render: (data) => <Wrapper fontSize={`14px`}>{data.email}</Wrapper>,
    },
    {
      width: 200,
      title: (
        <Wrapper al={`flex-start`} padding={`0 10px`} fontSize={`14px`}>
          문의 내용
        </Wrapper>
      ),
      render: (data) => (
        <Wrapper al={`flex-start`} padding={`0 10px`} fontSize={`14px`}>
          {data.content.split(`\n`).map((content) => {
            return (
              <Wrapper width={`auto`} fontSize={`inherit`}>
                {content}
              </Wrapper>
            );
          })}
        </Wrapper>
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
            {data.isComplete ? `처리` : `처리대기`}
          </Wrapper>

          <Button
            type="primary"
            disabled={data.isComplete}
            onClick={() => toggleModalHandler(data)}
          >
            처리
          </Button>
        </Wrapper>
      ),
    },
    {
      width: 70,
      title: <Wrapper fontSize={`14px`}>처리일</Wrapper>,
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
        breadcrumbs={["문의 관리", "문의 리스트"]}
        title={`문의 리스트`}
        subTitle={`문의 등록한 목록을 확인할 수 있습니다.`}
      />
      {/* <AdminTop createButton={true} createButtonAction={() => {})} /> */}
      <AdminContent>
        <TabWrapper margin={`0 0 10px`}>
          <Tab isActive={currentTab === 0} onClick={() => setCurrentTab(0)}>
            전체
          </Tab>

          <Tab isActive={currentTab === 1} onClick={() => setCurrentTab(1)}>
            미처리
          </Tab>

          <Tab isActive={currentTab === 2} onClick={() => setCurrentTab(2)}>
            처리
          </Tab>
        </TabWrapper>

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
          dataSource={questionList ? questionList : []}
          size="small"
          scroll={{ x: 2000 }}
          pagination={{
            pageSize: 10,
            total: questionLen,
            onChange: (page) => otherPageCall(page),
          }}
        />
      </AdminContent>

      <Modal
        visible={toggleModal}
        width={`400px`}
        title={`처리`}
        onCancel={toggleModalHandler}
        onOk={updateCompleteHandler}
      >
        <Wrapper padding={`20px`} al={`flex-start`}>
          <Wrapper al={`flex-start`} fontSize={`15px`} fontWeight={`500`}>
            해당 문의사항을 처리완료 하시겠습니까 ?
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

export default withRouter(QuestionList);
