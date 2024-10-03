import React, { useEffect, useState, useRef, useCallback } from 'react'
import styled from 'styled-components'
import * as Styled from './Header.style'
import HamburgerModal from '@/components/modal/hamburger/HamburgerModal'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { api } from '@/utils/api'
import { useDebounce } from '@/hooks/useDebounce'

//아이콘
import LogoIcon from '@/components/icons/LogoIcon'
import SearchIcon from '@/components/icons/SearchIcon'
import PreArrowIcon from '@/components/icons/PreArrowIcon'
import HamburgerIcon from '@/components/icons/HamburgerIcon'

/**
 * @description header를 관리하는 컴포넌트
 *
 * @author uiyeon
 * @since 2023-12-15
 */
export default function Header() {
  const navigate = useNavigate()

  const url = useLocation()

  // 검색창 태그 선택
  const searchInput = useRef()
  //모달창을 띄우기 위한 useState
  const [isOpen, setIsOpen] = useState(false)
  //스크롤에 따른 헤더 변환을 위한 useState
  const [isYOffset, setIsYOffset] = useState(false)
  // 검색어
  const [keyword, setKeyword] = useState('')
  // 자동완성
  const [autoCompleteKeyword, setAutoCompleteKeyword] = useState('')

  const slickRef = useRef(null)

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: false,
  }

  // 검색어 변경 이벤트
  const onKeywordChangeHandler = (e) => {
    setKeyword(e.target.value)
  }

  const autoComplete = async (log) => {
    const response = await api.get('/search/auto-complete', {
      params: {
        keyword: keyword,
      },
    })
    setAutoCompleteKeyword(response.data.splice(0, 5))
  }

  const autoCompleteDebounce = useDebounce(autoComplete, 500)

  // 검색 버튼
  const onSearchClickHandler = () => {
    if (keyword === '') return
    // 검색창 꺼지도록
    console.log(keyword)
    navigate(`/search?keyword=${keyword}`)
    searchInput.current.value = ''
    setKeyword('')
  }

  const autoCompleteOnclick = (index) => {
    // 검색창 꺼지도록
    navigate(`/search?keyword=${autoCompleteKeyword[index]}`)
    searchInput.current.value = ''
    setKeyword('')
  }

  //스크롤 y값을 감지하는 함수
  const getYOffset = () => {
    const position = window.scrollY
    setIsYOffset(position)
  }

  const previous = useCallback(() => slickRef.current.slickPrev(), [])
  const next = useCallback(() => {
    slickRef.current.slickNext()
  }, [])

  //검색헤더로 가면 input 포커스
  const afterChangeHandler = (currentSlide) => {
    if (currentSlide === 1) {
      searchInput.current.focus()
    } else {
      searchInput.current.value = ''
      setKeyword('')
    }
  }

  //스크롤을 실시간으로 확인하는 Hook
  useEffect(() => {
    window.addEventListener('scroll', getYOffset, { passive: true })
    return () => {
      window.removeEventListener('scroll', getYOffset)
    }
  }, [])

  useEffect(() => {
    if (!keyword) return
    autoCompleteDebounce(keyword)
  }, [keyword])

  //모달창을 띄웠을 때 모달밖 스크롤을 막는 Hook
  useEffect(() => {
    if (isOpen) document.body.style = `overflow: hidden`
    return () => {
      document.body.style = `overflow: auto`
    }
  }, [isOpen])

  //검색 자동완성창
  const autoCompletion = (
    <Styled.AutoCompletionBox>
      <div>
        {autoCompleteKeyword.length !== 0 &&
          autoCompleteKeyword.map((word, index) => (
            <div
              onClick={() => {
                autoCompleteOnclick(index)
              }}
              key={index}
            >
              {word}
            </div>
          ))}
      </div>
    </Styled.AutoCompletionBox>
  )

  //검색헤더
  const changeSearchHeader = (
    <>
      <Styled.SearchInputBox
        $isBackground={url.pathname === '/' && isYOffset < 50}
      >
        <div className="container">
          <div className="searchBox">
            <div className="goBackIcon" onClick={previous}>
              <PreArrowIcon width={16} height={30} fill={'#646565'} />
            </div>
            <div className="searchInput">
              <input
                className={keyword ? 'isAutoCompletion' : ''}
                ref={searchInput}
                type="text"
                placeholder="검색어를 입력해주세요."
                onChange={onKeywordChangeHandler}
                onKeyDown={(e) => {
                  console.log(e.keyCode)
                  if (e.keyCode === 13) {
                    onSearchClickHandler()
                    return
                  }
                }}
              />
              <button onClick={onSearchClickHandler} className="searchIcon">
                <SearchIcon />
              </button>
            </div>
          </div>
          {keyword && autoCompletion}
        </div>
      </Styled.SearchInputBox>
    </>
  )

  //헤더 함수
  const HeaderHTML = (
    <>
      <Styled.HeaderContainer
        $isBackground={url.pathname === '/' && isYOffset < 50}
      >
        <Link to="/">
          <div className="headerLogo">
            <LogoIcon width={120} height={50} />
          </div>
        </Link>
        <Styled.HeaderRight>
          <div className="goSearch" onClick={next}>
            <SearchIcon />
          </div>
          <div
            className="hamburgerIcon"
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          >
            <HamburgerIcon />
          </div>
        </Styled.HeaderRight>
      </Styled.HeaderContainer>
    </>
  )

  //모달 open, close 관리 함수
  const isModal = (params) => {
    return (
      <HamburgerModal
        open={params}
        onClose={() => {
          setIsOpen(false)
        }}
      />
    )
  }

  return (
    <Styled.header>
      <HeaderSlider
        {...settings}
        ref={slickRef}
        afterChange={afterChangeHandler}
      >
        <div>{HeaderHTML}</div>
        <div>{changeSearchHeader}</div>
      </HeaderSlider>
      {isOpen && isModal(isOpen)}
    </Styled.header>
  )
}

const HeaderSlider = styled(Slider)`
  position: relative;
  overflow: hidden;

  .slick-list {
    overflow: visible;
  }
  .slick-slide {
    outline: none;
  }
  .slick-prev,
  .slick-next {
    opacity: 0;
    display: none !important;
  }
`
