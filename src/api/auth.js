import axios from 'axios'
const authApi = axios.create({
  baseURL: process.env.REACT_APP_URL_SERVER + '/v1/auth',
})

export const login = async (user) => {
  try {
    const { data } = await authApi.post('/login', user)
    return Promise.resolve(data)
  } catch (error) {
    throw new Error(error.message)
  }
}

export const register = async (user) => {
  try {
    const { data } = await authApi.post('/register', user)
    return Promise.resolve(data)
  } catch (error) {
    throw new Error(error.message)
  }
}

// export const forgotPassword = async (email) => {
//   try {
//     const { data } = await authApi.post('/forgot-password', { email })
//     return Promise.resolve(data)
//   } catch (error) {
//     throw new Error(error.message)
//   }
// }
