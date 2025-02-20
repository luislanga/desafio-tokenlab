import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  border-radius: 18px 18px 0 0;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const CustomToolbarDate = styled.div`
  margin-left: 16px;
  display: flex;
  justify-content: start;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 28px;
  font-weight: 800;
  flex-grow: 1;

  @media (max-width: 1024px) {
    font-size: 24px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    margin-left: 12px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    margin-left: 8px;
  }
`;

export const DateButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const TodayButton = styled.button`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  padding: 6px 8px;
  border-radius: 12px 12px 0 0;
  font-size: 14px;
  font-weight: 700;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.input_bg};
  }
  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const LeftButton = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  padding: 8px;
  border-radius: 0 0 0 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.input_bg};
  }
  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const RightButton = styled.button`
  border: none;
  border-left: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  padding: 8px;
  border-radius: 0 0 12px 0;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.input_bg};
  }
  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const CustomSelector = styled.select`
  padding: 10px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 14px;
  font-weight: 400;

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;
