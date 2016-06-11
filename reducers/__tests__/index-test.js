jest.unmock('../')
import calculate from '../'
import * as types from '../../constants/ActionTypes'
import * as operations from '../../constants/Operations'
import * as actions from '../../actions'

describe('calculate reducer', () => {
    it('should handle initial state', () => {
        expect(calculate(undefined, {})).toEqual({
            buffer: 0,
            active: 0,
            lastAction: types.PICK_NUMBER,
            sign: operations.CLEAR
        });
    });
    if('should handle first button pressed number', () => {
        expect(calculate(undefined, actions.pickNumber(5))).toEqual({
            buffer: 0,
            active: 5,
            lastAction: types.PICK_NUMBER,
            sign: operations.CLEAR
        });
    });
    if('should handle second button pressed number', () => {
        expect(calculate({
            buffer: 0,
            active: 5,
            lastAction: types.PICK_NUMBER,
            sign: operations.CLEAR
        }, actions.pickNumber(7))).toEqual({
            buffer: 0,
            active: 57,
            lastAction: types.PICK_NUMBER,
            sign: operations.CLEAR
        });
    });
    if('should handle third button pressed number', () => {
        expect(calculate({
            buffer: 0,
            active: 57,
            lastAction: types.PICK_NUMBER,
            sign: operations.CLEAR
        }, actions.pickNumber(2))).toEqual({
            buffer: 0,
            active: 572,
            lastAction: types.PICK_NUMBER,
            sign: operations.CLEAR
        });
    });
});
