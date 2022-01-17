import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";
import AdminTop from "../../../components/admin/AdminTop";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_MY_INFO_REQUEST,
  USER_LIST_REQUEST,
  USER_UPDATE_PRICE_REQUEST,
  USER_UPDATE_PERMIT_REQUEST,
} from "../../../reducers/user";
import {
  Table,
  Button,
  message,
  Modal,
  notification,
  Input,
  Select,
} from "antd";
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

const { Option } = Select;

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

const UserList = ({}) => {
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

  const platformList = ["MetaTrader 4", "MetaTrader 5"];

  const typeList = [
    {
      type: "STP Account",
      leverage: ["100:1", "200:1", "500:1"],
    },
    {
      type: "ECN Account",
      leverage: ["100:1", "200:1", "500:1"],
    },
  ];

  ////// HOOKS //////
  const dispatch = useDispatch();

  const {
    userList,
    userLen,
    st_userListError,
    st_userUpdatePriceDone,
    st_userUpdatePriceError,
    st_userUpdatePermitDone,
    st_userUpdatePermitError,
  } = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);

  const [currentTab1, setCurrentTab1] = useState(0);
  const [currentTab2, setCurrentTab2] = useState(0);

  const [toggleModal, setToggleModal] = useState(false);
  const [toggleModal2, setToggleModal2] = useState(false);
  const [toggleModal3, setToggleModal3] = useState(false);

  const [currentData, setCurrentData] = useState(null);

  const inputSearch = useInput("");
  const inputPrice = useInput("");

  const inputPlatform = useInput();
  const inputType = useInput("");
  const inputLeverage = useInput("");
  const inputPrice2 = useOnlyNumberInput("");
  const inputTradePassword = useInput("");
  const inputViewPassword = useInput("");
  const inputBankNo = useInput("");

  ////// USEEFFECT //////
  useEffect(() => {
    searchDataHandler();
  }, [currentTab1, currentTab2]);

  useEffect(() => {
    if (st_userListError) {
      return message.error(st_userListError);
    }
  }, [st_userListError]);

  useEffect(() => {
    if (st_userUpdatePriceDone) {
      searchDataHandler();
      inputPrice.setValue("");
      toggleModalHandler();

      message.success("정상적으로 처리되었습니다.");
    }
  }, [st_userUpdatePriceDone]);

  useEffect(() => {
    if (st_userUpdatePriceError) {
      message.error(st_userUpdatePriceError);
    }
  }, [st_userUpdatePriceError]);

  useEffect(() => {
    if (st_userUpdatePermitDone) {
      dispatch({
        type: USER_LIST_REQUEST,
        data: {
          page: currentPage,
          search: inputSearch.value || ``,
          searchType: currentTab1 === 1 ? `2` : currentTab1 === 2 ? `1` : ``,
          searchComplete:
            currentTab2 === 1 ? `0` : currentTab2 === 2 ? `1` : ``,
        },
      });
      toggleModalHandler2();

      message.success("정상적으로 처리되었습니다.");
    }
  }, [st_userUpdatePermitDone]);

  useEffect(() => {
    if (st_userUpdatePermitError) {
      message.error(st_userUpdatePermitError);
    }
  }, [st_userUpdatePermitError]);

  ////// TOGGLE //////
  const toggleModalHandler = (data) => {
    if (toggleModal) {
      setCurrentData(null);
    } else {
      setCurrentData(data);
    }
    setToggleModal(!toggleModal);
  };

  const toggleModalHandler2 = (data) => {
    if (toggleModal2) {
      setCurrentData(null);

      inputPlatform.setValue("");
      inputType.setValue("");
      inputLeverage.setValue("");
      inputPrice2.setValue("");
      inputTradePassword.setValue("");
      inputViewPassword.setValue("");
      inputBankNo.setValue("");
    } else {
      inputPlatform.setValue(data.platform);
      inputType.setValue(data.accountType);
      inputLeverage.setValue(data.leverage);

      setCurrentData(data);
    }
    setToggleModal2(!toggleModal2);
  };

  const toggleModalHandler3 = (data) => {
    if (toggleModal3) {
      setCurrentData(null);
    } else {
      setCurrentData(data);
    }
    setToggleModal3(!toggleModal3);
  };

  ////// HANDLER //////
  const otherPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);

      dispatch({
        type: USER_LIST_REQUEST,
        data: {
          page: changePage,
          search: inputSearch.value || ``,
          searchType: currentTab1 === 1 ? `2` : currentTab1 === 2 ? `1` : ``,
          searchComplete:
            currentTab2 === 1 ? `0` : currentTab2 === 2 ? `1` : ``,
        },
      });
    },
    [currentPage]
  );

  const searchDataHandler = () => {
    dispatch({
      type: USER_LIST_REQUEST,
      data: {
        page: 1,
        search: inputSearch.value || ``,
        searchType: currentTab1 === 1 ? `2` : currentTab1 === 2 ? `1` : ``,
        searchComplete: currentTab2 === 1 ? `0` : currentTab2 === 2 ? `1` : ``,
      },
    });
  };

  const updatePriceHandler = () => {
    if (!emptyCheck(inputPrice.value)) {
      return LoadNotification("ADMIN SYSTEM ERRLR", "지갑금액을 입력해주세요.");
    }

    if (!Number.isInteger(parseInt(inputPrice.value))) {
      return LoadNotification(
        "ADMIN SYSTEM ERRLR",
        "지갑금액은 숫자만 입력할 수 있습니다."
      );
    }

    dispatch({
      type: USER_UPDATE_PRICE_REQUEST,
      data: {
        id: currentData.id,
        price: parseFloat(inputPrice.value),
      },
    });
  };

  const updatePermitHandler = () => {
    if (!emptyCheck(inputPlatform.value)) {
      return LoadNotification(
        "ADMIN SYSTEM ERRLR",
        "거래 플랫폼을 선택해주세요."
      );
    }

    if (!emptyCheck(inputType.value)) {
      return LoadNotification(
        "ADMIN SYSTEM ERRLR",
        "거래 유형을 선택해주세요."
      );
    }

    if (!emptyCheck(inputLeverage.value)) {
      return LoadNotification("ADMIN SYSTEM ERRLR", "레버리지를 선택해주세요.");
    }

    if (currentData.userType === `1`) {
      if (!emptyCheck(inputPrice2.value)) {
        return LoadNotification(
          "ADMIN SYSTEM ERRLR",
          "환율금액을 입력해주세요."
        );
      }
    }

    if (!emptyCheck(inputTradePassword.value)) {
      return LoadNotification(
        "ADMIN SYSTEM ERRLR",
        "거래용 비밀번호를 입력해주세요."
      );
    }

    if (!emptyCheck(inputViewPassword.value)) {
      return LoadNotification(
        "ADMIN SYSTEM ERRLR",
        "보기용 비밀번호를 입력해주세요."
      );
    }

    if (!emptyCheck(inputBankNo.value)) {
      return LoadNotification("ADMIN SYSTEM ERRLR", "계좌번호를 입력해주세요.");
    }

    dispatch({
      type: USER_UPDATE_PERMIT_REQUEST,
      data: {
        id: currentData.id,
        platform: inputPlatform.value,
        type: inputType.value,
        leverage: inputLeverage.value,
        price: inputPrice2.value,
        tradePassword: inputTradePassword.value,
        viewPassword: inputViewPassword.value,
        bankNo: inputBankNo.value,
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

  const columns = [
    {
      width: 40,
      title: <Wrapper fontSize={`14px`}>번호</Wrapper>,
      fixed: "left",
      render: (data, _, idx) => (
        <Wrapper fontSize={`14px`}>
          {userLen - ((currentPage - 1) * 10 + idx) + ""}
        </Wrapper>
      ),
    },
    {
      width: 70,
      title: <Wrapper fontSize={`14px`}>유형</Wrapper>,
      fixed: "left",
      render: (data) => (
        <Wrapper fontSize={`14px`}>
          {data.userType === `1` ? `모의 계정` : `실거래 계정`}
        </Wrapper>
      ),
    },
    {
      width: 110,
      title: <Wrapper fontSize={`14px`}>이메일</Wrapper>,
      fixed: "left",
      render: (data) => <Wrapper fontSize={`14px`}>{data.email}</Wrapper>,
    },
    {
      width: 80,
      title: <Wrapper fontSize={`14px`}>이름</Wrapper>,
      fixed: "left",
      render: (data) => <Wrapper fontSize={`14px`}>{data.username}</Wrapper>,
    },
    {
      width: 80,
      title: <Wrapper fontSize={`14px`}>핸드폰</Wrapper>,
      render: (data) => (
        <Wrapper fontSize={`14px`}>
          ({data.countryNo}) {data.mobile}
        </Wrapper>
      ),
    },
    {
      width: 50,
      title: <Wrapper fontSize={`14px`}>성별</Wrapper>,
      render: (data) => <Wrapper fontSize={`14px`}>{data.gender}</Wrapper>,
    },
    {
      width: 150,
      title: <Wrapper fontSize={`14px`}>주소</Wrapper>,
      render: (data) => (
        <Wrapper
          fontSize={`14px`}
        >{`${data.address} ${data.detailAddress}`}</Wrapper>
      ),
    },
    {
      width: 100,
      title: <Wrapper fontSize={`14px`}>지갑금액</Wrapper>,
      render: (data) => (
        <Wrapper dr={`row`} fontSize={`14px`}>
          <Wrapper width={`auto`} fontSize={`inherit`} margin={`0 20px 0 0`}>
            {parseFloat(data.priceWallet).toFixed(2)}
          </Wrapper>

          <Button type="primary" onClick={() => toggleModalHandler(data)}>
            부여
          </Button>
        </Wrapper>
      ),
    },
    {
      width: 50,
      title: <Wrapper fontSize={`14px`}>인증정보</Wrapper>,
      fixed: "right",
      render: (data) => (
        <Wrapper fontSize={`14px`}>
          <Button
            type="primary"
            disabled={data.userType === `1`}
            onClick={() => toggleModalHandler3(data)}
          >
            확인
          </Button>
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
            onClick={() => toggleModalHandler2(data)}
          >
            승인
          </Button>
        </Wrapper>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["회원 관리"]}
        title={`회원 리스트`}
        subTitle={`홈페이지에 가입한 회원를 확인할 수 있습니다.`}
      />
      {/* <AdminTop createButton={true} createButtonAction={() => {})} /> */}
      <AdminContent>
        <TabWrapper>
          <Tab isActive={currentTab1 === 0} onClick={() => setCurrentTab1(0)}>
            전체
          </Tab>

          <Tab isActive={currentTab1 === 1} onClick={() => setCurrentTab1(1)}>
            실거래 계정
          </Tab>

          <Tab isActive={currentTab1 === 2} onClick={() => setCurrentTab1(2)}>
            모의 계정
          </Tab>
        </TabWrapper>

        <TabWrapper margin={`10px 0 0`}>
          <Tab isActive={currentTab2 === 0} onClick={() => setCurrentTab2(0)}>
            전체
          </Tab>

          <Tab isActive={currentTab2 === 1} onClick={() => setCurrentTab2(1)}>
            승인대기
          </Tab>

          <Tab isActive={currentTab2 === 2} onClick={() => setCurrentTab2(2)}>
            승인
          </Tab>
        </TabWrapper>

        <Wrapper dr={`row`} ju={`space-between`} margin={`15px 0 10px`}>
          <Input.Group compact style={{ width: `auto` }}>
            <Input
              style={{ width: "280px" }}
              placeholder="이름, 이메일"
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
          dataSource={userList ? userList : []}
          size="small"
          scroll={{ x: 2000 }}
          pagination={{
            pageSize: 10,
            total: userLen,
            onChange: (page) => otherPageCall(page),
          }}
        />
      </AdminContent>

      <Modal
        visible={toggleModal}
        width={`400px`}
        title={`지갑금액 부여`}
        onCancel={toggleModalHandler}
        onOk={updatePriceHandler}
      >
        <Wrapper padding={`20px`} al={`flex-start`}>
          <Wrapper width={`auto`} fontSize={`15px`} margin={`0 0 4px`}>
            지갑금액
          </Wrapper>
          <Input style={{ width: "100%" }} {...inputPrice} />
        </Wrapper>
      </Modal>

      <Modal
        visible={toggleModal2}
        width={`400px`}
        title={`승인`}
        onCancel={toggleModalHandler2}
        onOk={updatePermitHandler}
      >
        <Wrapper padding={`20px`} al={`flex-start`}>
          <Wrapper
            al={`flex-start`}
            padding={`0 0 5px`}
            margin={`0 0 10px`}
            fontSize={`15px`}
            fontWeight={`500`}
            borderBottom={`1px solid #eee`}
          >
            해당 입금신청을 승인하시겠습니까 ?
          </Wrapper>

          <Wrapper width={`auto`} fontSize={`14px`} margin={`8px 0 4px`}>
            거래 플랫폼
          </Wrapper>

          <Select
            defaultValue={``}
            style={{ width: `100%` }}
            {...inputPlatform}
            onChange={(value) => inputPlatform.setValue(value)}
          >
            <Option value="">선택</Option>

            {platformList.map((data, idx) => {
              return (
                <Option key={idx} value={data}>
                  {data}
                </Option>
              );
            })}
          </Select>

          <Wrapper width={`auto`} fontSize={`14px`} margin={`8px 0 4px`}>
            계좌유형
          </Wrapper>
          <Select
            defaultValue={``}
            style={{ width: `100%` }}
            {...inputType}
            onChange={(value) => {
              inputType.setValue(value);
              inputLeverage.setValue("");
            }}
          >
            <Option value="">선택</Option>

            {typeList.map((data, idx) => {
              return (
                <Option key={idx} value={data.type}>
                  {data.type}
                </Option>
              );
            })}
          </Select>

          <Wrapper width={`auto`} fontSize={`14px`} margin={`8px 0 4px`}>
            레버리지
          </Wrapper>
          <Select
            defaultValue={``}
            style={{ width: `100%` }}
            {...inputLeverage}
            onChange={(value) => inputLeverage.setValue(value)}
          >
            <Option value="">선택</Option>

            {inputType.value &&
              typeList
                .find((data) => data.type === inputType.value)
                .leverage.map((data, idx) => {
                  return (
                    <Option key={idx} value={data}>
                      {data}
                    </Option>
                  );
                })}
          </Select>

          {currentData && currentData.userType === `1` && (
            <>
              <Wrapper width={`auto`} fontSize={`14px`} margin={`8px 0 4px`}>
                환율금액
              </Wrapper>
              <Input style={{ width: "100%" }} {...inputPrice2} />
            </>
          )}

          <Wrapper width={`auto`} fontSize={`14px`} margin={`8px 0 4px`}>
            거래용비번
          </Wrapper>
          <Input style={{ width: "100%" }} {...inputTradePassword} />

          <Wrapper width={`auto`} fontSize={`14px`} margin={`8px 0 4px`}>
            보기용비번
          </Wrapper>
          <Input style={{ width: "100%" }} {...inputViewPassword} />

          <Wrapper width={`auto`} fontSize={`14px`} margin={`8px 0 4px`}>
            계좌번호
          </Wrapper>
          <Input style={{ width: "100%" }} {...inputBankNo} />
        </Wrapper>
      </Modal>

      <Modal
        visible={toggleModal3}
        width={`400px`}
        title={`인증정보`}
        onCancel={toggleModalHandler3}
        footer={[
          <Button type={`primary`} onClick={toggleModalHandler3}>
            OK
          </Button>,
        ]}
      >
        <Wrapper padding={`20px`} al={`flex-start`}>
          <Wrapper
            al={`flex-start`}
            margin={`0 0 10px`}
            fontSize={`17px`}
            fontWeight={`500`}
          >
            본인 확인
          </Wrapper>

          <Wrapper
            dr={`row`}
            ju={`flex-start`}
            fontSize={`15px`}
            padding={`5px 10px`}
            borderTop={`1px solid #eee`}
            borderBottom={`1px solid #eee`}
          >
            <Wrapper al={`flex-start`} width={`100px`} fontWeight={`500`}>
              인증 유형
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} width={`calc(100% - 100px)`}>
              {currentData && currentData.idType}
            </Wrapper>
          </Wrapper>

          <Wrapper
            dr={`row`}
            ju={`flex-start`}
            fontSize={`15px`}
            padding={`5px 10px`}
            borderBottom={`1px solid #eee`}
          >
            <Wrapper al={`flex-start`} width={`100px`} fontWeight={`500`}>
              발행 일자
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} width={`calc(100% - 100px)`}>
              {currentData && currentData.idDate1}
            </Wrapper>
          </Wrapper>

          <Wrapper
            dr={`row`}
            ju={`flex-start`}
            fontSize={`15px`}
            padding={`5px 10px`}
            borderBottom={`1px solid #eee`}
          >
            <Wrapper al={`flex-start`} width={`100px`} fontWeight={`500`}>
              만료 일자
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} width={`calc(100% - 100px)`}>
              {currentData && currentData.idDate2}
            </Wrapper>
          </Wrapper>

          <Wrapper
            dr={`row`}
            ju={`flex-start`}
            fontSize={`15px`}
            padding={`5px 10px`}
            borderBottom={`1px solid #eee`}
          >
            <Wrapper al={`flex-start`} width={`100px`} fontWeight={`500`}>
              문서 파일
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} width={`calc(100% - 100px)`}>
              <Button
                onClick={() =>
                  downloadFileHandler(
                    currentData.idFilePath,
                    currentData.idFileOriginName
                  )
                }
              >
                다운로드
              </Button>
            </Wrapper>
          </Wrapper>

          <Wrapper
            al={`flex-start`}
            margin={`15px 0 10px`}
            fontSize={`17px`}
            fontWeight={`500`}
          >
            본인 확인
          </Wrapper>

          <Wrapper
            dr={`row`}
            ju={`flex-start`}
            fontSize={`15px`}
            padding={`5px 10px`}
            borderBottom={`1px solid #eee`}
          >
            <Wrapper al={`flex-start`} width={`100px`} fontWeight={`500`}>
              인증 유형
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} width={`calc(100% - 100px)`}>
              {currentData && currentData.addrType}
            </Wrapper>
          </Wrapper>

          <Wrapper
            dr={`row`}
            ju={`flex-start`}
            fontSize={`15px`}
            padding={`5px 10px`}
            borderBottom={`1px solid #eee`}
          >
            <Wrapper al={`flex-start`} width={`100px`} fontWeight={`500`}>
              문서 파일
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} width={`calc(100% - 100px)`}>
              <Button
                onClick={() =>
                  downloadFileHandler(
                    currentData.addrFilePath,
                    currentData.addrFileOriginName
                  )
                }
              >
                다운로드
              </Button>
            </Wrapper>
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

export default withRouter(UserList);
