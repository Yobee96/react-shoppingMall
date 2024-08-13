/* eslint-disable */
// 디테일페이지
import {useParams} from "react-router-dom";
import styled from 'styled-components';

/*
* styled 특징 해당 파일에서만 css 속성 컴포넌트를 사용할 수 있게함
* 추가로 특정파일.module.css 파일은 특정파일 에 국한한 css 속성을 제공한다.
* */

let YelloBtn = styled.button`
    background: ${ props => props.bg };
    color: ${props => props.bg ==='blue' ? 'white' : 'black'};
    padding: 10px;
`
let BlackBox = styled.div`
    background: grey;
    padding: 20px;
`

function Detail(props) {

    let {id} = useParams();
    const product =  props.shoes.find(item => item.id === parseInt(id));
    const imgUrl = 'https://codingapple1.github.io/shop/shoes'+ (parseInt(id)+1) +'.jpg';
    return (
        <div className="container">
            <YelloBtn bg="blue">버튼</YelloBtn>
            <YelloBtn bg="orange">버튼</YelloBtn>
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