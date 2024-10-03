import * as Styled from './Main.style'

export const Select = ({ options, onChange, value }) => (
  <Styled.SelectContainer>
    <Styled.StyledSelect onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </Styled.StyledSelect>
  </Styled.SelectContainer>
)
