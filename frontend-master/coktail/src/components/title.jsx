import styled from 'styled-components'

export default function Title({ children }) {
  return <StyledH1>{children}</StyledH1>
}

const StyledH1 = styled.h1`
  font-size: 2em;
  font-weight: bold;
  padding: 1em 0 1em 2rem;
`
