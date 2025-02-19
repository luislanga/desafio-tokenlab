import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  gap: 20px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
`;

export const Input = styled.input`
    padding: 10px;
    border: none;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.colors.input_bg};
    width: 100%;
    height: 54px;


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


export const CustomDatePicker = styled(DatePicker)<any>`
 
 padding: 10px;
    border: none;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.colors.input_bg};
    width: 100%;
    height: 54px;


    &::placeholder {
        color: ${({ theme }) => theme.colors.secondary};
        font-family: ${({ theme }) => theme.fonts.main};
        font-size: 14px;
        font-weight: 400;
    }
    &:focus {
        outline: none;

    }
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
`;