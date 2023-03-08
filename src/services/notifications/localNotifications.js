import notifee from '@notifee/react-native';
import {CHANNELS} from './constants';

const localNotifications = {
  welcome: async () => {
    await notifee.displayNotification({
      title: 'Welcome to Quarter Goal',
      body: 'Learning Notifications with Notifee!',
      android: {
        channelId: CHANNELS.general.id,
        pressAction: {
          id: 'default',
        },
        localOnly: true,
        onlyAlertOnce: true,
        autoCancel: true,
      },
    });
  },
};

export default localNotifications;
