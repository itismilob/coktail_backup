import { useEffect, useState, useRef } from 'react'
import * as Styled from './style'

import barImg from '@/assets/bar.png'
import markerImg from '@/assets/marker2shadow.png'
import HamburgerIcon from '@/components/icons/HamburgerIcon'
import { api } from '@/utils/api'
import { useDebounce } from '@/hooks/useDebounce'

export default function MapPage() {
  const [isInfoOn, setInfoOn] = useState(false)
  const infoBtnHandler = () => {
    if (!selectedData.name) return
    setInfoOn((cur) => !cur)
  }

  const [barDatas, setBarDatas] = useState([])
  const [selectedData, setSelectedData] = useState({})

  const mapObj = useRef()
  const [markers, setMarkers] = useState([])
  const currentLocation = useRef({ x: 0, y: 0 })

  const [mapBounds, setMapBounds] = useState({ x1: 0, x2: 0, y1: 0, y2: 0 })
  const changeDebounce = useDebounce(setMapBounds, 500)

  // kakaoMap
  // make/move map -> get datas -> when datas are changed -> refresh map
  useEffect(() => {
    // 현위치 불러오기
    navigator.geolocation.getCurrentPosition(function (position) {
      currentLocation.current = {
        x: position.coords.longitude, //경도
        y: position.coords.latitude, //위도
      }
      const currentLatLng = new kakao.maps.LatLng(
        currentLocation.current.y,
        currentLocation.current.x,
      )
      // console.log(currentLatLng)

      // 현위치로 지도 생성
      const container = document.getElementById('kakaoMap')
      const options = {
        center: currentLatLng,
        level: 7,
      }
      mapObj.current = new kakao.maps.Map(container, options)

      // 지도 영역 변경 이벤트
      kakao.maps.event.addListener(
        mapObj.current,
        'bounds_changed',
        function () {
          const bounds = mapObj.current.getBounds()
          const SW = bounds.getSouthWest()
          const NE = bounds.getNorthEast()
          const boundsData = {
            x1: SW.La,
            x2: NE.La,
            y1: SW.Ma,
            y2: NE.Ma,
          }
          // 좌표 값 변경 시 debounce로 딜레이를 줌
          changeDebounce(boundsData)
        },
      )
      getDatas()
    })
  }, [])

  const getDatas = async () => {
    if (!mapBounds) return
    const response = await api.get(`/bars`, {
      params: {
        x1: mapBounds.x1,
        y1: mapBounds.y1,
        x2: mapBounds.x2,
        y2: mapBounds.y2,
      },
    })
    setBarDatas(response.data.bars)
    console.log(response.data)
  }

  useEffect(() => {
    refreshMap()
  }, [barDatas])

  useEffect(() => {
    getDatas()
  }, [mapBounds])

  const refreshMap = async () => {
    if (!barDatas) return

    // 마커 리셋
    markers.forEach((marker) => {
      marker.setMap(null)
    })
    setMarkers([])

    // 커스텀 마커 이미지
    const imageSize = new kakao.maps.Size(45, 65) // 마커이미지의 크기입니다
    const imageOption = { offset: new kakao.maps.Point(27, 69) } // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    const markerImage = new kakao.maps.MarkerImage(
      markerImg,
      imageSize,
      imageOption,
    )

    // 마커 표시
    barDatas.forEach((data, index) => {
      const marker = new kakao.maps.Marker({
        map: mapObj.current,
        position: new kakao.maps.LatLng(data.y, data.x),
        title: data.title,
        isClicked: false,
        image: markerImage,
      })

      // 마커에 클릭이벤트
      kakao.maps.event.addListener(marker, 'click', function () {
        setSelectedData(barDatas[index])
        setInfoOn(true)
      })

      setMarkers((cur) => {
        return [...cur, marker]
      })
    })

    // 현위치 표시
    const circle = new kakao.maps.Circle({
      center: new kakao.maps.LatLng(
        currentLocation.current.y,
        currentLocation.current.x,
      ),
      radius: 100, // 미터 단위의 원의 반지름입니다
      strokeWeight: 1, // 선의 두께입니다
      strokeColor: '#75B8FA', // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      fillColor: '#CFE7FF', // 채우기 색깔입니다
      fillOpacity: 0.7, // 채우기 불투명도 입니다
      map: mapObj.current,
    })
    setMarkers((cur) => {
      return [...cur, circle]
    })
  }

  return (
    <Styled.mapContainer>
      <Styled.map>
        <h1>지도를 불러오는 중입니다.</h1>
        <div id="kakaoMap"></div>
      </Styled.map>

      <Styled.barInfo $isInfoOn={isInfoOn}>
        <button onClick={infoBtnHandler}>
          <HamburgerIcon />
        </button>

        {selectedData.name && (
          <div>
            {/* <img src={selectedData.image} /> */}
            <img src={barImg} />
            <div className="infoList">
              <div>바 이름</div>
              <div>{selectedData.name}</div>
              <div>주소</div>
              <div>{selectedData.address}</div>
              <div>연락처</div>
              <div>{selectedData.tel}</div>
              <div>운영시간</div>
              <div>{selectedData.time}</div>
            </div>
          </div>
        )}
      </Styled.barInfo>
    </Styled.mapContainer>
  )
}
