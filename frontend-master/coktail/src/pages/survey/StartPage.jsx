//styled component
import * as Styled from './Survey.style'
//icon
import SurveyTitleIcon from '@components/icons/SurveyTitleIcon'

function StartPage({ onStart }) {
  return (
    <Styled.ContainerStart>
      <SurveyTitleIcon width={420} height={350} />
      <button className="btn" onClick={onStart}>
        취향테스트 시작하기
      </button>
    </Styled.ContainerStart>
  )
}

export default StartPage
