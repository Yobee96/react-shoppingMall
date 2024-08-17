import {Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import { changeName, changeAge } from '../store/userSlice.js'
import { addCount, subCount, removeProduct } from '../store/cartSlice.js'

function Cart(){

    let state = useSelector((state)=>{return state})
    let dispatch = useDispatch()

    return (
        <div>
            {state.user.name} 의 장바구니 ( {state.user.age} )
            <button style={{margin : '2px'}} onClick={()=>{dispatch(changeName())}}>state 이름변경</button>

            {/*파람으로 변경할 값을 보낼 수도 있음*/}
            <button style={{margin : '2px'}} onClick={()=>{dispatch(changeAge(10))}}>state 나이 변경</button>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
                </thead>
                <tbody>

                {
                    state.cart.map((item, i)=>{
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{item.name}</td>
                                <td>{item.count} 개</td>
                                <td>
                                    <button className='m-1 btn btn-info' onClick={()=>{
                                        dispatch(addCount(item.id))
                                    }}>+</button>
                                    <button className='m-1 btn btn-info' onClick={()=>{
                                        dispatch(subCount(item.id))
                                    }}>-</button>
                                    <button className='m-1 btn btn-danger' onClick={()=>{
                                        dispatch(removeProduct(item.id))
                                    }}>삭제</button>
                                </td>
                            </tr>
                    )})
                }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart