import styled from 'styled-components'

export default function DataNotFound({ children }) {
  return <StyledDiv>{children}</StyledDiv>
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  color: #797979;
  padding: 2em;
  text-align: center;
  line-height: 1.2rem;
`
