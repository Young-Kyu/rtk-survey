import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckBoxWrapper from '../components/voteComponents/checkBox/CheckBoxWrapper';
import { useAppSelector } from '../reducers/store';
import { setCurrentStep, setIsSubmitted, setSelectedVoteItem } from '../slices/StepSlices';
import { S_FlexWidthBox } from '../styles/container/S_Layout';
import { S_Form } from '../styles/form/S_Form';
import SelectBox from './voteComponents/selectBox/SelectBox';
import ProgressCircle from './progress/ProgressCircle';


interface VoteContainerProps {

}


const VoteContainer = (props: VoteContainerProps): JSX.Element => {

  const {
    currentStep,
    maxStep,
    stepItem,
    surveyDefaultInfomation,
    userSelectStepItem,
    isSubmitted
  } = useAppSelector(state => state.stepSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkBoxRef = useRef<{ getValues: () => number[]; clearValues: () => void }>(null);
  const selectBoxRef = useRef<{ getValues: () => number; clearValues: () => void }>(null);


  /**
    @description 현재 formType에 따른 이 후 로직 분기처리 함수 
  */
  const goToNextStepDivider = () => {
    let callback;
    if (stepItem[currentStep].formType === 'checkbox') {
      callback = goToNextStepCheckbox;
    } else {
      callback = goToNextStepSelectbox;
    };
    if (callback) callback();
  }

  const goToNextStepCheckbox = () => {
    try {

      if (!checkBoxRef.current) return;
      const values = checkBoxRef.current.getValues();
      if (values.length < 1) {
        alert('값을 입력해 주세요!');
        return;
      };
      /* readOnly value 이므로 깊은 복사 진행 */
      const convertValue = [...values];
      checkLastAnswerAndDispatch(convertValue.sort((a, b) => a - b));
      checkBoxRef.current.clearValues();
    } catch (err) {
      console.log(err);
    }
  };

  const goToNextStepSelectbox = () => {
    if (!selectBoxRef.current) return;
    const value = selectBoxRef.current.getValues();
    selectBoxRef.current.clearValues();
    checkLastAnswerAndDispatch([value]);
  };

  /**
    @description 현재 step과 전체 step의 길이를 비교하여 다음스텝으로 갈지 submit을 할지 결정
  */
  const checkLastAnswerAndDispatch = (value: number[]) => {
    dispatch(setSelectedVoteItem({
      stepId: currentStep,
      items: value,
    }));
    if (currentStep + 1 < maxStep) {
      dispatch(setCurrentStep(currentStep + 1))
    } else {
      checkValidAndSubmit(value);
    }
  }

  /**
    @description 최종 데이터 검사 및 submit을 하는 로직
  */
  const checkValidAndSubmit = (value: number[]) => {
    try {
      const allAnswers = [...userSelectStepItem, value];

      if (allAnswers.length !== stepItem.length) {
        throw new Error('대상의 개수가 다름')
      };
      const hasEmptyArray = allAnswers.filter(e => e.length < 1);
      if (hasEmptyArray.length > 0) {
        throw new Error('선택되지 못한 질문이 있습니다.')
      }
      dispatch(setIsSubmitted(true));
      /* 
        POST API 호출 부분
        결과 true 인 경우 result page로 이동
      */
      navigate('/result');

    } catch (err) {
      console.log(err);
    }
  }

  const goToPreviousStep = () => dispatch(setCurrentStep(currentStep - 1));

  const itemSelector = () => {
    const selectedItems = userSelectStepItem[currentStep] ?? [];
    return selectedItems;
  }

  if (stepItem.length < 1) {
    return <div>로딩중</div>
  }

  if (isSubmitted) {
    return (
      <div>
        <div>
          이미 제출 완료되었습니다.
        </div>
        <button onClick={() => navigate('/')}>처음으로 돌아가기</button>
      </div>
    )
  }

  return (
    <>
      <S_FlexWidthBox
        width={'80%'}
        display="flex"
        justifyContent='center'
      >
        <h1>{surveyDefaultInfomation.title ?? ''}</h1>
      </S_FlexWidthBox>
      <S_Form>
        <h3>{stepItem[currentStep].title}</h3>
        {stepItem[currentStep].formType === 'checkbox' ?
          <CheckBoxWrapper
            renderItem={stepItem[currentStep].options}
            currentStatus={itemSelector()}
            ref={checkBoxRef}
          />
          :
          <SelectBox
            optionItems={stepItem[currentStep].options}
            selectedOption={userSelectStepItem[currentStep]}
            ref={selectBoxRef}
          />
        }
        <S_FlexWidthBox
          width={'100%'}
          display="flex"
          alignItems='center'
          justifyContent='center'
          gap={12}
        >
          {currentStep > 0 &&
            <button onClick={goToPreviousStep} type={'button'}>이전</button>
          }
          <button
            onClick={goToNextStepDivider}
            type={'button'}
          >
            {currentStep + 1 < maxStep ? '다음' : '제출'}
          </button>
        </S_FlexWidthBox>
        <ProgressCircle
          currentStep={currentStep}
          steps={maxStep}
        />
      </S_Form>

    </>
  );


}
export default VoteContainer;