jest.disableAutomock()
import calculate from '../'
import * as actions from '../../actions'
import * as types from '../../constants/ActionTypes'
import * as operations from '../../constants/Operations'

describe('calculate reducer', () => {
    it('should handle initial state', () => {
        expect(calculate(undefined, {})).toEqual({
            buffer: 0,
            active: 0,
            lastAction: types.PICK_NUMBER,
            sign: operations.CLEAR
        });
    });
    it('should handle first button pressed number', () => {
        expect(calculate(undefined, actions.pickNumber(5))).toEqual({
            buffer: 0,
            active: 5,
            lastAction: types.PICK_NUMBER,
            sign: operations.CLEAR
        });
    });
    it('should handle second button pressed number', () => {
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
    it('should handle third button pressed number', () => {
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
    it('should handle button press after operation picked', () => {
        expect(calculate({
            buffer: 1,
            active: 1,
            lastAction: types.OPERATE,
            sign: operations.ADD
        }, actions.pickNumber(2))).toEqual({
            buffer: 1,
            active: 2,
            lastAction: types.PICK_NUMBER,
            sign: operations.ADD
        });
    });
    it('should handle sign pressed with initial state', () => {
        expect(calculate(undefined, actions.operate(operations.SUBTRACT))).toEqual({
            buffer: 0,
            active: 0,
            lastAction: types.OPERATE,
            sign: operations.SUBTRACT
        });
    });
    it('should handle sign pressed when a number is picked', () => {
        expect(calculate({
            buffer: 0,
            active: 57,
            lastAction: types.PICK_NUMBER,
            sign: operations.CLEAR
        }, actions.operate(operations.SUBTRACT))).toEqual({
            buffer: 57,
            active: 57,
            lastAction: types.OPERATE,
            sign: operations.SUBTRACT
        });
    });
    it('should calculate 1 + 2 = 3', () => {
        var state = calculate(undefined, actions.pickNumber(1));
        state = calculate(state, actions.operate(operations.ADD));
        state = calculate(state, actions.pickNumber(2));
        state = calculate(state, actions.operate(operations.EQUALS));
        expect(state).toEqual({
            buffer: 0,
            active: 3,
            lastAction: types.OPERATE,
            sign: operations.EQUALS
        });
    });
});
