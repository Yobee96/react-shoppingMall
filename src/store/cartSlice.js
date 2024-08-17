import {createSlice} from "@reduxjs/toolkit";

let cart = createSlice({
    name : 'cart',
    initialState :
        [
            {id : 0, name : 'White and Black', count : 2},
            {id : 2, name : 'Grey Yordan', count : 1}
        ],
    reducers : {
        addCount(state, id) {
            let target = state.find(item => item.id === id.payload)
            target.count += 1
        },
        subCount(state, id) {
            const target = state.find(item => item.id === id.payload)
            if (target.count > 0)
                target.count -= 1
        },
        addProduct(state, product) {
            const dueIndex = state.findIndex((item)=>item.name === product.payload.name)
            if (dueIndex !== -1) {
                state[dueIndex].count++
            } else {
                state.push(product.payload)
            }
        },
        removeProduct(state, id) {
            return state.filter(item=>item.id !== id.payload)
        }
    }
})

export let {addCount, subCount, addProduct, removeProduct} = cart.actions
export default cart
