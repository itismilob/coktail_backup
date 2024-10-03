import * as Styled from './style'

import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'

import FilterSort from '@/components/filterPage/filterSort'
import ProductList from '@/components/productList'
import { api } from '@/utils/api'

const perPage = 6

export default function SearchList() {
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword')
  const searchType = searchParams.get('search-type')

  // const page = useRef(0)
  const [datas, setDatas] = useState([])
  const [dataLength, setDataLength] = useState(0)
  const cursorId = useRef()
  const sort = useRef()
  const cursorValue = useRef()

  const getDatas = async () => {
    const response = await api.get(`/search`, {
      params: {
        keyword: keyword,
        type: searchType,
        sort: sort.current,
        cursorId: cursorId.current,
        cursorValue: cursorValue.current,
        perPage: perPage,
      },
    })

    console.log(response.data)

    const totalCount =
      searchType === 'cocktails'
        ? response.data.cocktails.length
        : response.data.diyRecipes.length

    const newDatas =
      searchType === 'cocktails'
        ? response.data.cocktails
        : response.data.diyRecipes

    const totalSize =
      searchType === 'cocktails'
        ? response.data.cocktailSize
        : response.data.diyRecipeSize

    if (totalCount < perPage) {
      observerObj.current.disconnect()
      console.log('observer disconnected')

      if (totalCount === 0) {
        return
      }
    }

    setDatas((cur) => [...cur, ...newDatas])
    cursorId.current = newDatas.at(-1)._id
    setDataLength(totalSize)
    if (sort.current === 'rating') {
      cursorValue.current = newDatas.at(-1).avgRating
    } else if (sort.current === 'review') {
      cursorValue.current = newDatas.at(-1).reviewCount
    }
  }

  const [observeRef, observerObj] = useInfiniteScroll(getDatas)

  // 옵저버, 데이터 리셋하고 데이터 다시 불러옴
  const observerReset = async () => {
    observerObj.current.disconnect()
    setDatas([])
    setDataLength(0)

    cursorId.current = null
    cursorValue.current = null
    console.log('observe restart')

    await getDatas()
    // getdata 실패하는 경우
    observerObj.current.observe(observeRef.current)
  }

  const onSortChangeHandler = (e) => {
    if (e.target.value === '') sort.current = null
    else sort.current = e.target.value
    observerReset()
  }

  return (
    <>
      <Styled.category>
        <div>
          <div>
            <h2>{searchType === 'cocktails' ? '칵테일' : 'DIY 레시피'}</h2>
            <h3>{`(${dataLength})`}</h3>
          </div>
          <FilterSort onChangeHandler={onSortChangeHandler} />
        </div>

        <ProductList datas={datas} searchType={searchType} isLikesOn={true} />
        <div className="observer" ref={observeRef} />
      </Styled.category>
    </>
  )
}
