import { useState } from 'react'
import styled from 'styled-components'

export default function TitleAndTextarea({ title, setContent, defaultValue }) {
  // const [text, setText] = useState('');

  // function textHandler(e) {
  //   setText(e.target.value)
  //   setContent(text)
  // }
  function textHandler(e){
    setContent(e.target.value)
  }

  return (
    <div>
      <TitleBadge>{title}</TitleBadge>
      <Textarea
        value={defaultValue}
        onChange={textHandler}
        placeholder="내용을 입력해주세요 :)"
        required
      ></Textarea>
    </div>
  )
}

const TitleBadge = styled.div`
  display: inline-block;
  border-radius: 14px;
  background-color: #b0d96d;
  padding: 6px 15px;
`

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  resize: none;
  border: 2px solid #d5d5d5;
  border-radius: 10px;
  margin-top: 8px;
  white-space: pre-wrap;
  word-break: break-all;
  &:focus {
    border-color: #797979;
    outline: none;
  }
`
