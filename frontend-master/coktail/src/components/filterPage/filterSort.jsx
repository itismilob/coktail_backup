export default function FilterSort({ onChangeHandler }) {
  return (
    <select onChange={onChangeHandler}>
      <option value={''}>기본</option>
      <option value={'rating'}>인기순</option>
      <option value={'review'}>리뷰순</option>
    </select>
  )
}
