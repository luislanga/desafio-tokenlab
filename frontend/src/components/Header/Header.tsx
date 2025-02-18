import { useAuth } from "react-oidc-context";
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
  const signOutRedirect = () => {
    const clientId = "360ao3a7d50qe9u2lo998o8ljf";
    const logoutUri = "http://localhost:5173/auth";
    const cognitoDomain =
      "https://tokenlab-calendar.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  const auth = useAuth();

  const handleSignOut = () => {
    auth.removeUser();
    signOutRedirect();
  };
  return (
    <HeaderBg>
      <WidthContainer>
        <HeaderWrapper>
          <Logo>tokenlab-calendar</Logo>
          <Navigation>
            <Username>username</Username>
            <LogoutButton onClick={handleSignOut}>Sair</LogoutButton>
          </Navigation>
        </HeaderWrapper>
      </WidthContainer>
    </HeaderBg>
  );
};

export default Header;
