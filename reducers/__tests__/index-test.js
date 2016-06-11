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
});
