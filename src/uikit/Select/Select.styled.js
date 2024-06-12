import styled from "styled-components";
import { Select } from "antd";

export const SelectStyled = styled(Select)`
  position: relative;
  display: block;
  min-width: 100px;
  width: ${props => props.$width || '100%'};
  max-width: 400px;
  margin-bottom: 20px;
`

export const SelectInputStyled = styled.input`
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 14px;
  line-height: 18px;
  color: rgba(66, 67, 72, 0.8);
  cursor: pointer;
`

export const SelectHeadStyled = styled.div`
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 14px;
  line-height: 18px;
  color: rgba(66, 67, 72, 0.8);
  cursor: pointer;
  &:after {
    width: 10px;
    height: 6px;
    background: #FFF url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.50495 5.78413L0.205241 1.25827C-0.0684138 0.970375 -0.0684138 0.503596 0.205241 0.215836C0.478652 -0.0719461 0.922098 -0.071946 1.19549 0.215837L5.00007 4.22052L8.80452 0.215953C9.07805 -0.0718292 9.52145 -0.0718292 9.79486 0.215953C10.0684 0.503736 10.0684 0.970492 9.79486 1.25839L5.49508 5.78425C5.35831 5.92814 5.17925 6 5.00009 6C4.82085 6 4.64165 5.928 4.50495 5.78413Z' fill='%23ED266A'/%3E%3C/svg%3E%0A") no-repeat center / cover;
    position: absolute;
    right: 20px;
    bottom: 50%;
    transform: ${props => props.$open ? 'translateY(50%)' : 'translateY(50%) rotate(180deg)'};
    content: '';
    display: block;
    transition: .2s ease-in;
  }
  &.open::after {
    transform: translateY(50%) rotate(180deg);
  }
`

export const SelectListStyled = styled.ul`
  display: ${props => props.$open ? 'inline-block' : 'none'};
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-top: 5px;
  max-height: 205px;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 100;
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: #424348;
  scrollbar-color: dark;
  scrollbar-width: thin;
  overscroll-behavior: contain;
  border-top: 1px solid rgba(224, 229, 231, 0.5);
  cursor: pointer;
  list-style-type: none;
  &:-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #D9D9D9;
  }
  &:-webkit-scrollbar {
    width: 7px;
    background-color: #F8F9FA;
    padding: 5px;
  }
`

export const SelectItemStyled = styled.li`
  position: relative;
  border-top: 1px solid rgba(224, 229, 231, 0.5);
  padding: 5px 20px;
  cursor: pointer;
  list-style-type: none;
  &:hover {
    background-color: rgb(201, 201, 201, 0.5);
  }
`


export const LabelStyled = styled.label`

`

export const WrapStyled = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
`