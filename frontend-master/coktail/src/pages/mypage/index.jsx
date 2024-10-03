import * as Styled from './MyPage.style'
import { Link } from 'react-router-dom'

import { isUserStore } from '@/store/isTokenStore';

//아이콘
import PreArrowIcon from '@/components/icons/PreArrowIcon'
import DefaultProfileIcon from '@/components/icons/DefaultProfileIcon'
export default function MyPage() {
  const { user, setUser, setIsLogin } = isUserStore((state) => state)
  const withdrawal = async () => {
    try {
      document.location.href =
        'http://kdt-sw-7-team07.elicecoding.com/api/v1/auth/kakao/redirectWithdrawal'

      setUser({})
      setIsLogin(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Styled.MyPageContainer>
        <div className="profileBox">
          <div className="profileImg">
            <DefaultProfileIcon className="defaultProfile" fill={user.profileColor} />
          </div>
          <div className="profile">
            <p>{user.nickname}</p>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="mypageContent">
          <Link
            to="/mypage/likes/list?search-type=cocktails"
            style={{ textDecoration: 'none' }}
          >
            <div className="movePageBox">
              <p>칵테일 찜</p>
              <div className="movePageIcon">
                <PreArrowIcon width={10} height={20} fill={'#797979'} />
              </div>
            </div>
          </Link>
          <Link
            to="/mypage/likes/list?search-type=recipes"
            style={{ textDecoration: 'none' }}
          >
            <div className="movePageBox">
              <p>DIY 레시피 찜</p>
              <div className="movePageIcon">
                <PreArrowIcon width={10} height={20} fill={'#797979'} />
              </div>
            </div>
          </Link>
          <Link to="/mypage/reviews" style={{ textDecoration: 'none' }}>
            <div className="movePageBox">
              <p>내가 쓴 리뷰</p>
              <div className="movePageIcon">
                <PreArrowIcon width={10} height={20} fill={'#797979'} />
              </div>
            </div>
          </Link>
          <Link to="/mypage/recipes" style={{ textDecoration: 'none' }}>
            <div className="movePageBox">
              <p>내가 만든 레시피</p>
              <div className="movePageIcon">
                <PreArrowIcon width={10} height={20} fill={'#797979'} />
              </div>
            </div>
          </Link>
        </div>
        <div className="surveywithdrawalBox">
          <Link to="/survey">
            <button className="surveybtn">취향테스트</button>
          </Link>
        </div>
        <div className="surveywithdrawalBox">
          <p className="withdrawal" onClick={() => withdrawal()}>
            회원탈퇴
          </p>
        </div>
      </Styled.MyPageContainer>
    </>
  )
}
