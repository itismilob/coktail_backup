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

//review header dummy data
const headerReviewData = ['이메일', '타입', '제목', '작성일', '리뷰삭제']

//select options
const options = [
  { value: '', label: '전체' },
  { value: 'cocktails', label: 'cocktail' },
  { value: 'recipes', label: 'diyRecipe' },
]

const ReviewAdminPage = () => {
  const [currentData, setCurrentData] = useState([])
  /*Select option*/
  const [selectedType, setSelectedType] = useState('')
  /*검색*/
  const [searchQuery, setSearchQuery] = useState([])
  /*페이지네이션*/
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(6) // 한 페이지당 게시물 수, 초기값 설정
  const [totalSize, setTotalSize] = useState(0) // 총 게시물 수
  const [data, setData] = useState([])

  const [isChangeCheck, setIsChangeCheck] = useState(true)

  //리뷰 목록 조회 api
  const getReviewList = async () => {
    const response = await api.get('/reviews/search', {
      params: {
        keyword: searchQuery,
        type: selectedType,
        perPage: perPage,
        page: page,
      },
    })

    if (response.data && response.data.reviews) {
      const parseDatas = response.data.reviews.map((data) => {
        const newData = {
          infos: [data.email, data.type, data.name, data.createdAt],
          id: [data._id],
        }
        return newData
      })

      setCurrentData(parseDatas)
      setData(response.data.reviews)
      setTotalSize(response.data.total)
    } else {
      console.log('데이터가 없습니다.')
    }
  }

  useEffect(() => {
    getReviewList()
  }, [selectedType, page, isChangeCheck])

  //검색 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // 검색 시 첫 페이지로 리셋
  }

  //Select 핸들러
  const handleSelectChange = (event) => {
    setSelectedType(event.target.value)
    setPage(1) // 타입 변경 시 첫 페이지로 리셋
  }

  //리뷰삭제 api
  const deleteHandler = async (id) => {
    try {
      await api.delete(`/reviews/${id}`)
      setIsChangeCheck(!isChangeCheck)
      toast('리뷰가 삭제되었습니다.', { duration: 800, icon: '🫡' })
    } catch (error) {
      console.error('에러발생', error)
    }
  }

  return (
    <Styled.Container>
      <Title text="리뷰 관리" />
      <Styled.SearchContainer>
        <Search
          value={searchQuery}
          onChange={handleSearchChange}
          onSearchClickHandler={getReviewList}
        />
      </Styled.SearchContainer>
      <Styled.StyledSelect onChange={handleSelectChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Styled.StyledSelect>
      <Table
        headers={headerReviewData}
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

export default ReviewAdminPage
