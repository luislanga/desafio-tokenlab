import { WidthContainer } from "../WidthContainer/WidthContainer";
import {
  HeaderBg,
  HeaderWrapper,
  Logo,
  LogoutButton,
  Navigation,
  Username,
} from "./styles";

export const Header = () => {
  return (
    <HeaderBg>
      <WidthContainer>
        <HeaderWrapper>
          <Logo>tokenlab-calendar</Logo>
          <Navigation>
            <Username>username</Username>
            <LogoutButton>Sair</LogoutButton>
          </Navigation>
        </HeaderWrapper>
      </WidthContainer>
    </HeaderBg>
  );
};

export default Header;
