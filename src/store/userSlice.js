import {createSlice} from "@reduxjs/toolkit";

let user = createSlice({
    name : 'user',
    initialState : {name : 'kim', age : 20},

    reducers : {
        changeName(state){
            state.name = 'park'
            // immer.js 의 도움 으로 파람의 state 를 변경하면 변경 가능
        },
        changeAge(state, a) {
            state.age += a.payload
        }
    }
})

export let {changeName, changeAge} = user.actions
export default user