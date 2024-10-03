import styled from 'styled-components'

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  color: rgba(84, 84, 84, 1);
  background-color: #ffeded;

  .sideText {
    margin-left: 1rem;
    font-size: 19px;
  }
`

export const LogoContainer = styled.div`
  padding: 1.5rem;
  cursor: pointer;
  height: auto;
`

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 1.2rem;
  cursor: pointer;

  background-color: ${(props) => (props.$isActive ? 'white' : 'transparent')};

  &:hover {
    background-color: white;
  }

  & > div {
    width: 20%;
    text-align: center;
  }
  & > span {
    width: 80%;
  }
`

export const MenuICon = styled.div`
  /* margin-right: 5px; */
`
