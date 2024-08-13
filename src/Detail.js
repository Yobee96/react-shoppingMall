/* eslint-disable */
// 디테일페이지
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function Detail(props) {

    /* 이전에는 class 만들어서, mount, update, unmount 따로 설정했음
        이젠 useEffect 하나면 설정가능
        1. 시간오래걸리는 작업
        2. DB에서 데이터가져오는것
        3. 타이머 등을 가져올 때 */
    useEffect(() => {
        setTimeout(()=>{
            document.querySelector('.alert').style.display = 'none';
        },2000);
    });

    /*const [count, setCount] = useState(0);*/

    let {id} = useParams();
    const product =  props.shoes.find(item => item.id === parseInt(id));
    const imgUrl = 'https://codingapple1.github.io/shop/shoes'+ (parseInt(id)+1) +'.jpg';
    return (
        <div className="container">
            {/*{count}
            <button onClick={()=>{setCount(count+1)}}>버튼</button>*/}

            {/*숙제*/}
            <div className="alert alert-warning">
                2초 이내 구매시 할인
            </div>

            <div className="row">
                <div className="col-md-6">
                    <img src={imgUrl} width="100%" alt="prdtImg"/>
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