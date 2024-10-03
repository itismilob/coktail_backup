import styled from 'styled-components'
import { useEffect, useState } from 'react'

/* img */
import FileIcon from '@/components/icons/FileIcon'
import CloseIcon from '@/components/icons/CloseIcon'

/* color */

export default function ImageUpload({ setImgs, defaultValue }) {
  const [imgFile, setImgFile] = useState([])

  useEffect(() => {
    console.log("defaultValue", defaultValue)
    if(defaultValue && typeof defaultValue === 'string'){
      setImgFile(defaultValue)
    } else if(defaultValue && defaultValue.length > 0){
      const file = defaultValue[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setImgFile(reader.result)
        //부모컴포넌트로 이미지 상태 저장되어 보내기
      }
    } 
  }, [defaultValue])

  function onLoadFile(e) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = () => {
      setImgFile(reader.result)
      //부모컴포넌트로 이미지 상태 저장되어 보내기
      setImgs(file)
    }
  }

  function deleteImgBtnHandler(e) {
    e.preventDefault()
    setImgFile([])
  }

  return (
    <ImageBox>
      {imgFile.length > 0 ? (
        <div className="previewImg">
          <img src={imgFile} alt="이미지" />
          <DeleteBtn onClick={deleteImgBtnHandler}>
            <CloseIcon width={15} fill={'#797979'} />
          </DeleteBtn>
        </div>
      ) : (
        <>
          <label className="imgLabel">
            <FileIcon /> <p>이미지를 등록해주세요.</p>
            <input className="hidden" type="file" onChange={onLoadFile} />
          </label>
        </>
      )}
    </ImageBox>
  )
}

const ImageBox = styled.div`
  position: relative;
  border: 2px dashed #797977;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .hidden {
    display: none;
  }
  label {
    width: 100%;
    height: 100%;
    color: #d5d5d5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.5rem;
    cursor: pointer;
  }
  .previewImg {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
`
const DeleteBtn = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;
  z-index: 99;
`
