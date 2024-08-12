/* eslint-disable */
// 디테일페이지
import {useParams} from "react-router-dom";

function Detail(props) {

    let {id} = useParams();
    const product =  props.shoes.find(item => item.id === parseInt(id));
    const imgUrl = 'https://codingapple1.github.io/shop/shoes'+ (parseInt(id)+1) +'.jpg';
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={imgUrl} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{product.title}</h4>
                    <p>{product.content}</p>
                    <p>{product.price}원</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )
}

export default Detail;