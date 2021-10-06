import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import { message } from "antd";
import { numberWithCommas } from "../../components/commonUtils";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { END } from "redux-saga";
import axios from "axios";
import {
  Wrapper,
  TableWrapper,
  TableRow,
  TableCol,
  TableHeader,
  TableBody,
} from "../../components/commonComponents";
import UserLayout from "../../components/user/UserLayout";
import { DEPOSIT_LIST_REQUEST } from "../../reducers/deposit";
import { WITHDRAW_LIST_REQUEST } from "../../reducers/withdraw";

const Record = () => {
  ////// VARIABLES //////

  const dispatch = useDispatch();

  const router = useRouter();

  ////// HOOKS //////
  const { me } = useSelector((state) => state.user);

  const [viewData, setViewData] = useState(null);

  ////// TOGGLE //////

  ////// HANDLER //////

  ////// USEEFFECT //////

  useEffect(() => {
    const deposits = me.Deposits.map((data) => {
      return {
        type: "입금",
        ...data,
      };
    });

    const withdraws = me.Withdraws.map((data) => {
      return {
        type: "출금",
        ...data,
      };
    });

    const dataList = [...deposits, ...withdraws];
    dataList.sort(function (a, b) {
      return b["id"] - a["id"];
    });
    setViewData(dataList);
  }, []);

  return (
    <UserLayout>
      <Wrapper
        al={`flex-start`}
        ju={`space-between`}
        minHeight={`calc(100vh - 110px)`}
        padding={`20px 30px`}
        bgColor={`#fff`}
        border={`1px solid #ededed`}
        shadow={`2px 2px 10px #e6e6e6`}>
        <Wrapper al={`flex-start`}>
          <Wrapper
            al={`flex-start`}
            margin={`0 0 30px`}
            padding={`0 8px 20px`}
            fontSize={`19px`}
            fontWeight={`700`}
            borderBottom={`1px solid #ebebeb`}>
            심사기록
          </Wrapper>

          <TableWrapper>
            <TableHeader>
              <TableRow>
                <TableCol width={`50px`}>번호</TableCol>
                <TableCol width={`130px`}>신청일</TableCol>
                <TableCol width={`200px`}>유형</TableCol>
                <TableCol
                  width={`calc(100% - 50px - 130px - 200px - 120px - 120px - 130px)`}
                  minWidth={`250px`}>
                  상세정보
                </TableCol>
                <TableCol width={`120px`}>금액</TableCol>
                <TableCol width={`120px`}>심사상태</TableCol>
                <TableCol width={`130px`}>승인일</TableCol>
              </TableRow>
            </TableHeader>

            {/*                                          
                        {
                    _id: 1,
                    createdAt: "2021-01-01 12:00:00",
                    type: "입금",
                    bankName: "은행명",
                    bankNo: "계좌번호",
                    swiftCode: "Swift Code",
                    willAddress: "윌마켓 주소",
                    bankAddress: "은행 주소",
                    selectBank: "11111",
                    price: 500000,
                    isComplete: true,
                    completedAt: "2021-01-01 12:00:00",
                  },
                  {
                    _id: 2,
                    createdAt: "2021-01-01 12:00:00",
                    type: "출금",
                    bankName: "은행명",
                    bankNo: "계좌번호",
                    swiftCode: "Swift Code",
                    bankAddress: "은행 주소",
                    selectBank: "내 지갑",
                    price: 300000,
                    isComplete: false,
                    completedAt: "",
                  },
                ] */}

            <TableBody>
              {me ? (
                viewData &&
                viewData.map((data, idx) => {
                  return (
                    <TableRow key={data._id}>
                      <TableCol width={`50px`}>{idx + 1}</TableCol>
                      <TableCol width={`130px`}>{data.createdAt}</TableCol>
                      <TableCol width={`200px`}>{data.type}</TableCol>
                      <TableCol
                        width={`calc(100% - 50px - 130px - 200px - 120px - 120px - 130px)`}
                        minWidth={`250px`}>
                        {data.type === `입금` && (
                          <Wrapper al={`flex-start`} fontSize={`12px`}>
                            <Wrapper
                              dr={`row`}
                              margin={`2px 0`}
                              width={`auto`}
                              fontSize={`inherit`}>
                              <Wrapper
                                margin={`0 5px 0 0`}
                                width={`auto`}
                                color={`#8f0a99`}
                                fontSize={`inherit`}>
                                은행명
                              </Wrapper>
                              : {data.bankName}
                            </Wrapper>

                            <Wrapper
                              dr={`row`}
                              margin={`2px 0`}
                              width={`auto`}
                              fontSize={`inherit`}>
                              <Wrapper
                                margin={`0 5px 0 0`}
                                width={`auto`}
                                color={`#8f0a99`}
                                fontSize={`inherit`}>
                                계좌 번호
                              </Wrapper>
                              : {data.bankNo}
                            </Wrapper>

                            <Wrapper
                              dr={`row`}
                              margin={`2px 0`}
                              width={`auto`}
                              fontSize={`inherit`}>
                              <Wrapper
                                margin={`0 5px 0 0`}
                                width={`auto`}
                                color={`#8f0a99`}
                                fontSize={`inherit`}>
                                Swift Code
                              </Wrapper>
                              : {data.swiftCode}
                            </Wrapper>

                            <Wrapper
                              dr={`row`}
                              margin={`2px 0`}
                              width={`auto`}
                              fontSize={`inherit`}>
                              <Wrapper
                                margin={`0 5px 0 0`}
                                width={`auto`}
                                color={`#8f0a99`}
                                fontSize={`inherit`}>
                                윌마켓 주소
                              </Wrapper>
                              : {data.willAddress}
                            </Wrapper>

                            <Wrapper
                              dr={`row`}
                              margin={`2px 0`}
                              width={`auto`}
                              fontSize={`inherit`}>
                              <Wrapper
                                margin={`0 5px 0 0`}
                                width={`auto`}
                                color={`#8f0a99`}
                                fontSize={`inherit`}>
                                은행 주소
                              </Wrapper>
                              : {data.bankAddress}
                            </Wrapper>

                            <Wrapper
                              dr={`row`}
                              margin={`2px 0`}
                              width={`auto`}
                              fontSize={`inherit`}>
                              <Wrapper
                                margin={`0 5px 0 0`}
                                width={`auto`}
                                color={`#8f0a99`}
                                fontSize={`inherit`}>
                                입금 계좌
                              </Wrapper>
                              : {data.selectBank}
                            </Wrapper>
                          </Wrapper>
                        )}

                        {data.type === `출금` && (
                          <Wrapper al={`flex-start`} fontSize={`12px`}>
                            <Wrapper
                              dr={`row`}
                              margin={`2px 0`}
                              width={`auto`}
                              fontSize={`inherit`}>
                              <Wrapper
                                margin={`0 5px 0 0`}
                                width={`auto`}
                                color={`#8f0a99`}
                                fontSize={`inherit`}>
                                은행명
                              </Wrapper>
                              : {data.bankName}
                            </Wrapper>

                            <Wrapper
                              dr={`row`}
                              margin={`2px 0`}
                              width={`auto`}
                              fontSize={`inherit`}>
                              <Wrapper
                                margin={`0 5px 0 0`}
                                width={`auto`}
                                color={`#8f0a99`}
                                fontSize={`inherit`}>
                                계좌 번호
                              </Wrapper>
                              : {data.bankNo}
                            </Wrapper>

                            <Wrapper
                              dr={`row`}
                              margin={`2px 0`}
                              width={`auto`}
                              fontSize={`inherit`}>
                              <Wrapper
                                margin={`0 5px 0 0`}
                                width={`auto`}
                                color={`#8f0a99`}
                                fontSize={`inherit`}>
                                Swift Code
                              </Wrapper>
                              : {data.swiftCode}
                            </Wrapper>

                            <Wrapper
                              dr={`row`}
                              margin={`2px 0`}
                              width={`auto`}
                              fontSize={`inherit`}>
                              <Wrapper
                                margin={`0 5px 0 0`}
                                width={`auto`}
                                color={`#8f0a99`}
                                fontSize={`inherit`}>
                                은행 주소
                              </Wrapper>
                              : {data.bankAddress}
                            </Wrapper>

                            <Wrapper
                              dr={`row`}
                              margin={`2px 0`}
                              width={`auto`}
                              fontSize={`inherit`}>
                              <Wrapper
                                margin={`0 5px 0 0`}
                                width={`auto`}
                                color={`#8f0a99`}
                                fontSize={`inherit`}>
                                출금 계좌
                              </Wrapper>
                              : {data.selectBank}
                            </Wrapper>
                          </Wrapper>
                        )}
                      </TableCol>
                      <TableCol width={`120px`}>
                        {numberWithCommas(data.price)}
                      </TableCol>
                      <TableCol width={`120px`}>
                        {data.isComplete ? (
                          <Wrapper
                            width={`auto`}
                            fontSize={`inherit`}
                            color={`#c71919`}>
                            승인
                          </Wrapper>
                        ) : (
                          <Wrapper width={`auto`} fontSize={`inherit`}>
                            승인대기
                          </Wrapper>
                        )}
                      </TableCol>
                      <TableCol width={`130px`}>{data.completedAt}</TableCol>
                    </TableRow>
                  );
                })
              ) : (
                <Wrapper margin={`30px 0`}>
                  <Empty description={`조회할 상품을 선택해주세요.`} />
                </Wrapper>
              )}
            </TableBody>
          </TableWrapper>
        </Wrapper>
      </Wrapper>
    </UserLayout>
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

export default Record;
