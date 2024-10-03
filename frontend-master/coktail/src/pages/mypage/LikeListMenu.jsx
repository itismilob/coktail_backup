import { Link } from 'react-router-dom'
import * as Styled from './Menu.style'
import Title from '@/components/title'

//아이콘
import LikedCocktailIcon from '@components/icons/LikedCocktailIcon'
import LikedRecipeIcon from '@components/icons/LikedRecipeIcon'

export default function LikeListMenu() {
  return (
    <Styled.LikeMenuContainer>
      <Title>찜</Title>
      <Styled.LikeMenuBox>
        <Link to="/mypage/likes/list?search-type=cocktails">
          <div className="likeMenuTitleBox">
            <LikedCocktailIcon />
            <div>
              <p>칵테일 찜</p>
            </div>
          </div>
        </Link>
        <Link to="/mypage/likes/list?search-type=recipes">
          <div className="likeMenuTitleBox">
            <LikedRecipeIcon />
            <div>
              <p>DIY 레시피 찜</p>
            </div>
          </div>
        </Link>
      </Styled.LikeMenuBox>
    </Styled.LikeMenuContainer>
  )
}
