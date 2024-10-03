import styled from 'styled-components'

/* color */
import { primaryGray } from '@/assets/styleVariables'
import {
  ftColor1,
  ftColor2,
  ftColor3,
  ftColor4,
  primaryBlue,
  primaryGreen,
  primaryPink,
  primaryPurple
} from '@/assets/styleVariables'

const tagColors = [primaryPink, primaryBlue, primaryGreen, primaryPurple]
const ftColors = [ftColor1, ftColor2, ftColor3, ftColor4]

export default function ShowHashTag({ data, tagColor, ftColor }) {
  if (!data) {
    return null
  }

  // console.log(type)

  const getRandomColor = (colorsArray) => {
    return colorsArray[Math.floor(Math.random() * colorsArray.length)];
  };

  // const color =
  //   tagColor === undefined
  //     ? tagColors[parseInt(Math.random() * 4)]
  //     : tagColors[tagColors]

  // const fontColor =
  //   ftColor === undefined
  //     ? ftColors[parseInt(Math.random() * 4)]
  //     : ftColors[ftColor]

  return (
    <HashTagWrap>
       {data.map((item, index) => {
        // 색상 배열의 길이를 기반으로 랜덤 인덱스 생성
        const colorIndex = Math.floor(Math.random() * tagColors.length);
        
        // 랜덤 인덱스를 사용하여 글자색과 배경색 결정
        const backgroundColor = tagColors[colorIndex];
        const fontColor = ftColors[colorIndex];

        return (
          <TagSticker key={index + item} background={backgroundColor} font={fontColor}>
            {'#' + item}
          </TagSticker>
        );
      })}
      {/* {data.map((item, index) => (
        <TagSticker key={index + item} type={type}>
          {'#' + item}
        </TagSticker>
      ))} */}
    </HashTagWrap>
  )
}

const HashTagWrap = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
`

const TagSticker = styled.span`
  border-radius: 14px;
  background-color: ${(props) => props.background};
  /* background-color: ${(props) => props.type === 'cocktail' ? primaryPurple : primaryGreen }; */
  padding: 5px 8px;
  font-size: 14px;
  /* color : ${(props) => props.type === 'cocktail' ? ftColor4 : '#60750D'} */
  color : ${(props) => props.font}; 
`