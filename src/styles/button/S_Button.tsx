import styled from "styled-components";

export const S_Button = styled.button<S_ButtonProps>`
  
  width : ${(props) => props.width ? props.width : '100px'};
  background-color: ${(props) => props.backgroundColor ? props.backgroundColor : 'skyblue'};
  border : 'none';
  height: 50px;
  cursor: pointer;
`

interface S_ButtonProps {
  width: `${string}%` | number;
  backgroundColor?: string;
  height?: `${string}%` | number;
}