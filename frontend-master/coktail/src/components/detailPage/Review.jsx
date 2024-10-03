import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { isUserStore } from '@/store/isTokenStore'

/* Component */
import ReviewContainer from '@/components/review/Review'
import CreateReview from '@/components/detailPage/CreateReview'

/* img */
import SpeechBubble from '@/components/icons/SpeechBubbleIcon'
import NextArrowIcon from '@/components/icons/NextArrowIcon'

/* color */
import { deepGreen, thirdPink } from '@/assets/styleVariables'

export default function Review({ data, type, id }) {
  // console.log(id, type)
  const { isLogin } = isUserStore((state) => state)

  const renderFromType = useCallback(() => {
    return (
      <ReviewTitle fill={type === 'cocktail' ? thirdPink : deepGreen}>
        {type === 'cocktail' ? (
          <p>칵테일 리뷰 톡톡</p>
        ) : (
          <p>DIY레시피 리뷰 톡톡</p>
        )}
        <SpeechBubble />
      </ReviewTitle>
    )
  }, [type])

  return (
    <Container>
      <ReviewHeader>{renderFromType()}</ReviewHeader>
      {data.reviews.length >= 2 &&
        <MoreReviews to={`/reviews/${id}?title=${data.name}`}>
          더보기
          <NextArrowIcon width={12} height={12} />
        </MoreReviews>
      }

      <ReviewContainer data={data.reviews} />
      {isLogin && <CreateReview type={type} />}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ReviewHeader = styled.div`
  display: flex;
  justify-content: center;
`

const ReviewTitle = styled.div`
  p {
    font-size: 28px;
    font-weight: 700;
    position: relative;
  }
  position: relative;
  svg {
    position: absolute;
    top: -15px;
    right: -30px;
    path {
      fill: ${(props) => props.fill || thirdPink};
    }
  }
`
const MoreReviews = styled(Link)`
  text-align: right;
`
