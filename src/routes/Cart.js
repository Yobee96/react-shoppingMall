import {Table} from "react-bootstrap";
import {useSelector} from "react-redux";

function Cart(){

    /*Redux 사용방법 
    * 1. state를 저장한 곳에서 configureStore 안에 createSlice 객체 담기
    * 2. 사용처에서, useSelector 로 값 가져오기, 이때 ((state)=>{return state}) 의 state는 선언한 모든 객체
    * 3. 일부를 가져오고 싶다면 state.xxx 으로 가져오기
    * */
    let cartItems = useSelector((state)=>{return state.cartItems})

    return (
        <div>
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

                        console.log(item);

                        return(
                            <tr>
                                <td>{i+1}</td>
                                <td>{item.name}</td>
                                <td>{item.count} 개</td>
                                <td>응?</td>
                            </tr>
                    )})
                }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart