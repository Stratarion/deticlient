import React from "react";
import styled from "styled-components";

const ListItemStyled = styled.li`
  list-style: none;
  border-block-end: 1px solid rgba(5, 5, 5, 0.06);
  display: block;
  padding-inline: 24px;
  padding: 12px 0;
`;

export const ListItem = ({ children, onClick }) => {
  return (
    <ListItemStyled onClick={onClick}>{children}</ListItemStyled>
  )
}