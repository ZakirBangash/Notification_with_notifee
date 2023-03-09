import notifee from '@notifee/react-native';

import _ from 'lodash';
import {CHANNELS} from './constants';

export const createNotificationChannels = async () => {
  await notifee.createChannels(_.values(CHANNELS));
};
