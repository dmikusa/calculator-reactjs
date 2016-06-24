import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import CalcBrain from './containers/CalcBrain'

ReactDOM.render(
    <Provider store={store}>
        <CalcBrain/>
    </Provider>,
    document.getElementById('root')
);
