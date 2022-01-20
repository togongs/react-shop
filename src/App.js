/* eslint-disable */
import React, { useContext, useState } from 'react';
import logo from './logo.svg';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import './App.css';
import Data from './data';
import Detail from './components/Detail.js';
import axios from 'axios';

import { Link, Route, Switch, useHistory } from 'react-router-dom'; // html 컴포넌트
import Cart from './components/Cart';

export let invencontext = React.createContext();

function App() {

  let [shoes, setShoes] = useState(Data);
  let [inven, setInven] = useState([12, 13, 14]); // 재고데이터

  function axios더보기() {
    axios.get('https://codingapple1.github.io/shop/data2.json')
      .then((result) => {
        console.log(result.data)
        setShoes([...shoes, ...result.data]) // shoes데이터에 result데이터 추가
      })
      .catch(() => {
        console.log('실패ㅜㅜㅜㅜ')
      })
  }

  return (
    <div className="App">

      {/* nav 바 */}
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Shoes SHOP</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to='/'>Home </Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <Switch>
        {/* Home route */}
        <Route exact path='/'>
          <div className="background" style={{ width: '100%', height: '400px' }}>
            <h1>20% Season Off</h1>
          </div>

          <invencontext.Provider value={inven}>
            {/* 컴포넌트 map 반복문 활용 */}
            <div className="container">
              <div className="row">
                {
                  shoes.map((e, i) => {
                    return (<Card shoes={shoes[i]} i={i} key={i} />
                      // i props 전송
                    )
                  })
                }
              </div>
            </div>
          </invencontext.Provider>

          <button className='btn btn-primary' onClick={axios더보기}>더보기</button>
        </Route>

        {/* Detail route */}
        <Route path="/detail/:id">

          <invencontext.Provider value={inven}>
            <Detail shoes={shoes} inven={inven} setInven={setInven} />
          </invencontext.Provider>

        </Route>


        {/* Cart route */}
        <Route path="/cart">
          <Cart />
        </Route>

        <Route path='/:id'>
          <div></div>
        </Route>



      </Switch>



    </div>
  );
}

// 컴포넌트 만들기
function Card(props) {

  let inven = useContext(invencontext); // props전송없이 재고 states 사용 가능
  let history = useHistory();

  function detailRoute() {
    history.push('/detail/' + props.shoes.id)
  }

  // console.log(props.shoes)
  return (
    <div onClick={detailRoute}>
      <div className="col-md-4">
        <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width="100%" />
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.content} & {props.shoes.price}</p>
        <p>재고: {inven[props.i]}</p>
      </div>
    </div>
  )
}


export default App;
