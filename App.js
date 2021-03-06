import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {Provider} from 'react-redux';
import { AppLoading } from "expo";

import { auth } from "./firebase/config";
import { content } from "./src/navigation/AppNavigation";
import {store} from './redux/store';
import { loadApplication } from "./src/loadApplication/loadApp";
import {RegisterScreen} from "./src/screens/auth/RegisterScreen";
import {LogInScreen} from "./src/screens/auth/LogInScreen";

const Stack = createStackNavigator();

const useRoute = (isAuth) => {
  if (isAuth) {
    return content;
  }
  return (
    <Stack.Navigator>
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="LogIn" component={LogInScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
        onError={() => console.error()}
      />
    );
  }

  auth.onAuthStateChanged((user) => {
    setIsAuth(user);
  });

  const routing = useRoute(isAuth);
  return (
    <Provider store={store}>
    <NavigationContainer>
      {routing}
    </NavigationContainer>
    </Provider>
  );
}
