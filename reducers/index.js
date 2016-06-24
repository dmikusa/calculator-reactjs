import * as types from '../constants/ActionTypes'
import * as operations from '../constants/Operations'
import * as funcs from '../functions/Operations'

const initialState = {
    buffer: 0,
    active: 0,
    lastAction: types.PICK_NUMBER,
    sign: operations.CLEAR
}

export default function calculate(state = initialState, action) {
    console.log("reducing: state [" + JSON.stringify(state) + "] action [" + JSON.stringify(action) + "]");
    let newState = {};
    switch (action.type) {
        case types.OPERATE:
            newState = Object.assign({}, state, {
                buffer: state.active,
                sign: action.operation,
                lastAction: action.type
            });
            const op = (action.operation in funcs) ? action.operation : state.sign;
            if (op in funcs) {
                if (state.lastAction != types.PICK_NUMBER || action.operation == operations.EQUALS) {
                    newState.active = funcs[op](state.buffer, state.active);
                    newState.buffer = 0;
                }
                newState.lastAction = action.type;
                newState.sign = action.operation;
            }
            console.log("after: " + JSON.stringify(state));
            return newState;
        case types.PICK_NUMBER:
            newState = Object.assign({}, state);
            if (state.lastAction == types.PICK_NUMBER) {
                newState.active = state.active * 10 + action.number;
            } else {
                newState.active = action.number;
            }
            newState.lastAction = action.type;
            return newState;
        default:
            return state;
    } 
}
