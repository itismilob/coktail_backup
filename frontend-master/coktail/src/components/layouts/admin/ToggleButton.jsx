import { useState } from 'react'
import * as Styled from './Main.style'

const ToggleButton = ({ isWrite, toggleHandler, value }) => {
  const [isToggled, setIsToggled] = useState(isWrite) // 초기 상태를 isWrite 값으로 설정합니다.

  const toggle = () => {
    if (confirm('사용자의 글쓰기 권한을 변경하시겠습니까?')) {
      setIsToggled(!isToggled)
      toggleHandler(value)
    }
  }

  return (
    <Styled.ToggleContainer $isToggled={isToggled} onClick={toggle}>
      <Styled.OnLabel $isToggled={isToggled}>ON</Styled.OnLabel>
      <Styled.ToggleCircle />
      <Styled.OffLabel $isToggled={!isToggled}>OFF</Styled.OffLabel>
    </Styled.ToggleContainer>
  )
}

export default ToggleButton
