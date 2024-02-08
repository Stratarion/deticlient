import React from "react";
import styled from "styled-components";
import { WrapStyled } from "../Select/Select.styled";

const InputStyled = styled.input`
  width: 300px;
  font-size: 14px;
  padding: 5px 10px;
  border: none;
  border-radius: 10px;
  display: block;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  line-height: 18px;
  color: rgba(66, 67, 72, 0.8);
  cursor: pointer;
`

const LabelStyled = styled.label`
  font-size: 14px;
  line-height: 18px;
`

export const Input = ({
  type,
  value,
  onInput,
  placeholder,
  ...props
}) => {
  return (
    <InputStyled 
      type={type}
      value={value}
      onInput={onInput}
      placeholder={placeholder}
      {...props}
    />
  )
}

export const InputWithLabel = ({
  type,
  value,
  onInput,
  placeholder,
  label,
  ...props
}) => {
  return (
    <WrapStyled>
      <LabelStyled>{label}</LabelStyled>
      <InputStyled 
        type={type}
        value={value}
        onInput={onInput}
        placeholder={placeholder}
        {...props}
      />
    </WrapStyled>
  )
}
