import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import StarsArray from '@/components/StarsArray';
import * as Styled from './style';

import { useDebounce } from '@/hooks/useDebounce';
import { isUserStore } from '@/store/isTokenStore';

//아이콘
import PreArrowIcon from '@/components/icons/PreArrowIcon';
import ThumbsUpIcon from '@/components/icons/ThumbsUpIcon';
import ModifyReview from '../../pages/mypage/ModifyReview';
import DefaultProfileIcon from '@/components/icons/DefaultProfileIcon';

export default function ReviewBox({data, deleteMyReview, postThumbs, deleteThumbs}){
  //페이지 확인을 위한 useState
  const { pathname } = useLocation();
  //페이지 url 확인
  const [isMypage, setIsMypae] = useState(false);
  const [isModify, setIsModify] = useState(false);

  const [currentThumbs, setCurrentThumbs] = useState(data.isLiked);
  const { user } = isUserStore((state) => state);
  const thumbsClick = (isThumbsCheck) => {
    if(isThumbsCheck) {
      postThumbs(data._id)
    } else {
      deleteThumbs(data._id);
    }
  }

  const ClickHandler = () => {
    setCurrentThumbs((prev) => !prev);
    setThumbsDebounce(!currentThumbs);
  }

  const setThumbsDebounce = useDebounce(thumbsClick, 500);

  useEffect(()=>{
    // console.log("data: ", data);
    if(pathname.includes('mypage')){
      setIsMypae(true);
    } else {
      setIsMypae(false);
    }
  }, [])

  //마이페이지가 아닐 때 닉네임이 보이도록
  const nickname = <div className="nickname">
    {`${data.nickname}`}
  </div>

  //마이페이지일 때 카테고리와 칵테일(레시피) 이름이 보이도록
  const categoryName = <div className="categoryName">
    {data.type}
    <div className='parenthesisIcon'>
      <PreArrowIcon width={8} height={8} />
    </div>
    {data.name && data.name}
  </div>


  //내가 좋아요했는지 체크
  const thumbsBtn = () => {
    if(currentThumbs) {
      return thumbsDownBtn;
    } else {
      return thumbsUpBtn;
    }
  }


  //좋아요를 누를 때
  const thumbsUpBtn = <Styled.LikeBtn onClick={() => {ClickHandler()}}>
    <p>{data.likeCount}</p>
    <div className='thumbsUp'>
      <ThumbsUpIcon fill={'#ffffff'} stroke={'#000000'} />
    </div>
  </Styled.LikeBtn>

  //좋아요를 삭제할 때
  const thumbsDownBtn = <Styled.LikeBtn onClick={() => {ClickHandler()}}>
    <p>{data.likeCount}</p>
    <div className='thumbsUp'>
      <ThumbsUpIcon />
    </div>
  </Styled.LikeBtn>

  //마이페이지일때 수정, 삭제 버튼이 보이도록
  const modifyBtn = <Styled.ModifyDeleteBtn>
    <button onClick={()=>{deleteMyReview(data._id)}}>삭제</button>
    <button onClick={() => {setIsModify(true)} } >수정</button>
  </Styled.ModifyDeleteBtn>


  const isReviewImg = () => {
    if(data.images && data.images.length > 0){
      return (
        <div className='reviewImg'>
          <img src={data.images[0] && data.images[0]} />
        </div>
      )
    }
  }

  const reviewContent = <Styled.Content>
    <div>
      <div className='profileImg'>
        <DefaultProfileIcon className="defaultProfile" width={58} height={58} 
        fill={isMypage ? user.profileColor : data.profileColor} />
      </div>
    </div>
    <Styled.ReviewWrap>
      <div className='reviewTopText'>
        {isMypage ? categoryName : nickname}
        <div className='stars'>
          <StarsArray starCount={data.rating} />
        </div>
      </div>
      <div>
        <p className='createdAt'>{data.createdAt.split('T')[0]}</p>
      </div>
      <div className='reviewContent'>
        <pre className="review">{data.content}</pre>
        {isReviewImg()}
      </div>
      {isMypage ? modifyBtn : thumbsBtn()}
    </Styled.ReviewWrap>
  </Styled.Content>
  
  return (
    <>
      {!isModify ? reviewContent : <ModifyReview data={data} />}
    </>
  )
}


