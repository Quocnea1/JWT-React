import axios from 'axios'
const userApi = axios.create({
  baseURL: process.env.REACT_APP_URL_SERVER + '/v1/user',
})

userApi.interceptors.request.use(
  (config) => {
    let token = ''
    const auth = localStorage.getItem('auth_user')
    if (auth && JSON.parse(auth)) {
      token = JSON.parse(auth).accessToken
    }
    config.headers['token'] = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const getAll = async () => {
  try {
    const { data } = await userApi.get('/')
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const deleteUser = async (id) => {
  try {
    const { data } = await userApi.delete(`/${id}/delete`)
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const update = async (id, body) => {
  try {
    const { data } = await userApi.put(`/${id}/update`, body)
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}
