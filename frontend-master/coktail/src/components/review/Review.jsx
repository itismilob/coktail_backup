import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ReviewBox from '@/components/review/ReviewBox';
import { NotData } from '@/pages/mypage/MyPage.style'
import { api } from '@/utils/api';
import { reviewStore } from '@/store/reviewStore';

export default function ReviewContainer({data}) {
  const [isReviewpage, setIsReviewpage] = useState(true);
  const [item, setItem] = useState({
    page: 0,
    item: 6,
  });
  const { reviewData, setReviewData } = reviewStore(state=>state);
  const [ isChangeCheck, setIsChangeCheck ] = useState(true);
  const { pathname } = useLocation();
  
  useEffect(()=>{
    if(pathname.includes('reviews')) {
      setIsReviewpage(true);
    } else {
      setIsReviewpage(false); 
    }
  },[])

  useEffect(()=> {
    if(pathname.includes('reviews')) {
      GetReviewData();
    } else {
      setReviewData(data)
    }
  },[isChangeCheck])

  const GetReviewData = async () => {
    try {
      const params = {
        item: item.item,
        page: item.page + 1,
        id: pathname.split('/')[2]
      }
      const reviewDatas = await api.get(
        '/reviews/list', {params}
      )
      
      // if(reviewDatas.status === 200){
        setReviewData(reviewDatas.data.data);
      // }
      setItem({
        ...item,
        page: item.page + 1
      })
    } catch(error) {
      console.error(error);
    }
  }

  //리뷰 좋아요 추가
  const postThumbs = async (id) => {
    try {
      const thumbsUp = await api.post(
        `/reviews/${id}/likes`
      )
      // console.log('좋아요', thumbsUp)
      setItem({
        ...item,
        page: item.page - 1
      })
      setIsChangeCheck(!isChangeCheck)

    } catch (error) {
      console.error(error);
    }
  }
  

  //리뷰 좋아요 삭제
  const deleteThumbs = async (id) => {
    try {
      const unThumbsUp = await api.delete(
        `/reviews/${id}/likes`
      )
      // console.log('좋아요 취소', unThumbsUp)
        setItem({
          ...item,
          page: item.page - 1
        })
        setIsChangeCheck(!isChangeCheck)
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {Array.isArray(reviewData) && reviewData.length ?  
        reviewData.map((element, index) => {
          if(!isReviewpage){
              return <ReviewBox data={element} key={element._id}               postThumbs={postThumbs} deleteThumbs={deleteThumbs} />
          } else if(isReviewpage){
            return <ReviewBox data={element} key={element._id}               postThumbs={postThumbs} deleteThumbs={deleteThumbs} />
          } 
        })
      : <NotData><p>아직 리뷰가 없습니다.</p><p>첫 리뷰를 남겨보세요~</p></NotData>}
    </>
  )
}