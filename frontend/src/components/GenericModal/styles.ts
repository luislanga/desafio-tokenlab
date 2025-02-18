import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    padding: 20px;
    border: none;
    border-radius: 18px;
    background-color: ${({ theme }) => theme.colors.primary};
    width: fit-content;
    gap: 20px;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index:4
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Input = styled.input`
    padding: 10px;
    border: none;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.colors.input_bg};
    width: 100%;
    height: 54px;
    border: 1px solid ${({ theme }) => theme.colors.secondary};

    &::placeholder {
        color: ${({ theme }) => theme.colors.secondary};
        font-family: ${({ theme }) => theme.fonts.main};
        font-size: 14px;
        font-weight: 400;
    }
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;
