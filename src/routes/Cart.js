import {Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {changeName} from "../store";

function Cart(){

    /*Redux 수정방법
    1. state 수정하는 ㅅ함수만들 고, 
    2. 원할 때 그 함수 실행해 달라고 store.js 에 요청
    * */
    let cartItems = useSelector((state)=>{return state.cartItems})
    let state = useSelector((state)=>{return state})

    // store.js 에 변경요청을 보내는 함수
    let dispatch = useDispatch()

    return (
        <div>
            {state.user.name} 의 장바구니
            <button style={{margin : '2px'}} onClick={()=>{dispatch(changeName())}}>state 변경</button>
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
                    cartItems.map((item, i)=>{
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{item.name}</td>
                                <td>{item.count} 개</td>
                                <td><button onClick={()=>{
                                    dispatch(changeName())
                                }}>+</button></td>
                            </tr>
                    )})
                }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart