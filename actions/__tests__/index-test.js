jest.unmock('../../actions')
import * as types from '../../constants/ActionTypes'
import * as operations from '../../constants/Operations'
import * as actions from '../../actions'

describe('actions creators work', () => {
    it('creates an operate action', () => {
        const expected = { 'type': types.OPERATE, operation: operations.ADD };
        expect(actions.operate(operations.ADD)).toEqual(expected);
    });
    it('creates a pick number action', () => {
        const expected = { 'type': types.PICK_NUMBER, number: 42 };
        expect(actions.pickNumber(42)).toEqual(expected);
    });
});
