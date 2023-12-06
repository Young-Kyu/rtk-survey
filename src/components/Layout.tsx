import React, { useState, useEffect, useRef, useCallback, useMemo, Suspense } from 'react'
import { Outlet } from 'react-router-dom';
import { S_Layout } from '../styles/container/S_Layout';


interface LayoutProps {
}


const Layout = (props: LayoutProps): JSX.Element => {

  return (
    <Suspense fallback={<div>로딩중</div>}>
      <S_Layout>
        <Outlet />
      </S_Layout>
    </Suspense>
  );


}
export default Layout;