import React from "react";
import styled from "styled-components";

const FlexBoxStyled = styled.div`
  display: flex;
  justify-content: ${props => props.$justify || "center"};
  flex-direction: ${props => props.$direction || "row"};
  align-items: ${props => props.$align || "center"};
  width: 100%;
  gap: ${props => props.$gap || "10px"};
`;

const FlexItemStyled = styled.div`
  width: ${props => props.$width || "auto"};
  min-width: ${props => props.$minWidth || "auto"};
  max-width: ${props => props.$maxWidth || "auto"};
  height: ${props => props.$height || "auto"};
  min-height: ${props => props.$minHeight || "auto"};
  max-height: ${props => props.$maxHeight || "auto"};
  padding: ${props => props.$padding || "0"};
  margin: ${props => props.$margin || "0"};
  border: ${props => props.$border || "none"};
  background: ${props => props.$background || "none"};
  color: ${props => props.$color || "#000"};
  font-size: ${props => props.$fontSize || "14px"};
`;

export const FlexBox = ({ children, ...rest }) => {
  return <FlexBoxStyled 
    $justify={rest.justify}
    $direction={rest.direction}
    $align={rest.align}
    $gap={rest.gap}
  >{children}</FlexBoxStyled>;
};

export const FlexItem = ({ children, ...rest }) => {
  return <FlexItemStyled
    $width={rest.width}
    $minWidth={rest.minWidth}
    $maxWidth={rest.maxWidth}
    $height={rest.height}
    $minHeight={rest.minHeight}
    $maxHeight={rest.maxHeight}
    $padding={rest.padding}
    $margin={rest.margin}
    $border={rest.border}
    $background={rest.background}
    $color={rest.color}
    $fontSize={rest.fontSize}
  >{children}</FlexItemStyled>;
}