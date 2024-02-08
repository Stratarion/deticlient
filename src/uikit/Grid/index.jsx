import React from "react";

import styled from "styled-components";

const GridStyled = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$columns || "repeat(12, 1fr)"};
  grid-template-rows: ${props => props.$rows || "1fr"};
  gap: ${props => props.$gap || "20px"};
`

export const Grid =({ children, rows, columns, gap }) => {
  return (
    <GridStyled $rows={rows} $columns={columns} $gap={gap}>
      {children}
    </GridStyled>
  )
}