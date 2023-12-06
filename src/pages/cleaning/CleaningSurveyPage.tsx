import React,{useState,useEffect,useRef,useCallback,useMemo} from 'react'
import VoteContainer from '../../components/VoteContainer';
import { useAppDispatch } from '../../reducers/store';
import { stepCleanUp } from '../../slices/StepSlices';
import CleaningFetcher from './CleaningFetcher';


interface CleaningSurveyPageProps {


}


const CleaningSurveyPage = (props : CleaningSurveyPageProps) : JSX.Element => {

  const dispatch = useAppDispatch();

  useEffect(()=>{
    return () => {
      dispatch(stepCleanUp())
    }
  },[]);

  return(
  <CleaningFetcher>
    <VoteContainer />
  </CleaningFetcher>
  );


}
export default CleaningSurveyPage;