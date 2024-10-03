import { useState, useEffect } from 'react'
import { api } from '@/utils/api'
import toast, { Toaster } from 'react-hot-toast'

//styled component
import * as Styled from './Admin.Style'

//components
import Table from '@/components/layouts/admin/Table'
import Title from '@/components/layouts/admin/Title'
import Search from '@/components/layouts/admin/Search'
import Pagination from '@/components/layouts/admin/Pagination'

//header recipe dummyData
const headerRecipeData = ['이메일', '제목', '작성일', '리뷰 삭제']

const RecipeAdminPage = () => {
  const [currentData, setCurrentData] = useState([])
  /*검색*/
  const [searchQuery, setSearchQuery] = useState('')
  /*페이지네이션*/
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(6) // 한 페이지당 게시물 수, 초기값 설정
  const [totalSize, setTotalSize] = useState(0) // 총 게시물 수
  const [data, setData] = useState([])

  const [isChangeCheck, setIsChangeCheck] = useState(true)

  //DIY 레시피 목록 api
  const getRecipeList = async () => {
    const response = await api.get('/search/admin', {
      params: {
        type: 'recipes',
        keyword: searchQuery,
        perPage: perPage,
        page: page,
      },
    })

    if (response.data && response.data.diyRecipes) {
      const parsedData = response.data.diyRecipes.map((data) => ({
        infos: [data.email, data.name, data.createdAt],
        id: [data._id],
      }))
      setCurrentData(parsedData)
      setData(response.data.users)
      setTotalSize(response.data.diyRecipeSize)
    } else {
      console.log('데이터가 없습니다.')
    }
  }

  useEffect(() => {
    getRecipeList()
  }, [page, isChangeCheck])

  //검색 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setPage(1) // 검색 시 첫 페이지로 리셋
  }

  //레시피 삭제 api
  const deleteHandler = async (id) => {
    try {
      await api.delete(`/diy-recipes/${id}`)
      setIsChangeCheck(!isChangeCheck)
      toast('레시피가 삭제되었습니다!', { duration: 800, icon: '🫡' })
    } catch (error) {
      console.error('에러발생', error)
    }
  }

  return (
    <Styled.Container>
      <Title text="DIY 레시피 관리" />
      <Styled.SearchContainer>
        <Search
          value={searchQuery}
          onChange={handleSearchChange}
          onSearchClickHandler={getRecipeList}
        />
      </Styled.SearchContainer>
      <Table
        headers={headerRecipeData}
        datas={currentData}
        isDelete={true}
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

export default RecipeAdminPage
