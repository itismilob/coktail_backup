import styled from 'styled-components'
import { headerHeight } from '@/assets/styleVariables'

export const mapContainer = styled.div`
  height: calc(100vh - ${headerHeight});
  position: relative;
`

export const map = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: gray;
  width: 100%;
  height: 100%;
  #kakaoMap {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`

export const barInfo = styled.div`
  height: ${(props) => (props.$isInfoOn ? 'calc(100% - 5em)' : '30px')};
  position: absolute;
  background-color: white;
  width: 100%;
  z-index: 1;
  bottom: 0;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 0 10px gray;
  transition-duration: 500ms;
  overflow: hidden;
  & > button {
    height: 30px;
    width: 100%;
    text-align: center;
    box-shadow: 0 0 5px gray;
    svg {
      height: 50%;
    }
  }
  & > div {
    opacity: ${(props) => (props.$isInfoOn ? '1' : '0')};
    height: calc(100% - 30px);
    display: flex;
    flex-direction: column;
    & > * {
      border-radius: 10px;
      box-shadow: 0 0 10px gray;
      height: 50%;
      margin: 2em;
    }
    img {
    }
    .infoList {
      display: grid;
      padding: 1em 2em;
      grid-template-columns: 30% 70%;
      justify-content: center;
      align-items: center;
    }
  }
`
