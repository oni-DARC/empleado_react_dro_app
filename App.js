// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa las pantallas
import WelcomeScreen from './src/screens/WelcomeScreen';
import EmployeeListScreen from './src/screens/EmployeeListScreen';
import EmployeeDetailScreen from './src/screens/EmployeeDetailScreen';
import AddEditEmployeeScreen from './src/screens/AddEditEmployeeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EmployeeList" component={EmployeeListScreen} options={{ title: 'Lista de Empleados' }} />
        <Stack.Screen name="EmployeeDetail" component={EmployeeDetailScreen} options={{ title: 'Detalle del Empleado' }} />
        <Stack.Screen name="AddEditEmployee" component={AddEditEmployeeScreen} options={{ title: 'Agregar/Editar Empleado' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
