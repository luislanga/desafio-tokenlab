import styled from "styled-components";

export const Container = styled.span`
    color: ${({ theme }) => theme.colors.red};
    font-family: ${({ theme }) => theme.fonts.main};
    font-size: 10px;
    font-weight: 400;
`