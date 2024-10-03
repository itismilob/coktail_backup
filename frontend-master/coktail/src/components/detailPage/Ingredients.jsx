import styled from 'styled-components'

/* color */
import { deepGreen, thirdPink } from '@/assets/styleVariables'


export default function Ingredients({ type, data }) {
  
  return (
    <Container type={type}>
      <span className="titleBadge">재료</span>
      <TextBox>
        {data.ingredient}
      </TextBox>
    </Container>
  )
}

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 24px;
  box-sizing: border-box;
  .titleBadge {
    background-color: ${({ type }) =>
      type === 'cocktail' ? thirdPink : deepGreen};
    padding: 5px 15px;
    border-radius: 20px;
    color: #ffffff;
  }
`

const TextBox = styled.pre`
  padding-top: 26px;
  line-height: 24px;
  white-space: pre-wrap;
`
