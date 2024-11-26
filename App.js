import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Hero from './src/screens/Hero';
import Login from './src/screens/Login';
import Formulario from './src/screens/Formulario';
import MyReports from './src/screens/MyReports';
import AboutUs from './src/screens/AboutUs';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Hero" component={Hero} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Formulario" component={Formulario} />
        <Stack.Screen name="MyReports" component={MyReports} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
