import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css'
import { IOriginalResourceRes } from '../../../interfaces/resource.interface';
import { IMemberRes } from '../../../interfaces/member.interface';
import { IYtResourceItem } from '../../../interfaces/youtube-resource.interface';

type Props = {
  originResource: IOriginalResourceRes;
  members: IMemberRes[];
  resources: IYtResourceItem[];
}

function SharedVideo({ originResource, members, resources }: Props) {
  const target: IYtResourceItem | undefined = resources.find((resource: IYtResourceItem) => (resource.id === originResource.attributes.resource_id))
  if(!target) return null

  const sharedBy = () => {
    if (members.length === 0) return null;
    const memberMatching = members.find((member: IMemberRes) => member.id === originResource.relationships.user.data.id);

    if (memberMatching) return memberMatching.attributes.email;
  }

  const urlEmbed = () => (
    `https://www.youtube.com/embed/${originResource.attributes.resource_id}`
  )

  return (
    <Row>
      <Col sm={6}><iframe title="Sample" width="550" height="375" src={urlEmbed()}></iframe></Col>
      <Col sm={6}>
        <p className='title-video-youtube'>{target.snippet.title}</p>
        <p>Shared by: {sharedBy()}</p>
        <div>
          <p>Description:</p>
          <p>{target.snippet.description}</p>
        </div>
      </Col>
    </Row>
  );
}

export default SharedVideo;