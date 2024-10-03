import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { api } from '@/utils/api'

/* img */
import HeartIcon from '@/components/icons/HeartIcon'
import FullHeartIcon from '@/components/icons/FullHeartIcon'
import ShareIcon from '@/components/icons/ShareIcon'

/* color */
import { thirdGray } from '@/assets/styleVariables'
import { useDebounce } from '@/hooks/useDebounce'

export default function CocktailHeader({ type, data }) {

  const [isWished, setWished] = useState(data.isWished)

  //optimistic Ui and Debounce
  const onWishlistClickHandler = async () => {
    setWished((cur) => !cur)
    setWishDebounce(!isWished)
  }

  const wishApi = async (isWishedCheck) => {
    if (isWishedCheck) {
      const response = await api.post(`/users/wishlist/${data._id}`)
    } else {
      const response = await api.delete(`/users/wishlist/${data._id}`)
    }
  }
  const setWishDebounce = useDebounce(wishApi, 500)

  //공유하기
  useEffect(() => {
    // Kakao SDK 로드
    const script = document.createElement('script')
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js'
    script.async = true
    document.head.appendChild(script)

    script.onload = () => {
      // Kakao SDK 초기화
      Kakao.init('1d894b6db0ee7cd26558b7a0056bc7f3')
    }
  }, [])
  // 카카오 링크 전송 함수
  const sendKakaoLink = () => {
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: data.name,
        description: data.description,
        // 이미지 전달 어떤식으로 해야할지..?
        imageUrl: data.image,
        link: {
          mobileWebUrl: 'http://kdt-sw-7-team07.elicecoding.com/',
          webUrl: 'http://kdt-sw-7-team07.elicecoding.com/',
        },
      },
      buttons: [
        {
          title: '자세히 보기',
          link: {
            mobileWebUrl: 'http://kdt-sw-7-team07.elicecoding.com/',
            webUrl: 'http://kdt-sw-7-team07.elicecoding.com/',
          },
        },
      ],
    })
  }

  return (
    <>
      {data && (
        <HeaderWrapper>
          <div>
            <BaseTag>{data.base.name}</BaseTag>
          </div>
          <div className="btnGroup">
            <button onClick={onWishlistClickHandler}>
              {isWished ? <FullHeartIcon /> : <HeartIcon />}
            </button>
            <button onClick={sendKakaoLink}>
              <ShareIcon />
            </button>
          </div>
        </HeaderWrapper>
      )}
    </>
  )
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .btnGroup {
    display: flex;
    align-items: center;
  }
`

const BaseTag = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: ${thirdGray};
`
