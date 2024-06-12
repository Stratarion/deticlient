import React from "react";

import { SelectStyled, LabelStyled, WrapStyled } from "./Select.styled";

export const Select = ({ label, topLabel = false }) => {

  return (
    <WrapStyled>
      {topLabel && <LabelStyled>{label}</LabelStyled>}
      <SelectStyled />
    </WrapStyled>
  )
}