import React from 'react';
import { View, Button } from 'react-native';
import notifee, { AndroidBadgeIconType,AndroidImportance } from '@notifee/react-native';
import useFCM from './src/hooks/useFCM';
import remoteNotifications from './src/services/notifications/remoteNotifications';
import localNotifications  from './src/services/notifications/localNotifications';

function App() {


  const {
    requestPermission: acquireNotificationPermission,
    register: requestNotificationToken,
  } = useFCM();

  const onMessageReceived = async message => {
    await remoteNotifications.generic(message);
  };
  React.useEffect( async () => {
    await acquireNotificationPermission();
    await requestNotificationToken();
    const unsubscribe = messaging().onMessage(onMessageReceived);

    return unsubscribe;
  }, []);

 

  const displayLocalNotification = () => {
    localNotifications.welcome()
  }



  

  return (
    <View>
      <Button title="Display Notification" onPress={displayLocalNotification} />
    </View>
  );
}
export default App