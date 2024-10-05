import React, { useCallback } from "react";

import { SelectStyled, LabelStyled, WrapStyled } from "./Select.styled";

export const Select = ({
  label,
  topLabel = false,
  value,
  onChange,
  options,
}) => {
  const handleChangeSelect = useCallback((value) => {
    console.log(value);
    onChange(value);
  }, [onChange]);
  return (
    <WrapStyled>
      {topLabel && <LabelStyled>{label}</LabelStyled>}
      <SelectStyled
        options={options}
        value={value}
        onChange={handleChangeSelect}
      />
    </WrapStyled>
  )
}