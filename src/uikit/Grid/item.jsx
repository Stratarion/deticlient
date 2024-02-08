import React from "react";
import styled from "styled-components";

const GridItemStyle = styled.div`
  grid-column: ${props => props.$columns || "unset"};
  grid-row:  ${props => props.$rows || "unset"};
`;

export const GridItem = ({ children, rows, columns }) => {
  return (
    <GridItemStyle $rows={rows} $columns={columns}>
      {children}
    </GridItemStyle>
  )
}