import * as types from '../constants/ActionTypes'
import * as operations from '../constants/Operations'
import * as funcs from '../functions/Operations'
import { Stack } from 'immutable'

const initialState = {
    stack: Stack()
}

export default function calculate(state = initialState, action) {
    //console.log("Starting State: [" + JSON.stringify(state) + "] Action: [" + JSON.stringify(action) + "]");
    state = Object.assign({}, state);
    if (action.type === null || action.type == types.PICK_NUMBER) {
        let value = action.number;
        // if last action was pick number, append to that
        let first = state.stack.first();
        if (first && first.action_type == types.PICK_NUMBER) {
            value = first.value + action.number;
            state.stack = state.stack.pop();
        }
        if (first && first.action_type === null) {
            state.stack = state.stack.pop();
        }
        state.stack = state.stack.push({
            'action_type': action.type,
            'value': value
        });
    } else if (action.type == types.OPERATE) {
        if (action.operation == operations.CLEAR) {
            state.stack = new Stack();
        }
        if (state.stack.size > 0) {
            // if last action was an operation, discard it in favor of this operation
            let first = state.stack.first();
            if (first && first.action_type == types.OPERATE) {
                state.stack = state.stack.pop();
            }
            // if unary operator, push action onto the stack
            if (state.stack.size == 1 &&
                (action.operation == operations.NEGATE || action.operation == operations.PERCENT)) {
                state.stack = state.stack.push({
                    'action_type': action.type,
                    'value': action.operation
                });
            }
            // actually perform the operation
            if (state.stack.size > 1 &&
                (action.operation == operations.EQUALS || action.operation in funcs)) {
                const stack = state.stack.toArray().reverse();
                const op = stack.splice(1, 1)[0];
                const result = funcs[op.value].apply(null, stack.map((cur) => { return Number(cur.value) }));
                state.stack = Stack([{'action_type': null, 'value': result.toString()}]);
            }
            // if binary operator, push action onto the stack
            if (action.operation != operations.EQUALS &&
                (action.operation != operations.NEGATE && action.operation != operations.PERCENT)) {
                state.stack = state.stack.push({
                    'action_type': action.type,
                    'value': action.operation
                });
            }
        }
    }
    //console.log("Ending State: [" + JSON.stringify(state) + "]");
    return state;
}
