import { useEffect, useState } from 'react'
import * as Styled from './style'
import ReviewContainer from '@/components/review/Review'
import { useSearchParams } from 'react-router-dom'

export default function Reviews() {
  const [searchParams] = useSearchParams();
  const [title, setTitle] = useState();
  
  useEffect(()=> {
    const receivedTitle = searchParams.get('title');
    setTitle(receivedTitle);
  },[])

  return (
    <>
      <Styled.ReviewTitle>
        <p className="reviewTitle">리뷰</p>
        <p className="productTitle">{title && title}</p>
      </Styled.ReviewTitle>
      <Styled.ReviewContainer>
        <ReviewContainer />
      </Styled.ReviewContainer>
    </>
  )
}
