import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useGetInitialDataQuery } from '../../reducers/InnerApi';
import { useAppDispatch, useAppSelector } from '../../reducers/store';
import { setStepInfo } from '../../slices/StepSlices';


interface CleaningFetcherProps {
  children: React.ReactNode;
}


const CleaningFetcher = (props: CleaningFetcherProps): JSX.Element => {

  const { children } = props;
  const { data, error, isLoading, } = useGetInitialDataQuery('clean');
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
export default CleaningFetcher;

