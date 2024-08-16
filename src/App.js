/* eslint-disable */
import './App.css';

import { Container, Nav, Navbar } from 'react-bootstrap';
import bg from './img/bg.jfif';
import {createContext, useState} from "react";
import data from './data.js';
import Detail from "./routes/Detail";
import {Routes, Route, Link} from 'react-router-dom';
import axios from 'axios'
import Cart from "./routes/Cart";
// useState 가 다른 컴포넌트에서 사용 하기 불편할 때, 부모자식 관계로 사용
/* 복잡성 해결 
* 방법 1 : Context API : 성능이슈로많이쓰진 않음, 재활용이 어려움
* 방법 2 : Redux 등 외부라이브러리 사용
* */

export let Context1 = createContext()

function App() {
    const [shoes,setShoes] = useState(data);
    const [reqUrlNum, setReqUrlNum] = useState(2);
    const [stock, setStock] = useState([10, 11, 12]);

    return (
        <div className="App">

            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/" style={{margin:'3px'}}>홈으로 이동</Link>
                        <Link to="/detail" style={{margin:'3px'}}>디테일로 이동</Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
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
                                        <Product key={i} imgUrl={imgUrl} shose={shose}/>
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
            </Routes>

        </div>
    );
}

function Product (props) {
    return(
        <div className="col-md-4" onClick={()=>{}}>
            <img src={props.imgUrl} width="80%" alt="shoseImg"/>
            <h4>{props.shose.title}</h4>
            <p>{props.shose.content}</p>
        </div>
    )
}


export default App;
