import * as types from '../constants/ActionTypes'
import * as operations from '../constants/Operations'

const initialState = {
    buffer: 0,
    active: 0,
    lastAction: types.PICK_NUMBER,
    sign: operations.CLEAR
}

export default function calculate(state = initialState, action) {
    switch (action.type) {
        case types.OPERATE:
            return state;           
        case types.PICK_NUMBER:
            newState = Object.assign({}, state);
            if (lastAction == types.PICK_NUMBER) {
                newState.active = state.active * 10 + action.number;
            } else {
                newState.active = action.number;
            }
            return newState;
        default:
            return state;
    } 
}
