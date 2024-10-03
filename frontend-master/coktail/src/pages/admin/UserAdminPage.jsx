import { useState, useEffect } from 'react'
import { api } from '@/utils/api'
import toast, { Toaster } from 'react-hot-toast'

//styled component
import * as Styled from './Admin.Style'

//components
import Table from '@/components/layouts/admin/Table'
import Search from '@/components/layouts/admin/Search'
import Title from '@/components/layouts/admin/Title'
import Pagination from '@/components/layouts/admin/Pagination'

//user header dummyData
const headerUserData = ['이메일', '글쓰기 권한 ON/Off', '유저삭제']

const UserAdminPage = () => {
  const [currentData, setCurrentData] = useState([])
  /*검색*/
  const [searchQuery, setSearchQuery] = useState('')
  /*페이지네이션*/
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(6) // 한 페이지당 게시물 수, 초기값 설정
  const [totalSize, setTotalSize] = useState(0) // 총 게시물 수
  const [data, setData] = useState([])

  const [isChangeCheck, setIsChangeCheck] = useState(true)

  //사용자 목록 조회 api
  const getUserList = async () => {
    const response = await api.get('/users', {
      params: {
        keyword: searchQuery,
        perPage: perPage,
        page: page,
      },
    })

    if (response.data && response.data.users) {
      const parseDatas = response.data.users.map((data) => {
        const newData = {
          infos: [data.email],
          isWrite: [data.isWrite],
          id: [data._id],
        }
        return newData
      })
      setCurrentData(parseDatas)
      setData(response.data.users)
      setTotalSize(response.data.total)
    } else {
      console.log('데이터가 없습니다.')
    }
  }

  useEffect(() => {
    getUserList()
  }, [page, isChangeCheck])

  //검색 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setPage(1) // 검색 시 첫 페이지로 리셋
  }

  //토글  => 사용자 권한 수정
  //사용자 권한 수정 api
  const toggleHandler = async (id) => {
    try {
      await api.put(`/users/${id}/permissions`)
      toast('권한이 변경되었습니다.', { duration: 800, icon: '😤' })
    } catch (error) {
      console.error('에러 발생', error)
    }
  }

  //유저 삭제 api
  const deleteHandler = async (id) => {
    try {
      await api.delete(`/users/${id}/delete`)
      setIsChangeCheck(!isChangeCheck)
      toast('유저가 삭제되었습니다.', { duration: 800, icon: '🫡' })
    } catch (error) {
      console.error('에러발생', error)
    }
  }

  return (
    <Styled.Container>
      <Title text="유저 관리" />
      <Styled.SearchContainer>
        <Search
          value={searchQuery}
          onChange={handleSearchChange}
          onSearchClickHandler={getUserList}
        />
      </Styled.SearchContainer>
      <Table
        headers={headerUserData}
        datas={currentData}
        isToggle={true}
        toggleHandler={toggleHandler}
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

export default UserAdminPage
