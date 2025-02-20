import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 128px;
    font-size: 24px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.logo};
`;

export const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 22px;
    font-size: 64px;

`;