import React from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  width:  ${props => props.$width || "100%"};
  background-color: #8E8E8E;
  color: white;
`

export const Button = ({children, onClick, width}) => {
  return (
    <ButtonStyled onClick={onClick} $width={width}>
      {children}
    </ButtonStyled>
  )
}