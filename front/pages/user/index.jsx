import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import UserLayout from "../../components/user/UserLayout";
import axios from "axios";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import { Wrapper, SelectBox } from "../../components/commonComponents";
import { withResizeDetector } from "react-resize-detector";
import styled from "styled-components";
import { useRouter } from "next/router";
import { MdAttachMoney } from "react-icons/md";
import { AiOutlineCreditCard, AiOutlinePlus } from "react-icons/ai";
import { message } from "antd";
import { useTranslation } from "react-i18next";

const MenuBox = styled(SelectBox)`
  margin: ${(props) => props.margin || `0 20px 20px 0`};
  border: 5px solid #f7e6fc;

  &:hover {
    border: 7px solid #f2cdfc;
  }
`;

const User = ({ width }) => {
  ////// VARIABLES //////

  ////// HOOKS //////
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);

  const { st_liveAccountCreateDone } = useSelector(
    (state) => state.liveAccount
  );

  const router = useRouter();

  const { t, i18n } = useTranslation(["user"]);

  ////// TOGGLE //////

  ////// HANDLER //////
  const moveLinkHandler = (link) => {
    router.push(link);
  };

  ////// USEEFFECT //////
  useEffect(() => {
    if (!me && t(`11`)) {
      message.error(t(`11`));
      router.push("/login");
    }
  }, [me, t]);

  useEffect(() => {
    const query = router.query;

    if (query.access === `false`) {
      message.error(t(`12`));
      router.push(`/user`);
    }
  }, [router.query, t]);

  return (
    <UserLayout>
      <Wrapper al={`flex-start`} margin={`0 0 10px`} fontWeight={`700`}>
        {t(`1`)}
      </Wrapper>
      <Wrapper dr={`row`} ju={`flex-start`}>
        <MenuBox
          width={`130px`}
          height={`100px`}
          onClick={() => moveLinkHandler(`/user/deposit`)}
        >
          {t(`2`)}
        </MenuBox>

        <MenuBox
          width={`130px`}
          height={`100px`}
          onClick={() => moveLinkHandler(`/user/withdraw`)}
        >
          {t(`3`)}
        </MenuBox>

        <MenuBox
          width={`130px`}
          height={`100px`}
          onClick={() => moveLinkHandler(`/user/record`)}
        >
          {t(`4`)}
        </MenuBox>
      </Wrapper>
      <Wrapper al={`flex-start`} margin={`30px 0 10px`} fontWeight={`700`}>
        {t(`5`)}
      </Wrapper>

      <Wrapper al={`flex-start`}>
        <SelectBox dr={`row`} padding={`15px 70px 15px 25px`}>
          <Wrapper
            width={`auto`}
            padding={`5px`}
            bgColor={`#a06ec6`}
            color={`#fff`}
            fontSize={`38px`}
            radius={`50%`}
          >
            <MdAttachMoney />
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0 0 0 15px`} width={`auto`}>
            <Wrapper
              width={`auto`}
              color={`#7c1a81`}
              fontSize={`13px`}
              lineHeight={`1.3`}
            >
              {t(`6`)}
            </Wrapper>
            <Wrapper
              isEllipsis={width < 900 ? true : false}
              width={`auto`}
              maxWidth={width < 900 ? `145px` : `auto`}
              display={`block`}
              fontSize={width < 900 ? `24px` : `26px`}
              fontWeight={`400`}
              lineHeight={`1.3`}
            >
              {me && parseFloat(me.priceWallet).toFixed(2)}
            </Wrapper>
          </Wrapper>
        </SelectBox>
      </Wrapper>
      <Wrapper al={`flex-start`} margin={`50px 0 10px`} fontWeight={`700`}>
        {t(`7`)}
      </Wrapper>

      <Wrapper dr={`row`} ju={`flex-start`}>
        {me &&
          me.LiveAccounts.map((data) => {
            if (!data.isComplete) {
              return null;
            }

            return (
              <SelectBox
                dr={`row`}
                margin={`0 20px 20px 0`}
                padding={`15px 70px 15px 25px`}
              >
                <Wrapper
                  width={`auto`}
                  padding={`9px`}
                  bgColor={`#a06ec6`}
                  color={`#fff`}
                  fontSize={`30px`}
                  radius={`50%`}
                >
                  <AiOutlineCreditCard />
                </Wrapper>

                <Wrapper al={`flex-start`} margin={`0 0 0 15px`} width={`auto`}>
                  <Wrapper
                    width={`auto`}
                    color={`#7c1a81`}
                    fontSize={`13px`}
                    lineHeight={`1.3`}
                  >
                    {t(`8`)}
                  </Wrapper>
                  <Wrapper
                    isEllipsis={width < 900 ? true : false}
                    width={`auto`}
                    maxWidth={width < 900 ? `145px` : `auto`}
                    display={`block`}
                    fontSize={width < 900 ? `20px` : `26px`}
                    fontWeight={`400`}
                    lineHeight={`1.3`}
                  >
                    {data.bankNo}
                  </Wrapper>
                </Wrapper>
              </SelectBox>
            );
          })}

        <SelectBox
          dr={`row`}
          margin={`0 20px 20px 0`}
          padding={`15px 70px 15px 25px`}
          onClick={() => moveLinkHandler(`/user/addLive`)}
        >
          <Wrapper
            width={`auto`}
            padding={`9px`}
            bgColor={`#a06ec6`}
            color={`#fff`}
            fontSize={`30px`}
            radius={`50%`}
          >
            <AiOutlinePlus />
          </Wrapper>

          <Wrapper
            al={`center`}
            margin={`0 0 0 15px`}
            width={`auto`}
            color={`#7c1a81`}
          >
            {t(`9`)}
          </Wrapper>
        </SelectBox>
      </Wrapper>
      <Wrapper al={`flex-start`} margin={`30px 0 10px`} fontWeight={`700`}>
        {t(`10`)}
      </Wrapper>
      <Wrapper dr={`row`} ju={`flex-start`}>
        {me &&
          me.DemoAccounts.map((data) => {
            if (!data.isComplete) {
              return null;
            }

            return (
              <SelectBox
                dr={`row`}
                margin={`0 20px 20px 0`}
                padding={`15px 70px 15px 25px`}
              >
                <Wrapper
                  width={`auto`}
                  padding={`9px`}
                  bgColor={`#a06ec6`}
                  color={`#fff`}
                  fontSize={`30px`}
                  radius={`50%`}
                >
                  <AiOutlineCreditCard />
                </Wrapper>

                <Wrapper al={`flex-start`} margin={`0 0 0 15px`} width={`auto`}>
                  <Wrapper
                    width={`auto`}
                    color={`#7c1a81`}
                    fontSize={`13px`}
                    lineHeight={`1.3`}
                  >
                    {t(`8`)}
                  </Wrapper>
                  <Wrapper
                    isEllipsis={width < 900 ? true : false}
                    width={`auto`}
                    maxWidth={width < 900 ? `145px` : `auto`}
                    display={`block`}
                    fontSize={width < 900 ? `20px` : `26px`}
                    fontWeight={`400`}
                    lineHeight={`1.3`}
                  >
                    {data.bankNo}
                  </Wrapper>
                </Wrapper>
              </SelectBox>
            );
          })}

        <SelectBox
          dr={`row`}
          margin={`0 20px 20px 0`}
          padding={`15px 70px 15px 25px`}
          onClick={() => moveLinkHandler(`/user/addDemo`)}
        >
          <Wrapper
            width={`auto`}
            padding={`9px`}
            bgColor={`#a06ec6`}
            color={`#fff`}
            fontSize={`30px`}
            radius={`50%`}
          >
            <AiOutlinePlus />
          </Wrapper>

          <Wrapper
            al={`center`}
            margin={`0 0 0 15px`}
            width={`auto`}
            color={`#7c1a81`}
          >
            {t(`9`)}
          </Wrapper>
        </SelectBox>
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
export default withResizeDetector(User);
