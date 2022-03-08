import axios from 'axios';
import history from '../history';
// import regeneratorRuntime from 'regenerator-runtime'

const TOKEN = 'token';

//ACTION TYPE
const SET_AUTH = 'SET_AUTH';

//ACTION CREATORS
const setAuth = (auth) => ({
  type: SET_AUTH,
  auth,
});

//THUNK CREATORS
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (email, password, method) => async (dispatch) => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, { email, password });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
    
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
    
  }
  try {
    dispatch(setAuth(res.data.token));
    history.push('/userhome');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/home');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

//REDUCER CREATORS
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
