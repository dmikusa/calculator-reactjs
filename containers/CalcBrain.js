import * as actions from '../actions'
import * as types from '../constants/ActionTypes'
import * as ops from '../constants/Operations'
import { connect } from 'react-redux'
import Calculator from '../components/Calculator'

function getValueFromStack(stack) {
    const first = stack.first();
    if (first) {
        return (first.action_type == types.OPERATE) ?
                stack.pop().first().value : first.value;
    } else {
        return 0;
    }
}

const mapStateToProps = (state) => {
    return {
        value: getValueFromStack(state.stack)
    }
}

const mapButtonToOperation = (buttonValue) => {
    switch (buttonValue) {
        case "AC": return ops.CLEAR
        case "÷":  return ops.DIVIDE
        case "×":  return ops.MULTIPLY
        case "-":  return ops.SUBTRACT
        case "+":  return ops.ADD
        case "=":  return ops.EQUALS
        case "+/-": return ops.NEGATE
        case "%":  return ops.PERCENT
        default:
            console.log("undefined: " + buttonValue);
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleNumber: (e) => {
            console.log('handleNumber [' + e.target.textContent + ']');
            dispatch(actions.pickNumber(e.target.textContent));
        },
        handleSign: (e) => { 
            console.log('handleSign [' + e.target.textContent + ']');
            dispatch(actions.operate(mapButtonToOperation(e.target.textContent)));
        }
    }
}

const CalcBrain = connect(
    mapStateToProps,
    mapDispatchToProps
)(Calculator)

export default CalcBrain
