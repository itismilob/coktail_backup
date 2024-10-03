import * as Styled from './style'

import { useLocation, useSearchParams } from 'react-router-dom'
import { useEffect, useMemo } from 'react'

import SearchMenu from './searchMenu'
import SearchList from './searchList'

export default function SearchPage() {
  const url = useLocation()
  const isList = useMemo(() => url.pathname === '/search/list', [url.pathname])
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword')

  return (
    <Styled.search>
      <Styled.query>
        <h2>{keyword}</h2>
        <div>검색결과</div>
      </Styled.query>

      {!isList && <SearchMenu />}

      {isList && <SearchList />}
    </Styled.search>
  )
}
