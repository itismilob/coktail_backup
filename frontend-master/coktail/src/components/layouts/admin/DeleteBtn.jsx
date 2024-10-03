import * as Styled from './Main.style'

const DeleteBtn = ({ value, deleteHandler }) => {
  const OnDelete = () => {
    if (confirm('삭제하시겠습니까?')) {
      deleteHandler(value)
    }
  }

  return <Styled.Btn onClick={OnDelete}>Delete</Styled.Btn>
}

export default DeleteBtn
