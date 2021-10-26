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
import moment from "moment";
import { useTranslation } from "react-i18next";

const Record = () => {
  ////// VARIABLES //////

  const dispatch = useDispatch();

  const router = useRouter();

  ////// HOOKS //////

  const { t } = useTranslation(["user_record"]);

  const { me } = useSelector((state) => state.user);

  const [viewData, setViewData] = useState(null);

  ////// TOGGLE //////

  ////// HANDLER //////

  ////// USEEFFECT //////

  useEffect(() => {
    const deposits = me.Deposits.map((data) => {
      return {
        type: t(`10`),
        ...data,
      };
    });

    const withdraws = me.Withdraws.map((data) => {
      return {
        type: t(`16`),
        ...data,
      };
    });

    const dataList = [...deposits, ...withdraws];
    dataList.sort(function (a, b) {
      return b["id"] - a["id"];
    });
    setViewData(dataList);
  }, []);

  useEffect(() => {
    if (!me) {
      message.error(t(`1`));
      router.push("/login");
    } else if (me.userType === `1`) {
      router.push("/user?access=false");
    }
  }, [me]);

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
            {t(`2`)}
          </Wrapper>

          <TableWrapper>
            <TableHeader>
              <TableRow>
                <TableCol width={`50px`}>{t(`3`)}</TableCol>
                <TableCol width={`130px`}>{t(`4`)}</TableCol>
                <TableCol width={`200px`}>{t(`5`)}</TableCol>
                <TableCol
                  width={`calc(100% - 50px - 130px - 200px - 120px - 120px - 130px)`}
                  minWidth={`250px`}>
                  {t(`6`)}
                </TableCol>
                <TableCol width={`120px`}>{t(`7`)}</TableCol>
                <TableCol width={`120px`}>{t(`8`)}</TableCol>
                <TableCol width={`130px`}>{t(`9`)}</TableCol>
              </TableRow>
            </TableHeader>

            <TableBody>
              {me ? (
                viewData &&
                viewData.map((data, idx) => {
                  return (
                    <TableRow key={data._id}>
                      <TableCol width={`50px`}>{idx + 1}</TableCol>
                      <TableCol width={`130px`}>
                        {moment(data.createdAt).format(`YYYY-MM-DD HH:mm:ss`)}
                      </TableCol>
                      <TableCol width={`200px`}>{data.type}</TableCol>
                      <TableCol
                        width={`calc(100% - 50px - 130px - 200px - 120px - 120px - 130px)`}
                        minWidth={`250px`}>
                        {data.type === t(`10`) && (
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
                                {t(`11`)}
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
                                {t(`12`)}
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
                                {t(`13`)}
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
                                {t(`14`)}
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
                                {t(`15`)}
                              </Wrapper>
                              : {data.selectBank}
                            </Wrapper>
                          </Wrapper>
                        )}

                        {data.type === t(`16`) && (
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
                                {t(`11`)}
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
                                {t(`12`)}
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
                                {t(`14`)}
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
                                {t(`17`)}
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
                            {t(`18`)}
                          </Wrapper>
                        ) : (
                          <Wrapper width={`auto`} fontSize={`inherit`}>
                            {t(`19`)}
                          </Wrapper>
                        )}
                      </TableCol>
                      <TableCol width={`130px`}>
                        {data.isComplete &&
                          moment(data.completedAt).format(
                            `YYYY-MM-DD HH:mm:ss`
                          )}
                      </TableCol>
                    </TableRow>
                  );
                })
              ) : (
                <Wrapper margin={`30px 0`}>
                  <Empty description={t(`20`)} />
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
