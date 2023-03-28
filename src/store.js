import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { login } from 'src/api/auth'

const auth = localStorage.getItem('auth_user')
const initialState = {
  sidebarShow: true,
  isLogin: Boolean(localStorage.getItem('isLogin')) === true,
  error: '',
  auth: JSON.parse(auth) || null,
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case 'loginsuccess':
      return { ...state, ...rest }
    case 'logout':
      return { ...initialState, isLogin: false }
    default:
      return state
  }
}

export const loginAction = (user) => async (dispatch) => {
  try {
    const data = await login(user)
    localStorage.setItem('auth_user', JSON.stringify(data))
    localStorage.setItem('isLogin', true)

    dispatch({ type: 'loginsuccess', auth: data, isLogin: true })
  } catch (error) {
    dispatch({ type: 'error', error: error.message })
  }
}

export const logoutAction = () => async (dispatch) => {
  try {
    localStorage.removeItem('auth_user')
    localStorage.removeItem('isLogin')
    dispatch({ type: 'logout' })
  } catch (error) {
    dispatch({ type: 'error', error: error.message })
  }
}
const store = createStore(changeState, applyMiddleware(thunk))
export default store
