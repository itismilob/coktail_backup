import styled from 'styled-components';
import { primaryGray, thirdGray } from '@/assets/styleVariables';

export const MyPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
  padding-top: 70px;
  gap: 40px;

  .profileBox {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2em;
  }

  .profileImg {
    width: 8em;
    height: 8em;
    border-radius: 50%;
    background-color: ${primaryGray};
    position : relative;
  }

  .defaultProfile{
    position : absolute;
  }

  .profile {
    display: flex;
    flex-direction: column;
    gap: 13px;
    color: #000000;
    font-weight: 600;
    > p {
      &:first-child{
        font-size: 1.3em;
      }
      &:last-child {
        color: #797979;
        font-size: 1.1em;
        font-weight: 400;
        font-size: 0.8em;
      }
    }
  }

  .mypageContent {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 98%;
    padding-top: 20px;
  }

  .movePageBox {
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px #797979;
    padding: 10px 15px;
    &:hover {
      cursor: pointer;
    }
  }

  .movePageBox > p {
    width: 15em;
    color: #797979;
    font-size: 1em;
    font-weight: 600;
  }

  .surveywithdrawalBox {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .surveybtn {
    width: 110px;
    height: 35px;
    border: none;
    border-radius: 94px;
    background-color: #B2EEFF;
    &:hover {
      cursor: pointer;
    }
  }

  .withdrawal {
    font-size: 0.8em;
    color: ${thirdGray};
    padding-right: 1em;
    &:hover {
      cursor: pointer;
    }
  }

  .movePageIcon {
    transform: scaleX(-1);
  }
`

export const NotData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  color: ${thirdGray};
  padding: 2em;
  text-align: center;
`