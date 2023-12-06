import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import lazyWithPreload, { preloadAllComponents } from './lazyWithPreload';
import MainPage from './pages/MainPage';

const CleaningSurveyPage = lazyWithPreload(() => import('./pages/cleaning/CleaningSurveyPage'));
const LessonSurveyPage = lazyWithPreload(() => import('./pages/lesson/LessonSurveyPage'));
const ResultPage = lazyWithPreload(() => import('./pages/ResultPage'));


interface RouterProps {


}


const Router = (props: RouterProps): JSX.Element => {

  useEffect(() => {
    setTimeout(() => preloadAllComponents(), 1000);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route path='*' element={<div>404 not found</div>} />
          <Route path="/" element={<MainPage />} />
          <Route
            element={<Outlet />}
            path="survey"
          >
            <Route path="cleaning"
              element={<CleaningSurveyPage />}
            />
            <Route path="lesson"
              element={<LessonSurveyPage />}
            />
          </Route>
          <Route path="result"
            element={<ResultPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );


}
export default Router;