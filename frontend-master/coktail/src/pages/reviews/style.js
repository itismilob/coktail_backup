import styled from 'styled-components';
import { thirdPink } from '@/assets/styleVariables'

export const ReviewContainer = styled.div`
  padding: 0 30px 80px 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const ReviewTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.7em;

  .reviewTitle {
    color: ${thirdPink};
    font-size: 2em;
    font-weight: bold;
    padding: 1em 0 1em 2rem;
  }

  .productTitle {
    font-size: 1.2em;
    font-weight: bold;
    padding-top: 0.2em;
  }
`
