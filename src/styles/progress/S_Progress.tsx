import styled from "styled-components";

export const S_ProgressWrap = styled.div`
  
  width : 100%;
  display:  flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap : 10px;
`;

export const S_ProgressCircle = styled.div<{ complate: boolean }>`
  
  width : 15px;
  height : 15px;
  border-radius: 15px;
  background-color : ${(props) => props.complate ? 'green' : 'white'};
`