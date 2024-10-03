import styled from 'styled-components'
import { useEffect, useState } from 'react'
import StarArray from '@/components/StarsArray'

export default function AverageRate({ data }) {
  const [rates, setRates] = useState(0)

  // console.log(data)

  const getRatesData = () => {
    if (!data.reviews) return
    const ratesArr = data.reviews.map((i) => i.rating)
    const sum = ratesArr.reduce((acc, value) => acc + value, 0)
    const avr = sum / ratesArr.length
    setRates(avr)
  }

  useEffect(() => {
    getRatesData()
  }, [])

  return (
    <Container>
      <p>평점</p>
      <StarArrWrap>
        <StarArray starCount={parseInt(rates)} />
      </StarArrWrap>
      {!rates ?
        (<p className="nonAveRate">
          아직 별점이 없어요
          <br />
          리뷰와 함께 남겨주세요 ~!
        </p>)
      :
        (<p className="averageRate">{rates}</p>)
      }
    </Container>
  )
}

const Container = styled.div`
  border-radius: 10px;
  padding: 30px;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 2em;
    font-weight: bold;
  }
  .averageRate {
    background-color: #fee995;
    border-radius: 3rem;
    font-size: 54px;
    font-weight: bold;
    margin-top: 30px;
    padding: 20px 56px;
  }
  .nonAveRate {
    font-size: 1rem;
    background-color: #fee995;
    border-radius: 3rem;
    text-align: center;
    padding: 20px 50px;
    margin-top: 30px;
    line-height: 1.2rem;
  }
`
const StarArrWrap = styled.div`
  padding-top: 30px;
  svg {
    width: 2em;
    height: 2em;
  }
`
