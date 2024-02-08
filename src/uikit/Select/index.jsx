import React, { useState, useRef } from "react";

import { SelectStyled, SelectInputStyled, SelectHeadStyled, SelectListStyled, SelectItemStyled, LabelStyled, WrapStyled } from "./Select.styled";
import { useOutsideAlerter } from "hooks/useOusideClick";

export const Select = ({ label, value, onChange, options, topLabel = false }) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef();

  // закрытие рефы при клике вне селекта
  useOutsideAlerter(selectRef, () => setIsOpen(false));

  const handleClick = (option) => {
    onChange(option);
    setIsOpen(false);
  }

  return (
    <WrapStyled ref={selectRef}>
      {topLabel && <LabelStyled>{label}</LabelStyled>}
      <SelectStyled value={value} onClick={() => setIsOpen(!isOpen)}>
        <SelectInputStyled type="hidden" name=""/>
        <SelectHeadStyled $open={isOpen}>{value || (topLabel ? label : "")}</SelectHeadStyled>
        {isOpen &&
          <SelectListStyled $open={isOpen}>
            {options.map((option) => (
              <SelectItemStyled onClick={() => handleClick(option.value)} key={option.value}>{option.value}</SelectItemStyled>
            ))}
          </SelectListStyled>
        }
      </SelectStyled>
    </WrapStyled>
  )
}
