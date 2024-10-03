import * as Styled from './style'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '@/utils/api'

import { primaryPink, primaryGreen, primaryBlue } from '@/assets/styleVariables'

import { isUserStore } from '@/store/isTokenStore'

// components
import ImageAndCircle from '@/components/ImageAndCircle'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Suggest from './Suggest'

// imgs
import mainBannerLeft from '@/assets/coktail_main_left_img.png'
import mainBannerRight from '@/assets/coktail_main_right_img.png'
import groupImg from '@/assets/group.png'

//icons
import { FaStar } from 'react-icons/fa'
import NextArrow from '@/assets/svg/nextArrow_icon.svg?react'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

export default function MainPage() {
  const [suggestDatas, setSuggestDatas] = useState([])
  const [famousDatas, setFamousDatas] = useState([])
  const { user } = isUserStore((state) => state)
  const [isSurvay, setIsSurvay] = useState(false)
  const [isRecomend, setIsRecomend] = useState(false)

  const [baseList, setBaseList] = useState([])
  // console.log(user, user.nickname)

  const getBase = async () => {
    const response = await api.get(`/bases`)
    setBaseList(response.data.bases)
    // console.log(response.data.bases)
  }

  const getSuggestDatas = async () => {
    try {
      const newSuggestDatas = await api.get(`/cocktails/custom`)
      // console.log(newSuggestDatas.data)
      setSuggestDatas(newSuggestDatas.data)

      setIsSurvay(true)
      setIsRecomend(true)
    } catch (err) {
      /// 설문이 없으면 400 애러
      /// 맞춤 칵테일이 없으면 404 애러
      console.log(err.response.status)
      if (err.response.status === 400) {
        setIsSurvay(false)
        setIsRecomend(true)
      }
      if (err.response.status === 404) {
        setIsSurvay(true)
        setIsRecomend(false)
      }
    }
  }

  const getFamousDatas = async () => {
    const newFamousDatas = await api.get(`/cocktails`, {
      params: { perPage: 6, sort: 'rating' },
    })
    // console.log(newFamousDatas.data)
    setFamousDatas(newFamousDatas.data.cocktails)
  }

  useEffect(() => {
    getBase()
    getFamousDatas()
    if (user._id) {
      getSuggestDatas()
    }
  }, [])

  const survayComponent = () => {
    if (!isSurvay) {
      return (
        <Styled.suggestNone>
          <div>{'취향테스트를 진행해주세요.'}</div>
        </Styled.suggestNone>
      )
    }
    if (!isRecomend) {
      return (
        <Styled.suggestNone>
          <div>{'추천할 맞춤 칵테일이 없습니다.'}</div>
        </Styled.suggestNone>
      )
    }
    if (Array.isArray(suggestDatas) && suggestDatas.length) {
      return (
        <Styled.suggest>
          <h2>
            '{user.nickname}' 님을 위한
            <br />
            추천 칵테일
          </h2>
          <div className="suggestSlide">
            <Slider {...settings}>
              {suggestDatas.map((data, key) => (
                <Suggest data={data} key={key} />
              ))}
            </Slider>
          </div>
        </Styled.suggest>
      )
    }
  }

  return (
    <>
      <Styled.main>
        <Styled.Banner>
          <div>
            <img src={mainBannerRight} className="mainBannerRight" />
            <img src={mainBannerLeft} className="mainBannerLeft" />
          </div>
          <h1>Want some Cocktail?</h1>
        </Styled.Banner>
        {baseList.length !== 0 && (
          <Styled.Base>
            <h2>칵테일 베이스</h2>
            <div className="baseList">
              <h2>Cocktail Base</h2>
              {baseList.map((base, index) => (
                <Link
                  to={`/cocktails?base=${base.name}`}
                  className="baseDrink"
                  key={index}
                >
                  <ImageAndCircle imgUrl={base.image} circleColor={0} />
                  <h3>{base.name}</h3>
                </Link>
              ))}
            </div>
          </Styled.Base>
        )}
        <Styled.survey>
          <div>
            <h2>내가 좋아하는 칵테일은?</h2>
            <Link to={'/survey'}>
              <div>
                취향 등록하고 추천받기
                <NextArrow />
              </div>
            </Link>
          </div>
          <div>
            <img src={groupImg} />
          </div>
        </Styled.survey>

        {survayComponent()}

        {famousDatas.length !== 0 && (
          <Styled.famous>
            <h2>인기순 칵테일</h2>
            <div>
              {famousDatas.map((item, index) => (
                <Link
                  to={`/cocktails/${item._id}`}
                  className="famousDrink"
                  key={index}
                >
                  <div>
                    <ImageAndCircle imgUrl={item.image} />
                  </div>
                  <div>
                    <div>{item.name}</div>
                    <div className="star">
                      <FaStar color="FFD600" />
                      <div>{`${item.avgRating}(${item.reviewCount})`}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Styled.famous>
        )}
      </Styled.main>
    </>
  )
}
