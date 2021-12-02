import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image, Wrapper } from "./commonComponents";
import { useRouter } from "next/router";
import { message } from "antd";
import { withResizeDetector } from "react-resize-detector";
import wrapper from "../store/configureStore";
import { POPUP_GET_REQUEST } from "../reducers/popup";
import { withCookies } from "react-cookie";

const Popup = ({ width, cookies }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { popups, st_popupError } = useSelector((state) => state.popup);

  ///////////// - EVENT HANDLER- ////////////

  const closeTodayPopupHandler = useCallback((data) => {
    const popup = document.getElementById(`popup-${data.id}-js`);

    popup.style.display = "none";

    cookies.set(`popup-${data.id}`, "y", {
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }, []);

  const _closePopupHandler = useCallback((data) => {
    const popup = document.getElementById(`popup-${data.id}-js`);
    popup.style.display = "none";
  }, []);

  /////////////////////// USEEFFECT ///////////////////

  useEffect(() => {
    dispatch({
      type: POPUP_GET_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (st_popupError) {
      message.error(st_popupError);
    }
  }, [st_popupError]);

  return (
    <Wrapper>
      {popups &&
        popups.map((data, idx) => {
          if (cookies.get(`popup-${data.id}`) === `y`) return null;

          if (!data.useYn) return;

          return (
            <Wrapper
              key={idx}
              id={`popup-${data.id}-js`}
              position={`absolute`}
              top={width > 900 ? `100px` : `130px`}
              right={`50%`}
              zIndex={`${9999 - idx}`}
              margin={
                width > 900
                  ? `${idx * 55}px ${idx * -50}px 0 0`
                  : `0 -165px 0 0`
              }
              width={`330px`}
              shadow={`0px 5px 10px #ccc`}>
              <Wrapper>
                <Image
                  src={data.imagePath}
                  height={`450px`}
                  cursor={`pointer`}
                />
              </Wrapper>

              <Wrapper dr={`row`}>
                <Wrapper
                  width={`50%`}
                  height={`50px`}
                  lineHeight={`50px`}
                  color={`#576465`}
                  bgColor={`#fff`}
                  borderRight={`1px solid #f8f8f8`}
                  cursor={`pointer`}
                  onClick={() => closeTodayPopupHandler(data)}>
                  1일 동안 보지 않음
                </Wrapper>

                <Wrapper
                  width={`50%`}
                  height={`50px`}
                  color={`#576465`}
                  bgColor={`#fff`}
                  cursor={`pointer`}
                  onClick={() => _closePopupHandler(data)}>
                  닫기
                </Wrapper>
              </Wrapper>
            </Wrapper>
          );
        })}
    </Wrapper>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withResizeDetector(withCookies(Popup));
