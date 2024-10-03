import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { secondGreen, paddingBottom } from '@/assets/styleVariables'

export const list = styled.div`
  margin-bottom: 2em;
  .observer {
    height: ${paddingBottom};
  }
`

export const titleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 2em;
`

export const link = styled(Link)`
  width: 150px;
  height: 30px;
  border-radius: 10000px;
  background-color: ${secondGreen};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const filter = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1em;
`
