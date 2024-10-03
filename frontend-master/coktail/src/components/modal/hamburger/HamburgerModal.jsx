import { Link, useNavigate } from 'react-router-dom';
import * as Styled from './Hamburger.style';
import axios from 'axios';

//아이콘
import FullHeartIcon from '@components/icons/FullHeartIcon';
import CocktailIcon from '@components/icons/CocktailIcon';
import LogoIcon from '@components/icons/LogoIcon';
import CloseIcon from '@components/icons/CloseIcon';
import PreArrowIcon from '@components/icons/PreArrowIcon';
import PersonIcon from '@components/icons/PersonIcon';
import ActivityIcon from '@components/icons/ActivityIcon';
import RecipeIcon from '@components/icons/RecipeIcon';
import BarIcon from '@components/icons/BarIcon';
import TieIcon from '@components/icons/TieIcon';
import LogoutIcon from '@components/icons/LogoutIcon';

import { isUserStore } from '@/store/isTokenStore';

export default function HamburgerModal({ onClose }) {
  const { user, setUser, isLogin, setIsLogin } = isUserStore(state=>state);
  const navigate = useNavigate();
  const handleClose = () => {
    onClose?.()
  }

  const kakaoLogout = async()=>{
    try {
      const logout = await axios.delete('/users/logout');

      if(logout.status === 204){
        setUser({});
        setIsLogin(false);
        handleClose();
        navigate('/');
      }

    } catch (error) {
      console.error(error);
    }
  }

  const LoginFalse = 
    <div 
      className="LoginFalseBox" 
      onClick={handleClose}
    >
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <p className='loginPTag'>로그인 하러가기</p>
      </Link>
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <div className='goLoginPage'>
          <PreArrowIcon width={15} height={15} />
        </div>
      </Link>
    </div>
    
  const LoginTrue = <div 
      className="goLoginBox" 
    >
      <p>{user.nickname ? user.nickname + '님' : ''} 안녕하세요!</p>
      <div className='logout' onClick={() => kakaoLogout()}>
        <LogoutIcon width={20} height={20} fill={'#ffffff'} />
        <div className='logoutText'>로그아웃</div>
      </div>
    </div>

  return (
    <Styled.HamburgerContainer>
      <Styled.HamburgerHeader>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className='HamburgerLogo' onClick={handleClose} >
            <LogoIcon 
              width={120} height={50} fill={'#ffffff'}
            />
          </div>
        </Link>
        <div className='closeHamburger' onClick={handleClose} >
          <CloseIcon />
        </div>
      </Styled.HamburgerHeader>

      <Styled.HamburgerTopMenu>
        { isLogin ? LoginTrue : LoginFalse }

        <div className="iconContainer">
          <Link to="/mypage" style={{ textDecoration: 'none' }}>
            <div className="hIconBox" onClick={handleClose}>
              <PersonIcon />
              <p className="hIconName">My</p>
            </div>
          </Link>
          <Link to='/mypage/likes' style={{ textDecoration: "none"}}>
            <div className='hIconBox' onClick={ handleClose }>
              <FullHeartIcon width={30} height={30} fill={'#ffb6b5'} />
              <p className='hIconName'>찜</p>
            </div>
          </Link>
          <Link to='/mypage/activities' style={{ textDecoration: "none"}}>
            <div className='hIconBox' onClick={ handleClose }>
              <div>
                <ActivityIcon />
              </div>
              <p className='hIconName'>내 활동</p>
            </div>
          </Link>
        </div>
      </Styled.HamburgerTopMenu>

      <Styled.HamburgerBottom>
        <div className='hCategoryContainer'>
          <Link to='/cocktails' style={{ textDecoration: "none"}}>
            <div className='hCategoryBox' onClick={ handleClose }>
              <CocktailIcon width={22} height={22} />
              <p className="hCategoryName">칵테일</p>
            </div>
          </Link>
          <Link to='/recipes' style={{ textDecoration: "none"}}>
            <div className='hCategoryBox' onClick={ handleClose }>
              <RecipeIcon />
              <p className="hCategoryName">DIY 레시피</p>
            </div>
          </Link>
          <Link to="/map" style={{ textDecoration: 'none' }}>
            <div className="hCategoryBox" onClick={handleClose}>
              <BarIcon />
              <p className="hCategoryName">주변 Bar 검색</p>
            </div>
          </Link>
          {user.isAdmin && 
            <Link to="/admin">
              <div className="AdminBox" onClick={handleClose}>
                <TieIcon />
                <p className="hCategoryName">관리자 페이지</p>
              </div>
            </Link>
            }
        </div>
      </Styled.HamburgerBottom>
    </Styled.HamburgerContainer>
  )
}
