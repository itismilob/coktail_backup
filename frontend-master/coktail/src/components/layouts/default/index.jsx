import Header from './Header'
import Footer from './Footer'

import { useMemo, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { headerHeight } from '@/assets/styleVariables'
import { maxWidth } from '@/assets/styleVariables'
import LoginCheck from '@/utils/LoginCheck'
import { primaryPink } from '@/assets/styleVariables'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0) 
  }, [pathname])

  LoginCheck(pathname)
  const isPublicLayout = useMemo(
    () =>
      pathname === '/survey' ||
      pathname === '/login' ||
      pathname === '/testLogin',
    [pathname],
  )
  const isIndexLayout = useMemo(() => pathname === '/', [pathname])

  return (
    <StyledLayout>
      <div>
        {isPublicLayout && (
          <main>
            <Outlet />
          </main>
        )}
        {isIndexLayout && (
          <div>
            <Header />
            <main>
              <Outlet />
            </main>
            <Footer />
          </div>
        )}
        {!isPublicLayout && !isIndexLayout && (
          <div>
            <Header />
            <StyledMain>
              <Outlet />
            </StyledMain>
            <Footer />
          </div>
        )}
      </div>
    </StyledLayout>
  )
}

const StyledMain = styled.main`
  min-height: calc(100vh - ${headerHeight});
  padding-top: ${headerHeight};
`

const StyledLayout = styled.div`
  display: flex;
  justify-content: center;
  background-color: #eee;
  & > div {
    display: flex;
    width: 100%;
    flex-direction: column;
    max-width: ${maxWidth};
    min-height: 100vh;
    /* overflow: hidden; */
    background-color: white;
    box-shadow: 0 0 10px gray;
    /* &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${primaryPink};
      border-radius: 1000px;
    } */
  }
`
