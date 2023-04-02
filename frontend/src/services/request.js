import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_ENDPOINT_API

const handleErrorToken = () => {
  localStorage.clear();
  window.location.href = '/login'
}

export const storageUserInfor = (token, email) => {
  localStorage.setItem('email', email)
  localStorage.setItem('jwt', token)
  localStorage.setItem('loggedIn', 'true')
}

async function request(method, url, params = {}, sendWithBearer = true, options) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if(sendWithBearer === true){
    headers['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`
  }

  const requestBody = {
    method,
    url: url,
    headers: headers,
    ...options,
  }
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    requestBody.data = params
  } else {
    requestBody.params = params
  }

  try {
    const response = await axios(requestBody)
    return response
  } catch (error) {
    if(error.response.status === 401){
      const currentPath = new URL(window.location.href).pathname

      // just call handleErrorToken for case token expired
      if(currentPath !== '/login') handleErrorToken()
    }
    return error.response
  }
}

export default request