import styled from 'styled-components'

// icons
import { FaStar } from 'react-icons/fa'

export default function StarsArray({ starCount }) {
  const count = starCount ? starCount : 0
  return (
    <>
    {<StyledStarsArray>
        {[...Array(count)].map((_, i) => (
          <FaStar color="FFD600" key={i} />
        ))}
        {[...Array(5 - count)].map((_, i) => (
          <FaStar color="D9D9D9" key={i} />
        ))}
      </StyledStarsArray>}
      
    </>
  )
}

const StyledStarsArray = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`
