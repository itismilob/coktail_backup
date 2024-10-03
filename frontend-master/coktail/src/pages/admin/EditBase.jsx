import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '@/utils/api'
import toast, { Toaster } from 'react-hot-toast'

//components
import ImageUpload from '@/components/recipeUpload/ImageUpload'
import Title from '@/components/layouts/admin/Title'

//styled component
import * as Styled from './Admin.Style'

export default function EditBase() {
  const [name, setName] = useState('') //이름
  const [images, setImages] = useState([]) //이미지
  const [ids, setIds] = useState('') //아이디

  const location = useLocation()
  const navigate = useNavigate()

  const getQueryId = () => {
    const query = new URLSearchParams(location.search)
    return query.get('id')
  }

  // 베이스 상세 조회 api
  const getBaseDetail = async (id) => {
    try {
      const response = await api.get(`/bases/${id}`)
      const baseData = response.data
      setName(baseData.name)
      setImages(baseData.image)
      console.log('baseData:', baseData.image)
      setIds(baseData._id)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    const id = getQueryId()
    if (id) {
      getBaseDetail(id)
    }
  }, [])

  //베이스 수정 api
  const submitHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name) // 베이스 이름
    formData.append('images', images) // 이미지

    if (!name === 0 || !images) {
      toast('모든 필드값을 입력해주세요!', { duration: 800, icon: '📝' })
    }

    try {
      await api.put(`/bases/${ids}`, formData)
    } catch (error) {
      toast('수정하시는데 실패했습니다.', { duration: 800, icon: '🥺' })
      return
    }

    navigate(-1)
  }

  function nameHandler(e) {
    setName(e.target.value)
  }

  //취소버튼
  const handleCancel = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <Styled.BaseContainer onSubmit={submitHandler}>
      <Title text="Base 수정" />
      <div>
        <div className="ImageBaseContainer">
          {images.length && (
            <ImageUpload
              setImgs={(imgs) => setImages(imgs)}
              defaultValue={images}
            />
          )}
        </div>
        <div className="InputBaseContainer">
          <Styled.Input
            name="name"
            id="name"
            value={name}
            type="text"
            onChange={nameHandler}
            placeholder="Base 이름"
          />
        </div>
      </div>
      <Styled.ButtonGroup>
        <button className="btn cancelBtn" onClick={handleCancel}>
          취소
        </button>
        <button className="btn submitBtn" type="submit">
          수정하기
        </button>
      </Styled.ButtonGroup>
      <Toaster /> {/* Toaster 컴포넌트 추가 */}
    </Styled.BaseContainer>
  )
}
