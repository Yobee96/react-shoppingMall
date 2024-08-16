/* eslint-disable */
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Nav} from 'react-bootstrap';

function Detail(props) {

    const [alert, setAlert] = useState(true);
    const [count, setCount] = useState(0);
    const [onlyNumber, setOnlyNumber] = useState(false);

    const [tab, setTab] = useState(0);



    useEffect(() => {
        let timer = setTimeout(()=>{
            setAlert(false);
        },2000);

        return()=>{
            console.log(1);
            /*기존 타이머를 제거*/
            clearTimeout(timer);
        }
    });


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

            <Nav variant="pills" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={()=>{ setTab(0); }}>Option 1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={()=>{ setTab(1); }}>Option 2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={()=>{ setTab(2); }}>Option 3</Nav.Link>
                </Nav.Item>
            </Nav>

            <TabContent tab={tab}/>
            {/*
            tab === 0 ? <div>내용0</div> :
            tab === 1 ? <div>내용1</div> :
            tab === 2 ? <div>내용2</div> : null
            */}

        </div>
    )
}

function TabContent ({tab}) {
    return [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]
}


export default Detail;