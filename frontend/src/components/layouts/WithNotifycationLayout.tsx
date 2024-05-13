import React, { ReactNode, useEffect } from 'react';
import Navbar from '../headers/Navbar';
import Container from 'react-bootstrap/Container';
import { useActionCable, useChannel } from '../../utils/helpers/useSocket';
import { notification } from 'antd';
import { currentUser, isUserLoggedIn } from '../../utils/manageAuthentication';
import { GENERAL_NOTIFICATION_CHANNEL } from '../../utils/consts/action-cable';
import { IActionCableDataReceive } from '../../interfaces/action-cable.interface';

type Props = {
  childComponent: ReactNode;
  showLink?: boolean;
  triggerFetchVideos?: number;
  setTriggerFetchVideos?: React.Dispatch<React.SetStateAction<number>>;
}

function WithNotifycationLayout({ childComponent, showLink=true, triggerFetchVideos, setTriggerFetchVideos }: Props) {
  const { actionCable } = useActionCable()
  const notificationChannel = useChannel(actionCable)

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (isUserLoggedIn) {
      notificationChannel.subscribe(
        {
          channel: GENERAL_NOTIFICATION_CHANNEL,
        },
        {
          received: (data: IActionCableDataReceive) => {
            if (data.sender === currentUser.email) return;

            switch (data.message) {
              case 'new_video_has_been_shared':
                showNotifyNewVideoShared(`New movie has been shared by ${data.sender} - ${data.data.resourceTitle}`, 'topRight');
                break;
              default:
                break;
            }
          },
          connected: () => {
            console.log('Connected')
          },
        },
      )
  
      return () => {
        notificationChannel.unsubscribe()
      }
    }
  }, [])

  const showNotifyNewVideoShared = (msg: string, placement: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight') => {
    api.info({
      message: msg,
      placement,
    });
  }

  const pushNotifyNewVideoShared = (id: number) => {
    notificationChannel.send({ type: 'new_video_has_been_shared', id })
  }

  return (
    <div className='default-layout-wrapper'>
      <Navbar showLink={showLink} triggerFetchVideos={triggerFetchVideos} setTriggerFetchVideos={setTriggerFetchVideos} pushNotifyNewVideoShared={pushNotifyNewVideoShared} />
      <div className='default-layout-body'>
        <Container>
          {childComponent}  
        </Container>
      </div>
      { contextHolder }
    </div>
  );
}

export default WithNotifycationLayout;