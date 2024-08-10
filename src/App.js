import './App.css';

// 부트스트랩 리액트버전 으로도 사용가능 import로 변수선언해서 가져와 사용가능
import { Container, Nav, Navbar } from 'react-bootstrap';
// 이미지 파일 가져오는 방법
import bg from './img/bg.jfif';
import {useState} from "react";
// 변수 가져올 때는 변수명 바꿔서 가져올 때, 수정 불가
// import {a, b} from './data.js';
import data from './data.js';

function App() {

    /*
    타 파일의 변수를 가져오고 싶다면?
    1. 파일에서 export
    2. 사용위치에서 import
    * */

    {/*타 파일의 변수 사용 방법2*/}
    const [shoes] = useState(data);

    return (
        <div className="App">

            {/*타파일의 변수사용방법1*/}
            {/*{a} , {b}*/}

            {/*부트스트랩 사용방법*/}
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            
            {/* 이미지 사용방법1 */}
            <div className="main-bg" style={{backgroundImage:'url('+ bg +')'}}></div>

            {/* 이미지 사용방법2 */}
            <div className="container">
                <div className="row">
                    {/*숙제*/}
                    {
                        shoes.map((shose,i) => {
                            const index = i+1;
                            const imgUrl = 'https://codingapple1.github.io/shop/shoes'+index+'.jpg';
                            return (
                                <Product imgUrl={imgUrl} shose={shose}/>
                            )
                        })
                    }
                </div>
            </div>

            {/* 이미지 사용방법3 : css 파일에서 사용가능 */}
        </div>
    );
}

function Product (props) {
    return(
        <div className="col-md-4">
            <img src={props.imgUrl} width="80%" alt="shoseImg"/>
            <h4>{props.shose.title}</h4>
            <p>{props.shose.content}</p>
        </div>
    )
}


export default App;
