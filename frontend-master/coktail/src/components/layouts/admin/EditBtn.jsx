import * as Styled from './Main.style'

const EditBtn = ({ value, editHandler }) => {
  const OnEdit = () => {
    editHandler(value)
  }

  return <Styled.Btn onClick={OnEdit}>Edit</Styled.Btn>
}

export default EditBtn
