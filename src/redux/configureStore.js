import { createStore, combineReducers } from "redux";



const alertDef = true;

function reducer2(state = alertDef, action) {
    if (action.type === 'close') {

        let copy = true
        if (copy === true) {
            return false
        } else {
            return copy
        }
    } return state
}


const def = [
    { id: 0, name: '조던1', quan: 2 },
    { id: 1, name: '조던2', quan: 0 },
    { id: 2, name: '조던3', quan: 10 }
]

function reducer(state = def, action) {
    if (action.type === '항목추가') {

        let found = state.findIndex((a) => {
            return a.id === action.data.id
        })

        console.log('몇번째 인덱스랑 같은지', found)


        if (found) {
            let copy = [...state];
            copy[found].quan++;
            return copy
        } else {
            let copy = [...state];
            copy.push(action.data.quan++);
            return copy
        }


    } else if (action.type === 'plus') { // 데이터 수정 조건
        let copy = [...state] // 카피본 생성
        copy[action.data].quan++ // 카피본 수정
        return copy // 수정데이터 이것은 항상 return 시켜줌

    } else if (action.type === 'minus') {
        let copy = [...state];
        copy[action.data].quan--;
        return copy

    } else {
        return state // 기본값 데이터 (요청없을 시)
    }
}

const store = createStore(combineReducers({
    reducer, reducer2
}))

export default store;

//action.type