import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css'
import { IOriginalResourceRes } from '../../../interfaces/resource.interface';
import { IMemberRes } from '../../../interfaces/member.interface';
import { IYtResourceItem } from '../../../interfaces/youtube-resource.interface';
import { Typography } from "antd";

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
      <Col sm={6}><iframe className="video-shared" title="Sample" src={urlEmbed()}></iframe></Col>
      <Col sm={6}>
        <p className='title-video-youtube'>{target.snippet.title}</p>
        <b>Shared by: </b>{sharedBy()}<br/>
        <b>Description: </b>
        <Typography.Paragraph ellipsis={{ rows: 5, expandable: 'collapsible', symbol: ((expanded: boolean) => expanded ? 'Show less' : 'Show more') }}>
          {target.snippet.description}
        </Typography.Paragraph>
      </Col>
    </Row>
  );
}

export default SharedVideo;