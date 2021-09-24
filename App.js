import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';


const Stack = createNativeStackNavigator();
const gloabalScreenOptions = {
  headerStyle : {backgroundColor : "#2C6BED"} , 
  headerTitleStyle : {color : 'white'} ,
  headerTintColor : "white",
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={gloabalScreenOptions}>
    
      <Stack.Screen name='Login' component={ Login}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
