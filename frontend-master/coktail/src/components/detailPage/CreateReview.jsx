import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { api } from '@/utils/api'

/* component */
import ImageUpload from '@/components/recipeUpload/ImageUpload'
import StarRating from '@/components/recipeUpload/StarRating'

/* color */
import { thirdPink, deepGreen } from '@/assets/styleVariables'

export default function CreateReview({ type }) {
  //데이터값 저장
  const [content, setContent] = useState('')
  const [images, setImages] = useState([])
  const [rating, setRating] = useState(0)

  //주소에서 id 값 가져와서 id 값으로 데이터 전송
  const { id } = useParams()

  function contentHandler(e) {
    setContent(e.target.value)
  }

  // formData 전송
  const submitHandler = async (e) => {
    e.preventDefault()

    if (!content) {
      return alert('리뷰적었나요?')
    }
    if (!rating) {
      return alert('별점 남겼나요?')
    }

    //formData 로 데이터 전송
    const formData = new FormData()
    formData.append('content', content) //리뷰
    formData.append('images', images) //이미지
    formData.append('rating', rating) //별점

    // 리뷰 post API
    await api({
      method: 'post',
      url: `/reviews/create/${id}?type=${type}s`,
      data: formData,
    })
    
    // 리뷰 등록 후 리로드
    window.location.reload()
  }

  return (
    <Container>
      <form onSubmit={submitHandler}>
        <InputWrap>
          <textarea
            name="content"
            id="content"
            value={content}
            className="reviewText"
            type="textarea"
            onChange={contentHandler}
            placeholder="나의 경험을 공유해주세요!"
          ></textarea>
          <div className="imgFileWrap">
            <ImageUpload setImgs={setImages} />
          </div>
        </InputWrap>
        <StarAndSubmit type={type}>
          <StarRating setRating={setRating} />
          <button type="submit" className="submitBtn">
            리뷰 올리기
          </button>
        </StarAndSubmit>
      </form>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 20px;
  box-sizing: border-box;
  gap: 10px;
`

const InputWrap = styled.div`
  display: flex;
  gap: 10px;

  textarea {
    flex: 7;
    min-height: 120px;
    border: 2px solid #cbcbcb;
    border-radius: 4px;
    resize: none;
    white-space: pre-line;
  }
  .imgFileWrap {
    flex: 3;
    height: 120px;
  }
`

const StarAndSubmit = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  .submitBtn {
    border: none;
    border-radius: 5px;
    background-color: ${({ type }) =>
      type === 'cocktail' ? thirdPink : deepGreen};
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 10px 18px;
    cursor: pointer;
  }
`
