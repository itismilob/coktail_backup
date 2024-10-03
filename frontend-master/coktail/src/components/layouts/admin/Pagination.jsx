import styled from 'styled-components'
import NextArrowIcon from '@components/icons/NextArrowIcon'
import PreArrowIcon from '@components/icons/PreArrowIcon'

const Pagination = ({ page, setPage, totalPost, pageRange, btnRange }) => {
  const totalPage = Math.ceil(totalPost / pageRange)
  const currentSet = Math.ceil(page / btnRange)
  const startPage = (currentSet - 1) * btnRange + 1
  const endPage = Math.min(startPage + btnRange - 1, totalPage)

  const createPageButtons = () => {
    const buttons = []
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button key={i} onClick={() => setPage(i)} $isActive={page === i}>
          {i}
        </Button>,
      )
    }
    return buttons
  }

  const canGoBack = page > 1
  const canGoForward = page < totalPage

  return (
    <Nav>
      <Button
        onClick={() => setPage(page - 1)}
        disabled={canGoBack ? '' : 'disabled'}
      >
        <PreArrowIcon />
      </Button>
      {createPageButtons()}
      <Button
        onClick={() => setPage(page + 1)}
        disabled={canGoForward ? '' : 'disabled'}
      >
        <NextArrowIcon />
      </Button>
    </Nav>
  )
}

export default Pagination

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`

const Button = styled.button`
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
