import React from 'react'
import request from '../../../services/request'
import { storageUserInfor } from '../../../services/request'
import { Input, Form, Button } from 'antd'

const FormAuthen = ({urlSubmit, btnSubmitText}) => {
  const [form] = Form.useForm()

  const onFinish = async () => {
    const formValues = form.getFieldsValue()
    const response = await request('POST', urlSubmit, formValues, false)
    if(response.status === 200){
      storageUserInfor(response.headers.authorization.replace('Bearer ', ''), response.data.data.email)
      window.location.href = '/'
    }else if(response.status === 422){
      if(response.data.errors) {
        console.log(response.data.errors)
        for (const [key, value] of Object.entries(response.data.errors)) {
          form.setFields([{
            name: ['user', key],
            errors: [`${key} ${value}`]
          }])
        }
      }
    }else if(response.status === 401){
      form.setFields([
        {
          name: ['user', 'email'],
          errors: [response.data.error]
        },
        {
          name: ['user', 'password'],
          errors: [response.data.error]
        }
      ])
    }
  }

  return (
    <div className='wrapper-form'>
      <Form form={form}>
        <Form.Item name={["user", "email"]}>
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item name={["user", "password"]}>
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Button onClick={onFinish}>
          {btnSubmitText}
        </Button>
      </Form>
    </div>
  )
}

export default FormAuthen