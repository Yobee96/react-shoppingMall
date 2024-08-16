/* Redux 설정
* 0. npm install .. 다운로드 (readt, dom 버전 18.0 이상)
* 1. useState 선언할 js 설정 (컴포넌트로 export)
* 2. index.js 에서 Provider 테그 로 감싸기
* 3. Provider 속성에 store 추가후, 1번의 useState 선언할 js 컴포넌트로 추가
* */ 
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    reducer: {
        
    }
})