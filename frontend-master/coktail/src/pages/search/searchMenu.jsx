import * as Styled from './style'
import { useNavigate } from 'react-router-dom'

import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import ProductList from '@/components/productList'

import { api } from '@/utils/api'

const menuDatas = [
  {
    name: '칵테일',
    searchType: 'cocktails',
  },
  {
    name: 'DIY 레시피',
    searchType: 'recipes',
  },
]

const sort = 'rating'
const item = 2

export default function SearchMenu() {
  const navigate = useNavigate()
  const [dataLength, setDataLength] = useState([0, 0])

  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword')

  const [datas, setDatas] = useState([])

  useEffect(() => {
    getDatas()
  }, [keyword])

  const getDatas = async () => {
    const newDatas = await api.get(`/search`, {
      params: { keyword: keyword, sort: sort, item: item },
    })
    console.log(newDatas)
    setDatas([
      newDatas.data.cocktails.splice(0, 2),
      newDatas.data.diyRecipes.splice(0, 2),
    ])
    setDataLength([newDatas.data.cocktailSize, newDatas.data.diyRecipeSize])
  }

  const moreBtnHandler = (type) => {
    navigate(`list?keyword=${keyword}&search-type=${type}`)
  }

  return (
    <>
      {menuDatas.map((menuData, index) => (
        <Styled.category key={index}>
          <div>
            <div>
              <h2>{menuData.name}</h2>
              <h3>{`(${dataLength[index]})`}</h3>
            </div>
            {dataLength[index] > 0 && (
              <button
                onClick={() => {
                  moreBtnHandler(menuData.searchType)
                }}
              >
                {'더보기 >'}
              </button>
            )}
          </div>
          <ProductList
            datas={datas[index]}
            searchType={menuData.searchType}
            isLikesOn={true}
          />
        </Styled.category>
      ))}
    </>
  )
}
