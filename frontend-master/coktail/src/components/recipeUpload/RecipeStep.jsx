import styled from 'styled-components'

/* img */
import AddBtnIcon from '@/components/icons/AddBtnIcon'
import CloseIcon from '@/components/icons/CloseIcon'
import ImageUpload from '@/components/recipeUpload/ImageUpload'
import { useEffect, useState } from 'react'

export default function RecipeStep({
  direction,
  setRecipes,
  defaultRecipe
}) {
  //레시피 단계적 배열 저장
  // const [recipeArr, setRecipeArr] = useState(defaultRecipe)
  const [recipeArr, setRecipeArr] = useState([
    {
      image: '',
      content: '',
    },
    {
      image: '',
      content: '',
    },
  ])
    
  //디폴트값 세터에 저장
  useEffect(() => {
    if (defaultRecipe) {
      setRecipeArr(defaultRecipe)
    }
  }, [defaultRecipe])
  

  useEffect(() => {
    if (recipeArr.length < 0) return
    
    //부모로 전달되는 프롭
    console.log("부모한테 줄 recipes", recipeArr);
    setRecipes(recipeArr)
  }, [recipeArr])


  //단계추가
  function addStepHandler(e) {
    e.preventDefault()
    const newStepArr = { image: '', content: '' }
    setRecipeArr([...recipeArr, newStepArr])
  }

  function removeStepHandler(e, index) {
    e.preventDefault()
    setRecipeArr((cur) => {
      const newStepArr = [...cur]
      newStepArr.splice(index, 1)
      return newStepArr
    })
  }

  function txtInput(e, index) {
    const newRecipeArr = [...recipeArr]
    newRecipeArr[index].content = e.target.value
    setRecipeArr(newRecipeArr);
  }

  function setImage(imgs, index) {
    const newRecipeArr = [...recipeArr];
    newRecipeArr[index].image = imgs;
    setRecipeArr(newRecipeArr);
  }

  return (
    <RecipeInput $direction={direction}>
      <TitleBadge>레시피</TitleBadge>

      <div className="recipeWrap">
        <ol>
          {/* {Array.isArray(defaultRecipe) &&
            defaultRecipe.length && */}
          {recipeArr.map((item, index) => (
            <li className="stepBox" key={index}>
              <div className="stepInputWrap">
                <label htmlFor="">{index + 1}.</label>
                <input
                  value={item && item.content}
                  type="text"
                  placeholder="설명을 적어주세요"
                  onChange={(e) => { txtInput(e, index)}}
                  required
                />
                <button onClick={removeStepHandler}>
                  <CloseIcon width={17} fill={'#797979'} />
                </button>
              </div>
              <ImageUploadWrap>
                <ImageUpload
                  setImgs={(imgs) => {setImage(imgs, index)}}
                  defaultValue={item && item.image}
                />
              </ImageUploadWrap>
            </li>
          ))}
        </ol>
        <button className="plusStepBtn" onClick={addStepHandler}>
          <AddBtnIcon />
        </button>
      </div>
    </RecipeInput>
  )
}

const TitleBadge = styled.div`
  display: inline-block;
  border-radius: 14px;
  background-color: #b0d96d;
  padding: 6px 15px;

  + textarea {
    margin-top: 8px;
  }
`

const RecipeInput = styled.div`
  width: 100%;
  .recipeWrap {
    border: 2px solid #d5d5d5;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: ${(props) => props.$direction || 'column'};
    gap: 20px;
    margin-top: 8px;

    .stepBox {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: baseline;
      gap: 10px;

      + .stepBox {
        margin-top: 15px;
      }

      .stepInputWrap {
        width: 100%;
        display: flex;
        align-items: center;

        input {
          width: 100%;
          min-height: 28px;
          border: 2px solid #d5d5d5;
          border-radius: 10px;
          &:focus {
            border: 2px solid #797979;
            outline: none;
          }
        }
      }
    }
  }
  .plusStepBtn {
    background: none;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;
  }
`

const ImageUploadWrap = styled.div`
  width: 100%;
  height: 248px;
`
