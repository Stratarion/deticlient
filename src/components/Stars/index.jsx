import React from "react";
import ReactStars from 'react-stars';
import styled from "styled-components";

// https://www.npmjs.com/package/react-stars - дока по звездам

const StyleReactStart = styled(ReactStars)`
  display: flex;
  align-items: center;
`

export const Stars = ({
  edit,
  onChange,
  value,
  size,
  additionalClass,
}) => {
  return (
    <StyleReactStart
      count={5}
      edit={edit}
      onChange={onChange}
      value={value}
      size={size}
      additionalClass={additionalClass}
    />
  )
}