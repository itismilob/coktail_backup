import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'

/* img */
import BrokenGlass from '@/assets/svg/broken_glass.svg?react'
import PreArrowBtn from '@/assets/svg/white_preArrow_icon.svg?react'

export default function NotFoundPage() {
  const navigate = useNavigate()

  function backBtnHandler() {
    navigate(-1)
  }

  return (
    <Container>
      <div>
        <BackBtnWrap>
          <button className="backBtn" onClick={backBtnHandler}>
            <PreArrowBtn width="25" />
          </button>
        </BackBtnWrap>
        <ContentWrap>
          <BrokenGlass />
          <p className="bigFt">
            404 <br /> ERROR
          </p>
          <p className="smallFt">
            죄송합니다. 페이지를 찾을 수 없습니다.
            <br />
            존재하지 않는 주소를 입력하셨거나,
            <br />
            요청하신 페이지의 주소가
            <br />
            변경, 삭제되어 찾을 수 없습니다.
          </p>
          <LinkToMain to="/">메인으로</LinkToMain>
        </ContentWrap>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #eee;
  & > div {
    max-width: 500px;
    width: 100%;
    box-shadow: 0 0 10px gray;
    background-color: #878787;
    height: 100vh;
  }
`

const BackBtnWrap = styled.div`
  padding: 30px 25px;
`

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #ffffff;
  padding-top: 150px;
  gap: 20px;
  .bigFt {
    font-size: 42px;
    font-weight: 400;
    line-height: 52px;
  }
  .smallFt {
    font-size: 16px;
    line-height: 20px;
    font-weight: 100;
    line-height: 22px;
  }
`

const LinkToMain = styled(Link)`
  background-color: #ffb6b5;
  border-radius: 2rem;
  padding: 11px 50px;
  margin-top: 12px;
  color: #ffffff;
`
