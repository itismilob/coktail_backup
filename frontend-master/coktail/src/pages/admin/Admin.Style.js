import styled from 'styled-components'

//전체 컨테이너
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
  height: 100vh;
`

export const Button = styled.button`
  background: #efefef;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
`

//상품등록
export const ProductContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* height: 100vh; */
`

//상품등록
export const ProductContentContainer = styled.div`
  display: flex;

  .ImgContainer {
    width: 350px;
    height: 350px;
    padding-right: 10px;
  }
`

export const InpStarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;

  .NameContainer {
    display: flex;
    flex-direction: column;
    width: 350px;
    gap: 20px;
    input {
      padding: 10px;
    }
  }
`

export const StarContainer = styled.div`
  display: flex;
  gap: 30px;
  padding-top: 20px;

  .rating {
    padding-bottom: 10px;
  }
`

export const RatingBox = styled.div`
  display: flex;
  flex-direction: column;
  .ratingWrap {
    display: flex;
    align-items: center;
  }
`

export const BarContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`

export const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  //이미지업로드
  .ImageContainer {
    display: flex;
    width: 350px;
    height: 350px;
  }

  .InputContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 30%;
    padding-left: 1rem;
    gap: 10px;
  }

  input {
    padding: 15px;
  }
`

export const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  width: 60%;
  gap: 30px;
`

//바등록, 상품등록에 버튼
export const ButtonGroup = styled.div`
  display: flex;
  padding-top: 3rem;
  gap: 15px;
  width: 100%;
  justify-content: center;
  .btn {
    border: none;
    border-radius: 20rem;
    cursor: pointer;
    width: 200px;
    height: 36px;
  }
  .cancelBtn {
    background-color: #d9d9d9;
  }
  .submitBtn {
    background-color: #ffc5c5;
  }
`

export const CocktailForm = styled.form`
  display: flex;
  flex-direction: column;
  /* height: 100vh; */
`

//admin 페이지
export const Content = styled.h1`
  font-size: 2rem;
  color: #545454;
  font-weight: bolder;
  line-height: 5rem;
`
export const Banner = styled.div`
  position: relative;
  width: 100%;
  /* overflow: hidden; */
  background-color: #f8d2cd;

  img {
    width: 100%;
    position: absolute;
  }

  .mainBannerRight {
    animation: cheersRight 1s linear;
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
    animation: cheersLeft 1s linear;
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

export const TypingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: auto;
`

//검색
export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
`

//버튼
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`

export const ToggleTd = styled.td`
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
`

export const BaseContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  justify-content: center;

  .ImageBaseContainer {
    width: 350px;
    height: 350px;
  }

  .InputBaseContainer {
    margin-top: 20px;
  }
`
export const Input = styled.input`
  border-radius: 5px;
  border: solid 1px black;
  width: 350px;
  height: 45px;
`

export const StyledSelect = styled.select`
  border-radius: 0.5rem;
  padding: 0.7rem;
  margin: 0.6rem 0;
  width: 150px;
  background: #fff;
  cursor: pointer;
`

export const CoordinateContainer = styled.div`
  padding-top: 5px;

  input {
    border-radius: 5px;
    border: solid 1px black;
    width: 350px;
    height: 45px;
  }

  button {
    background-color: #d9d9d9;
    margin-bottom: 10px;
    border-radius: 20px;
    padding: 8px;
  }
`
