import styled from 'styled-components'
import { useCallback } from 'react'

/* img */
import DoubleQuotes from '@/components/icons/DoubleQuotes'
import {
  deepGreen,
  primaryPink,
  thirdPink,
  primaryGreen,
} from '@/assets/styleVariables'

export default function Comment({ type, data }) {
  const renderFromType = useCallback(() => {
    return (
      <StyledDiv fill={type === 'cocktail' ? thirdPink : deepGreen}>
        <DoubleQuotes />
        <Text>{data.description}</Text>
        <DoubleQuotes />
      </StyledDiv>
    )
  })

  return <Container type={type}>{renderFromType()}</Container>
}

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100px;
  background-color: ${({ type }) =>
    type === 'cocktail' ? primaryPink : primaryGreen};
  border-radius: 10px;
  text-align: center;
`
const Text = styled.pre`
  padding: 60px;
  font-size: 16px;
  line-height: 28px;
  white-space: pre-wrap;
`

const StyledDiv = styled.div`
  svg:first-child {
    position: absolute;
    top: 25px;
    left: 25px;
  }
  svg:last-child {
    position: absolute;
    bottom: 25px;
    right: 25px;
    transform: rotate(180deg);
  }

  path {
    fill: ${(props) => props.fill || primaryPink};
  }
`
