import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css'

function SharedVideo({ originResource, members, resources }) {
  const target = resources.find((resource) => (resource.id === originResource.attributes.resource_id))
  if(target === undefined) return null

  const sharedBy = () => (
    members.find((member) => member.id === originResource.relationships.user.data.id).attributes.email
  )

  const urlEmbed = () => (
    `https://www.youtube.com/embed/${originResource.attributes.resource_id}`
  )

  return (
    <Row>
      <Col sm={6}><iframe title="Sample" width="550" height="375" src={urlEmbed()}></iframe></Col>
      <Col sm={6}>
        <p className='title-video-youtube'>{target.snippet.title}</p>
        <p>Shared by: {sharedBy()}</p>
        <div className='statistic-video'>
          <p className='pr-30'>{target.statistics.likeCount} like</p>
          {/* Because of youtube API has change statistics.dislikeCount to private, just for owner of that video => i won't do this */}
          <p>0 dislike</p>
        </div>
        <div>
          <p>Description:</p>
          <p>{target.snippet.description}</p>
        </div>
      </Col>
    </Row>
  );
}

export default SharedVideo;