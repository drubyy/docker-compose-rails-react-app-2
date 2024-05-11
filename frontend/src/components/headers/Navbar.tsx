import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import { isUserLoggedIn, currentUser } from '../../utils/manageAuthentication'
import { performLogout } from '../../services/authServices'
import { Button } from 'antd'
import ModalShare from '../others/modalShare/ModalShare'
import { submitShare } from '../../services/shareService'
import './style.css'

type Props = {
  showLink: boolean;
  triggerFetchVideos?: number;
  setTriggerFetchVideos?: React.Dispatch<React.SetStateAction<number>>;
  pushNotifyNewVideoShared?: Function;
}

function Navbar({ showLink, triggerFetchVideos, setTriggerFetchVideos, pushNotifyNewVideoShared = () => {} }: Props) {
  const [visibleModalShare, setVisibleModalShare] = useState(false)

  const currentUserOrLink = () => {
    if(isUserLoggedIn) {
      return (
        <div className='wrapper-user-infor'>
          <span>Welcome {currentUser.email}</span>
          <Button onClick={() => {setVisibleModalShare(true)}}>Share a movie</Button>
          <Button onClick={performLogout}>Logout</Button>
        </div>
      )
    }else{
      return (
        <span className='wrapper-link-navbar'>
          <a href='/register'>Sign up</a> / <a href='/login'>Sign in</a>
        </span>
      )
    }
  }

  return (
    <div className='navbar-default-wrapper'>
      <Col sm={10} className="navbar">
        <a href='/'>ShareTube</a>
        {
          showLink && currentUserOrLink()
        }
      </Col>
      <hr className='breakline-navbar' />
      <ModalShare
        isVisible={visibleModalShare}
        setVisible={setVisibleModalShare}
        triggerFetchVideos={triggerFetchVideos}
        setTriggerFetchVideos={setTriggerFetchVideos}
        callBackOk={submitShare}
        pushNotifyNewVideoShared={pushNotifyNewVideoShared}
      />
    </div>
  );
}

export default Navbar;