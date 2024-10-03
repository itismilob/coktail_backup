import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
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

export default function EditProduct() {
  const [name, setName] = useState('') //이름
  const [base, setBase] = useState('') //베이스
  const [tags, setTags] = useState([]) // 태그
  const [images, setImages] = useState([]) //이미지
  const [modifyImages, setModifyImages] = useState([]) //수정이미지담는곳
  const [abv, setAbv] = useState(0) //도수
  const [sweet, setSweet] = useState(0) //단맛
  const [sour, setSour] = useState(0) //신맛
  const [bitter, setBitter] = useState(0) //쓴맛
  const [description, setDescription] = useState('') //소개글
  const [ingredient, setIngredient] = useState('') //재료
  const [recipeArr, setRecipeArr] = useState([]) //레시피

  //디폴트값 담는곳
  const [defaultArr, setDefaultArr] = useState([])
  const [defaultRecipe, setDefaultRecipe] = useState([])

  const query = new URLSearchParams(location.search)
  const id = query.get('id')
  const navigate = useNavigate()

  // 칵테일 데이터 조회 api
  const getProductDetail = async () => {
    const response = await api.get(`/cocktails/${id}`)
    const cocktailsData = response.data
    //디폴트값으로 저장소 따로
    setDefaultArr(cocktailsData.tags)
    setDefaultRecipe(cocktailsData.recipes)

    setName(cocktailsData.name)
    setBase(cocktailsData.base._id)
    setTags(cocktailsData.tags)
    setImages(cocktailsData.image)
    setAbv(cocktailsData.abv)
    setSweet(cocktailsData.sweet)
    setSour(cocktailsData.sour)
    setBitter(cocktailsData.bitter)
    setDescription(cocktailsData.description)
    setIngredient(cocktailsData.ingredient)
    // setRecipeArr(cocktailsData.recipeArr)
  }

  //칵테일 수정 api
  const submitHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('base', base)
    tags.forEach((item) => {
      formData.append('tags', item)
    })
    formData.append('images', modifyImages)
    formData.append('abv', abv)
    formData.append('sweet', sweet)
    formData.append('sour', sour)
    formData.append('bitter', bitter)
    formData.append('description', description)
    formData.append('ingredient', ingredient)
    let recipeImagesGroup = []
    recipeArr.forEach((item) => {
      formData.append('recipeImages', item.image)
      formData.append('content', item.content)
    })
    for (const [key, value] of formData) {
      console.log('이건 수정할떄 데이터', key, value)
    }

    if (!formData) {
      toast('모든 필드값을 입력해주세요!', { duration: 800, icon: '📝' })
    } else {
      await api.put(`/cocktails/${id}`, formData)
      navigate('/admin/cocktails')
    }
  }

  useEffect(() => {
    getProductDetail()
  }, [])

  //취소버튼
  function cancelHandler(e) {
    e.preventDefault()
    navigate(-1)
  }

  return (
    //form
    <Styled.ProductContainer onSubmit={submitHandler}>
      <Title text="칵테일 수정" />
      {/* 칵테일 위 컨테이너 */}
      <Styled.ProductContentContainer>
        <div className="ImgContainer">
          {images.length && (
            <ImageUpload
              className="img"
              setImg={setModifyImages}
              defaultValue={images}
            />
          )}
        </div>

        <Styled.InpStarContainer>
          <div className="NameContainer">
            <Naming
              className="name"
              setName={setName}
              setBase={setBase}
              setTagArr={setTags}
              defaultName={name}
              defaultBase={base}
              defaultTagArr={defaultArr}
            />
          </div>

          <Styled.StarContainer>
            <div className="ratingWrap">
              <div className="rating">
                <div>도수</div>
                <StarRating setAbv={setAbv} defaultValue={abv} />
              </div>
              <div className="rating">
                <div>단맛</div>
                <StarRating setSweet={setSweet} defaultValue={sweet} />
              </div>
            </div>

            <div className="ratingWrap">
              <div className="rating">
                <div>신맛</div>
                <StarRating setSour={setSour} defaultValue={sour} />
              </div>
              <div className="rating">
                <div>쓴맛</div>
                <StarRating setBitter={setBitter} defaultValue={bitter} />
              </div>
            </div>
          </Styled.StarContainer>
        </Styled.InpStarContainer>
      </Styled.ProductContentContainer>
      <Styled.TextAreaContainer>
        <TitleAndTextarea
          title="소개글"
          setContent={setDescription}
          defaultValue={description}
        />
        <TitleAndTextarea
          title="재료"
          setContent={setIngredient}
          defaultValue={ingredient}
        />
        <div className="RecipesStepContainer">
          {defaultRecipe.length && (
            <RecipesStep
              title="레시피"
              setRecipes={setRecipeArr}
              defaultRecipe={defaultRecipe}
            />
          )}
        </div>
      </Styled.TextAreaContainer>
      <Styled.ButtonGroup>
        <button onClick={cancelHandler} className="btn cancelBtn">
          취소
        </button>
        <button type="submit" className="btn submitBtn">
          수정하기
        </button>
      </Styled.ButtonGroup>
      <Toaster /> {/* Toaster 컴포넌트 추가 */}
    </Styled.ProductContainer>
  )
}
