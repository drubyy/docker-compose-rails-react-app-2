import React from 'react'
import { Form, Modal, Input } from 'antd';
import './style.css'

type Props = {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel?: Function;
  triggerFetchVideos?: number;
  setTriggerFetchVideos?: React.Dispatch<React.SetStateAction<number>>;
  callBackOk: Function;
}

function ModalShare({ isVisible, setVisible, onCancel = () => {}, triggerFetchVideos, setTriggerFetchVideos, callBackOk = () => {} }: Props) {
  const [form] = Form.useForm()

  const handleCancel = () => {
    onCancel()
    setVisible(false)
  }

  const handleOk = () => {
    callBackOk(form, setVisible, triggerFetchVideos, setTriggerFetchVideos)
  }

  return (
    <Modal
      open={isVisible}
      title='Share a Youtube movie'
      centered
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Share'
      className='modal-share'
    >
      <Form form={form}>
        <Form.Item name='resource_url'>
          <Input placeholder="Paste link movie you want share here" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalShare;