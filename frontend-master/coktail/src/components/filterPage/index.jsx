import { StyledTag, StyledFilter } from './style'
import Title from '@/components/title'
import { useEffect, useState } from 'react'

import Alcohol from '@/assets/svg/alcohol.svg'
import Sweet from '@/assets/svg/sweet.svg'
import Sour from '@/assets/svg/sour.svg'
import Bitter from '@/assets/svg/bitter.svg'

const options = [
  ['도수', Alcohol],
  ['단맛', Sweet],
  ['신맛', Sour],
  ['쓴맛', Bitter],
]

export default function FilterPage({
  isModalOn,
  modalHandler,
  baseList,
  selection,
}) {
  const [newSelection, setNewSelection] = useState()

  const tagClickHandler = (dataIndex, selectIndex) => {
    setNewSelection((cur) => {
      const newArr = [...cur]
      if (newSelection[dataIndex].value === selectIndex) {
        newArr[dataIndex].value = null
      } else {
        newArr[dataIndex].value = selectIndex
      }
      return newArr
    })
  }
  useEffect(() => {
    if (!isModalOn) return
    setNewSelection(selection)
  }, [isModalOn])

  useEffect(() => {
    setNewSelection(selection)
  }, [selection])

  return (
    <>
      {isModalOn && (
        <StyledFilter>
          <Title>필터</Title>
          <div>
            <div>
              <h2>베이스</h2>
              <div className="tags">
                {baseList.map((base, index) => (
                  <StyledTag
                    onClick={() => {
                      tagClickHandler(0, base)
                    }}
                    $isSelected={newSelection[0].value === base}
                    key={index}
                  >
                    {base}
                  </StyledTag>
                ))}
              </div>
            </div>

            {options.map((option, optIndex) => (
              <div key={optIndex}>
                <h2>{option[0]}</h2>
                <div className="tags">
                  {[...Array(3)].map((_, tagIndex) => (
                    <StyledTag
                      onClick={() => {
                        tagClickHandler(optIndex + 1, tagIndex + 1)
                      }}
                      $isSelected={
                        newSelection[optIndex + 1].value === tagIndex + 1
                      }
                      key={tagIndex}
                    >
                      {[...Array(tagIndex + 1)].map((_, iconIndex) => (
                        <img src={option[1]} key={iconIndex} />
                      ))}
                    </StyledTag>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => modalHandler(newSelection)}>적용</button>
        </StyledFilter>
      )}
    </>
  )
}
