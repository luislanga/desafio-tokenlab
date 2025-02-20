import { LoginButton, LoginLogo } from "./styles";

type LoginButtonProps = {
  [key: string]: any;
};

export const LoginButtonComponent = ({
  onClick,
}: LoginButtonProps) => {
  return (
    <LoginButton onClick={onClick}>
      <LoginLogo />
      Login com Cognito
    </LoginButton>
  );
};
