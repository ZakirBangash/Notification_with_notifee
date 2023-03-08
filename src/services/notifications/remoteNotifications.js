import notifee from '@notifee/react-native';
import {CHANNELS} from './constants';

const remoteNotifications = {
  generic: async ({notification}) => {
    const {title, body} = notification;
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: CHANNELS.general.id,
        pressAction: {
          id: 'default',
        },
        autoCancel: true,
      },
    });
  },
};

export default remoteNotifications;
