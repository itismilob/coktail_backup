import { useEffect, useState, useRef, Fragment } from 'react'
import styled from 'styled-components'
import { NotData } from './MyPage.style'
import Title from '@/components/title'
import ProductList from '@/components/productList'
import { api } from '@/utils/api'
import ByDateLine from '@components/ByDateLine'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import toast, { Toaster } from 'react-hot-toast'

const perPage = 6

export default function MyRecipe() {
  const [myRecipe, setMyRecipe] = useState([])
  const cursorId = useRef()

  const myRecipeData = async () => {
    const response = await api.get('/diy-recipes/users', {
      params: {
        cursorId: cursorId.current,
        perPage: perPage,
      },
    })

    const myRecipes = response.data

    const totalCount = myRecipes.diyRecipes.reduce((acc, item) => {
      return acc + item.list.length
    }, 0)

    if (totalCount < perPage) {
      observerObj.current.disconnect()
      console.log('observer disconnected')
      if (totalCount === 0) {
        return
      }
    }

    setMyRecipe((cur) => {
      const newArr = [...cur]
      myRecipes.diyRecipes.forEach((data) => {
        if (cur.length) {
          cur.forEach((curData, index) => {
            if (data.date === curData.date) {
              newArr[index].list.push(...data.list)
            } else if (index === cur.length - 1) {
              newArr.push(data)
            }
          })
        } else {
          newArr.push(data)
        }
      })
      return newArr
    })

    cursorId.current = myRecipes.diyRecipes.at(-1).list.at(-1)._id
    console.log(myRecipes, cursorId.current)
  }

  const [observeRef, observerObj] = useInfiniteScroll(myRecipeData)
  const observerReset = async () => {
    console.log('observe restart')
    observerObj.current.disconnect()
    setMyRecipe([])

    cursorId.current = null

    await myRecipeData()
    observerObj.current.observe(observeRef.current)
  }

  const deleteMyRecipe = async (id) => {
    const deleteCheck = confirm('삭제하시겠습니까?')
    if (deleteCheck) {
      try {
        const myRecipes = await api.delete(`/diy-recipes/${id}`)
        observerReset()
        toast('레시피가 삭제되었습니다', { duration: 800, icon: '🫡' })
        console.log(id)
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    console.log(myRecipe)
  }, [myRecipe])

  return (
    <>
      <RecipeContainer>
        <Title>내가 만든 레시피</Title>
        {myRecipe.length > 0 ? (
          myRecipe.map((element, index) => (
            <Fragment key={index}>
              <ByDateLine date={element.date} />
              {element.list.length > 0 && (
                <ProductList
                  datas={element.list}
                  isBtnsOn={true}
                  searchType="recipes"
                  deleteMyRecipe={deleteMyRecipe}
                />
              )}
            </Fragment>
          ))
        ) : (
          <NotData>작성한 레시피가 없습니다.</NotData>
        )}
        <div ref={observeRef}></div>
      </RecipeContainer>
      <Toaster /> {/* Toaster 컴포넌트 추가 */}
    </>
  )
}

const RecipeContainer = styled.div`
  padding-bottom: 80px;
`
