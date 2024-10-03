import { FaCircle } from 'react-icons/fa'
import styled from 'styled-components'
import { primaryPink, primaryGreen, primaryBlue } from '@/assets/styleVariables'

const circleColors = [primaryPink, primaryGreen, primaryBlue]

export default function ImageAndCircle({ imgUrl, circleColor }) {
  const color =
    circleColor === undefined
      ? circleColors[parseInt(Math.random() * 3)]
      : circleColors[circleColor]

  // console.log(imgUrl)
  return (
    <>
      <StyledCircle>
        <FaCircle color={color} />
        <img src={`${imgUrl}`} alt={imgUrl} />
      </StyledCircle>
    </>
  )
}

const StyledCircle = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 80%;
    height: 80%;
    border-radius: 50%;
    position: absolute;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }
`
