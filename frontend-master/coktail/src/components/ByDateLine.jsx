import styled from 'styled-components';
import { secondGray, thirdGray } from '@/assets/styleVariables';

export default function ByDateLine(date) {
  return (
    <ReviewByDate>
        <div className='byDateLine'/>
        <p>{`${date.date}`}</p>
        <div className='byDateLine'/>
    </ReviewByDate>
  )
}

export const ReviewByDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;
  padding-bottom: 20px;

  .byDateLine {
    width: 40%;
    height: 1px;
    background-color: ${secondGray};
  }

  > p {
    color: ${thirdGray};
    font-size: 0.8em;
  }
`