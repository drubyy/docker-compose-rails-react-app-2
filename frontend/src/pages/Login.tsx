import React from 'react'
import FormAuthen from '../components/authentication/form/FormAuthen'

const Login = () => (
  <FormAuthen urlSubmit={'/login'} btnSubmitText={'Login'} />
)

export default Login