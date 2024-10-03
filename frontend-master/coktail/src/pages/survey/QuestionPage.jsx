import * as Styled from './Survey.style'

function QuestionPage({ question, answers, onAnswerSelected }) {
  return (
    <Styled.QuestionContainer>
      <Styled.Question>
        <Styled.QuestionNumber>{question.number}</Styled.QuestionNumber>
        <Styled.QuestionContent>{question.question}</Styled.QuestionContent>
      </Styled.Question>
      <Styled.QuestionBtnWrap>
        {answers.map((answer, index) => (
          <button key={index} onClick={() => onAnswerSelected(answer.text)}>
            <span>{answer.text ? answer.text : ''}</span>
            <br />
            <span>{answer.info ? answer.info : ''}</span>
          </button>
        ))}
      </Styled.QuestionBtnWrap>
    </Styled.QuestionContainer>
  )
}

export default QuestionPage
