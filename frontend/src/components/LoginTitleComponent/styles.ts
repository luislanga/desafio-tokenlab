import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 128px;

    font-weight: 500;
    color: ${({ theme }) => theme.colors.logo};

    @media (max-width: 768px) {
        gap: 108px;

    }

    @media (max-width: 480px) {
        gap: 72px;

    }
`;

export const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 22px;
    font-size: 64px;

    @media (max-width: 768px) {
        gap: 16px;
        font-size: 48px;
    }

    @media (max-width: 480px) {
        gap: 12px;
        font-size: 34px;
    }
`;
