import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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

export default function ModifyRecipe() {
  const [name, setName] = useState('')
  const [base, setBase] = useState('')
  const [tags, setTags] = useState([])
  const [images, setImages] = useState([])
  const [modifyImages, setModifyImages]=useState([]);
  const [abv, setAbv] = useState(0)
  const [sweet, setSweet] = useState(0)
  const [sour, setSour] = useState(0)
  const [bitter, setBitter] = useState(0)
  const [description, setDescription] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [recipeArr, setRecipeArr] = useState([])
  // console.log(images)

  //디폴트값 담는곳
  const [defaultArr, setDefaultArr] = useState([])
  const [defaultRecipe, setDefaultRecipe] = useState([])

  const { id } = useParams()

  //저장된 값을 setter 에 저장
  const getUserRecipeData = async () => {
    const response = await api.get(`/diy-recipes/${id}`)
    const data = response.data
    //다른값으로 저장후 전달해야 무한렌더링 막음.
    setDefaultArr(data.tags)
    setDefaultRecipe(data.recipes)

    setName(data.name)
    setBase(data.base._id)
    setTags(data.tags)
    setImages(data.image)
    setAbv(data.abv)
    setSweet(data.sweet)
    setSour(data.sour)
    setBitter(data.bitter)
    setDescription(data.description)
    setIngredient(data.ingredient)
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    //image 변경이 없다면 그대로 이미지 이름으로 보내기

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
      console.log(item)
      formData.append('recipeImages', item.image)
      formData.append('content', item.content)
    })

    for (const [key, value] of formData) {
      console.log("이건 수정할떄 데이터" ,key, value)
    }

    if (!formData) {
      alert('빈 곳을 모두 채워주세요 :)')
    } else {
      await api.put(`/diy-recipes/${id}`, formData)
      navigate('/mypage/recipes')
    }
  }

  useEffect(() => {
    getUserRecipeData()
  }, [])

  // 취소시 이전페이지 이동
  const navigate = useNavigate()

  function cancelHandler(e) {
    e.preventDefault()
    navigate(-1)
  }

  // useEffect(()=>{
  //   console.log("recipeArr", recipeArr);
  // },[recipeArr])

  return (
    <>
      <Title>DIY레시피 수정</Title>
      <Container>
        <RecipeForm onSubmit={submitHandler}>
          <Naming
            setName={setName}
            setBase={setBase}
            setTagArr={setTags}
            defaultName={name}
            defaultBase={base}
            defaultTagArr={defaultArr}
          />
          <div className="imgFileWrap">
            {images.length > 0 && (
              <ImageUpload
                setImgs={setModifyImages}
                defaultValue={images}
              />
            )}
          </div>

          <RatingBox>
            <div className="ratingWrap">
              <div>도수</div>
              <StarRating setRating={(r) => setAbv(r)} defaultValue={abv} />
            </div>
            <div className="ratingWrap">
              <div>단맛</div>
              <StarRating setRating={(r) => setSweet(r)} defaultValue={sweet} />
            </div>
            <div className="ratingWrap">
              <div>신맛</div>
              <StarRating setRating={(r) => setSour(r)} defaultValue={sour} />
            </div>
            <div className="ratingWrap">
              <div>쓴맛</div>
              <StarRating
                setRating={(r) => setBitter(r)}
                defaultValue={bitter}
              />
            </div>
          </RatingBox>
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
          {defaultRecipe.length && (
            <RecipeStep
              setRecipes={setRecipeArr}
              defaultRecipe={defaultRecipe}
            />
          )}

          <ButtonGroup>
            <button className="btn cancelBtn" onClick={cancelHandler}>
              취소
            </button>
            <button className="btn submitBtn" type="submit">
              수정하기
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
