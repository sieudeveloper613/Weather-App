import React, { Component } from 'react'
import { View, 
         Text, 
         TextInput, 
         TouchableOpacity,
         ImageBackground,
         KeyboardAvoidingView, 
         ActivityIndicator,
         StatusBar,
         StyleSheet, 
         Platform } from 'react-native'

// import other components
import SearchInput from '../components/SearchInput'

// import utils
import { fetchLocationId, fetchWeather } from '../utils/api'
import getImageForWeather from '../utils/getImageForWeather'



export default class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false, // to show a loading icon
      error: false, // store the error message if a call fails or return unsable information
      location: '', // retreive location from the API
      temperature: 0, // retreive temperature from the API
      weather: '', // retreive weather info from API
    }
  }

  componentDidMount(){
    this.handleUpdateLocation('San Francisco');
  }

  handleUpdateLocation = async city => {
    if(!city) return;

    this.setState({ loading: true }, async () => {
      try {
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(locationId,);

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature,
        });
      }catch (e){
        this.setState({
          loading: false,
          error: true
        });
      }
    });
  }
  render(){
    const { loading, error, location, weather, temperature } = this.state;
    return(
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <StatusBar 
          barStyle='light-content' // change the color of the text within the bar
        />
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer} //styling the View container
          imageStyle={styles.image} // styling the image itself
        > 

        <View style={styles.detailContainer}>
          <ActivityIndicator animating={loading} color='white' size='large' />
          {
            !loading && (
              <View>
                { error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try a different city.
                  </Text>     
                )}

                { !error && (
                  <View>
                  <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
                  <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
                  <Text style={[styles.largeText, styles.textStyle]}>
                  {`${Math.round(temperature)}°`}</Text>
                  </View>
                )}

                <SearchInput placeholder='Search any city'
                             onSubmit={this.handleUpdateLocation} 
                             // handle event when user typing and submiting something
                />
              </View>
            )
          }

        </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    // ...Platform.select({
    //   ios: {
    //     fontFamily: 'AvenirNext-Regular',
    //   },
    //   android: {
    //     fontFamily: 'Roboto',
    //   },
    // }),
    color: 'white'
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  imageContainer:{
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover' //atribute allows us define how the image is resized when the Image element does not match its actual dimensions
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  }

})