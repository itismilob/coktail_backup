import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { api } from '@/utils/api'

/* component */
import ImageUpload from '@/components/recipeUpload/ImageUpload'
import StarRating from '@/components/recipeUpload/StarRating'

/* color */
import { primaryBlue } from '@/assets/styleVariables'
import { useParams, useSearchParams } from 'react-router-dom'
import PreArrowIcon from '@/components/icons/PreArrowIcon';

export default function ModifyReview({ data }) {

  const [content, setContent] = useState(data.content)
  const [images, setImages] = useState([])
  const [rating, setRating] = useState(data.rating)

  const { id } = useParams();

  function contentHandler(e) {
    setContent(e.target.value)
  }

  // formData 전송
  const submitHandler = async (e) => {
    e.preventDefault();

    if(content.length === 0 || rating === 0){
      return alert('리뷰와 별점을 남겨주세요!')
    }
    const formData = new FormData();
    formData.append('content', content) //리뷰
    formData.append('images', images) //이미지
    formData.append('rating', rating) //별점
    for (let value of formData.values()) {
      console.log("darta",value);};

    try {
      await api.put(
        `/reviews/${data._id}?type=${data.type + 's'}`,
        formData
      )

    } catch (error) {
      console.log('error', error)
    }

    window.location.reload();
  }

  return (
    <Container>
      <form onSubmit={submitHandler}>
        <div className="categoryName">
          {data.type}
          <div className='parenthesisIcon'>
            <PreArrowIcon width={8} height={8} />
          </div>
          {data.name && data.name}
        </div>
        <InputWrap>
          <textarea
            name='content'
            id='content'
            value={content}
            className="reviewText"
            type="textarea"
            onChange={contentHandler}
          ></textarea>
          <div className="imgFileWrap">
            <ImageUpload setImgs={(imgs) => setImages(imgs)} defaultValue={data.images.length > 0 && data.images[0]} />
          </div>
        </InputWrap>
        <StarAndSubmit >
          <StarRating setRating={setRating} defaultValue={rating} />
          <button type="submit" className="submitBtn">
            리뷰 수정
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

  .categoryName {
    display: flex;
    gap: 5px;
    display: flex;
    font-size: 0.7em;
    padding-left: 0.3em;
    padding-bottom: 0.5em;

    .parenthesisIcon {
      transform: scaleX(-1);
    }
  }

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
    background-color: ${primaryBlue};
    font-size: 12px;
    font-weight: bold;
    padding: 10px 18px;
    cursor: pointer;
  }
`
