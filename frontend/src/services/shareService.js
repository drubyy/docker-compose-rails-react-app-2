import { fetchVideos } from './youtubeServices'
import request from './request'

export const submitShare = (form, setVisible, triggerFetchVideos, setTriggerFetchVideos) => {
  const resource_url = form.getFieldValue('resource_url')
  if(resource_url === null || resource_url === '' || resource_url === undefined) return

  const isValidUrl = verifyResource(resource_url)
  if(isValidUrl === false){
    form.setFields([{
      name: 'resource_url',
      errors: ['We cannot found your video you wanna share']
    }])
    return
  }

  performShare(isValidUrl, setVisible, triggerFetchVideos, setTriggerFetchVideos)
}

const verifyResource = (resource_url) => {
  try {
    const resourceId = new URL(resource_url).searchParams.get('v')
    fetchVideos(resourceId)
    return resourceId
  } catch (error) {
    return false
  }
}

const performShare = (resource_id, setVisible, triggerFetchVideos, setTriggerFetchVideos) => {
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