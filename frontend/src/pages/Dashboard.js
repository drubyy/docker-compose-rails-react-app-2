import React, { useEffect, useState } from 'react';
import SharedVideo from '../components/others/video/SharedVideo';
import request from '../services/request';
import { fetchVideos } from '../services/youtubeServices'
import { Pagination } from 'antd';

const Dashboard = ({triggerFetchVideos}) => {
  const [members, setMembers] = useState([])
  const [originalResources, setOriginalResources] = useState([])
  const [resources, setResources] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)

  const fetchResouresFromYoutube = async (resourceIds) => {
    const response = await fetchVideos(resourceIds)
    setResources(response.data.items)
  }

  const fetchResources = (page=1) => {
    request('GET', '/dashboards', {page: page}).then((res) => {
      setTotalRecords(res.data.total_records)
      const response = res.data.data
      setOriginalResources(response)
      setMembers(response.included)
      const resourceIds = response.data.map((resource) => (resource.attributes.resource_id))
      fetchResouresFromYoutube(resourceIds.join(','))
    })
  }

  const handleChangePage = (page) => {
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
    <>
      {
        originalResources.data && originalResources.data.map((originResource) => (
          <SharedVideo key={originResource.id} originResource={originResource} members={members} resources={resources} />
        ))
      }
      <Pagination current={currentPage} total={totalRecords} onChange={(page) => handleChangePage(page)} />
    </>
  )
}

export default Dashboard