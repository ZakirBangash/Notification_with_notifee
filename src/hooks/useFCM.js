import notifee, {AuthorizationStatus} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

import {saveFCMRemote} from '../services/api';
import {createNotificationChannels} from '../services/notifications/utils';
import {saveFCMLocalStorage} from '../utils/utils';

const useFCM = () => {
  const acquireNotificationPermission = async () => {
    // request permission is needed for ios
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
      console.info('User denied permissions request');
    } else if (
      settings.authorizationStatus === AuthorizationStatus.AUTHORIZED
    ) {
      console.info('User granted permissions request');
      // channeles is only android specific
      if (Platform.OS === 'android') {
        await createNotificationChannels();
      }
    } else if (
      settings.authorizationStatus === AuthorizationStatus.PROVISIONAL
    ) {
      console.info('User provisionally granted permissions request');
    }
  };

  const requestNotificationToken = async () => {
    const isRegistered = messaging().isDeviceRegisteredForRemoteMessages;

    if (!isRegistered) {
      await messaging().registerDeviceForRemoteMessages();
    }

    const token = await messaging().getToken();
    await saveFCMLocalStorage(token);
    await saveFCMRemote(token);
  };

  return {
    isRegistered: messaging().isDeviceRegisteredForRemoteMessages,
    register: requestNotificationToken,
    requestPermission: acquireNotificationPermission,
  };
};

export default useFCM;
