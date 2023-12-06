import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { S_ProgressCircle, S_ProgressWrap } from '../../styles/progress/S_Progress';

interface ProgressCircleProps {

  steps: number;
  currentStep: number;

}


const ProgressCircle = (props: ProgressCircleProps): JSX.Element => {

  const { currentStep, steps } = props;

  return (
    <S_ProgressWrap>
      {new Array(steps).fill(null).map((_, idx) => {
        return (
          <S_ProgressCircle
            key={idx}
            complate={idx <= currentStep}
          />
        )
      })}
    </S_ProgressWrap>
  );


}
export default ProgressCircle;