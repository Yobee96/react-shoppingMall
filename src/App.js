/* eslint-disable */
import './App.css';

import { Container, Nav, Navbar } from 'react-bootstrap';
import bg from './img/bg.jfif';
import {createContext, useDeferredValue, useEffect, useState, useTransition} from "react";
import data from './data.js';
import Detail from "./routes/Detail";
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import axios from 'axios'
import Cart from "./routes/Cart";
import {useQuery} from "react-query";

export let Context1 = createContext()


/* react 팁
* 1. state 변경함수들이 붙어있으면, 재런더링은 마지막 state변경에서 일어남
*   (setTimOut이나, ajax 통신등으로 다시 재런더링 시킬 순 있음)
* 2.  useTransitiom
* */

let arr = new Array(100).fill(0)


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

    let result = useQuery('작명', ()=>{
        return axios.get('https://codingapple1.github.io/userdata.json').then((response)=>{
            return response.data
        })
    }, {staleTime : 2000})



    let [name, setName] = useState('Kim')
    let[isPending, startTransition] = useTransition()
    let useDefValName = useDeferredValue(name)

    let [count, setCount] = useState(0);
    const [age, setAge] = useState(20);

    // onClick 다음에 바로 설정하면 if 문은 비동기통신이라 작동을 안함
    useEffect(() => {
        //따라서 useEffect 를 사용해서 처리함
        if (count != 0 && count < 3) {
            setAge(age+1);
        }
    }, [count]);

    return (
        <div className="App">
            <div> 안녕하십니까 전 {age}</div>
            <button onClick={(e)=>{
                setCount(count+1);
            }}>누르면 한살 먹기</button>
            <br/>

            <input onChange={(e)=>{
                /*기존애는 인풋의 값을 읽고 div 만개 만들기 작업이었다면,
                * startTransition 는  인풋값 읽기를 하되, 좀늦게 만개 보여주기로 성능향상 효과 표현,
                * */
                startTransition(()=>{
                    setName(e.target.value)
                })
            }} />

            {
                isPending ? '로딩중' :
                    arr.map(()=>{
                        return <div>{useDefValName}</div>
                    })
            }
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
