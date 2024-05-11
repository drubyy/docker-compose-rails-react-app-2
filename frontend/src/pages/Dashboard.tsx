import React, { useEffect, useState } from 'react';
import SharedVideo from '../components/others/video/SharedVideo';
import request from '../services/request';
import { fetchVideos } from '../services/youtubeServices'
import { Pagination } from 'antd';
import { IOriginalResourceRes, IResourceRes } from '../interfaces/resource.interface';
import { IYtResourceRes, IYtResourceItem } from '../interfaces/youtube-resource.interface';
import WithNotifycationLayout from '../components/layouts/WithNotifycationLayout';

const Dashboard = () => {
  const [triggerFetchVideos, setTriggerFetchVideos] = useState(1)
  const [members, setMembers] = useState([])
  const [originalResources, setOriginalResources] = useState<IOriginalResourceRes[]>([])
  const [resources, setResources] = useState<IYtResourceItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)

  const fetchResouresFromYoutube = async (resourceIds: string) => {
    const response: { data: IYtResourceRes } = await fetchVideos(resourceIds)
    setResources(response.data.items)
  }

  const fetchResources = (page: number = 1) => {
    request('GET', '/dashboards', {page: page}).then((res) => {
      setTotalRecords(res.data.total_records)
      const response = res.data.data

      setOriginalResources(response.data)
      setMembers(response.included)
      const resourceIds = response.data.map((resource: IResourceRes) => (resource.attributes.resource_id))
      fetchResouresFromYoutube(resourceIds.join(','))
    })
  }

  const handleChangePage = (page: number) => {
    setCurrentPage(page)
    fetchResources(page)
  }

  useEffect(() => {
    fetchResources()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
    fetchResources()
  }, [triggerFetchVideos])

  return (
    <WithNotifycationLayout
      triggerFetchVideos={triggerFetchVideos}
      setTriggerFetchVideos={setTriggerFetchVideos}
      childComponent={
        <>
          {
            originalResources && originalResources.map((originResource: IOriginalResourceRes) => (
              <SharedVideo key={originResource.id} originResource={originResource} members={members} resources={resources} />
            ))
          }
          <Pagination current={currentPage} total={totalRecords} onChange={(page) => handleChangePage(page)} />
        </>
      }
    />
  )
}

export default Dashboard