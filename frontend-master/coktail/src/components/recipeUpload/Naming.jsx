import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { api } from '@/utils/api'

/* Components */
import HashTag from '@/components/recipeUpload/HashTag'


export default function Naming({
  setName,
  setBase,
  setTagArr,
  defaultName,
  defaultBase,
  defaultTagArr,
}) {
  const [baseData, setBaseData] = useState([])

  //칵테일 베이스 api
    const getBaseData = async () => {
      const response = await api.get('/bases')
      const data = response.data.bases
      setBaseData(data)
    }

  //칵테일 이름
  function cockTailNameHandler(e) {
    setName(e.target.value)
  }

  //베이스 선택
  function baseSelectHandler(e) {
    setBase(e.target.value)
  }


  useEffect(() => {
    getBaseData()
  }, [])

  return (
    <>
      <InputBox>
        <input
        value={defaultName}
          type="text"
          placeholder="칵테일 이름"
          onChange={cockTailNameHandler}
          required
        />
      </InputBox>
      <BaseSelector
        name=""
        id=""
        value={defaultBase}
        onChange={baseSelectHandler}
      >
        <option disabled selected>
          베이스를 선택해주세요
        </option>
        {baseData.map((i, index) => (
          <option key={index + i} value={i._id}>
            {i.name}
          </option>
        ))}
      </BaseSelector>
      <HashTag tagsArr={setTagArr} defaultTagArr={defaultTagArr} />
    </>
  )
}

const InputBox = styled.div`
  input {
    width: 100%;
    min-height: 28px;
    border: 2px solid #d5d5d5;
    border-radius: 10px;
    padding: 0 8px;
    &:focus {
      border: 2px solid #797979;
      outline: none;
    }
  }
`
const BaseSelector = styled.select`
  width: 100%;
  min-height: 28px;
  border: 2px solid #d5d5d5;
  border-radius: 10px;
`
