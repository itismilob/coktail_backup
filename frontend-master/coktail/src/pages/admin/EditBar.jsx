import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '@/utils/api'
import toast, { Toaster } from 'react-hot-toast'

//components
import ImageUpload from '@/components/recipeUpload/ImageUpload'
import Title from '@/components/layouts/admin/Title'

//styled component
import * as Styled from './Admin.Style'

export default function RegisterBar() {
  const [name, setName] = useState('') //이름
  const [tel, setTel] = useState('') //전화번호
  const [address, setAddress] = useState('') //주소
  const [time, setTime] = useState('') //시간
  const [image, setImage] = useState([]) //이미지
  const [coordinate, setCoordinate] = useState({}) // 좌표
  const [ids, setBarId] = useState('') //아이디

  const navigate = useNavigate()
  const location = useLocation()

  // URL에서 ID 추출 함수
  const getQueryId = () => {
    const query = new URLSearchParams(location.search)
    return query.get('id')
  }

  // 바 상세 조회 API 호출
  const getBarDetail = async (id) => {
    try {
      const response = await api.get(`/bars/${id}`)
      const barData = response.data
      setName(barData.name)
      setImage(barData.image)
      console.log('img:', barData.image)
      setTel(barData.tel)
      setAddress(barData.address)
      setTime(barData.time)
      setCoordinate({ x: barData.x, y: barData.y })
      setBarId(barData._id)
    } catch (error) {
      console.error('에러 발생:', error)
    }
  }

  useEffect(() => {
    const id = getQueryId()
    if (id) {
      getBarDetail(id)
    }
  }, [])

  //바 수정 api
  const submitHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('images', image)
    formData.append('tel', tel)
    formData.append('address', address)
    formData.append('time', time)
    formData.append('x', coordinate.x)
    formData.append('y', coordinate.y)

    if (!name || !image || !tel || !address || !time) {
      toast('모든 필드값을 입력해주세요!', { duration: 800, icon: '📝' })
    }

    try {
      await api.put(`/bars/${ids}`, formData)
    } catch (error) {
      toast('수정하시는데 실패했습니다.', { duration: 800, icon: '🥺' })
      return
    }

    navigate(-1)
  }

  const inputValue = useRef('')
  const inputChangeHandler = (e) => {
    inputValue.current = e.target.value

    setAddress(e.target.value)
  }

  const addressToCoordinate = () => {
    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder()

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(
      inputValue.current, // 원하는 주소를 입력합니다

      function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          // 좌표를 저장합니다
          setCoordinate({ x: result[0].x, y: result[0].y })
        }
      },
    )
  }

  //취소버튼
  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <Styled.BarContainer onSubmit={submitHandler}>
      <Title text="Bar 수정" />
      <Styled.ContentContainer>
        <div className="ImageContainer">
          {image.length && (
            <ImageUpload
              setImgs={(imgs) => setImage(imgs)}
              defaultValue={image}
            />
          )}
        </div>
        <div className="InputContainer">
          <Styled.Input
            value={name}
            type="text"
            placeholder="Bar 이름"
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <Styled.Input
            type="text"
            value={address}
            placeholder="상세주소 : 서울시 강남구 선릉로 152길"
            onChange={(e) => {
              inputChangeHandler(e)
            }}
          />
          <Styled.CoordinateContainer>
            <button onClick={addressToCoordinate} type="button">
              주소로 좌표 검색
            </button>
            <input type="text" placeholder="x" value={coordinate.x} readOnly />
            <br />
            <input type="text" placeholder="y" value={coordinate.y} readOnly />
          </Styled.CoordinateContainer>
          <Styled.Input
            type="text"
            value={tel}
            placeholder="연락처 : 02) 1234-1234"
            onChange={(e) => {
              setTel(e.target.value)
            }}
          />
          <Styled.Input
            type="text"
            value={time}
            placeholder="운영시간 : 20:00 ~ 4:00"
            onChange={(e) => {
              setTime(e.target.value)
            }}
          />
        </div>
      </Styled.ContentContainer>
      <Styled.ButtonGroup>
        <button className="btn cancelBtn" onClick={handleCancel}>
          취소
        </button>
        <button className="btn submitBtn" type="submit">
          수정하기
        </button>
      </Styled.ButtonGroup>
      <Toaster /> {/* Toaster 컴포넌트 추가 */}
    </Styled.BarContainer>
  )
}
