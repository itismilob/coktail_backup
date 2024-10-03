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

//Bar header dummyData
const headerBarData = [
  'Bar이름',
  '주소',
  '연락처',
  '운영시간',
  'Bar 수정',
  'Bar 삭제',
]

const ReviewAdminPage = () => {
  const [currentData, setCurrentData] = useState([])
  const [searchQuery, setSearchQuery] = useState([])

  //페이지네이션
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(6) // 한 페이지당 게시물 수, 초기값 설정
  const [totalSize, setTotalSize] = useState(0) // 총 게시물 수
  const [data, setData] = useState([])

  const navigate = useNavigate()

  const [isChangeCheck, setIsChangeCheck] = useState(true)

  //바 목록 조회
  const getBarList = async () => {
    const response = await api.get('/bars', {
      params: {
        keyword: searchQuery,
        perPage: perPage,
        page: page,
      },
    })

    if (response.data && response.data.bars) {
      const parseDatas = response.data.bars.map((data) => {
        const newData = {
          infos: [data.name, data.address, data.tel, data.time],
          id: [data._id],
        }
        return newData
      })
      setCurrentData(parseDatas)
      setData(response.data.bars)
      setTotalSize(response.data.total)
    } else {
      console.log('데이터가 없습니다.')
    }
  }

  useEffect(() => {
    getBarList()
  }, [page, isChangeCheck])

  //검색 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setPage(1) // 검색 시 첫 페이지로 리셋
  }

  //바 삭제 api
  const deleteHandler = async (id) => {
    try {
      await api.delete(`/bars/${id}`)
      setIsChangeCheck(!isChangeCheck)
      toast('Bar 삭제되었습니다!', { duration: 800, icon: '🫡' })
    } catch (error) {
      console.error('에러발생', error)
    }
  }

  //수정버튼
  const editHandler = (id) => {
    navigate(`/admin/bars/edit?id=${id}`)
  }

  return (
    <Styled.Container>
      <Title text="Bar 관리" />
      <Styled.SearchContainer>
        <Search
          value={searchQuery}
          onChange={handleSearchChange}
          onSearchClickHandler={getBarList}
        />
      </Styled.SearchContainer>
      <Link to="/admin/bars/register">
        <Styled.ButtonContainer>
          <Button text="Bar 등록 " />
        </Styled.ButtonContainer>
      </Link>
      <Table
        headers={headerBarData}
        datas={currentData}
        isEdit={true}
        isDelete={true}
        deleteHandler={deleteHandler}
        editHandler={editHandler}
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
