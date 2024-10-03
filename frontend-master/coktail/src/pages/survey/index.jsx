import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//styled components
import * as Styled from './Survey.style'

//components
import StartPage from './StartPage'
import QuestionPage from './QuestionPage'
import ResultPage from './ResultPage'

//dummyData
import questions from './surveyData'

//Icon
import NextArrowIcon from '@components/icons/NextArrowIcon'
import PreArrowIcon from '@components/icons/PreArrowIcon'
import LogoIcon from '@components/icons/LogoIcon'
import CloseIcon from '@components/icons/CloseIcon'

export default function SurveyPage() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(0)
  const [userSelections, setUserSelections] = useState({
    base: '',
    abv: 0,
    taste: '',
    // sweet: 0,
    // sour: 0,
    // bitter: 0,
  })

  const handleStart = () => {
    setCurrentPage(1)
  }

  const handleAnswerSelected = (answer) => {
    if (currentPage === 1) {
      setUserSelections({ ...userSelections, base: answer })
    } else if (currentPage === 2) {
      const abvMapping = { '낮은 도수': 1, '중간 도수': 2, '높은 도수': 3 }
      setUserSelections({ ...userSelections, abv: abvMapping[answer] })
    } else if (currentPage === 3) {
      const tasteValues = {
        달달하게: 'sweet',
        새콤하게: 'sour',
        씁슬하게: 'bitter',
      }

      const selectedTaste = tasteValues[answer]
      // const tasteUpdate = { sweet: 0, sour: 0, bitter: 0 }
      // if (selectedTaste) {
      //   tasteUpdate[selectedTaste] = 3
      // }

      setUserSelections({ ...userSelections, taste: selectedTaste })
    }

    setCurrentPage(currentPage + 1)
  }

  const handleRestart = () => {
    setCurrentPage(0)
    setUserSelections({
      base: '',
      abv: 0,
      // taste: { sweet: 0, sour: 0, bitter: 0 },
      taste: '',
    })
  }

  let backgroundImage =
    currentPage === 0
      ? questions[0]?.backgroundImage
      : currentPage >= 1 && currentPage <= questions.length
        ? questions[currentPage].backgroundImage
        : questions[questions.length]?.backgroundImage

  const containerStyle = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : '',
    backgroundSize: 'cover',
  }

  return (
    <Styled.ContainerSurvey style={containerStyle}>
      <Styled.ContainerHeader>
        <div
          onClick={() => {
            navigate('/')
          }}
        >
          <LogoIcon width={100} height={80} fill={'#545454'} />
        </div>
        <div
          onClick={() => {
            navigate(-1)
          }}
        >
          <CloseIcon width={20} height={70} fill={'#545454'} />
        </div>
      </Styled.ContainerHeader>

      <Styled.ContentDiv>
        {/* <PreArrowIcon /> */}
        {currentPage === 0 && <StartPage onStart={handleStart} />}
        {currentPage >= 1 && currentPage <= 3 && (
          <QuestionPage
            question={questions[currentPage]}
            answers={questions[currentPage].answers}
            onAnswerSelected={handleAnswerSelected}
            style={{ height: 'calc(100% - 80px)' }}
          />
        )}
        {currentPage === 4 && (
          <ResultPage selections={userSelections} onRestart={handleRestart} />
        )}
        {/* <NextArrowIcon /> */}
      </Styled.ContentDiv>
    </Styled.ContainerSurvey>
  )
}
