import { useEffect, useState } from 'react'
import styled from 'styled-components'

/* img */
import CloseIcon from '@/components/icons/CloseIcon'
import AddBtnIcon from '@/components/icons/AddBtnIcon'

/* color */
import { thirdGray, primaryGray } from '@/assets/styleVariables'

export default function HashTag({ tagsArr, defaultTagArr }) {
  const [hashTag, setHashTag] = useState('')
  const [hashTagArray, setHashTagArray] = useState([])

  useEffect(() => {
    if (defaultTagArr ) {
      setHashTagArray(defaultTagArr)
    }
  }, [defaultTagArr])
  
  useEffect(() => {
    if (hashTagArray.length < 0) return
    tagsArr(hashTagArray)
  }, [hashTagArray])


  function submitHashTagHandler(e) {
    e.preventDefault()
    if (hashTag.trim() !== '') {
      setHashTagArray([...hashTagArray, hashTag])
      setHashTag('')
    }
  }

  function deleteHandler(index) {
    const newArr = [...hashTagArray]
    newArr.splice(index, 1)
    setHashTagArray(newArr)
  }

  return (
    <>
      <CreateHashTag>
        <input
          type="text"
          value={hashTag}
          onChange={(e) => setHashTag(e.target.value)}
          placeholder="해시태그를 입력해주세요"
        />
        <button className="plusBtn" onClick={submitHashTagHandler}>
          <AddBtnIcon width={15} />
        </button>
      </CreateHashTag>
      <HashTagList>
        {hashTagArray.map((item, index) => (
          <li key={item + index} className="hashTagItem">
            <div>
              {'#' + item}
              <button className="closeBtn" onClick={deleteHandler}>
                <CloseIcon width={10} height={10} fill={'#000000'} />
              </button>
            </div>
          </li>
        ))}
      </HashTagList>
    </>
  )
}

const CreateHashTag = styled.div`
  position: relative;

  input {
    width: 100%;
    min-height: 28px;
    border: 2px solid #d5d5d5;
    border-radius: 10px;
    padding: 0 8px;
    &:focus {
      border: 2px solid ${thirdGray};
      outline: none;
    }
  }
  .plusBtn {
    position: absolute;
    right: 8px;
    height: 100%;
    display: flex;
    align-items: center;
    top: 0;
  }
`
const HashTagList = styled.ul`
  display: flex;
  margin-top: -8px;
  flex-wrap: wrap;
  gap: 5px;
  .hashTagItem {
    div {
      border-radius: 10rem;
      background-color: ${primaryGray};
      padding: 3px 12px;
      color: ${thirdGray};
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .closeBtn {
      background: none;
      border: none;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
      overflow: visible;
      cursor: pointer;
    }
  }
`
