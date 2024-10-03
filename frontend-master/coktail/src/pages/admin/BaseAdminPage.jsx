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
const headerBaseData = ['Base 사진', 'Base 이름', 'Base 수정', 'Base 삭제']

const ProductAdminPage = () => {
  const [currentData, setCurrentData] = useState([])
  const [imgURL, setImgURL] = useState([])
  /*필터 자동검색*/
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  /* 페이지네이션 */
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(6) // 한 페이지당 게시물 수, 초기값 설정
  const [totalSize, setTotalSize] = useState(0) // 총 게시물 수
  const [data, setData] = useState([])

  const navigate = useNavigate()

  const [isChangeCheck, setIsChangeCheck] = useState(true)

  //베이스 목록 조회 api
  const getBaseList = async () => {
    const response = await api.get('/bases', {
      params: {
        perPage: perPage,
        page: page,
      },
    })

    if (response.data && response.data.bases) {
      const newURL = []
      const parseDatas = response.data.bases.map((data) => {
        newURL.push(data.image)
        const newData = {
          infos: [data.name],
          id: [data._id],
        }
        return newData
      })
      setImgURL([...newURL])
      setCurrentData(parseDatas)
      setData(response.data)
      setTotalSize(response.data.total)
    } else {
      console.log('데이터가 없습니다.')
    }
  }

  useEffect(() => {
    getBaseList()
  }, [page, isChangeCheck])

  //검색자동 기능
  useEffect(() => {
    if (search.trim() === '') {
      setFilter(currentData)
    } else {
      const result = currentData.filter((item) =>
        item.infos.some((info) =>
          info.toLowerCase().includes(search.toLowerCase()),
        ),
      )
      setFilter(result)
    }
  }, [search, currentData])

  //베이스 삭제 api
  const deleteHandler = async (id) => {
    try {
      await api.delete(`/bases/${id}`)
      setIsChangeCheck(!isChangeCheck)
      toast('베이스가 삭제되었습니다!', { duration: 800, icon: '🫡' })
    } catch (error) {
      console.error('에러발생', error)
    }
  }

  //수정버튼
  const editHandler = (id) => {
    navigate(`/admin/bases/edit?id=${id}`)
  }

  return (
    <Styled.Container>
      <Title text="베이스 관리" />
      <Styled.SearchContainer>
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      </Styled.SearchContainer>
      <Link to="/admin/bases/register">
        <Styled.ButtonContainer>
          <Button text="베이스 등록 " />
        </Styled.ButtonContainer>
      </Link>
      <Table
        headers={headerBaseData}
        datas={filter}
        isEdit={true}
        isDelete={true}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        imgURL={imgURL}
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
