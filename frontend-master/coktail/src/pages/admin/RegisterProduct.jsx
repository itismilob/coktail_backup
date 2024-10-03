import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { api } from '@/utils/api'
import toast, { Toaster } from 'react-hot-toast'

//styled component
import * as Styled from './Admin.Style'

//components
import Naming from '@/components/recipeUpload/Naming'
import ImageUpload from '@/components/recipeUpload/ImageUpload'
import StarRating from '@/components/recipeUpload/StarRating'
import TitleAndTextarea from '@/components/recipeUpload/TitleAndTextarea'
import RecipesStep from '@/components/recipeUpload/RecipeStep'
import Title from '@/components/layouts/admin/Title'

export default function RegisterProduct() {
  const [name, setName] = useState('') //이름
  const [base, setBase] = useState('') //베이스
  const [tags, setTags] = useState([]) // 태그
  const [images, setImages] = useState([]) //이미지
  const [abv, setAbv] = useState(0) //도수
  const [sweet, setSweet] = useState(0) //단맛
  const [sour, setSour] = useState(0) //신맛
  const [bitter, setBitter] = useState(0) //쓴맛
  const [description, setDescription] = useState('') //소개글
  const [ingredient, setIngredient] = useState('') //재료
  const [recipeArr, setRecipeArr] = useState([]) //레시피
  const navigate = useNavigate()

  //칵테일 등록 form Data
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
      console.log(value)
    }

    if (!images || !abv || !sweet || !sour || !bitter) {
      toast('모든 필드값을 입력해주세요!', { duration: 800, icon: '📝' })
    } else {
      await api({
        method: 'post',
        url: '/cocktails',
        data: formData,
      })
      toast('등록이 완료되었습니다!', { duration: 800, icon: '💖' })
    }
    navigate(-1)
  }

  //취소버튼
  function cancelHandler(e) {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <Styled.ProductContainer onSubmit={submitHandler}>
        <Title text="칵테일 등록" />
        <Styled.ProductContentContainer>
          <div className="ImgContainer">
            <ImageUpload setImgs={setImages} />
          </div>

          <Styled.InpStarContainer>
            <div className="NameContainer">
              <Naming setName={setName} setBase={setBase} setTagArr={setTags} />
            </div>

            <Styled.StarContainer>
              <div className="ratingWrap">
                <div className="rating">
                  <div>도수</div>
                  <StarRating setRating={(r) => setAbv(r)} />
                </div>
                <div className="rating">
                  <div>단맛</div>
                  <StarRating setRating={(r) => setSweet(r)} />
                </div>
              </div>
              <div className="ratingWrap">
                <div className="rating">
                  <div>신맛</div>
                  <StarRating setRating={(r) => setSour(r)} />
                </div>
                <div className="rating">
                  <div>쓴맛</div>
                  <StarRating setRating={(r) => setBitter(r)} />
                </div>
              </div>
            </Styled.StarContainer>
          </Styled.InpStarContainer>
        </Styled.ProductContentContainer>

        <Styled.TextAreaContainer>
          <TitleAndTextarea
            className="textArea_input"
            title="소개글"
            setContent={setDescription}
          />
          <TitleAndTextarea title="재료" setContent={setIngredient} />
          <div className="RecipesStepContainer">
            <RecipesStep title="레시피" setRecipes={setRecipeArr} />
          </div>
        </Styled.TextAreaContainer>

        <Styled.ButtonGroup>
          <button onClick={cancelHandler} className="btn cancelBtn">
            취소
          </button>
          <button type="submit" className="btn submitBtn">
            등록하기
          </button>
        </Styled.ButtonGroup>
      </Styled.ProductContainer>
      <Toaster /> {/* Toaster 컴포넌트 추가 */}
    </>
  )
}
