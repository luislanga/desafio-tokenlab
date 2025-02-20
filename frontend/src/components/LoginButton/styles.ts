import { SiAmazoncognito } from "react-icons/si";
import styled from "styled-components";

export const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 12px 24px;
  border: 2px solid transparent;
  border-radius: 24px;
  background-color: transparent;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.17s ease-in-out;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 2px; /* Border thickness */
    background: linear-gradient(135deg, #ffbfae, #d66383);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(135deg, #ffbfae, #d66383);

  &:hover {
    box-shadow: 0px 0px 500px rgba(255, 103, 135, 0.3);
  }
`;

export const LoginLogo = styled(SiAmazoncognito)`
  font-size: 32px;
  margin-top: 6px;
  color: #fff;
`;
