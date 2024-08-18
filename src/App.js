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
import {useQuery} from "react-query";

export let Context1 = createContext()

function App() {
    const [shoes,setShoes] = useState(data);
    const [reqUrlNum, setReqUrlNum] = useState(2);
    const [stock, setStock] = useState([10, 11, 12]);

    useEffect(() => {
        let watchedArr = localStorage.getItem('watched')
        if (JSON.parse(watchedArr) === null)
            localStorage.setItem('watched', JSON.stringify([]))
    }, []);

    let navigate = useNavigate();

    
    // refetch 를 사용하는법 은 useQuery 사용하면 된다.
    let result = useQuery('작명', ()=>{
        return axios.get('https://codingapple1.github.io/userdata.json').then((response)=>{
            return response.data
        })
    }, {staleTime : 2000})
    /* useQuery 의 사용법 
    * 1. result.data : 가져 오는 데이터
    * 2. result.isLoading : 현재 로딩중 인지 확인
    * 3. result.error : 요청 실패시 true 리턴
    * refetch의 간격을 주고 싶으면 마지막에 options를 통해 staleTime 로 최소 시간 설정 가능
    * 만일 가져오는걸 실패해도, 계속 다시 리트라이 해줌
    * 만일 똑같은곳에서 두번호출돼도, 한번만 사용됨
    * 캐싱기능 성공결과를 기억해둠
    * */

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
                    {/* useQuery 사용 */}
                    <Nav className="ms-auto text-white">
                        { result.isLoading ? '로딩중' : '안녕하세요 '+result.data.name+'님' }
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
            props.navigate(`/detail/${props.shose.id}`)
        }}>
            <img src={props.imgUrl} width="80%" alt="shoseImg"/>
            <h4>{props.shose.title}</h4>
            <p>{props.shose.content}</p>
        </div>
    )
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
