import {Table} from "react-bootstrap";

function Cart(){
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
                <tr>
                    <td>1</td>
                    <td>상품</td>
                    <td>1개</td>
                    <td>응?</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>상품</td>
                    <td>2개</td>
                    <td>응?</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>상품</td>
                    <td>3개</td>
                    <td>응?</td>
                </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Cart