import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import screens here
import ReviewScreen from './Review'
import MainScreen from './Main'
// declare stack
const Stack = createNativeStackNavigator();

export default class Navigation extends Component{
  constructor(){
    super()
  }

  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName = 'Review'>
          <Stack.Screen name = 'Review' component = {ReviewScreen}/>
          <Stack.Screen name = 'Main' component = {MainScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
