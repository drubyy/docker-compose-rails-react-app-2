import React from 'react'
import FormAuthen from '../components/authentication/form/FormAuthen'

const Registration = () => (
  <FormAuthen urlSubmit={'/signup'} btnSubmitText={'Registration'} />
)

export default Registration