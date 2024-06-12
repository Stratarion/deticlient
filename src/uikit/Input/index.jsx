import React from "react";
import styled from "styled-components";
import { WrapStyled } from "../Select/Select.styled";
import { Input as AntInput } from "antd";

const InputStyled = styled(AntInput)`
  width: 300px;

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
