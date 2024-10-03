import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '@/utils/api'
import toast, { Toaster } from 'react-hot-toast'

//components
import ImageUpload from '@/components/recipeUpload/ImageUpload'
import Title from '@/components/layouts/admin/Title'

//styled component
import * as Styled from './Admin.Style'

export default function RegisterBase() {
  const [name, setName] = useState('') //이름
  const [images, setImages] = useState([]) //이미지
  const navigate = useNavigate()

  useEffect(() => {
    setName(name)
    setImages(images)
  }, [name, images])

  function nameHandler(e) {
    setName(e.target.value)
  }

  //베이스 등록 api -> formData 전송
  const submitHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name) // 베이스 이름
    formData.append('images', images) // 이미지

    if (!name || !images) {
      toast('모든 필드값을 입력해주세요!', { duration: 800, icon: '📝' })
    }

    try {
      await api({
        method: 'post',
        url: '/bases',
        data: formData,
      })
      toast('등록이 완료되었습니다!', { duration: 800, icon: '💖' })
      alert('')
    } catch (error) {
      toast('등록에 실패했습니다.', { duration: 800, icon: '🥺' })
      return
    }

    navigate(-1)
  }

  //취소버튼
  const handleCancel = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <Styled.BaseContainer onSubmit={submitHandler}>
      <Title text="Base 등록" />
      <div>
        <div className="ImageBaseContainer">
          <ImageUpload setImgs={(e) => setImages(e)} />
        </div>
        <div className="InputBaseContainer">
          <Styled.Input
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
          등록하기
        </button>
      </Styled.ButtonGroup>
      <Toaster /> {/* Toaster 컴포넌트 추가 */}
    </Styled.BaseContainer>
  )
}
