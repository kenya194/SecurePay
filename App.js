import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/login';
import Welcomescreen from "./screens/welcomescreen";
import SignUp from "./screens/signup";
import Home from "./screens/home";
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';


import { initializeFirebase } from "./config/firebase";
 

const Stack = createNativeStackNavigator();

export default function App() {
  initializeFirebase();

  const [user, setUser] = useState(null);
     
    useEffect(() =>{
      const unsub = onAuthStateChanged(auth, user=>{
        console.log('got user: ', user);
        if(user){
          setUser(user);
        }else{
          setUser(null);
        }
      });
      return unsub;
    }, [])


  if (user){
    return (
      <NavigationContainer>
    <Stack.Navigator initialRouteName="login" screenOptions={{headerShown:false}}>
      <Stack.Screen name="login" options={{headerShown:false}} component={Home}/>
    </Stack.Navigator>
  </NavigationContainer>
    );
  }else{
    return(
      <NavigationContainer>
    <Stack.Navigator initialRouteName="welcomescreen" screenOptions={{headerShown:false}}>
      <Stack.Screen name="welcomescreen" options={{headerShown:false}} component={Welcomescreen}/>
      <Stack.Screen name="login" options={{headerShown:false}} component={HomeScreen}/>
      <Stack.Screen name="signup" options={{headerShown:false}} component={SignUp}/>
      <Stack.Screen name="home" options={{headerShown:false}} component={Home}/>
    </Stack.Navigator>
  </NavigationContainer>
    )
  }
}
