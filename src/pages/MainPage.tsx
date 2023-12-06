import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../reducers/store';
import { cleanUp } from '../slices/StepSlices';
import { S_Button } from '../styles/button/S_Button';
import { S_FlexWidthBox, S_Layout } from '../styles/container/S_Layout';

interface MainPageProps {


}


const MainPage = (props: MainPageProps): JSX.Element => {

  const navigate = useNavigate();
  const { stepItem } = useAppSelector(state => state.stepSlice);
  const dispatch = useAppDispatch();

  const goToSurveyPage = (target: 'lesson' | 'cleaning') => {
    navigate(`/survey/${target}`)
  }

  useEffect(() => {
    if (stepItem.length > 0) {
      dispatch(cleanUp());
    };
  }, [])

  return (
    <S_FlexWidthBox
      width={'100%'}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      gap={30}
    >
      <h1>설문조사 시작</h1>
      <S_Button width={'50%'} onClick={() => goToSurveyPage('lesson')}>lesson</S_Button>
      <S_Button width={'50%'} onClick={() => goToSurveyPage('cleaning')}>cleaning</S_Button>
    </S_FlexWidthBox>
  );


}
export default MainPage;