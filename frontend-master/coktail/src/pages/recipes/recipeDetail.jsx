import styled from 'styled-components'
import Spacing from '@/utils/Spacing'
import { paddingBottom } from '@/assets/styleVariables'
import { api } from '@/utils/api'

/* components */
import CocktailHeader from '@/components/detailPage/CocktailHeader'
import Information from '@/components/detailPage/Information'
import Comment from '@/components/detailPage/Comment'
import Ingredients from '@/components/detailPage/Ingredients'
import Recipe from '@/components/detailPage/Recipe'
import AverageRate from '@/components/detailPage/AverageRate'
import Review from '@/components/detailPage/Review'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const type = 'recipe'

export default function DIYRecipeDetailPage() {
  const [data, setData] = useState({})
  const { id } = useParams()

  // console.log(data)
  const recipeData = async () => {
      const response = await api.get(`/diy-recipes/${id}`)
      const getData = response.data
      setData(getData)
  }

  useEffect(() => {
    recipeData()
  }, [])

  return (
    <Container>
      {data.reviews && (
        <>
          <CocktailHeader data={data} />
          <Information data={data} />
          <Comment data={data} />
          <Ingredients data={data} />
          <Recipe data={data} />
          <AverageRate data={data} />
          <Review data={data} id={id} type={type}/>
          <Spacing size={paddingBottom} />
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 0 2em;
`
