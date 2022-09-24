import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'



export default class Review extends Component{
  constructor(){
    super()
  }

  render(){
  const { navigate } = this.props.navigation

  return(
    <View style = {styles.container}>
      <View>
        <Text style = {styles.header}>What is the Weather App?</Text>
        <Text>Weather application that allows the user to search for any city
        and view its current forecast.</Text>
      </View>

      <View>
        <Text style = {[styles.header, styles.dimens]}>What does Weather App include?</Text>
        <Text>. Using core and custom components</Text>
        <Text>. Passing data between components</Text>
        <Text>. Handling component state</Text>
        <Text>. Handling user input</Text>
        <Text>. Applying styles to components</Text>
        <Text>. Fetching data from a remote API</Text>
      </View>
      

      <TouchableOpacity
        style = {styles.button}
        onPress = {() => navigate('Main')}>
        <Text style = {styles.buttonText}>Click to Weather App</Text>
        
      </TouchableOpacity>
    </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
  },
  dimens: {
    marginTop: 20
  },
  button: {
    width: '100%',
    backgroundColor: 'gray',
    padding: 6,
    borderRadius: 30,
    marginTop: 60
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase'
  }
})