import styled from 'styled-components'

// icons
import FilterIcon from '@/assets/svg/filter.svg?react'
import Alcohol from '@/assets/svg/alcohol.svg'
import Sweet from '@/assets/svg/sweet.svg'
import Sour from '@/assets/svg/sour.svg'
import Bitter from '@/assets/svg/bitter.svg'

import { StyledTag } from './style'
import { useState, useEffect } from 'react'

const optionsName = [null, '도수', '단맛', '신맛', '쓴맛']
const options = [
  null,
  ['도수', Alcohol],
  ['단맛', Sweet],
  ['신맛', Sour],
  ['쓴맛', Bitter],
]

export default function FilterSelected({
  modalHandler,
  selection,
  baseList,
  tagCancelHandler,
}) {
  return (
    <StyledFilterSelected>
      <div>
        <FilterIcon onClick={() => modalHandler(selection)} />
      </div>
      <div>
        {selection.map(
          (tag, tagIndex) =>
            tag.value !== null && (
              <StyledTag
                onClick={() => {
                  tagCancelHandler(tagIndex)
                }}
                key={tagIndex}
              >
                {tagIndex === 0 ? (
                  <div>{tag.value}</div>
                ) : (
                  <div>
                    <img src={options[tagIndex][1]} key={tagIndex} />
                    {optionsName[tagIndex]}
                    {tag.value}
                  </div>
                )}
              </StyledTag>
            ),
        )}
      </div>
    </StyledFilterSelected>
  )
}

const StyledFilterSelected = styled.div`
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  padding: 1em 0;
  display: flex;
  & > div:first-child {
    width: 15%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid lightgray;
    svg {
      padding: 5px;
      border: 1px solid black;
      border-radius: 5px;
    }
  }
  & > div:last-child {
    width: 95%;
    display: flex;
    gap: 1em;
    margin: 0 1em;
    white-space: nowrap;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`
