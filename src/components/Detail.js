import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import './Detail.scss';
import { CSSTransition } from "react-transition-group";
import { connect } from 'react-redux';
import { invencontext } from '../App'

let Box = styled.div`
    padding: 20px;
`;
let Title = styled.div`
    font-size: 30px;
    color: red;
`;

function Detail(props) {

    let [alert, setAlert] = useState(true);
    let [inputData, setInputData] = useState('')
    let [tab, setTab] = useState(0)

    useEffect(() => {
        let timer = setTimeout(() => { // 2초 후에 alert창이 사라지게
            setAlert(false)
        }, 2000);
        return () => { clearTimeout(timer) } // detail컴포넌트가 사라질 때 timer 제거
    }, [alert]); // []는 실행조건. alert state가 변경될때만 실행된다. 만약 빈[]라면 첫 등장시 한번 실행하고 끝난다

    let { id } = useParams();
    let history = useHistory();
    let findShoes = props.shoes.find((item) => {
        return item.id == id
    })

    useEffect(()=>{
        let arr = localStorage.getItem('뭘꺼내자')

        if(arr == null) {
            arr = []
        } else {
            arr = JSON.parse(arr)
        }
        
        arr.push(id)
        const set = new Set(arr);
        const newArr = [...set];

        localStorage.setItem('뭘꺼내자', JSON.stringify(newArr))
    },[])


    function 항목추가() {
        props.setInven([1, 2, 3])
        props.dispatch(
            // console.log('여기다: ',findShoes),
            {
                type: '항목추가',
                data: {
                    id: findShoes.id,
                    name: findShoes.title,
                    quan: 1
                }
            })
        history.push('/cart')
    }
    function 뒤로가기() {
        history.goBack();

    }

    function set탭() {
        setTab(0)
    }
    function set탭2() {
        setTab(1)
    }

    return (
        <div className="container">
            <Box>
                <Title>Detail</Title>
            </Box>


            <input onChange={(e) => { setInputData(e.target.value) }} />

            {
                alert === true
                    ? <div className='my-alert2'>
                        <p>재고가 얼마 남지 않았습니다</p>
                    </div>
                    : null
            }


            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{findShoes.title}</h4>
                    <p>{findShoes.content}</p>
                    <p>{findShoes.price}</p>




                    <Info inven={props.inven} i={props.i} />




                    <button className="btn btn-danger" onClick={항목추가}>주문하기</button>
                    <button className="btn btn-danger" onClick={뒤로가기}>뒤로가기</button>
                </div>
            </div>

            <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={set탭}>Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={set탭2}>Option 2</Nav.Link>
                </Nav.Item>
            </Nav>

            <TabContent tab={tab} />



        </div>
    )
};

function TabContent(props) {
    if (props.tab === 0) {
        return <div>0번째 내용</div>
    } else if (props.tab === 1) {
        return <div>1번째 내용</div>
    }
}

function Info(props) { //재고

    let inven = useContext(invencontext); // props전송없이 재고 states 사용 가능

    // console.log('여기: ',inven[props.i]) 왜 안되지...?
    return (

        <p >재고: {inven[1]}</p>
    )
}

function reducer(state) {
    // console.log(state)
    return {
        state: state.reducer,
        alert: state.reducer2
    }
}

export default connect(reducer)(Detail)