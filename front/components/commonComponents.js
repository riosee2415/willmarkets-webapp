import { Row, Col, Modal, Radio } from "antd";
import styled from "styled-components";
import Theme from "./Theme";

export const RowWrapper = styled(Row)`
  width: ${(props) => props.width || `100%`};
  height: ${(props) => props.height};
  background: ${(props) => props.bgColor};
  background-image: ${(props) => props.bgImg};
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  box-shadow: ${(props) => props.boxShadow};
  z-index: ${(props) => props.index};
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
  border-bottom: ${(props) => props.borderBottom};
  border-top: ${(props) => props.borderTop};
  border-right: ${(props) => props.borderRight};
  border-left: ${(props) => props.borderLeft};
  border-radius: ${(props) => props.radius};
  font-size: ${(props) => props.fontSize || `1rem`};
  font-weight: ${(props) => props.fontWeight};
  line-height: ${(props) => props.lineHeight};
  text-align: ${(props) => props.textAlign};
  letter-spacing: ${(props) => props.letterSpacing};
  cursor: ${(props) => props.cursor};
  opacity: ${(props) => props.opacity};
`;

export const ColWrapper = styled(Col)`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  display: ${(props) => props.display || `flex`};
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  background: ${(props) => props.bgColor};
  background-image: ${(props) => props.bgImg};
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  box-shadow: ${(props) => props.boxShadow};
  z-index: ${(props) => props.index};
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
  border-bottom: ${(props) => props.borderBottom};
  border-top: ${(props) => props.borderTop};
  border-right: ${(props) => props.borderRight};
  border-left: ${(props) => props.borderLeft};
  border-radius: ${(props) => props.radius};
  font-size: ${(props) => props.fontSize || `1rem`};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
  text-align: ${(props) => props.textAlign};
  letter-spacing: ${(props) => props.letterSpacing};
  cursor: ${(props) => props.cursor};
  opacity: ${(props) => props.opacity};
  z-index: ${(props) => props.zIndex};
  cursor: ${(props) => props.cursor};
`;

export const WholeWrapper = styled.section`
  width: ${(props) => props.width || `100%`};
  height: ${(props) => props.height};
  color: ${(props) => props.color};
  display: ${(props) => props.display || `flex`};
  background: ${(props) => props.bgColor};
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  background-image: ${(props) => props.bgImg};
  background-size: cover;
  background-position: ${(props) => props.bgPosition || `center`};
  background-repeat: no-repeat;
  box-shadow: ${(props) => props.boxShadow};
  z-index: ${(props) => props.zIndex};
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  border-radius: ${(props) => props.radius};
`;

export const Wrapper = styled.div`
  width: ${(props) => props.width || `100%`};
  min-width: ${(props) => props.minWidth};
  max-width: ${(props) => props.maxWidth};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  display: ${(props) => props.display || `flex`};
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  flex-wrap: ${(props) => props.wrap || `wrap`};
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  z-index: ${(props) => props.zIndex};
  border: ${(props) => props.border};
  border-bottom: ${(props) => props.borderBottom};
  border-top: ${(props) => props.borderTop};
  border-right: ${(props) => props.borderRight};
  border-left: ${(props) => props.borderLeft};
  border-radius: ${(props) => props.radius};
  box-shadow: ${(props) => props.shadow};
  font-size: ${(props) => props.fontSize || `1rem`};
  font-weight: ${(props) => props.fontWeight};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  overflow: ${(props) => props.overflow};
  overflow-x: ${(props) => props.overflowX};
  overflow-y: ${(props) => props.overflowY};
  background-image: ${(props) => props.bgImg};
  background-size: ${(props) => props.bgSize || `cover`};
  background-repeat: no-repeat;
  background-attachment: ${(props) => props.attachment};
  background-position: ${(props) => props.bgPosition || `center`};

  transition: ${(props) => props.transition || `0.1s`};
  cursor: ${(props) => props.cursor};
  line-height: ${(props) => props.lineHeight};
  text-align: ${(props) => props.textAlign};
  letter-spacing: ${(props) => props.letterSpacing};
  word-break: ${(props) => props.wordBreak};
  opacity: ${(props) => props.opacity};

  ${(props) =>
    props.isEllipsis
      ? `
    // display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `
      : ``}
`;

export const RsWrapper = styled.article`
  width: ${(props) => props.width || ` 1350px`};
  height: ${(props) => props.height || `100%`};
  min-height: ${(props) => props.minHeight};
  ${(props) => props.minHeight}
  color: ${(props) => props.color};
  display: ${(props) => props.display || `flex`};
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  flex-wrap: ${(props) => props.wrap || `wrap`};
  backdrop-filter: ${(props) => props.filter};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  overflow: ${(props) => props.overflow};
  border-bottom: ${(props) => props.borderBottom};
  border: ${(props) => props.border};
  font-size: ${(props) => props.fontSize};
  position: ${(props) => props.position};

  @media (max-width: 1500px) {
    width: 1350px;
  }
  @media (max-width: 1350px) {
    width: 1280px;
  }
  @media (max-width: 1280px) {
    width: 1100px;
  }
  @media (max-width: 1100px) {
    width: 900px;
  }
  @media (max-width: 900px) {
    width: 800px;
  }
  @media (max-width: 800px) {
    width: 700px;
  }
  @media (max-width: 700px) {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export const CommonButton = styled.button`
  display: ${(props) => props.display || `flex`};
  justify-content: ${(props) => props.ju || `center`};
  align-items: ${(props) => props.al || `center`};
  flex-direction: ${(props) => props.dr};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  line-height: ${(props) => props.lineHeight};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding || `4px 12px 4px`};
  font-size: ${(props) => props.fontSize || `15px`};
  font-weight: ${(props) => props.fontWeight};
  border-radius: ${(props) => props.radius};
  position: ${(props) => props.position};
  border: none;
  outline: none;
  cursor: pointer;

  ${(props) =>
    !props.kindOf &&
    `
    background: ${props.bgColor};
    color: ${props.color};
    border: ${props.border};
    box-shadow: ${props.shadow};

    &:hover {
      background: ${props.hoverBgColor};
      color: ${props.hoverColor};
      border: ${props.hoverBorder};
      box-shadow: ${props.hoverShadow};
    }
  `}

  ${(props) =>
    props.kindOf === `white` &&
    `
    background: ${props.theme.white_C};
    color: #1f1d1d;
    border: 1px solid #e5e5e5;
    box-shadow: 1px 1px 8px #e5e5e5;

    &:hover {
      background: #4d4d4d;
      color: #f5f5f5;
      border: 1px solid #4f4f4f;
      box-shadow: 1px 1px 8px #767676;
    }
  `};

  ${(props) =>
    props.kindOf === `black` &&
    `
    background: #4d4d4d;
    color: #f5f5f5;
    border: 1px solid #4f4f4f;
    box-shadow: 1px 1px 8px #767676;
   
    &:hover {
      background: ${props.theme.white_C};
      color: #414141;
      border: 1px solid #d3d3d3;
      box-shadow: 1px 1px 8px #e1e1e1;
    }
  `};

  ${(props) =>
    props.kindOf === `red` &&
    `
    background: #eb3b3b;
    color: #f5f5f5;
    border: 1px solid #f13636;
    box-shadow: 1px 1px 8px #ff5151;
   
    &:hover {
      background: #fbeeee;
      color: #1b1919;
      border: 1px solid #ffc3c3;
      box-shadow: 1px 1px 8px #ffbbbb;
    }
  `};

  ${(props) =>
    props.kindOf === `blue` &&
    `
    background: #4147f0;
    color: #f5f5f5;
    border: 1px solid #4147ec;
    box-shadow: 1px 1px 8px #2d34f0;
   
    &:hover {
      background: none;
      color: #3353F2;
      border: 1px solid #3353F2;
    }
  `};

  ${(props) =>
    props.kindOf === `blue1` &&
    `
      position: relative;
      background: none;
      color: #3353F2;
      border: 2px solid #3353F2;

      & div {
        display: none;
      }

      &:hover {
        background: #3353F2;
        color: #fff;
      }

      &:hover div {
        display: flex;
        width: 14px;
        height: 14px;
        font-size: 14px;
        color: #fff;
      }
  `}

  ${(props) =>
    props.kindOf === `Skyblue` &&
    `
      position: relative;
      background: none;
      color: #6BD2FF;
      border: 2px solid #6BD2FF;

      & div {
        display: none;
      }

      &:hover {
        background: #6BD2FF;
        color: #2c2535;
      }

      &:hover div {
        display: flex;
        width: 14px;
        height: 14px;
        font-size: 14px;
        color: #2c2535;
      }
  `}

${(props) =>
    props.kindOf === `Skyblue1` &&
    `
    background: #6BD2FF;
    color: #242424;
    border: 1px solid #6BD2FF;
   
   
    &:hover {
      background: none;
      color: #6BD2FF;
      border: 1px solid #6BD2FF;
    }
  `};

  ${(props) =>
    props.kindOf === `white2` &&
    `
      position: relative;
      background: none;
      color: #fff;
      border: 1px solid #fff;

      & div {
        display: none;
      }

      &:hover div {
        display: flex;
        width: 12px;
        height: 12px;
        font-size: 12px;
      }
  `}

  @media (max-width: 700px) {
    font-size: ${(props) => props.fontSize || `14px`};
  }
`;

export const Text = styled.p`
  overflow: ${(props) => props.overflow};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight};
  display: ${(props) => props.display};
  flex-direction: ${(props) => props.dr};
  align-items: ${(props) => props.al};
  justify-content: ${(props) => props.ju};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight || `500`};
  line-height: ${(props) => props.lineHeight};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin || `0`};
  padding: ${(props) => props.padding};
  background: ${(props) => props.bgColor};
  text-align: ${(props) => props.textAlign};
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  font-style: ${(props) => props.fontStyle};
  cursor: ${(props) => props.cursor};
  z-index: 1;
  white-space: pre-wrap;
  border-bottom: ${(props) => props.borderBottom};
  opacity: ${(props) => props.opacity};
  letter-spacing: ${(props) => props.letterSpacing};

  ${(props) =>
    props.isEllipsis
      ? `
    // display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `
      : ``}
`;

export const PagenationWrapper = styled.div`
  width: ${(props) => props.width || `100%`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height};
  color: ${(props) => props.color};
  display: flex;
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  border: ${(props) => props.border};
  border-bottom: ${(props) => props.borderBottom};
  border-radius: ${(props) => props.radius};
  box-shadow: ${(props) => props.shadow};
  font-size: ${(props) => props.fontSize || `14px`};
  font-weight: ${(props) => props.fontWeight};
  margin: ${(props) => props.margin || `0px 0 80px`};
  padding: ${(props) => props.padding};
`;

export const Pagenation = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  flex-direction: ${(props) => props.dr || `row`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  cursor: pointer;
  margin: 0px 5px;
  border-radius: 4px;

  &.active {
    background: ${(props) => props.theme.basicTheme_C};
    color: ${(props) => props.theme.white_C};
  }
`;

export const PagenationBtn = styled.div`
  text-align: center;
  font-size: 14px;
  width: 25px;
  height: 25px;
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 25px;
  margin: 0px 5px;
  border-radius: 4px;

  &:first-child,
  &:last-child {
    color: #999;
  }

  &:hover {
    color: ${(props) => props.theme.basicTheme_C};
  }
`;

export const Image = styled.img`
  display: ${(props) => props.display};
  width: ${(props) => props.width || `100%`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height || `auto`};
  margin: ${(props) => props.margin};
  cursor: ${(props) => props.cursor};
  transform: ${(props) => props.transform};
  object-fit: ${(props) => props.objectFit || `cover`};
  object-position: ${(props) => props.objectPosition};
  position: ${(props) => props.position};
  box-shadow: ${(props) => props.shadow};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.radius};
  z-index: ${(props) => props.zIndex};
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
  opacity: ${(props) => props.opacity};
`;

export const ATag = styled.a`
  width: ${(props) => props.width || `100%`};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  display: ${(props) => props.display || `flex`};
  flex-direction: ${(props) => props.dr};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  flex-wrap: ${(props) => props.wrap || `wrap`};
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
`;

/////////////////////////////////////////////////////////////
///////////////// COMSTOM COMMON COMPONENT //////////////////
/////////////////////////////////////////////////////////////

//////////////////////// SELECT BOX /////////////////////////
export const SelectBox = styled(Wrapper)`
  width: ${(props) => props.width || `auto`};
  cursor: pointer;
  box-shadow: 0 2px 8px rgb(0 0 0 / 9%);

  &:hover {
    box-shadow: 3px 3px 8px rgb(0 0 0 / 20%);
  }
`;
/////////////////////////////////////////////////////////////

////////////////////////// COMBO ////////////////////////////
export const ComboTitle = styled(Wrapper)`
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  font-size: ${(props) => props.fontSize || `14px`};
  text-align: left;

  & > div {
    display: inline-block;
    width: calc(100% - 20px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & span {
    font-size: 14px;
  }
`;

export const ComboList = styled(Wrapper)`
  display: none;
  position: absolute;
  left: 0;
  flex-wrap: nowrap;
  justify-content: flex-start;
  overflow: auto;
  background: ${(props) => props.bgColor || `#fff`};
  box-shadow: 0 2px 8px rgb(0 0 0 / 15%);

  ${(props) =>
    props.isView &&
    `
    display: flex;
  `}
`;

export const ComboListItem = styled(Wrapper)`
  padding: ${(props) => props.padding || `8px 10px`};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #f7f7f7;
    color: #000;
  }

  ${(props) =>
    props.isActive &&
    `
    background: #f7f7f7;
  `}
`;

export const Combo = styled(Wrapper)`
  position: relative;
  padding: ${(props) => props.padding || ` 0 10px 5px`};
  width: ${(props) => props.width || `auto`};
  cursor: pointer;
  z-index: 10;

  ${(props) =>
    props.isBorder &&
    `
    border: ${props.border || `1px solid #e3e3e3`};
    box-shadow: ${props.shadow};

    &:hover {
      border: ${props.hoverBorder};
      box-shadow: ${props.hoverShadow};
    }
  `}

  ${(props) =>
    props.height &&
    `
    & ${ComboTitle} {
      line-height: ${props.height};
    }
  `}

  ${(props) =>
    props.isTitleHover &&
    `
    & ${ComboTitle}:hover {
      color: #f32478;
      cursor: pointer;
    }
  `}

  ${(props) =>
    props.itemAlign &&
    `
    & ${ComboListItem} {
      align-items: ${props.itemAlign};
    }
  `}

  & ${ComboList} {
    top: ${(props) => props.height || `27px`};
    height: ${(props) => props.listHeight || `auto`};
  }
`;
/////////////////////////////////////////////////////////////

/////////////////////////// LABEL ///////////////////////////
export const Label = styled.label`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight};
  display: ${(props) => props.display};
  flex-direction: ${(props) => props.dr};
  align-items: ${(props) => props.al};
  justify-content: ${(props) => props.ju};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight || `500`};
  line-height: ${(props) => props.lineHeight};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background: ${(props) => props.bgColor};
  text-align: ${(props) => props.textAlign};
  overflow: ${(props) => props.overflow};
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  font-style: ${(props) => props.fontStyle};
  cursor: ${(props) => props.cursor};
  z-index: 1;
  white-space: pre-wrap;
  border-bottom: ${(props) => props.borderBottom};
  opacity: ${(props) => props.opacity};
  letter-spacing: ${(props) => props.letterSpacing};
`;
/////////////////////////////////////////////////////////////

/////////////////////// INPUT //////////////////////////
export const TextInput = styled.input`
  display: ${(props) => props.display};
  flex-direction: ${(props) => props.dr};
  align-items: ${(props) => props.al};
  justify-content: ${(props) => props.ju};
  width: ${(props) => props.width || `100%`};
  height: ${(props) => props.height || `35px`};
  min-height: ${(props) => props.minHeight};
  max-height: ${(props) => props.maxHeight};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding || `0 10px`};
  font-size: ${(props) => props.fontSize || `15px`};
  font-weight: ${(props) => props.fontWeight || `500`};
  line-height: ${(props) => props.lineHeight};
  color: ${(props) => props.color || `#292727`};
  background: ${(props) => props.bgColor};
  text-align: ${(props) => props.textAlign};
  overflow: ${(props) => props.overflow};
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  font-style: ${(props) => props.fontStyle};
  cursor: ${(props) => props.cursor};
  z-index: 1;
  white-space: pre-wrap;
  border: ${(props) => props.border || `1px solid #e3e3e3`};
  opacity: ${(props) => props.opacity};
  letter-spacing: ${(props) => props.letterSpacing};
  outline: none;
`;

export const RadioInput = styled(Radio)`
  & .ant-radio-checked .ant-radio-inner {
    border-color: ${(props) => props.color || `#473f4f`};
  }

  & .ant-radio-checked::after {
    border-color: ${(props) => props.color || `#473f4f`};
  }

  & .ant-radio-inner::after {
    background-color: ${(props) => props.color || `#473f4f`};
  }

  & .ant-radio-wrapper:hover .ant-radio,
  .ant-radio:hover .ant-radio-inner,
  .ant-radio-input:focus + .ant-radio-inner {
    border-color: ${(props) => props.color || `#473f4f`};
  }
`;

export const FileInput = styled.input`
  display: none;
`;

/////////////////////////////////////////////////////////////

////////////////////////// TABLE ////////////////////////////
export const TableWrapper = styled(Wrapper)`
  align-items: normal;
  justify-content: normal;
  margin: 10px 0 30px;
  overflow-x: auto;
  overflow-y: hidden;
`;

export const TableRow = styled(Wrapper)`
  flex-direction: row;
  align-items: normal;
  justify-content: normal;
  flex-wrap: nowrap;
  width: 100%;
  cursor: pointer;
`;

export const TableCol = styled(Wrapper)`
  width: ${(props) => props.width || `auto`};
  min-width: ${(props) => props.minWidth || props.width || `auto`};
  font-size: 13px;
  text-align: ${(props) => props.textAlign || `center`};
  line-height: ${(props) => props.lineHeight || `1.5`};
`;

export const TableHeader = styled(Wrapper)`
  flex-wrap: nowrap;
  justify-content: normal;
  align-items: normal;

  ${TableCol} {
    padding: 15px 10px;
    background: #fff8fe;
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    border-right: 1px solid #e4e4e4;
    color: #363333;
  }

  ${TableCol}:first-child {
    border-left: 1px solid #e4e4e4;
  }
`;

export const TableBody = styled(Wrapper)`
  max-height: ${(props) => props.maxHeight || `auto`};
  flex-wrap: nowrap;
  justify-content: normal;
  align-items: normal;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 0 15px;
  width: auto;

  ${TableCol} {
    padding: 8px 10px;
    border-bottom: 1px solid #e4e4e4;
    border-right: 1px solid #e4e4e4;
    color: #363333;
  }

  ${TableCol}:first-child {
    border-left: 1px solid #e4e4e4;
  }

  ${TableRow}:hover {
    background: #fffcfd;
  }
`;
/////////////////////////////////////////////////////////////

//////////////////////////// TAB ////////////////////////////
export const TabWrapper = styled(Wrapper)`
  flex-direction: row;
  align-items: normal;
  justify-content: flex-start;
`;

export const Tab = styled(Wrapper)`
  padding: 8px 20px;
  width: auto;
  border: 1px solid #dedede;
  border-left: none;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: ${(props) => props.fontSize || `15px`};
  color: ${(props) => props.color || `#312f2f`};
  cursor: pointer;

  &:first-child {
    border-left: 1px solid #dedede;
  }

  &:hover {
    background: #f4f4f4;
  }

  ${(props) =>
    props.isActive &&
    `
    background: #f9edf8 !important;
    box-shadow: 0px 0px 8px #f0d4ef;

  `}
`;
/////////////////////////////////////////////////////////////

//////////////////////// ACCORDION //////////////////////////
export const AccordionWrapper = styled(Wrapper)`
  border: ${(props) => props.border || `1px solid #efefef`};
  box-shadow: ${(props) => props.shadow || `1px 1px 5px #dedede`};
`;

export const AccordionHeader = styled(Wrapper)`
  flex-direction: row;
  justify-content: space-between;
  align-items: normal;
  padding: 12px 18px;
  font-size: 15px;
  color: #221d22;
  background: #fdf6f6;
  box-shadow: 1px 1px 5px #f9d2d2;
  cursor: pointer;

  & * {
    font-size: inherit;
  }
`;

export const AccordionBody = styled(Wrapper)`
  overflow: hidden;
  flex-wrap: nowrap;
  align-items: ${(props) => props.al || `flex-start`};
  padding: ${(props) => props.padding || `20px`};

  ${(props) =>
    props.isOpen
      ? `
    max-height: 999px;
    transition: max-height 0.25s ease-in;
  `
      : `   
    max-height: 0;
    transition: max-height 0.25s ease-out;
  `}
`;
/////////////////////////////////////////////////////////////
