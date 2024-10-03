import styled from 'styled-components';
import { primaryGray ,primaryPink, primaryBlue, secondGray, thirdGray } from '@/assets/styleVariables';

export const Content = styled.div`
  border-radius: 10px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  gap: 20px;

  .profileImg {
    width: 58px;
    height: 58px;
    border-radius: 50px;
    background-color: ${primaryGray};
  }
`

export const ReviewWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  .reviewContent {
    display: flex;
    gap: 10px;
  }

  .stars{
    svg{
      width: 1.3em;
      height: 1.3em;
    }
  }
  .createdAt {
    font-size: 0.6em;
    color: ${thirdGray};
  }

  .review {
    padding-top: 0.3em;
    word-break: break-all;
    width: 100%;
    white-space: pre-wrap;
    line-height: 1.2em;
  }

  .reviewImg {
    min-width: 5.5em;
    min-height: 6.5em;
    max-width: 5.5em;
    max-height: 6.5em;
    background-color: ${secondGray};
    box-shadow: 3px 3px 8px ${thirdGray} inset;
    border-radius: 5px;
  }

  .reviewImg > img {
    width:100%;
    height:100%;
    object-fit:cover;
  }

  .categoryName {
    display: flex;
    gap: 5px;

    .parenthesisIcon {
      transform: scaleX(-1);
    }
  }

  .reviewTopText {
    display: flex;
    font-size: 0.7em;
    justify-content: space-between;
  }
`

export const LikeBtn = styled.div`
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9em;

  > p {
    font-size: 0.9em;
    padding-top: 5px;
  }

  .thumbsUp {
    &:hover {
      cursor: pointer;
    }
  }
`

export const ModifyDeleteBtn = styled.div`
  align-self: flex-end;
  display: flex;
  align-items: flex-end;
  display: flex;
  gap: 8px;
  > button {
    font-size: 0.8em;
    width: 60px;
    height: 25px;
    border-radius: 4px;
    padding: 3px 6px;
    &:hover {
      cursor: pointer;
    }
  }
  button:first-child {
    background-color: ${primaryPink};
  }
  button:last-child {
    background-color: ${primaryBlue};
  }
`