import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Hero from './src/screens/Hero';
import Login from './src/screens/Login';
import Task from './src/screens/Task'; // Importe a nova tela Task
import Formulario from './src/screens/Formulario';
import MyReports from './src/screens/MyReports';
import AboutUs from './src/screens/AboutUs';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Hero">
        {/* Tela inicial Hero */}
        <Stack.Screen
          name="Hero"
          component={Hero}
          options={{ headerShown: false }}
        />

        {/* Tela de Login */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        {/* Nova Tela Task */}
        <Stack.Screen
          name="Task"
          component={Task}
          options={{
            headerShown: false, // Oculta o cabeçalho para manter o design clean
          }}
        />

        {/* Tela de Formulário */}
        <Stack.Screen
          name="Formulario"
          component={Formulario}
          options={{
            title: 'Nova Denúncia', // Adiciona um título ao cabeçalho
            headerStyle: {
              backgroundColor: '#6A9E6A', // Cor do cabeçalho
            },
            headerTintColor: '#FFF', // Cor do texto do cabeçalho
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        {/* Tela de Denúncias (MyReports) */}
        <Stack.Screen
          name="MyReports"
          component={MyReports}
          options={{
            title: 'Minhas Denúncias',
            headerStyle: {
              backgroundColor: '#6A9E6A',
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        {/* Tela Sobre Nós */}
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{
            title: 'Sobre Nós',
            headerStyle: {
              backgroundColor: '#6A9E6A',
            },
            headerTintColor: '#FFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
