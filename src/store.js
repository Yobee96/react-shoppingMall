
import {configureStore, createSlice} from '@reduxjs/toolkit'


let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 20},

    /*Redux state 수정 하려면, 사용 하는 파트
    * 1. reducers : {} 안에 변경할 함수 만들기
    * 2. 변경할 함수 (state) {return '변경할 값' } 으로 변경
    * 3. 이때 state는 변경이전값
    * 4. export 사용 해서 내보내기
    * 5. 내보낼 때 state.actions 사용 하면, 안에 함수 전부 내보내기 가능
    * */
    reducers : {
        changeName(state){
            return {name : 'park', age : 20}
        }
    }
})

 export let {changeName} = user.actions

let stock = createSlice({
    name : 'stock',
    initialState : [10,11,12]
})

let cartItems = createSlice({
    name : 'cartItems',
    initialState :
        [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
        ],
    reducers : {
        addCount(state) {

        },
        subCount(state) {}
    }
})

export default configureStore({
    reducer: {
        user : user.reducer,
        stock : stock.reducer,
        cartItems : cartItems.reducer
    }
})