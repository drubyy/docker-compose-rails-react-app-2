import { fetchVideos } from './youtubeServices'
import request from './request'
import { FormInstance } from 'antd'

export const submitShare = (
  form: FormInstance<any>,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  triggerFetchVideos: number,
  setTriggerFetchVideos: React.Dispatch<React.SetStateAction<number>>
) => {
  const resource_url = form.getFieldValue('resource_url')
  if(resource_url === null || resource_url === '' || resource_url === undefined) return

  const isValidUrl = verifyResource(resource_url)
  if(!isValidUrl){
    form.setFields([{
      name: 'resource_url',
      errors: ['We cannot found your video you wanna share']
    }])
    return
  }

  performShare(isValidUrl, setVisible, triggerFetchVideos, setTriggerFetchVideos)
}

const verifyResource = (resourceUrl: string) => {
  try {
    const resourceId = new URL(resourceUrl).searchParams.get('v')
    fetchVideos(resourceId as string)

    return resourceId
  } catch (error) {
    return false
  }
}

const performShare = (
  resource_id: string,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  triggerFetchVideos: number,
  setTriggerFetchVideos: React.Dispatch<React.SetStateAction<number>>
) => {
  request(
    'POST',
    '/resources',
    {
      resource: {
        resource_id: resource_id
      }
    }
  ).then((res) => {
    if(res.status === 200) {
      setTriggerFetchVideos(triggerFetchVideos + 1)
      setVisible(false)
    }
  })
}