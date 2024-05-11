import { fetchVideos } from './youtubeServices'
import request from './request'
import { FormInstance } from 'antd'

export const submitShare = async (
  form: FormInstance<any>,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  triggerFetchVideos: number,
  setTriggerFetchVideos: React.Dispatch<React.SetStateAction<number>>
) => {
  const resource_url = form.getFieldValue('resource_url')
  if(resource_url === null || resource_url === '' || resource_url === undefined) return

  const findValidResource = verifyResource(resource_url)
  if(!findValidResource){
    form.setFields([{
      name: 'resource_url',
      errors: ['We cannot found your video you wanna share']
    }])
    return
  }

  const id = await performShare(findValidResource, setVisible, triggerFetchVideos, setTriggerFetchVideos)

  return id;
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

const performShare = async (
  resource_id: string,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  triggerFetchVideos: number,
  setTriggerFetchVideos: React.Dispatch<React.SetStateAction<number>>
) => {
  return await request(
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

      return res.data.data.id
    }
  })
}