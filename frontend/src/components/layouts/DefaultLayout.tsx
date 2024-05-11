import React, { ReactNode } from 'react';
import Navbar from '../headers/Navbar';
import Container from 'react-bootstrap/Container';

type Props = {
  childComponent: ReactNode;
  showLink?: boolean;
  triggerFetchVideos?: number;
  setTriggerFetchVideos?: React.Dispatch<React.SetStateAction<number>>;
}

function DefaultLayout({ childComponent, showLink=true, triggerFetchVideos, setTriggerFetchVideos }: Props) {
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