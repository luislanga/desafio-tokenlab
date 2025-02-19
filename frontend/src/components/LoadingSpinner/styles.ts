import styled from "styled-components";

export const Container = styled.div<{ $color?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: spin 1s linear infinite;
  width: 150px;
  height: 150px;

  svg {
    color: ${({ $color, theme }) =>
      $color === "dark"
        ? theme.colors.secondary || "#000"
        : theme.colors.primary || "#fff"};
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
