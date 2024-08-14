/* eslint-disable */
// 디테일페이지
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function Detail(props) {

    const [alert, setAlert] = useState(true);
    const [count, setCount] = useState(0);
    const [onlyNumber, setOnlyNumber] = useState(false);
    
    useEffect(() => {
        let timer = setTimeout(()=>{
            setAlert(false);
        },2000);

        // clear function : return
        return()=>{
            console.log(1);
            /*기존 타이머를 제거*/
            clearTimeout(timer);

            /*기존 데이터 요청은 삭제 등등 도 가능*/
        }
    });

    /* useEffect 뒤 [] 는 defendency : 선언해두면 mount 시와 해당 변수가 변경될 때만, useEffect 실행함
    * 그리고 [] 빈값으로 두면 mount 시에만 실행하고, 변수 업데이트시에 사용안됨
    * 
    * return() 을 사용 가능함 return 은 useEffect가 실행되기 전에 실행됨
    * 이전 타이머는 제거해주세요 같은 코드 실행가능
    * 이러한 정리 함수를 Clear Function 이라함 (mount 때는 실행 안됨/unmount 때도 실행됨)
    * */

    let {id} = useParams();
    const product =  props.shoes.find(item => item.id === parseInt(id));
    const imgUrl = 'https://codingapple1.github.io/shop/shoes'+ (parseInt(id)+1) +'.jpg';
    return (
        <div className="container">
            {alert?
                <div className="alert alert-warning">
                    2초 이내 구매시 할인
                </div> :
                null
            }
            {count}
            <button onClick={()=>{setCount(count+1)}}>버튼</button>

            <div className="row">
                <div className="col-md-6">
                    <img src={imgUrl} width="100%" alt="prdtImg"/>
                </div>
                {
                    onlyNumber ?
                    <p style={{color : 'red'}}>숫자만 입력하세요</p>
                    : null
                }
                <input className="inputOnlyNumber" onChange={(e)=>{
                    if (isNaN(e.target.value)){
                        setOnlyNumber(true);
                    } else {
                        setOnlyNumber(false);
                    }
                }}/>

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