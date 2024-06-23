import {
    Col,
    Flex,
    Row,
} from "antd";
import styled from "styled-components";

export const StyledCol = styled(Col)`
height: 30px;
display: flex;
justify-content: center;
align-items: center;
`

export const StyledColBackground = styled(StyledCol)`
  font-size: 12px;
`

export const StyledRow = styled(Row)`
  border-bottom: 1px solid #BEBEBE;
`

export const StyledColBordered = styled(StyledCol)`
  border-left: 1px solid #BEBEBE;
`

export const StyledLayoutCalendar = styled.div`
  border: 1px solid #BEBEBE;
  border-bottom: none;
`

export const StyledLayout = styled(Flex)`
  margin-bottom: 20px;
`

export const StyledContent = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #52abff;
`