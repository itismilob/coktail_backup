import * as Styled from "./style";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { api } from '@/utils/api'

import LogoIcon from '@components/icons/LogoIcon'
import TieIcon from '@components/icons/TieIcon';

export default function TestLoginPage() {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onIdHandler = (e) => {
    setId(e.currentTarget.value);
  }
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }


  const AdminLogin = async ()=>{
    const data = {
      id: id,
      pw: password
    }
    try {
      const testAdminLogin = await api.post('/users/login', data )

      if(testAdminLogin.status === 201){
        navigate('/')
      }

    } catch (error) {
      console.error(error);
    }
  }

  
  return (
    <>
      <Styled.AdminLoginContainer>
        <Link to="/">
          <LogoIcon width={150} height={60} />
        </Link>

        <div className="comant">
          <p>안녕하세요 관리자님!</p>
          <p>로그인을 해주세요.</p>
        </div>

        <div className="loginInput">
            <input 
              type="text" 
              placeholder="아이디"
              onChange={onIdHandler}
            />
            <input 
              type="password" 
              placeholder="비밀번호"
              onChange={onPasswordHandler}
            />
        </div>

        <div 
          onClick={ ()=> AdminLogin() }
          className="AdminLoginBox"
        >
          <TieIcon width={30} height={30} fill={'#3C3C3C'} />
          <p>관리자 로그인</p>
        </div>
      </Styled.AdminLoginContainer>
    </>
  )
}