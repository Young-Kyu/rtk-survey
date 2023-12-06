import styled from "styled-components";

export const S_Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

export const S_FlexWidthBox = styled.div<S_FlexWidthBoxProps>`
   width: ${(props) => props.width ? props.width : 'inherit'};
   height: ${(props) => props.height ? props.height : ''};
   display: ${(props) => props.display ? props.display : 'block'};
   align-items: ${(props) => props.alignItems ? props.alignItems : ''};
   justify-content: ${(props) => props.justifyContent ? props.justifyContent : ''};
   gap : ${(props) => props.gap ? `${props.gap}px` : 0};
   flex-direction : ${(props) => props.flexDirection ? `${props.flexDirection}` : 'row'};
`

interface S_FlexWidthBoxProps {
  width: `${string}%` | number;
  height?: `${string}%` | number;
  display?: 'flex' | 'grid';
  alignItems?: 'center' | 'flex-end';
  justifyContent?: 'center' | 'flex-end';
  gap?: number;
  flexDirection?: 'row' | 'column';
}