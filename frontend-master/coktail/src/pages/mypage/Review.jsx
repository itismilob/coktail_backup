import { useEffect, useState, Fragment, useRef } from 'react'
import * as Styled from './Review.style'
import { NotData } from './MyPage.style'
import Title from '@/components/title'
import { api } from '@/utils/api'
import { reviewStore } from '@/store/reviewStore'
import ByDateLine from '@/components/ByDateLine'
import ReviewBox from '@/components/review/ReviewBox'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import toast, { Toaster } from 'react-hot-toast'

const perPage = 6

export default function MyReview() {
  const [reviewData, setReviewData] = useState([])
  const type = useRef()
  const cursorId = useRef()

  const fetchData = async () => {
    const response = await api.get('/reviews/users', {
      params: {
        type: type.current,
        perPage: perPage,
        cursorId: cursorId.current,
      },
    })

    const myReviewDatas = response.data

    const totalCount = myReviewDatas.data.reduce((acc, item) => {
      return acc + item.list.length
    }, 0)

    if (totalCount < perPage) {
      observerObj.current.disconnect()
      console.log('observer disconnected')
      if (totalCount === 0) {
        return
      }
    }

    setReviewData((cur) => {
      const newArr = [...cur]
      myReviewDatas.data.forEach((data) => {
        if (cur.length) {
          cur.forEach((curData, index) => {
            if (data.date === curData.date) {
              newArr[index].list.push(...data.list)
            } else if (index === cur.length - 1) {
              newArr.push(data)
            }
          })
        } else {
          newArr.push(data)
        }
      })
      return newArr
    })

    cursorId.current = myReviewDatas.data.at(-1).list.at(-1)._id
  }

  const changeSelect = async (e) => {
    if (e.target.value) type.current = e.target.value
    else type.current = null

    observerReset()
  }

  const [observeRef, observerObj] = useInfiniteScroll(fetchData)
  const observerReset = async () => {
    console.log('observe restart')
    observerObj.current.disconnect()
    setReviewData([])

    cursorId.current = null

    await fetchData()
    observerObj.current.observe(observeRef.current)
  }

  // 마이페이지에서 리뷰 삭제
  const deleteMyReview = async (id) => {
    const deleteCheck = confirm('삭제하시겠습니까?')
    if (deleteCheck) {
      try {
        const delMyReview = await api.delete(`/reviews/${id}`)
        observerReset()
        toast('리뷰가 삭제되었습니다', { duration: 800, icon: '🫡' })
      } catch (error) {
        console.error(error)
      }
    }
  }

  // useEffect(() => {
  //   console.log(reviewData)
  // }, [reviewData])

  // 마이페이지에서 월별 라인 그리는 부분
  const myPageReview = (element, index) => {
    return (
      <Fragment key={index}>
        <ByDateLine date={element.date} key={element.date} />
        {element.list.length > 0 &&
          element.list.map((listElement) => (
            <ReviewBox
              data={listElement}
              key={listElement._id}
              deleteMyReview={deleteMyReview}
            />
          ))}
      </Fragment>
    )
  }

  return (
    <>
      <Title>내가 쓴 리뷰</Title>
      <Styled.ReviewSelectBox>
        <select
          name="reviewSelect"
          className="reviewSelect"
          onChange={(e) => changeSelect(e)}
        >
          <option value="">전체</option>
          <option value="cocktails">칵테일</option>
          <option value="recipes">DIY 레시피</option>
        </select>
      </Styled.ReviewSelectBox>
      <Styled.ReviewContentContainer>
        {reviewData.length > 0 ? (
          reviewData.map((element, index) => {
            return myPageReview(element, index)
          })
        ) : (
          <NotData>작성한 리뷰가 없습니다.</NotData>
        )}
        <div ref={observeRef}></div>
      </Styled.ReviewContentContainer>
      <Toaster /> {/* Toaster 컴포넌트 추가 */}
    </>
  )
}
