import * as Styled from './Main.style'
import AdminSearchIcon from '@components/icons/AdminSearchIcon'

const Search = ({ value, onChange, onSearchClickHandler }) => (
  <Styled.SearchWrapper>
    <Styled.SearchBox
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onSearchClickHandler()
        }
      }}
    />
    <Styled.IconWrapper>
      <AdminSearchIcon onClick={onSearchClickHandler} />
    </Styled.IconWrapper>
  </Styled.SearchWrapper>
)

export default Search
