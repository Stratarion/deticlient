import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const CategoryButtonStyled = styled.div`
  width: 160px;
  height: 160px;
  background-color: white;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const CategoryButton = ({ link, title }) => {
    return (
      <Link to={link}>
        <CategoryButtonStyled>
          {title}
        </CategoryButtonStyled>
      </Link>
    )
};
