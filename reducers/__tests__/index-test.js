jest.disableAutomock()
import calculate from '../'
import * as actions from '../../actions'
import * as types from '../../constants/ActionTypes'
import * as operations from '../../constants/Operations'
import { Stack } from 'immutable'

describe('calculate reducer', () => {
    it('should handle initial state and no action', () => {
        expect(calculate(undefined, {})).toEqual({
            stack: Stack()
        });
    });
    it('should handle first button pressed number', () => {
        expect(calculate(undefined, actions.pickNumber('5'))).toEqual({
            stack: Stack([{'action_type': types.PICK_NUMBER, 'value': '5'}])
        });
    });
    it('should handle second button pressed number', () => {
        expect(calculate({
            stack: Stack([{'action_type': types.PICK_NUMBER, 'value': '5'}])
        }, actions.pickNumber('7'))).toEqual({
            stack: Stack([{'action_type': types.PICK_NUMBER, 'value': '57'}])
        });
    });
    it('should handle third button pressed number', () => {
        expect(calculate({
            stack: Stack([{'action_type': types.PICK_NUMBER, 'value': '57'}])
        }, actions.pickNumber(2))).toEqual({
            stack: Stack([{'action_type': types.PICK_NUMBER, 'value': '572'}])
        });
    });
    it('should handle decimal pressed', () => {
        expect(calculate({
            stack: Stack([{'action_type': types.PICK_NUMBER, 'value': '57'}])
        }, actions.pickNumber('.'))).toEqual({
            stack: Stack([{'action_type': types.PICK_NUMBER, 'value': '57.'}])
        });
    });
    it('should handle a number pressed after a decimal', () => {
        expect(calculate({
            stack: Stack([{'action_type': types.PICK_NUMBER, 'value': '57.'}])
        }, actions.pickNumber('3'))).toEqual({
            stack: Stack([{'action_type': types.PICK_NUMBER, 'value': '57.3'}])
        });
    });
    it('should handle sign pressed with initial state', () => {
        expect(calculate(undefined, actions.operate(operations.SUBTRACT))).toEqual({
            stack: Stack()
        });
    });
    it('should handle sign pressed when a number is picked', () => {
        expect(calculate({
            stack: Stack([{'action_type': types.PICK_NUMBER, 'value': '57'}])
        }, actions.operate(operations.SUBTRACT))).toEqual({
            stack: Stack([{'action_type': types.OPERATE, 'value': operations.SUBTRACT},
                          {'action_type': types.PICK_NUMBER, 'value': '57'}])
        });
    });
    it('should handle number pressed after an operation', () => {
        expect(calculate({
            stack: Stack([{'action_type': types.OPERATE, 'value': operations.SUBTRACT},
                          {'action_type': types.PICK_NUMBER, 'value': '57'}])
        }, actions.pickNumber('4'))).toEqual({
            stack: Stack([{'action_type': types.PICK_NUMBER, 'value': '4'},
                          {'action_type': types.OPERATE, 'value': operations.SUBTRACT},
                          {'action_type': types.PICK_NUMBER, 'value': '57'}])
        });
    });
    it('should handle a second sign being pressed (i.e. sign change)', () => {
        expect(calculate({
            stack: Stack([{'action_type': types.OPERATE, 'value': operations.SUBTRACT},
                          {'action_type': types.PICK_NUMBER, 'value': '57'}])
        }, actions.operate(operations.ADD))).toEqual({
            stack: Stack([{'action_type': types.OPERATE, 'value': operations.ADD},
                          {'action_type': types.PICK_NUMBER, 'value': '57'}])
        });
    });
    it('should calculate 1 + 2 = 3', () => {
        var state = calculate(undefined, actions.pickNumber(1));
        state = calculate(state, actions.operate(operations.ADD));
        state = calculate(state, actions.pickNumber(2));
        state = calculate(state, actions.operate(operations.EQUALS));
        expect(state).toEqual({
            stack: Stack([{'action_type': null, 'value': '3'}])
        });
    });
    it('should calculate 1 + 2 + 3 = 6', () => {
        var state = calculate(undefined, actions.pickNumber(1));
        state = calculate(state, actions.operate(operations.ADD));
        state = calculate(state, actions.pickNumber(2));
        state = calculate(state, actions.operate(operations.ADD));
        expect(state).toEqual({
            stack: Stack([{'action_type': types.OPERATE, 'value': operations.ADD},
                          {'action_type': null, 'value': '3'}])
        });
        state = calculate(state, actions.pickNumber(3));
        state = calculate(state, actions.operate(operations.EQUALS));
        expect(state).toEqual({
            stack: Stack([{'action_type': null, 'value': '6'}])
        });
    });
    it('should calculate 1 + 2 = 3, 4 - 1 = 3', () => {
        var state = calculate(undefined, actions.pickNumber(1));
        state = calculate(state, actions.operate(operations.ADD));
        state = calculate(state, actions.pickNumber(2));
        state = calculate(state, actions.operate(operations.EQUALS));
        expect(state).toEqual({
            stack: Stack([{'action_type': null, 'value': '3'}])
        });
        state = calculate(state, actions.pickNumber(4));
        state = calculate(state, actions.operate(operations.SUBTRACT));
        state = calculate(state, actions.pickNumber(2));
        state = calculate(state, actions.operate(operations.EQUALS));
        expect(state).toEqual({
            stack: Stack([{'action_type': null, 'value': '2'}])
        });
    });
    it('should calculate 1 + 2 = 3 + 6 = 9', () => {
        var state = calculate(undefined, actions.pickNumber(1));
        state = calculate(state, actions.operate(operations.ADD));
        state = calculate(state, actions.pickNumber(2));
        state = calculate(state, actions.operate(operations.EQUALS));
        expect(state).toEqual({
            stack: Stack([{'action_type': null, 'value': '3'}])
        });
        state = calculate(state, actions.operate(operations.ADD));
        state = calculate(state, actions.pickNumber(6));
        state = calculate(state, actions.operate(operations.EQUALS));
        expect(state).toEqual({
            stack: Stack([{'action_type': null, 'value': '9'}])
        });
    });
    it('should clear the stack', () => {
        expect(calculate({
            stack: Stack([{'action_type': types.OPERATE, 'value': operations.SUBTRACT},
                          {'action_type': types.PICK_NUMBER, 'value': '57'}])
        }, actions.operate(operations.CLEAR))).toEqual({
            stack: Stack()
        });
    });
    it('should negate a number', () => {
        expect(calculate({
            stack: Stack([{'action_type': types.PICK_NUMBER, 'value': '57'}])
        }, actions.operate(operations.NEGATE))).toEqual({
            stack: Stack([{'action_type': null, 'value': '-57'}])
        });
    });
    it('should calculate the percent for a number', () => {
        expect(calculate({
            stack: Stack([{'action_type': types.PICK_NUMBER, 'value': '57'}])
        }, actions.operate(operations.PERCENT))).toEqual({
            stack: Stack([{'action_type': null, 'value': '0.57'}])
        });
    });
});
