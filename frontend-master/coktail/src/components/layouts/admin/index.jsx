import Sidebar from './Sidebar'
import { Outlet, useLocation} from 'react-router-dom'
import * as Styled from './Main.style'
import LoginCheck from '@/utils/LoginCheck';


export default function Layout() {
  const {pathname} = useLocation();
  LoginCheck(pathname);
  return (
    <Styled.Container>
      <Sidebar />
      <Styled.Main>
        <Outlet />
      </Styled.Main>
    </Styled.Container>
  )
}
