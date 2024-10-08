/* eslint-disable */
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Nav} from 'react-bootstrap';
import {Context1} from './../App.js'
import {useDispatch, useSelector} from "react-redux";
import { addProduct } from '../store/cartSlice.js'
import {useLike, useName, useUserName} from "../hooks/like";
import axios from "axios";

function Detail(props) {

    const {stock, shoes} = useContext(Context1)
    
    const [alert, setAlert] = useState(true);
    const [count, setCount] = useState(0);
    const [onlyNumber, setOnlyNumber] = useState(false);
    const [fade2, setFade2] = useState('');
    const [tab, setTab] = useState(0);

    let cart = useSelector((state)=>{return state.cart})
    const dispatch = useDispatch()

    let navigate = useNavigate();


    useEffect(() => {
        let timer = setTimeout(()=>{
            setAlert(false);
        },2000);

        return()=>{
            clearTimeout(timer);
        }
    });

    useEffect(() => {
        setFade2('end')
        return ()=>{
            setFade2('')
        }
    }, []);


    let {id} = useParams();
    const product =  shoes.find(item => item.id === parseInt(id));
    const imgUrl = 'https://codingapple1.github.io/shop/shoes'+ (parseInt(id)+1) +'.jpg';


    useEffect(() => {
        localStorage.setItem('watched', getWatched(product.id))
    }, [])

    /*함수를 가져오기 때문에 함수내 지역변수는 사용할 수 없음*/
    let [like, addLike] = useLike()

    let userName = useUserName()

    return (
        <div className={'container start '+fade2}>

            {alert?
                <div className="alert alert-warning">
                    2초 이내 구매시 할인
                </div> :
                null
            }
            <div className="row satart end">
                <div className="col-md-6">
                    <img src={imgUrl} width="100%" alt="prdtImg"/>
                    {like} <span onClick={()=>{ addLike() }}>❤</span>

                    {userName}
                </div>

                <div className="col-md-6">
                    <h4 className="pt-5">{product.title}</h4>
                    <p>{product.content}</p>
                    <p>{product.price}원</p>
                    <button className="btn btn-danger" onClick={()=>{
                    const addProductObj = {id : product.id, name : product.title, count: 1}
                    dispatch(addProduct(addProductObj))
                    navigate('/Cart')
                    }}>주문하기</button>
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

            <TabContent tab={tab}  />주문하기
        </div>
    )
}

function TabContent ({tab}) {
    const [fade, setFade] = useState('')
    useEffect(() => {
        let a = setTimeout(()=>{setFade('end');}, 100);
        return ()=>{
            clearTimeout(a);
            setFade('');
        }
    }, [tab]);

    return (
        <div className={`start ${fade}`}>
            {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
        </div>
)}


function getWatched(id) {
    let warchedArr = JSON.parse(localStorage.getItem('watched'))
    warchedArr.push(id)
    warchedArr = new Set(warchedArr)
    warchedArr = Array.from(warchedArr)
    return JSON.stringify(warchedArr)
}

export default Detail;