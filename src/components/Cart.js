import React, {useEffect, memo} from 'react';
import { Table } from 'react-bootstrap'
import { connect, useSelector, useDispatch } from 'react-redux';

function Cart(props) {

    let state = useSelector((state)=>state) // redux에 있던 모든 state
    console.log(state.reducer)

    let dispatch = useDispatch()

    return (
        <div>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.reducer.map((t, i) => {
                            return (
                                <tr key={i}>
                                    <td>{t.id}</td>
                                    <td>{t.name}</td>
                                    <td>{t.quan}</td>
                                    <td><button onClick={() => { dispatch({ type: 'plus', data: t.id }) }}>+</button>
                                        <button onClick={() => { dispatch({ type: 'minus', data: t.id }) }}>-</button>
                                    </td>
                                    {/* 데이터 수정요청을 할 땐 dispatch */} 
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            {
                props.alert === true
                ? <div className='my-alert2'>
                <p>지금 구매하시면 신규할인 20%</p>
                <button onClick={()=>{ dispatch({ type: 'close'}) }}>닫기</button>
            </div>
                : null
            }
            


        </div>
    )
}



// function reducer(state) {
//     console.log(state)
//     return {
//         state: state.reducer,
//         alert: state.reducer2
//     }
// }

// export default connect(reducer)(Cart)

export default Cart;