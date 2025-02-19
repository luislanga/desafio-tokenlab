import styled from "styled-components";

export const Container = styled.div<{ $color?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 0;
  width: 100%;
  flex-grow: 1;

  svg {
    color: ${({ $color, theme }) =>
      $color === "dark"
        ? theme.colors.secondary || "#000"
        : theme.colors.primary || "#fff"};
    animation: spin 1s linear infinite;
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
