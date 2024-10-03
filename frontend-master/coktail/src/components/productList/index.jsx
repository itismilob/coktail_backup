import styled from 'styled-components'
import ListCell from './listCell'

export default function ProductList({
  datas,
  searchType,
  isLikesOn,
  isBtnsOn,
  deleteMyRecipe,
}) {
  const onRemoveLike = () => {}
  return (
    <StyledProductList>
      {datas &&
        datas.map((data, index) => (
          <ListCell
            searchType={searchType}
            data={data}
            isLikesOn={isLikesOn}
            isBtnsOn={isBtnsOn}
            key={index}
            deleteMyRecipe={deleteMyRecipe}
            onRemoveLike={onRemoveLike}
          />
        ))}
    </StyledProductList>
  )
}

const StyledProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
`
