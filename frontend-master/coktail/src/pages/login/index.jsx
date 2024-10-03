import * as Styled from './style'

import { Link, useNavigate } from 'react-router-dom'
import LogoIcon from '@components/icons/LogoIcon'
import KakaoTalkIcon from '@components/icons/KakaoTalkIcon'

export default function LoginPage() {
  const navigate = useNavigate()

  const kakaoLoginOn = () => {
    try {
      document.location.href =
        'http://kdt-sw-7-team07.elicecoding.com/api/v1/auth/kakao/redirectLogin'

      // document.location.href =
      //   'http://localhost:5173/api/v1/auth/kakao/redirectLogin'
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Styled.LoginContainer>
        <Link to="/">
          <LogoIcon width={150} height={60} />
        </Link>

        <p>로그인하고 더 다양한 콘텐츠를 즐겨보세요!</p>

        <div onClick={() => kakaoLoginOn()} className="kakaoLoginBox">
          <KakaoTalkIcon />
          <p>카카오톡으로 로그인</p>
        </div>
      </Styled.LoginContainer>
    </>
  )
}
