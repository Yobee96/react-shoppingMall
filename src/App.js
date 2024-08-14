/* eslint-disable */
import './App.css';

import { Container, Nav, Navbar } from 'react-bootstrap';
import bg from './img/bg.jfif';
import {useState} from "react";
import data from './data.js';
import Detail from "./Detail";
// react_router_dom 라이브러리 사용법
import {Routes, Route, Link} from 'react-router-dom';

function App() {
    const [shoes] = useState(data);

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

            {/*Routes : 페이지구분위한 상위 태그*/}
            {/*Route : 페이지 구분 태그, 1개의 Route = 1개의 페이지 */}
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
                                        <Product key={shose.id} imgUrl={imgUrl} shose={shose}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </>
                } />
                <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
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
