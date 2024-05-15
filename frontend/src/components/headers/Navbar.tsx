import React, { useState } from 'react';
import { Navbar as BootstrapNavbar, Container } from 'react-bootstrap';
import { isUserLoggedIn, currentUser } from '../../utils/manageAuthentication';
import { performLogout } from '../../services/authServices';
import { Menu, Dropdown, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import ModalShare from '../others/modalShare/ModalShare';
import { submitShare } from '../../services/shareService';
import './style.css';

type Props = {
  showLink: boolean;
  triggerFetchVideos?: number;
  setTriggerFetchVideos?: React.Dispatch<React.SetStateAction<number>>;
  pushNotifyNewVideoShared?: Function;
};

function Navbar({ showLink, triggerFetchVideos, setTriggerFetchVideos, pushNotifyNewVideoShared = () => {} }: Props) {
  const [visibleModalShare, setVisibleModalShare] = useState(false);

  const loggedInMenu = (
    <Menu>
      <Menu.Item key="0" onClick={() => setVisibleModalShare(true)}>
        Share a movie
      </Menu.Item>
      <Menu.Item key="1" onClick={performLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={() => { location.href = "/register" }}>
        Sign up
      </Menu.Item>
      <Menu.Item key="1" onClick={() => { location.href = "/login" }}>
        Sign in
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navbar-default-wrapper">
      <BootstrapNavbar bg="light" className="p-3">
        <Container fluid className="d-flex justify-content-between align-items-center">
          <div className="flex flex-col">
            <BootstrapNavbar.Brand href="/" className="site-name">ShareTube</BootstrapNavbar.Brand>
            {isUserLoggedIn && <span className="user-email-mobile">Welcome {currentUser.email}</span>}
          </div>
          <div className="d-flex align-items-center flex-justify-end">
            {isUserLoggedIn && <span className="user-email">Welcome {currentUser.email}</span>}
            <Dropdown overlay={isUserLoggedIn ? loggedInMenu : menu} trigger={['click']} className="lg:hidden">
              <Button icon={<MenuOutlined />} />
            </Dropdown>
          </div>
        </Container>
      </BootstrapNavbar>
      <hr className="w-full" />
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
