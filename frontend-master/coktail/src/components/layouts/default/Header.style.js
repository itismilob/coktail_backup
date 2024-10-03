import styled, { keyframes } from 'styled-components'

import { headerHeight } from '@/assets/styleVariables'

export const header = styled.header`
  position: sticky;
  max-width: inherit;
  width: 100%;
  /* height: ${headerHeight}; */
  height: 0;
  top: 0;
  box-sizing: border-box;
  z-index: 40;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* 스크롤에 따른 헤더 배경 변경 */
  background: ${(props) => (props.$isBackground ? 'none' : '#ffffff')};
  transition: all 0.5s linear 0s;
  height: ${headerHeight};
  width: 430px;

  .headerLogo {
    padding: 20px;
  }

  .hamburgerIcon {
    &:hover {
      cursor: pointer;
    }
  }
`

export const HeaderRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding-right: 20px;

  .goSearch {
    &:hover {
      cursor: pointer;
    }
  }
`

export const SearchInputBox = styled(HeaderContainer)`
  width: 100%;
  height: 100%;
  padding: 1.25em 0;

  .container {
    width: 100%;
  }

  .searchBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1em;
    width: 100%;
  }

  .goBackIcon {
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
  }

  .searchInput {
    width: 90%;
    height: 100%;
    align-items: center;
    position: relative;
    display: flex;

    .isAutoCompletion {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    input {
      width: 100%;
      height: 3em;
      border: none;
      background-color: rgba(121, 121, 121, 10%);
      border-radius: 25px;
      padding: 0 50px 0 15px;
      &:focus {
        outline: none;
      }
    }

    .searchIcon {
      width: 25px;
      height: 25px;
      stroke: #797979;
      position: absolute;
      right: 5%;
      &:hover {
        cursor: pointer;
      }
    }
  }
`

export const AutoCompletionBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 0 1em;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 10px;
    width: 90%;
    height: 100%;
    float: right;
    padding: 15px;
    background-color: rgba(121, 121, 121, 10%);
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    & > div:hover {
      color: gray;
    }
  }
`
