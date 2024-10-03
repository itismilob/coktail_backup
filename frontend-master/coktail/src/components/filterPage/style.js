import styled from 'styled-components'
import { maxWidth } from '@/assets/styleVariables'

export const StyledTag = styled.div`
  min-width: 80px;
  height: 40px;
  border-radius: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: ${(props) =>
    props.$isSelected ? '1px solid red' : '1px solid black'};
  background-color: ${(props) => (props.$isSelected ? 'pink' : 'white')};
`

export const StyledFilter = styled.div`
  height: 100vh;
  width: 100%;
  max-width: ${maxWidth};
  background-color: white;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  box-sizing: border-box;
  position: fixed;
  z-index: 3;
  h1 {
    border-bottom: 1px solid gray;
  }
  & > div {
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;
    & > div {
      width: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1em;
    }
    h2 {
      font-size: 1em;
    }
    .tags {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 25%);
      grid-auto-rows: 40px;
      justify-content: center;
      align-items: center;
      justify-items: center;
      gap: 5px;
    }
  }
  button {
    width: 100%;
    height: 50px;
    margin-top: 2em;
    background-color: lightgray;
    &:hover {
      background-color: gray;
    }
  }
`
