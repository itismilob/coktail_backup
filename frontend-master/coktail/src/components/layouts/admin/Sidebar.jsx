import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Styled from './Sidebar.style'
import axios from 'axios'

//icon
import PersonIcon from '@components/icons/PersonIcon'
import CocktailIcon from '@components/icons/CocktailIcon'
import ReviewIcon from '@components/icons/ReviewIcon'
import RecipeIcon from '@components/icons/RecipeIcon'
import BarIcon from '@components/icons/BarIcon'
import LogoutIcon from '@components/icons/LogoutIcon'
import AdminIcon from '@components/icons/AdminIcon'
import BaseIcon from '@components/icons/BaseIcon'

import { isUserStore } from '@/store/isTokenStore'

const menuItems = [
  {
    icon: <PersonIcon width={25} height={25} fill={'#545454'} />,
    text: '유저 관리',
    link: '/admin/users',
  },
  {
    icon: <ReviewIcon width={25} height={25} fill={'#545454'} />,
    text: '리뷰 관리',
    link: '/admin/reviews',
  },
  {
    icon: <BaseIcon />,
    text: 'Base 관리',
    link: '/admin/bases',
  },
  {
    icon: <CocktailIcon width={25} height={25} fill={'#545454'} />,
    text: '칵테일 관리',
    link: '/admin/cocktails',
  },
  {
    icon: <RecipeIcon width={29} height={29} fill={'#545454'} />,
    text: 'DIY 레시피 관리',
    link: '/admin/recipes',
  },
  {
    icon: <BarIcon width={25} height={25} fill={'#545454'} />,
    text: 'Bar 관리',
    link: '/admin/bars',
  },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const [activeItem, setActiveItem] = useState(null)
  const { setUser, setIsLogin } = isUserStore((state) => state)

  const handleItemClick = (index) => {
    setActiveItem(index)
  }

  const kakaoLogout = async () => {
    try {
      const logout = await axios.delete('/users/logout')

      if (logout.status === 204) {
        setUser({})
        setIsLogin(false)
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Styled.SidebarContainer>
      <div>
        <Styled.LogoContainer>
          <Link to="/admin">
            <AdminIcon className="logo" />
          </Link>
        </Styled.LogoContainer>
        {menuItems.map((item, index) => (
          <Link to={item.link} key={index}>
            <Styled.MenuItem
              $isActive={index === activeItem}
              onClick={() => handleItemClick(index)}
            >
              <Styled.MenuICon>{item.icon}</Styled.MenuICon>
              <span className="sideText">{item.text}</span>
            </Styled.MenuItem>
          </Link>
        ))}
      </div>
      <div>
        <Link to={'/'}>
          <Styled.MenuItem>
            <Styled.MenuICon>
              <LogoutIcon />
            </Styled.MenuICon>
            <span className="sideText">나가기</span>
          </Styled.MenuItem>
        </Link>
        <Styled.MenuItem onClick={() => kakaoLogout()}>
          <Styled.MenuICon>
            <LogoutIcon />
          </Styled.MenuICon>
          <span className="sideText">로그아웃</span>
        </Styled.MenuItem>
      </div>
    </Styled.SidebarContainer>
  )
}
