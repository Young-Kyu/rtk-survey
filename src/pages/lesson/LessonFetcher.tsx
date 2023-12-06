import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useGetInitialDataQuery } from '../../reducers/InnerApi';
import { useAppDispatch, useAppSelector } from '../../reducers/store';
import { setStepInfo } from '../../slices/StepSlices';


interface LessonFetcherProps {
  children: React.ReactNode;
}


const LessonFetcher = (props: LessonFetcherProps): JSX.Element => {

  const { children } = props;
  const { data, error, isLoading, } = useGetInitialDataQuery('lesson');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!data || error) return;
    dispatch(setStepInfo(data));
  }, [data]);

  if (isLoading) {
    return (
      <div>로딩중</div>
    )
  }

  return (
    <>
      {children}
    </>
  );


}
export default LessonFetcher;

