import { api } from '@/utils/api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Spacing from '@/utils/Spacing'
import { paddingBottom } from '@/assets/styleVariables'

/* component */
import CocktailHeader from '@/components/detailPage/CocktailHeader'
import Information from '@/components/detailPage/Information'
import Comment from '@/components/detailPage/Comment'
import Ingredients from '@/components/detailPage/Ingredients'
import Recipe from '@/components/detailPage/Recipe'
import AverageRate from '@/components/detailPage/AverageRate'
import Review from '@/components/detailPage/Review'

const type = 'cocktail'

export default function CocktailDetailPage({}) {
  const [data, setData] = useState({})
  const { id } = useParams()

  const cocktailData = async () => {
      const response = await api.get(`/cocktails/${id}`)
      const getData = response.data
      setData(getData)
  }

  useEffect(() => {
    cocktailData()
  }, [])


  return (
    <Container>
      {data.reviews && (
        <>
          <CocktailHeader type={type} data={data} />
          <Information type={type} data={data} />
          <Comment type={type} data={data} />
          <Ingredients type={type} data={data} />
          <Recipe type={type} data={data} />
          <AverageRate type={type} data={data} />
          <Review type={type} data={data} id={id} />
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
