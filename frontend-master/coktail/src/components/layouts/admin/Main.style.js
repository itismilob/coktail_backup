import styled from 'styled-components'

//메인
export const Main = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-bottom: 5em;
  background-color: white;
`
export const Container = styled.div`
  display: flex;
`

//제목
export const TitleStyled = styled.h1`
  font-size: 2rem;
  color: #545454;
  font-weight: bold;
  display: flex;
  margin: 3rem 0 5rem 0;
`

//검색
export const SearchBox = styled.input`
  padding: 10px;
  width: 100%;
  border: 3px solid #545454;
  border-radius: 0.8rem;
  display: flex;
  padding: 1rem;
`

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 45%;
  margin-bottom: 3rem;
`

export const IconWrapper = styled.div`
  position: absolute;
  right: 3%;
  /* top: 10%; */
  cursor: pointer;
`

//버튼
export const ButtonStyled = styled.button`
  font-size: 1rem;
  display: flex;
  justify-content: center;
  width: 6rem;
  color: #000000;
  background-color: #ffc5c5;
  border-radius: 2rem;
  font-weight: bold;
  display: flex;
  cursor: pointer;
`

//테이블
export const StyledTable = styled.table`
  width: 100%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

export const StyledThead = styled.thead`
  background-color: #ffeded;
  white-space: nowrap;
`

export const StyledTh = styled.th`
  padding: 10px 20px;
  border-bottom: 1px solid #e1e1e1;
  color: #333;
  font-weight: bold;
  text-align: center;
`

export const StyledTbody = styled.tbody`
  width: 100%;
  text-align: center;
`

//페이지네이션
export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`

export const PageButton = styled.button`
  margin: 0 1.5rem;
  padding: 5px 12px;
  background-color: ${({ $isActive }) =>
    $isActive ? '#545454' : 'transparent'};
  color: ${({ $isActive }) => ($isActive ? '#fff' : '#000')};
  border-radius: 50%;
  font-size: 1rem;

  &:hover {
    background-color: #545454;
    color: white;
    cursor: pointer;
  }
`

//select
export const SelectContainer = styled.div`
  width: 8rem;
  box-sizing: border-box;
`

export const StyledSelect = styled.select`
  border-radius: 0.5rem;
  padding: 0.7rem;
  margin: 0.6rem 0;
  width: 100%;
  background: #fff;
  cursor: pointer;
`

//input
export const InputStyled = styled.div`
  display: flex;
  margin-top: 1rem;
  border-radius: 5px;
  border: 1px solid black;
  padding: 0.5rem;
  ::placeholder {
    color: #dadada;
  }
`

//toggle
export const ToggleContainer = styled.div`
  width: 75px;
  height: 35px;
  background-color: ${({ $isToggled }) => ($isToggled ? 'grey' : '#ffc5c5')};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  padding: 0.25rem;
  justify-content: ${({ $isToggled }) =>
    $isToggled ? 'flex-end' : 'flex-start'};
  cursor: pointer;
  transition: background-color 0.1s;
  position: relative;
`

export const ToggleCircle = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  background-color: #fff;
  border-radius: 50%;
  z-index: 1;
  transition: background-color 0.1s;
`

export const ToggleLabel = styled.span`
  position: absolute;
  pointer-events: none;
  font-size: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 0;
`

export const OnLabel = styled(ToggleLabel)`
  left: 0.5rem;
  color: ${({ $isToggled }) => ($isToggled ? '#fff' : '#fff')};
`

export const OffLabel = styled(ToggleLabel)`
  right: 0.5rem;
  color: ${({ $isToggled }) => ($isToggled ? '#fff' : '#fff')};
`
//테이블
export const Btn = styled.button`
  padding: 5px;
  border-radius: 10px;
  background-color: #efefef;
  cursor: pointer;
`

export const Tbody = styled.tbody`
  text-align: center;

  td {
    padding: 8px;
  }

  .tdToggle {
    display: flex;
    justify-content: center;
  }
`

export const TableDiv = styled.div`
  text-align: center;
  border: none;
`
