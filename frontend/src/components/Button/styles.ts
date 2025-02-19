import styled from "styled-components";

export const Container = styled.button<{
  $textColor: string;
  $bgColor: string;
  $hoverTextColor: string;
  $hoverBgColor: string;
  $border: string;
  $hoverBorder: string;
  $disabled: boolean;
  $noPadding?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $textColor, $disabled }) => ($disabled ? "gray" : $textColor)};
  background-color: ${({ $bgColor, $disabled }) =>
    $disabled ? "lightgray" : $bgColor};

  border: ${({ $border, $disabled }) =>
    $disabled ? "1px solid gray" : $border};
  border-radius: 12px;

  padding: ${({ $noPadding }) => ($noPadding ? "0" : "10px 20px")};

  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};

  transition: all 0.3s ease;

  &:hover {
    color: ${({ $hoverTextColor, $disabled }) =>
      $disabled ? "gray" : $hoverTextColor};
    background-color: ${({ $hoverBgColor, $disabled }) =>
      $disabled ? "lightgray" : $hoverBgColor};
    border: ${({ $hoverBorder, $disabled }) =>
      $disabled ? "1px solid gray" : $hoverBorder};
  }
`;
