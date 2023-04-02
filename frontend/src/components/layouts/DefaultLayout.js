import React from 'react';
import Navbar from '../headers/Navbar';
import Container from 'react-bootstrap/Container';

function DefaultLayout({childComponent, showLink=true, triggerFetchVideos, setTriggerFetchVideos}) {
  return (
    <div className='default-layout-wrapper'>
      <Navbar showLink={showLink} triggerFetchVideos={triggerFetchVideos} setTriggerFetchVideos={setTriggerFetchVideos} />
      <div className='default-layout-body'>
        <Container>
          {childComponent}  
        </Container>
      </div>
    </div>
  );
}

export default DefaultLayout;