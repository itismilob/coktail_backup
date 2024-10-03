import styled from 'styled-components'
import { primaryPink, secondBlue } from '@/assets/styleVariables'

export const main = styled.div`
  padding-bottom: 2em;
`

export const Banner = styled.div`
  background-color: #f8d2cd;
  overflow: hidden;

  h1 {
    margin-top: 130%;
    margin-bottom: 20%;
    width: 100%;
    text-align: center;
    font-size: 2rem;
    z-index: 10;
    position: relative;
    &:hover {
      cursor: default;
    }

    animation: BannerText 2s linear;
    @keyframes BannerText {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }

  div {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      width: 100%;
      position: absolute;
    }
  }

  .mainBannerRight {
    animation: cheersRight 0.8s linear;
    @keyframes cheersRight {
      0% {
        opacity: 0;
        transform: translatex(40%);
      }
      50% {
        opacity: 1;
        transform: translatex(-3%);
      }
      100% {
        opacity: 1;
        transform: translatex(0%);
      }
    }
  }

  .mainBannerLeft {
    animation: cheersLeft 0.8s linear;
    @keyframes cheersLeft {
      0% {
        opacity: 0;
        transform: translatex(-40%);
      }
      50% {
        opacity: 1;
        transform: translatex(2%);
      }
      100% {
        opacity: 1;
        transform: translatex(0%);
      }
    }
  }
`

export const Base = styled.div`
  h2 {
    text-align: center;
    margin: 1em 0;
    &:hover {
      cursor: default;
    }
  }
  .baseList {
    display: flex;
    align-items: center;
    overflow-x: scroll;
    padding: 1em 0;
    &::-webkit-scrollbar {
      width: auto;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${primaryPink};
      border-radius: 1000px;
      background-clip: padding-box;
      border: 3px solid transparent;
    }
    &::-webkit-scrollbar-track {
    }
    h2 {
      transform: rotate(-90deg);
      font-size: 1rem;
      white-space: nowrap;
    }
  }
  .baseDrink {
    h3 {
      text-align: center;
      width: 200px;
    }
  }
`

export const survey = styled.div`
  position: relative;
  margin-top: 1em;
  & > div:first-child {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(
      180deg,
      rgba(255, 237, 225, 1) 0%,
      rgba(255, 234, 215, 1) 30%,
      rgba(255, 239, 152, 1) 100%
    );
    h2 {
      padding: 1em 0;
      font-size: 1.5rem;
      &:hover {
        cursor: default;
      }
    }
    a {
      width: 50%;
      margin-bottom: 100px;
      font-weight: bold;
      background-color: #ffd493;
      border-radius: 1000px;
      box-shadow: 0 5px 10px gray;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      &:hover {
        background-color: #ffc093;
      }
      div {
        padding: 1em;
      }
      svg {
        width: 20px;
        height: 14px;
      }
    }
  }
  & > div:last-child {
    overflow: hidden;
    position: absolute;
    margin-top: 6em;
    top: 0;
    display: flex;
    img {
      width: 100%;
      height: 100%;
    }
  }
`

export const suggest = styled.div`
  & > h2 {
    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
    margin: 100px 0 10px 0;
  }

  .suggestSlide {
    padding: 10px;
    .slick-arrow {
      display: none !important;
    }
  }

  .suggestDrink {
    padding: 10px;
    a > div {
      width: 100%;
      height: 100%;
      display: flex !important;
      /* border: 2px solid ${primaryPink}; */
      box-shadow: 0 0 5px lightgray;
      box-sizing: border-box;
      border-radius: 10px;
      padding: 1em;
      gap: 1em;
      & > div:first-child {
        width: 40%;
      }

      & > div:last-child {
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 1em;
        .tag {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          div {
            padding: 5px;
            background-color: ${secondBlue};
            border-radius: 10000px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
          }
        }
        h1 {
          width: 100%;
          font-size: 1.3em;
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .stars {
          display: flex;
          flex-direction: column;
          width: 100%;
          align-items: center;
          gap: 10px;
          & > div {
            display: flex;
            width: 100%;
            justify-content: space-between;
            & > div {
              width: 50%;
            }
          }
        }
        .btns {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          button {
            display: flex;
            gap: 5px;
          }
        }
      }
    }
  }
`

export const suggestNone = styled.div`
  width: 100%;
  margin-top: 2em;
  padding: 2em;
  div {
    padding: 2em;
    display: flex;
    justify-content: center;
    text-align: center;
    box-shadow: 0 0 10px lightgray;
    border-radius: 10px;
    line-height: 2em;
  }
`

export const famous = styled.div`
  margin-top: 5em;
  h2 {
    font-size: 2em;
    font-weight: bold;
    text-align: center;
    margin: 50px 0 20px 0;
    &:hover {
      cursor: default;
    }
  }
  & > div {
    display: grid;
    grid-template-columns: repeat(2, 50%);
  }
  .famousDrink {
    text-align: center;
    height: 20em;
    & > div:first-child {
      height: 80%;
    }
    & > div:last-child {
      height: 20%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .star {
        display: flex;
        justify-content: center;
        align-items: baseline;
        gap: 5px;
      }
    }
  }
`

export const cell = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
  border: 1px solid black;
`
