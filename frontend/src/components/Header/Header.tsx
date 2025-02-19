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
import { handleSignOut } from "../../auth/handleSignout";

export const Header = () => {
  const auth = useAuth();
  const username = String(auth.user?.profile["cognito:username"]);

  return (
    <HeaderBg>
      <WidthContainer>
        <HeaderWrapper>
          <Logo>tokenlab-calendar</Logo>
          <Navigation>
            <Username>{username}</Username>
            <LogoutButton onClick={() => handleSignOut(auth)}>
              Sair
            </LogoutButton>
          </Navigation>
        </HeaderWrapper>
      </WidthContainer>
    </HeaderBg>
  );
};
