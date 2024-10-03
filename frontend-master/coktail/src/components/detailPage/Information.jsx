import styled from 'styled-components'

/* components */
import ImageAndCircle from '@/components/ImageAndCircle'
import ShowHashTag from './ShowHashTag'
import StarsArray from '@/components/StarsArray'

const rateTitle = ['도수', '단맛', '신맛', '쓴맛']

export default function Information({ type, data }) {
  //데이터에서 값 참조 후 배열로 저장
  const { abv, sweet, sour, bitter } = data
  const rateArr = [abv, sweet, sour, bitter]

  // console.log(data)
  return (
    <Container>
      <div className="gapBox">
        <Title>{data.name}</Title>
        <ShowHashTag data={data.tags} type={type} tagColor={0} ftColor={0} />
      </div>
      {type === 'cocktail' ? 
        <ImageAndCircle imgUrl={data.image} circleColor={0} />
       : 
        <div className="imgWrap">
          <img src={data.image} alt={data.name} />
        </div>
      }

      <RatingBox>
        {rateArr[0] &&
          rateArr.map((i, index) => (
            <Rating key={index + i}>
              <div className="rateTitle">{rateTitle[index]}</div>
              <StarsArray key={index} starCount={i} />
            </Rating>
          ))}
      </RatingBox>
    </Container>
  )
}

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 24px;
  box-sizing: border-box;
  .gapBox {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .imgWrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    margin: 1.2rem 0; 
    img{
      max-width: 100%;
      max-height: 100%;
    }
  }
`

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  line-height: 24px;
  + .hashTagWrap {
    margin-top: 18px;
  }
`

const RatingBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 20px;
  padding: 5px 25px;
  justify-content: space-between;
`
const Rating = styled.div`
  display: flex;
  max-width: 124px;
  justify-content: space-between;

  .rateTitle {
    width: 60px;
  }
`
