import styled from 'styled-components'
import { api } from '@/utils/api'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDebounce } from '@/hooks/useDebounce'

import { primaryPink, primaryBlue } from '@/assets/styleVariables'
// icons
import { FaStar } from 'react-icons/fa'
import Heart from '@/components/icons/HeartIcon'
import FullHeart from '@/components/icons/FullHeartIcon'
import ImageAndCircle from '@/components/ImageAndCircle'

export default function ListCell({
  data,
  searchType,
  isLikesOn,
  isBtnsOn,
  deleteMyRecipe,
}) {
  const [isWished, setWished] = useState(data.isWished)
  const onWishlistClickHandler = async () => {
    setWished((cur) => !cur)
    setWishDebounce(!isWished)
  }

  const wishApi = async (isWishedCheck) => {
    if (isWishedCheck) {
      const response = await api.post(`/users/wishlist/${data._id}`)
    } else {
      const response = await api.delete(`/users/wishlist/${data._id}`)
    }
    // rollback 애러나면 결과를 원래대로
  }
  const setWishDebounce = useDebounce(wishApi, 500)

  const onDeleteRecipeHandler = async () => {
    await api.delete(`/diy-recipes/${data._id}`)
  }

  return (
    <StyledCell>
      <div>
        <Link to={`/${searchType}/${data._id}`}>
          <ImageAndCircle imgUrl={data.image} />
        </Link>
      </div>
      <div>
        <Link to={`/${searchType}/${data._id}`}>{data.name}</Link>
        <div>
          <div className="star">
            <FaStar color={'FFD600'} />
            <div>{`${data.avgRating}(${data.reviewCount})`}</div>
          </div>

          {isBtnsOn && (
            <div className="btns">
              <div className="deleteBtn">
                <button
                  onClick={() => {
                    deleteMyRecipe(data._id)
                  }}
                >
                  삭제
                </button>
              </div>
              <div className="modifyBtn">
                <Link to={data._id}>
                  <button>수정</button>
                </Link>
              </div>
            </div>
          )}

          {isLikesOn && (
            <div onClick={onWishlistClickHandler}>
              {isWished ? <FullHeart /> : <Heart />}
            </div>
          )}
        </div>
      </div>
    </StyledCell>
  )
}

const StyledCell = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 3px 5px lightgray;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  & > div:first-child {
    img {
      width: 100%;
      height: 200px;
      /* background-color: lightgray; */
      border-radius: 10px;
      object-fit: cover;
    }
  }
  & > div:last-child {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    a {
      font-weight: bold;
      margin: 10px 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .star {
    height: 100%;
    display: flex;
    align-items: center;
    svg {
      width: 100%;
      height: 100%;
    }
    div {
      height: 100%;
      margin-left: 5px;
      font-size: 12px;
      display: flex;
      align-items: center;
      padding-top: 5px;
    }
  }
  .btns {
    display: flex;
    gap: 3px;
    & > * {
      border-radius: 4px;
      padding: 3px 6px;
    }
    .deleteBtn {
      background-color: ${primaryPink};
    }
    .modifyBtn {
      background-color: ${primaryBlue};
    }
  }
`
