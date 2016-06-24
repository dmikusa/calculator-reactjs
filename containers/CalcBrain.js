import * as actions from '../actions'
import * as ops from '../constants/Operations'
import { connect } from 'react-redux'
import Calculator from '../components/Calculator'

const mapStateToProps = (state) => {
    return {
        value: state.active
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
        default:
            console.log("undefined: " + buttonValue);
    }
    //TODO: wire up these buttons
    //case ".": return ops.DECIMAL
    //case "+/-": return ops.NEGATE
    //case "%": return ops.PERCENT
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleNumber: (e) => {
            console.log('handleNumber [' + e.target.textContent + ']');
            dispatch(actions.pickNumber(parseInt(e.target.textContent)));
        },
        handleSign: (e) => { 
            console.log('handleNumber [' + e.target.textContent + ']');
            dispatch(actions.operate(mapButtonToOperation(e.target.textContent)));
        }
    }
}

const CalcBrain = connect(
    mapStateToProps,
    mapDispatchToProps
)(Calculator)

export default CalcBrain
