import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

/* color */
import { deepGreen, thirdPink } from '@/assets/styleVariables'


//SlideSetting
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}


export default function Recipe({ type, data }) {
  //recipes 정보를 변수에 저장
  const recipeArr = data.recipes;

  return (
    <Container type={type}>
      <span className="titleBadge">레시피</span>
      <div className="slideContainer">
        <Slider {...settings}>
          {recipeArr && recipeArr.map((i, index) => (
            <SlideBox key={index + i}>
              <div className='singleSlide'>
                <div>
                  <img src={i.image} alt="레시피사진" />
                </div>
                <p>{i.content}</p>
              </div>
            </SlideBox>
          ))}
        </Slider>
      </div>
    </Container>
  )
}

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 24px;
  box-sizing: border-box;
  .titleBadge {
    background-color: ${({ type }) =>
      type === 'cocktail' ? thirdPink : deepGreen };
    padding: 5px 15px;
    border-radius: 20px;
    color: #ffffff;
  }
`


const SlideBox = styled.div`
  display: flex;
  justify-content: center;
  .singleSlide{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    div{
      margin-top: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 20em;
      overflow: hidden;

      img{
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    p{
      padding: 22px;
      line-height: 22px;
      text-align: center;
      width: 100%;
    }
  }
`
