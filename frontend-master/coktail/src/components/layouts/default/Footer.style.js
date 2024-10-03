import styled from 'styled-components';

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
  height: 190px;
  background-color: #797979;
  position : relative;

  .footerLogo {
    padding: 15px 20px;
    padding-bottom: 5px;
  }
`

export const FooterContent = styled.p`
  padding-left: 20px;
  color: #ffffff;
  font-size: 13px;
  &:hover {
    cursor: default;
  }
`

export const FooterLine = styled.div`
  margin: 3px 0;
  margin-left: 20px;
  width: 390px;
  height: 0.8px;
  background-color: #D0D0D0;
`