import { combineReducers } from 'redux'

import movies from './movies.reducer'
import reservations from './reservations.reducer'

const rootReducer = combineReducers({
  movies,
  reservations
})

export default rootReducer
