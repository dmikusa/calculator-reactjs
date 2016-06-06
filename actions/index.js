import * as types from '../constants/ActionTypes'

export function operate(operation) {
    return { type: types.OPERATE, operation: operation }
}

export function pickNumber(number) {
    return { type: types.PICK_NUMBER, number: number }
}
