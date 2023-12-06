## 구성 환경
  + 언어: typescript
  + 상태관리: RTK
  + CSS: Styled-Component

## 프로젝트 구조
/src 
  + components : 각 화면에 사용 된 공용 컴포넌트 위치 
  + pages : 각 화면 위치
  + reducers : 서버 통신 로직 위치
  + slices : 클라이언트 state 관리용 slice 위치
  + styles : Style Compoent 위치
  + types : 각 화면 / API response, request type 정의 위치
  + lazyWithPreload.ts : 화면 lazy 로딩 및 preload 로직 파일
  + Router.tsx : Router 로직 파일

## 코드 실행 방법
  - npm install
  - npm run start
  - localhost:3000 접속

## 프로젝트 목표
  - API에서 리턴된 데이터를 기준으로 동적인 설문조사 포맷 표현

## 구현된 기능
  - 랜딩페이지를 제외한 타 화면 lazy 로딩 및 preload 구현

  + 서버에서 리턴 된 Array의 길이만큼 step 동적 구현
  + 서버에서 리턴 된 각 option들의 길이만큼 option 동적 구현
  + 빠른 step 전환 및 연산 절감을 위한 id key값으로 정보 저장 후 최종 제출시에만 데이터 구조 완성
    + step 별 저장 시 id로 정렬하여 이전화면으로 이동하더라도 저장된 상태값 기억
  + 최종 제출 화면에서 뒤로가기 버튼 클릭 시 안내 UI 구현
