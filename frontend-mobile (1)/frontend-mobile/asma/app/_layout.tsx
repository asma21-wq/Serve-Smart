import { Stack,Redirect  } from "expo-router";
import { LogBox } from "react-native";
import { Provider } from 'react-redux';
import { store } from '../redux/store';

LogBox.ignoreAllLogs(true);

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" 
        options={{
          headerShown:false,}}/>
        <Stack.Screen name="(tabs)" 
        options={{
          headerShown:false,}}/>
         
        <Stack.Screen name="not-found" options={{}}/>

      </Stack>
    </Provider>
  );
}
