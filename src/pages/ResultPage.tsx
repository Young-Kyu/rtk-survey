import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useAppSelector } from '../reducers/store';
import { S_FlexWidthBox, S_Layout } from '../styles/container/S_Layout';


interface ResultPageProps {


}


const ResultPage = (props: ResultPageProps): JSX.Element => {


  const { stepItem, surveyDefaultInfomation, userSelectStepItem } = useAppSelector(state => state.stepSlice);

  const [renderResult, setRenderResult] = useState<string>('');

  const submitTest = () => {
    try {

      const dataFormat = stepItem.map((item, idx) => {
        const itemAnswer = item.options.filter(options => userSelectStepItem[idx].includes(options.id)).map((answer) => answer.text);
        return {
          id: item.itemId,
          answer: itemAnswer.join(',')
        }
      });
      const resultStr = JSON.stringify({
        id: surveyDefaultInfomation.formId,
        items: dataFormat
      });
      setRenderResult(resultStr);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    submitTest();
  }, []);
  return (
    <S_Layout>
      <S_FlexWidthBox
        width={'50%'}
      >
        <h1>결과 화면</h1>
      </S_FlexWidthBox>
      <S_FlexWidthBox
        width={'50%'}
      >
        {renderResult}
      </S_FlexWidthBox>
    </S_Layout>
  );


}
export default ResultPage;