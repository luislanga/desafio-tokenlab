import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9998;
  animation: fadeIn 0.36s cubic-bezier(0.2, -0.5, 0.5, 1);

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  width: fit-content;
  gap: 20px;
  max-width: 100vw;
  min-width: 330px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
  animation: slideInRight 0.36s cubic-bezier(0.2, -0.5, 0.5, 1);
  box-shadow: -1px 0px 8px rgba(0, 0, 0, 0.8);

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
