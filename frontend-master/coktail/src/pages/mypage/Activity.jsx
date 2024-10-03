import { Link } from 'react-router-dom';
import * as Styled from './Menu.style';
import Title from '@/components/title';

import { primaryBlue } from '@/assets/styleVariables';

//아이콘
import ReviewIcon from '@/components/icons/ReviewIcon';
import RecipeIcon from '@/components/icons/RecipeIcon';


export default function MyActivity() {
  return (
    <Styled.LikeMenuContainer>
      <Title>내 활동</Title>
      <Styled.LikeMenuBox>
        <Link to="/mypage/reviews" style={{ textDecoration: 'none' }}>
          <div className='likeMenuTitleBox'>
            <ReviewIcon width={65} height={55} fill={primaryBlue} />
            <div>
              <p>내가 쓴 리뷰</p>
            </div>
          </div>
        </Link>
        <Link to="/mypage/recipes" style={{ textDecoration: 'none' }}>
          <div className='likeMenuTitleBox'>
            <RecipeIcon width={80} height={70} fill={primaryBlue} />
            <div>
              <p>내가 만든 레시피</p>
            </div>
          </div>
        </Link>
      </Styled.LikeMenuBox>
    </Styled.LikeMenuContainer>

  )
}
