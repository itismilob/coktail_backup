import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '@/utils/api'
import toast, { Toaster } from 'react-hot-toast'

//styled component
import * as Styled from './Admin.Style'

//components
import Table from '@/components/layouts/admin/Table'
import Title from '@/components/layouts/admin/Title'
import Search from '@/components/layouts/admin/Search'
import Pagination from '@/components/layouts/admin/Pagination'
import Button from '@/components/layouts/admin/Button'

//cocktail header dummyData
const headerProductData = ['상품 관리', '작성일', '상품 수정', '상품 삭제']

const ProductAdminPage = () => {
  const [currentData, setCurrentData] = useState([])
  /*검색*/
  const [searchQuery, setSearchQuery] = useState('')
  /*페이지네이션*/
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(6) // 한 페이지당 게시물 수, 초기값 설정
  const [totalSize, setTotalSize] = useState(0) // 총 게시물 수
  const [data, setData] = useState([])

  const navigate = useNavigate()

  const [isChangeCheck, setIsChangeCheck] = useState(true)

  //칵테일 목록 조회 api
  const getProductList = async () => {
    const response = await api.get('/search/admin', {
      params: {
        type: 'cocktails',
        keyword: searchQuery,
        page: page,
        perPage: perPage,
      },
    })

    if (response.data && response.data.cocktails) {
      const parsedData = response.data.cocktails.map((data) => ({
        infos: [data.name, data.createdAt],
        id: [data._id],
      }))
      setCurrentData(parsedData)
      setData(response.data.cocktails)
      setTotalSize(response.data.cocktailSize)
    } else {
      console.log('데이터가 없습니다.')
    }
  }

  useEffect(() => {
    getProductList()
  }, [page, isChangeCheck])

  //검색 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setPage(1) // 검색 시 첫 페이지로 리셋
  }

  //칵테일 삭제 api
  const deleteHandler = async (id) => {
    try {
      await api.delete(`/cocktails/${id}`)
      setIsChangeCheck(!isChangeCheck)
      toast('칵테일이 삭제되었습니다!', { duration: 800, icon: '🫡' })
    } catch (error) {
      toast('에러가 발생했습니다', { duration: 800, icon: '😭' })
      // console.error('에러발생', error)
    }
  }

  //수정버튼
  const editHandler = (id) => {
    navigate(`/admin/cocktails/edit?id=${id}`)
  }

  return (
    <Styled.Container>
      <Title text="칵테일 관리" />
      <Styled.SearchContainer>
        <Search
          value={searchQuery}
          onChange={handleSearchChange}
          onSearchClickHandler={getProductList}
        />
      </Styled.SearchContainer>
      <Link to="/admin/cocktails/register">
        <Styled.ButtonContainer>
          <Button text="칵테일 등록 " />
        </Styled.ButtonContainer>
      </Link>
      <Table
        headers={headerProductData}
        datas={currentData}
        isEdit={true}
        isDelete={true}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
      />
      <Pagination
        page={page}
        setPage={setPage}
        totalPost={totalSize}
        pageRange={perPage}
        btnRange={5} // 페이지네이션 버튼 범위 설정
      />
      <Toaster /> {/* Toaster 컴포넌트 추가 */}
    </Styled.Container>
  )
}

export default ProductAdminPage
