import styled from 'styled-components'
import { headerHeight } from '@/assets/styleVariables'
//index.jsx
export const ContainerSurvey = styled.div`
  width: 100%;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-position: center center;
`

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem 0 1.5rem;
  align-items: center;
  width: 100%;

  button {
    cursor: pointer;
  }
`

export const ContentDiv = styled.div`
  width: 100%;
  height: calc(100vh - ${headerHeight});
  display: flex;
  justify-content: center;
  display: flex;
  /* justify-content: space-between; */
  padding: 0 10px;
  /* align-items: baseline; */
`

//StartPage.jsx
export const ContainerStart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;

  .btn {
    background: #ffa1a1;
    border-radius: 2rem;
    padding: 0.8rem;
    color: #ffffff;
    font-size: 1rem;
  }
`

//ResultPage.jsx
export const ContainerResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 220px;

  .btn {
    width: 60%;
    background: #ffa1a1;
    color: #ffffff;
    font-size: 1.2rem;
    border-radius: 2rem;
    padding: 0.7rem;
  }
`
//Question.jsx
export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  width: 100%;
  padding-top: 60px;
`
export const Question = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  text-align: center;
`

export const QuestionNumber = styled.div`
  font-size: 2rem;
  font-weight: bolder;
  width: 100%;
`

export const QuestionContent = styled.div`
  font-size: 1.35rem;
  font-weight: bold;
`
export const QuestionBtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 0.4rem;

  button {
    background: rgba(91, 91, 91, 0.73);
    border-radius: 1rem;
    color: white;
    width: 20em;
    height: 4em;
    padding: 10px 0;
    font-size: 0.9rem;
  }

  button:hover {
    background: rgba(91, 91, 91, 0.9);
  }

  button:active {
    background: rgba(41, 41, 41, 0.9);
  }

  span {
    text-align: center;
  }
`
