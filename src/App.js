/* eslint-disable */
import './App.css';

import { Container, Nav, Navbar } from 'react-bootstrap';
import bg from './img/bg.jfif';
import {createContext, useEffect, useState} from "react";
import data from './data.js';
import Detail from "./routes/Detail";
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import axios from 'axios'
import Cart from "./routes/Cart";

export let Context1 = createContext()

function App() {
    const [shoes,setShoes] = useState(data);
    const [reqUrlNum, setReqUrlNum] = useState(2);
    const [stock, setStock] = useState([10, 11, 12]);

    // logcalStorage : 웹에 5mb 문자자료 저장 가능 localStorage.setItem('key', 'value')
    /* 사용법 */
    /*let obj = {name : 'kim'}
    localStorage.setItem('data', JSON.stringify(obj))
    // 이런식으로 JSON.stringify 사용 하면 obj도 저장가능

    // 떠내서쓸땐 JSON.parse
    let getObj = localStorage.getItem('data')
    console.log(JSON.parse(getObj).name)*/


    // 숙제
    useEffect(() => {
        localStorage.setItem('watced', JSON.stringify([]))
    }, []);

    let navigate = useNavigate();

    return (
        <div className="App">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={()=>{ navigate('/') }} style={{margin:'3px'}}>Home</Nav.Link>
                        <Nav.Link onClick={()=>{ navigate('/detail/0') }} style={{margin:'3px'}}>Detail</Nav.Link>
                        <Nav.Link onClick={()=>{ navigate('/Cart') }} style={{margin:'3px'}}>Cart</Nav.Link>
                        <Nav.Link onClick={()=>{ navigate('/About') }} style={{margin:'3px'}}>About</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={
                <>
                    <div className="main-bg" style={{backgroundImage:'url('+ bg +')'}}></div>

                    <div className="container">
                        <div className="row">
                            {
                                shoes.map((shose,i) => {
                                    const index = i+1;
                                    const imgUrl = 'https://codingapple1.github.io/shop/shoes'+index+'.jpg';
                                    return (
                                        <Product key={i} imgUrl={imgUrl} shose={shose} navigate={navigate}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                    {
                    reqUrlNum <= 3 ?
                    <button onClick={()=>{
                        const url = 'https://codingapple1.github.io/shop/data'+reqUrlNum+'.json';
                        console.log(url);
                        setReqUrlNum(reqUrlNum+1);
                        axios.get(url)
                        .then((data)=>{
                            const newArr =[
                                ...shoes,
                                ...data.data
                            ];
                            setShoes(newArr);
                        })
                    }}>더보기</button>
                    :null
                    }
                </>
                } />
                <Route path="/detail/:id" element={
                    <Context1.Provider value={{stock , shoes}}>
                        <Detail shoes={shoes} />
                    </Context1.Provider>
                } />
                {/*장바구니*/}
                <Route path="/cart" element={<Cart />}/>

                <Route path="/about" element={<About />} >
                    <Route path="member" element={<div>맴버임</div>} />
                    <Route path="location" element={<div>로컬임</div>} />
                </Route>
                <Route path="*" element={<h4>없는 페이지</h4>}/>
            </Routes>

        </div>
    );
}

function Product (props) {
    return(
        <div className="col-md-4" onClick={()=>{
            localStorage.setItem('watced', getWatched(props.shose.id))
            props.navigate(`/detail/${props.shose.id}`)
        }}>
            <img src={props.imgUrl} width="80%" alt="shoseImg"/>
            <h4>{props.shose.title}</h4>
            <p>{props.shose.content}</p>
        </div>
    )
}

function getWatched(id) {
    let warchedArr = JSON.parse(localStorage.getItem('watced'))
    if (!warchedArr.includes(id))
        warchedArr.push(id)

    return JSON.stringify(warchedArr)
}

function About() {
    return(
        <>
            <div>회사정보 페이지임</div>
            <Outlet></Outlet>
        </>
    )
}


export default App;
