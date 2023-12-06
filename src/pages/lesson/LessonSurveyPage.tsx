import React,{useState,useEffect,useRef,useCallback,useMemo} from 'react'
import VoteContainer from '../../components/VoteContainer';
import { useAppDispatch } from '../../reducers/store';
import { stepCleanUp } from '../../slices/StepSlices';
import LessonFetcher from './LessonFetcher';


interface LessonSurveyPageProps {


}


const LessonSurveyPage = (props : LessonSurveyPageProps) : JSX.Element => {

  const dispatch = useAppDispatch();

  useEffect(()=>{
    return () => {
      dispatch(stepCleanUp())
    }
  },[]);

  return(
  <LessonFetcher>
    <VoteContainer />
  </LessonFetcher>
  );


}
export default LessonSurveyPage;