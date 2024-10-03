// components
import ProductList from '@/components/productList'
import Title from '@/components/title'
import DataNotFound from '@/components/dataNotFound'

import { useSearchParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { api } from '@/utils/api'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'

import * as Style from './likeList.style'

const perPage = 6

export default function LikeList() {
  const [searchParams] = useSearchParams()
  const searchType = searchParams.get('search-type')

  const title = searchType === 'cocktails' ? '칵테일' : 'DIY 레시피'
  const [datas, setDatas] = useState([])
  const cursorId = useRef()

  const getDatas = async () => {
    const response = await api.get(`/users/wishlist`, {
      params: {
        type: searchType,
        cursorId: cursorId.current,
        perPage: perPage,
      },
    })

    const newData =
      searchType === 'cocktails'
        ? response.data.cocktails
        : response.data.diyRecipes

    console.log(newData)

    if (newData.length < perPage) {
      observerObj.current.disconnect()
      console.log('observer disconnected')

      if (newData.length === 0) {
        return
      }
    }

    // 찜목록에 불러오는 모든 데이터는 isWished를 true로 변경함
    newData.map((item) => {
      item.isWished = true
      return item
    })
    setDatas((cur) => [...cur, ...newData])
    cursorId.current = newData.at(-1)._id
  }

  const [observeRef, observerObj] = useInfiniteScroll(getDatas)

  return (
    <>
      <Style.list>
        <Title>{title} 찜</Title>
        {datas.length !== 0 ? (
          <ProductList datas={datas} searchType={searchType} isLikesOn={true} />
        ) : (
          <DataNotFound>아직 찜 목록이 없습니다. <br /> 찜을 해주세요 :	&#41;</DataNotFound>
        )}
        <div className="observer" ref={observeRef} />
      </Style.list>
    </>
  )
}
