import * as Styled from "./Footer.style";

import LogoIcon from '@/components/icons/LogoIcon'

export default function Header() {
  return (
    <footer>
      <Styled.FooterContainer>
        <div className="footerLogo">
          <LogoIcon width={120} height={50} fill={'#ffffff'} />
        </div>
        <Styled.FooterContent>
          주식회사 : 콕테일 | 대표이사 : elice 7팀
        </Styled.FooterContent>
        <Styled.FooterContent>
          사업자 등록번호 : 123-45-67890
        </Styled.FooterContent>
        <Styled.FooterContent>
          전화번호 : 010-1234-5678 
        </Styled.FooterContent>
        <Styled.FooterLine />
        <Styled.FooterContent>
          © 2023 회사명 ComStyled.FooterContentany. All Rights Reserved.
        </Styled.FooterContent>
      </Styled.FooterContainer>
    </footer>
  )
}
