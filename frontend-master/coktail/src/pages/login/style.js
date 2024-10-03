import styled from 'styled-components';

import { primaryPink ,thirdGray } from '@/assets/styleVariables';


export const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  gap: 80px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 60px;
  background-color: #ffffff;

  .kakaoLoginBox {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8em;
    width: 20em;
    height: 3.5em;
    background-color: #FDE502;
    border-radius: 8px;
    &:hover {
      cursor: pointer;
    }
  }

  .kakaoLoginBox > p {
    font-size: 1em;
    font-weight: 600;
    color: #3C3C3C;
  }

  > p {
    font-size: 1em;
    color: ${thirdGray};
  }
`

export const AdminLoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  gap: 55px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 60px;
  background-color: #ffffff;

  .AdminLoginBox {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8em;
    width: 20em;
    height: 3.5em;
    background-color: ${primaryPink};
    border-radius: 8px;
    &:hover {
      cursor: pointer;
    }
  }

  .AdminLoginBox > p {
    font-size: 1em;
    font-weight: 600;
    color: #3C3C3C;
  }

  .comant{
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    font-size: 1em;
    color: ${thirdGray};
  }

  .loginInput {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.8em;
    width: 100%;

    input {
      width: 70%;
      height: 3.5em;
      border: solid 1px ${thirdGray};
      border-radius: 1em;
      padding: 0.8em;
    }
  }
`