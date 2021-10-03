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

const MenuBox = styled(SelectBox)`
  margin: ${(props) => props.margin || `0 20px 0 0`};
  border: 5px solid #f7e6fc;

  &:hover {
    border: 7px solid #f2cdfc;
  }
`;

const User = ({ width }) => {
  ////// VARIABLES //////

  ////// HOOKS //////
  const router = useRouter();

  ////// TOGGLE //////

  ////// HANDLER //////
  const moveLinkHandler = (link) => {
    router.push(link);
  };

  ////// USEEFFECT //////

  return (
    <UserLayout>
      <Wrapper al={`flex-start`} margin={`0 0 10px`} fontWeight={`700`}>
        메뉴
      </Wrapper>

      <Wrapper dr={`row`} ju={`flex-start`}>
        <MenuBox
          width={`100px`}
          height={`100px`}
          onClick={() => moveLinkHandler(`/user/deposit`)}>
          입 금
        </MenuBox>

        <MenuBox
          width={`100px`}
          height={`100px`}
          onClick={() => moveLinkHandler(`/user/withdraw`)}>
          출 금
        </MenuBox>

        <MenuBox
          width={`100px`}
          height={`100px`}
          onClick={() => moveLinkHandler(`/user/record`)}>
          심사기록
        </MenuBox>
      </Wrapper>

      <Wrapper al={`flex-start`} margin={`50px 0 10px`} fontWeight={`700`}>
        내 지갑
      </Wrapper>

      <Wrapper al={`flex-start`}>
        <SelectBox dr={`row`} padding={`15px 70px 15px 25px`}>
          <Wrapper
            width={`auto`}
            padding={`5px`}
            bgColor={`#a06ec6`}
            color={`#fff`}
            fontSize={`38px`}
            radius={`50%`}>
            <MdAttachMoney />
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0 0 0 15px`} width={`auto`}>
            <Wrapper
              width={`auto`}
              color={`#7c1a81`}
              fontSize={`13px`}
              lineHeight={`1.3`}>
              지갑금액
            </Wrapper>
            <Wrapper
              width={`auto`}
              fontSize={`26px`}
              fontWeight={`900`}
              lineHeight={`1.3`}>
              50,000
            </Wrapper>
          </Wrapper>
        </SelectBox>
      </Wrapper>

      <Wrapper al={`flex-start`} margin={`50px 0 10px`} fontWeight={`700`}>
        라이브 계좌
      </Wrapper>

      <Wrapper dr={`row`} ju={`flex-start`}>
        <SelectBox
          dr={`row`}
          margin={`0 20px 20px 0`}
          padding={`15px 70px 15px 25px`}>
          <Wrapper
            width={`auto`}
            padding={`9px`}
            bgColor={`#a06ec6`}
            color={`#fff`}
            fontSize={`30px`}
            radius={`50%`}>
            <AiOutlineCreditCard />
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0 0 0 15px`} width={`auto`}>
            <Wrapper
              width={`auto`}
              color={`#7c1a81`}
              fontSize={`13px`}
              lineHeight={`1.3`}>
              계좌번호
            </Wrapper>
            <Wrapper
              width={`auto`}
              fontSize={`26px`}
              fontWeight={`900`}
              lineHeight={`1.3`}>
              11111
            </Wrapper>
          </Wrapper>
        </SelectBox>

        <SelectBox
          dr={`row`}
          margin={`0 20px 20px 0`}
          padding={`15px 70px 15px 25px`}
          onClick={() => moveLinkHandler(`/user/addLive`)}>
          <Wrapper
            width={`auto`}
            padding={`9px`}
            bgColor={`#a06ec6`}
            color={`#fff`}
            fontSize={`30px`}
            radius={`50%`}>
            <AiOutlinePlus />
          </Wrapper>

          <Wrapper
            al={`center`}
            margin={`0 0 0 15px`}
            width={`auto`}
            color={`#7c1a81`}>
            계좌 추가
          </Wrapper>
        </SelectBox>
      </Wrapper>

      <Wrapper al={`flex-start`} margin={`30px 0 10px`} fontWeight={`700`}>
        데모 계좌
      </Wrapper>

      <Wrapper dr={`row`} ju={`flex-start`}>
        <SelectBox
          dr={`row`}
          margin={`0 20px 20px 0`}
          padding={`15px 70px 15px 25px`}>
          <Wrapper
            width={`auto`}
            padding={`9px`}
            bgColor={`#a06ec6`}
            color={`#fff`}
            fontSize={`30px`}
            radius={`50%`}>
            <AiOutlineCreditCard />
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`0 0 0 15px`} width={`auto`}>
            <Wrapper
              width={`auto`}
              color={`#7c1a81`}
              fontSize={`13px`}
              lineHeight={`1.3`}>
              계좌번호
            </Wrapper>
            <Wrapper
              width={`auto`}
              fontSize={`26px`}
              fontWeight={`900`}
              lineHeight={`1.3`}>
              11111
            </Wrapper>
          </Wrapper>
        </SelectBox>

        <SelectBox
          dr={`row`}
          margin={`0 20px 20px 0`}
          padding={`15px 70px 15px 25px`}
          onClick={() => moveLinkHandler(`/user/addDemo`)}>
          <Wrapper
            width={`auto`}
            padding={`9px`}
            bgColor={`#a06ec6`}
            color={`#fff`}
            fontSize={`30px`}
            radius={`50%`}>
            <AiOutlinePlus />
          </Wrapper>

          <Wrapper
            al={`center`}
            margin={`0 0 0 15px`}
            width={`auto`}
            color={`#7c1a81`}>
            계좌 추가
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
