import styled from "styled-components";

export const HeaderBg = styled.div`
  background-color: ${({ theme }) => theme.colors.header};
`;

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)};
  color: white;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.logo};
`;

export const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  gap: 4px;
`;

export const Username = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 12px;
  width: fit-content;
  align-self: flex-end;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.red};
`;
