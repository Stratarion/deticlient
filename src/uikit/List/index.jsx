import React from "react";
import styled from "styled-components";
import { ListItem } from "./ListItem";
export {
  ListItem,
}

const ListStyled = styled.ul`
  list-style: none;
  box-sizing: border-box;
  position: relative;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
`;

export const List = ({ children }) => {
  return <ListStyled>{children}</ListStyled>;
}