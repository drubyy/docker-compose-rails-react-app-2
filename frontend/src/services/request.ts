import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_ENDPOINT_API

const handleErrorToken = () => {
  localStorage.clear();
  window.location.href = '/login'
}

export const storageUserInfor = (token: string, email: string) => {
  localStorage.setItem('email', email)
  localStorage.setItem('jwt', token)
  localStorage.setItem('loggedIn', 'true')
}

async function request(method: 'GET' | 'POST' | 'PATCH' | 'PUT'| 'DELETE', url: string, params: object = {}, sendWithBearer: boolean = true, options?: object) {
  const headers: any = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if(sendWithBearer === true){
    headers['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`
  }

  const requestConf: any = {
    method,
    url: url,
    headers: headers,
    ...options,
  }
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    requestConf.data = params
  } else {
    requestConf.params = params
  }

  try {
    const response = await axios(requestConf)
    return response
  } catch (error: any) {
    if(error.response.status === 401){
      const currentPath = new URL(window.location.href).pathname

      // just call handleErrorToken for case token expired
      if(currentPath !== '/login') handleErrorToken()
    }
    return error.response
  }
}

export default request