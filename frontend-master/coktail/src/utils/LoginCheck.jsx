import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';
import axios from 'axios';
import { isUserStore } from '@/store/isTokenStore';

export default function LoginCheck(pathname) {
  const currentPath = pathname;
  const navigate = useNavigate();

  const { user, setUser, isLogin ,setIsLogin } = isUserStore(state => state);

  useEffect(()=>{
    getUserAuth();

  },[currentPath]);

  const getUserAuth = async() => {
    try {
      const userData = await axios.get('/users/mypage')
      // console.log(userData)
      if(userData.status === 200){
        setUser(userData.data);
        setIsLogin(true);

        if(!user.isAdmin && currentPath.includes('admin')){
          navigate('/');
        } 
        if (currentPath.includes('login')){
          navigate(-1);
        }
      }

    } catch(error) {
      if(error.response.status === 401){
        if(currentPath.includes('mypage') || currentPath === '/survey' || currentPath.includes('admin')){
          navigate('/login');
        }
        if(isLogin){
          alert(
            `로그인 기간이 만료되었습니다.
다시 로그인 해주세요`
          );
          setUser({});
          setIsLogin(false);
          navigate('/login');
        }
      }
    }
  }

  return (
    <></>
  )
}