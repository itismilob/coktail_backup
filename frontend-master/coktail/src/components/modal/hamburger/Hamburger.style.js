import styled from 'styled-components'

import { maxWidth } from '@/assets/styleVariables'

export const HamburgerContainer = styled.div`
  width: 100%;
  max-width: ${maxWidth};
  height: 100vh;
  background-color: rgba(54, 43, 43, 90%);
  display: flex;
  flex-direction: column;
  top: 0;
  position: fixed;
  z-index: 100;

  animation: modalOpen 0.2s linear;
  @keyframes modalOpen {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export const HamburgerHeader = styled.div`
  display: flex;
  justify-content: space-between;

  .HamburgerLogo {
    padding: 13px 20px;
    &:hover {
      cursor: pointer;
    }
  }

  .closeHamburger {
    padding: 30px;
    &:hover {
      cursor: pointer;
    }
  }
`

export const HamburgerTopMenu = styled.div`
  width: 100%;
  height: 200px;
  background-color: rgba(255, 255, 255, 30%);

  .goLoginBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 35px 0 45px;
  }

  .LoginFalseBox {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 40px 0 0 35px;
  }

  .loginPTag {
    font-size: 1.2em;
    padding-right: 5px;
    color: #ffffff;
    &:hover {
      cursor: pointer;
    }
  }

  .goLoginBox > p {
    font-size: 1.2em;
    padding-right: 5px;
    color: #ffffff;
    &:hover {
      cursor: default;
    }
  }

  .logout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: #ffffff;
    font-size: 0.7em;
    font-weight: 600;
    &:hover {
      cursor: pointer;
    }
  }

  .iconContainer {
    display: flex;
    justify-content: space-between;
    padding: 40px 60px;
    & > a {
      width: 20%;
    }
  }

  .hIconBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    gap: 15px;
    &:hover {
      cursor: pointer;
    }
  }

  .hIconName {
    font-size: 0.9em;
    color: #ffffff;
  }

  .goLoginPage {
    transform: scaleX(-1);
    padding-top: 0.1em;
    path {
      fill: #ffffff;
    }
    &:hover {
      cursor: pointer;
    }
  }
`

export const HamburgerBottom = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 95px;

  .hCategoryContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
  }

  .hCategoryBox {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 8px;
    &:hover {
      cursor: pointer;
    }
  }

  .AdminBox {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    &:hover {
      cursor: pointer;
    }
  }

  .hCategoryName {
    font-size: 1.9em;
    color: #ffffff;
  }

  .speechBubbleIcon {
    transform: scaleX(-1);
  }
`
