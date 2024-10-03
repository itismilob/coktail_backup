import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '@/utils/api'
import Spacing from '@/utils/Spacing'
import { paddingBottom } from '@/assets/styleVariables'

/* Components */
import Naming from '@/components/recipeUpload/Naming'
import RecipeStep from '@/components/recipeUpload/RecipeStep'
import ImageUpload from '@/components/recipeUpload/ImageUpload'
import StarRating from '@/components/recipeUpload/StarRating'
import Title from '@/components/title'
import TitleAndTextarea from '@/components/recipeUpload/TitleAndTextarea'

export default function RecipeRegister() {
  const [name, setName] = useState('')
  const [base, setBase] = useState('')
  const [tags, setTags] = useState([])
  const [images, setImages] = useState([])
  const [abv, setAbv] = useState(0)
  const [sweet, setSweet] = useState(0)
  const [sour, setSour] = useState(0)
  const [bitter, setBitter] = useState(0)
  const [description, setDescription] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [recipeArr, setRecipeArr] = useState([])

  //레시피 등록 form Data
  const submitHandler = async (e, index) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('base', base)
    tags.forEach((item) => {
      formData.append('tags', item)
    })
    formData.append('images', images)
    formData.append('abv', abv)
    formData.append('sweet', sweet)
    formData.append('sour', sour)
    formData.append('bitter', bitter)
    formData.append('description', description)
    formData.append('ingredient', ingredient)
    recipeArr.forEach((item) => {
      formData.append('recipeImages', item.image)
      formData.append('content', item.content)
    })

    for (let value of formData.values()) {
      console.log( "이건 등록할떄 데이터 ", value);
    }

    if (!formData) {
      alert('값을 빼먹지말고 입력하라우')
    } else {
      await api.post('/diy-recipes', formData)
      navigate('/recipes')
    }
  }

  // 취소시 이전페이지 이동
  const navigate = useNavigate()

  function cancelHandler(e) {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <Title>DIY레시피 등록</Title>
      <Container>
        <RecipeForm onSubmit={submitHandler}>
          <Naming setName={setName} setBase={setBase} setTagArr={setTags} />
          <div className="imgFileWrap">
            <ImageUpload setImgs={setImages} />
          </div>
          <RatingBox>
            <div className="ratingWrap">
              <div>도수</div>
              <StarRating setRating={(r) => setAbv(r)} />
            </div>
            <div className="ratingWrap">
              <div>단맛</div>
              <StarRating setRating={(r) => setSweet(r)} />
            </div>
            <div className="ratingWrap">
              <div>신맛</div>
              <StarRating setRating={(r) => setSour(r)} />
            </div>
            <div className="ratingWrap">
              <div>쓴맛</div>
              <StarRating setRating={(r) => setBitter(r)} />
            </div>
          </RatingBox>
          <TitleAndTextarea title="소개글" setContent={setDescription} />
          <TitleAndTextarea title="재료" setContent={setIngredient} />

          <RecipeStep setRecipes={setRecipeArr} />
          {/* <RecipeStep setRecipes={setRecipes} setRecipeImages={setRecipeImages} /> */}
          <ButtonGroup>
            <button className="btn cancelBtn" onClick={cancelHandler}>
              취소
            </button>
            <button className="btn submitBtn" type="submit">
              등록하기
            </button>
          </ButtonGroup>
        </RecipeForm>
        <Spacing size={paddingBottom} />
      </Container>
    </>
  )
}

const Container = styled.div`
  padding: 0 2em;
`

const RecipeForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .imgFileWrap {
    height: 248px;
  }
`
const RatingBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 22px;
  .ratingWrap {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  .btn {
    border: none;
    box-shadow: none;
    border-radius: 20rem;
    padding: 0;
    overflow: visible;
    cursor: pointer;
    width: 100px;
    height: 36px;
  }
  .cancelBtn {
    background-color: #d5d5d5;
  }
  .submitBtn {
    background-color: #b0d96d;
  }
`
