import * as Styled from './style'

import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { api } from '@/utils/api'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
// components
import ProductList from '@/components/productList'
import FilterPage from '@/components/filterPage/'
import FilterSelected from '@/components/filterPage/filterSelected'
import FilterSort from '@/components/filterPage/filterSort'
import Title from '@/components/title'
import DataNotFound from '@/components/dataNotFound'

// icons
import Pencil from '@/assets/svg/pencil.svg?react'

const perPage = 6

export default function CategoryPage({ searchType, title, url }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const base = useRef(searchParams.get('base'))
  const abv = useRef(searchParams.get('abv'))
  const sweet = useRef(searchParams.get('sweet'))
  const sour = useRef(searchParams.get('sour'))
  const bitter = useRef(searchParams.get('bitter'))
  const sort = useRef()
  const cursorId = useRef()
  const cursorValue = useRef()

  const options = [
    abv.current,
    sweet.current,
    sour.current,
    bitter.current,
  ].map((data) => {
    if (data === null) return null
    if (data > 3) return 3
    if (data < 1) return 1
    return Number(data)
  })

  const selectionData = useRef(
    [
      { name: 'base', value: base.current },
      { name: 'abv', value: options[0] },
      { name: 'sweet', value: options[1] },
      { name: 'sour', value: options[2] },
      { name: 'bitter', value: options[3] },
    ].map((item, index) => {
      if (index === 0) return item
      if (item.value === null) return item
      if (item.value === -1) return { name: item.name, value: null }
      else return { name: item.name, value: Number(item.value) }
    }),
  )

  const [baseList, setBaseList] = useState([])
  const [dataLength, setDataLength] = useState(0)
  const [isModalOn, setIsModalOn] = useState(false)
  const [datas, setDatas] = useState([])
  const [selection, setSelection] = useState()

  const getBase = async () => {
    const response = await api.get(`/bases`)
    setBaseList(response.data.bases.map((base) => base.name))
  }

  const getDatas = async () => {
    const response = await api.get(`/${url}`, {
      params: {
        base: selectionData.current[0].value,
        sort: sort.current,
        abv: selectionData.current[1].value,
        sweet: selectionData.current[2].value,
        sour: selectionData.current[3].value,
        bitter: selectionData.current[4].value,
        perPage: perPage,
        cursorId: cursorId.current,
        cursorValue: cursorValue.current,
      },
    })
    // console.log(response.data)

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
    console.log('observe restart')
    observerObj.current.disconnect()
    setDatas([])
    setDataLength(0)
    cursorId.current = null
    cursorValue.current = null

    await getDatas()
    // getdata 실패하는 경우
    observerObj.current.observe(observeRef.current)
  }

  const onSortChangeHandler = (e) => {
    if (e.target.value === '') sort.current = null
    else sort.current = e.target.value
    observerReset()
  }

  const modalHandler = (newSelection) => {
    // console.log(newSelection)
    setIsModalOn((cur) => !cur)
    if (isModalOn) {
      selectionData.current = newSelection
      changeParams()
      observerReset()
    }
  }

  const tagCancelHandler = (tagIndex) => {
    selectionData.current[tagIndex].value = null
    console.log(selectionData.current)
    changeParams()
    observerReset()
  }

  const changeParams = () => {
    const newParams = {}
    if (selectionData.current[0].value !== null)
      newParams.base = selectionData.current[0].value
    if (selectionData.current[1].value !== null)
      newParams.abv = selectionData.current[1].value
    if (selectionData.current[2].value !== null)
      newParams.sweet = selectionData.current[2].value
    if (selectionData.current[3].value !== null)
      newParams.sour = selectionData.current[3].value
    if (selectionData.current[4].value !== null)
      newParams.bitter = selectionData.current[4].value

    navigate({ search: new URLSearchParams(newParams).toString() })
  }

  useEffect(() => {
    getBase()
  }, [])

  useEffect(() => {
    setSelection(selectionData.current)
  }, [selectionData.current])

  return (
    <Styled.list>
      {selection && (
        <FilterPage
          isModalOn={isModalOn}
          modalHandler={modalHandler}
          baseList={baseList}
          selection={selection}
        />
      )}
      <div>
        <Styled.titleContainer>
          <Title>{title}</Title>

          {searchType === 'recipes' && (
            <Styled.link to="/recipes/register">
              레시피 올리기
              <Pencil />
            </Styled.link>
          )}
        </Styled.titleContainer>
        {selection && (
          <FilterSelected
            modalHandler={modalHandler}
            selection={selection}
            baseList={baseList}
            tagCancelHandler={tagCancelHandler}
          />
        )}
        <Styled.filter>
          <div>검색된 레시피 {dataLength}</div>
          <FilterSort onChangeHandler={onSortChangeHandler} />
        </Styled.filter>

        {datas.length ? (
          <ProductList datas={datas} searchType={searchType} isLikesOn={true} />
        ) : (
          <DataNotFound>검색 결과가 없습니다.</DataNotFound>
        )}
        <div className={'observer'} ref={observeRef} />
      </div>
    </Styled.list>
  )
}
