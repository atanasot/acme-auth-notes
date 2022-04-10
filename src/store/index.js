import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

const LOAD_NOTES = 'LOAD_NOTES'

const notes = (state = [], action)=> { 
   if (action.type === LOAD_NOTES) {
     state = action.notes
   }
  return state;
};

const auth = (state = {}, action)=> {   // start wtih empty {}
  if(action.type === 'SET_AUTH'){
    return action.auth;
  }
  return state;
};


 
const logout = ()=> {                           // not a thunk
  window.localStorage.removeItem('token');
  return {
    type: 'SET_AUTH',
    auth: {}
  };
};


//*****************************************Thunks******************************************************** */

const signIn = (credentials)=> {    
  return async(dispatch)=> {
    let response = await axios.post('/api/auth', credentials);
    const { token } = response.data;
    window.localStorage.setItem('token', token);
    return dispatch(attemptLogin());
  }
};
const attemptLogin = ()=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await axios.get('/api/auth', {            // we can send the token the same way for notes
        headers: {                          
          authorization: token
        }
      });
      dispatch({ type: 'SET_AUTH', auth: response.data });
    }
  }
}

// const fetchNotes = () => {
//   return async(dispatch) => {
//     const notes = (await axios.get('/api/notes')).data
//     dispatch({type: LOAD_NOTES, notes})
//   }
// }

const fetchNotes = ()=> {
  return async(dispatch)=> {
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await axios.get('/api/notes', {           
        headers: {                          
          authorization: token
        }
      });
      dispatch({ type: LOAD_NOTES, notes: response.data });
    }
  }
}

const store = createStore(
  combineReducers({
    auth,
    notes
  }),
  applyMiddleware(thunk, logger)
);

export { attemptLogin, signIn, logout, fetchNotes };

export default store;
