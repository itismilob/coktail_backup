import { useState, useEffect } from 'react'
import mainBannerLeft from '@/assets/coktail_main_left_img.png'
import mainBannerRight from '@/assets/coktail_main_right_img.png'
import * as Styled from './Admin.Style'

export default function AdminPage() {
  const [Title, setTitle] = useState('')
  const [count, setCount] = useState(0)
  const content = ['칵테일 한잔 어때요?', '안녕하세요 관리자님 :)']

  useEffect(() => {
    const fullContent = content.join('\n') //배열로 문단 나누기
    if (count < fullContent.length) {
      const typingInterval = setInterval(() => {
        setTitle((prevTitleValue) => prevTitleValue + fullContent[count])
        setCount(count + 1)
      }, 200)

      return () => {
        clearInterval(typingInterval)
      }
    }
  }, [count, content])

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
      }}
    >
      <Styled.Banner>
        <img src={mainBannerRight} className="mainBannerRight" />
        <img src={mainBannerLeft} className="mainBannerLeft" />
      </Styled.Banner>
      <Styled.TypingContainer>
        {Title.split('\n').map((line, index) => (
          <Styled.Content key={index}>
            {line}
            <br />
          </Styled.Content>
        ))}
      </Styled.TypingContainer>
    </div>
  )
}
