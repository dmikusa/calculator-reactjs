import { createStore } from 'redux'
import calculate from './reducers'

let store = createStore(calculate);
