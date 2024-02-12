import React from "react";
import styled from "styled-components";
import noimage from "images/no-image.svg";

const ImageStyled = styled.img`
  width: ${props => props.$width || '100%'};
  height: ${props => props.$height || 'auto'};
  display: block;
  object-fit: cover;
`;

export const Image = ({ src, height, width, alt, onClick }) => {
  return <ImageStyled src={src || noimage} $height={height} $width={width} alt={alt} onClick={onClick} />;
}