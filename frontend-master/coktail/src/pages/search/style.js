import styled from 'styled-components'
import { primaryPink, paddingBottom } from '@/assets/styleVariables'

export const search = styled.div`
  margin-bottom: 2em;
`

export const query = styled.div`
  padding: 2em;
  margin: 1em;
  border-radius: 10px;
  display: flex;
  align-items: baseline;
  background-color: ${primaryPink};
  box-shadow: 0 0 5px gray inset;
  h2 {
    font-size: 1.5em;
    font-weight: bold;
    margin-right: 5px;
  }
`

export const category = styled.div`
  & > div:first-child {
    display: flex;
    align-items: baseline;
    padding: 2em 2em 1em 2em;
    justify-content: space-between;
    & > div {
      display: flex;
      align-items: baseline;
      & > div {
        display: flex;
      }
    }
    h2 {
      font-size: 2em;
    }
  }
  .observer {
    height: ${paddingBottom};
  }
`
