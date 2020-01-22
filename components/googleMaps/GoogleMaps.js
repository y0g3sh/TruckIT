import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import RetroMapStyles from './RetroMapStyles.json';
import { Container } from 'native-base';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import reactotron from 'reactotron-react-native';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;
const GOOGLE_MAPS_APIKEY = 'AIzaSyCM4etQWYjX4QyF6EHOJK6Xc3pBCYbQHE4';
const destination_lat = 0;
const destination_long = 0;

export default class MapExample extends Component {
  constructor() {
    super();
    this.state = {
      key:null,
      destination:
      {
        latitude: destination_lat,
        longitude: destination_long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      listView:true
    };

  }
  componentDidMount() {
   
this.getData()
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('key')
      if(value !== null) {
        this.setState({key:value},()=>alert(this.state.key))
      }
    } catch(e) {
     alert( '// error reading value')
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        },()=>{
          firebase.database().ref(`location/${this.state.key}`).push({
            latitude:this.state.region.latitude,
            longitude:this.state.region.longitude
        })
        });
      }

    );
  }


  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  render() {
    let origin = { latitude: this.state.region.latitude, longitude: this.state.region.longitude };
    return (

      <Container >

        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.container}
          customMapStyle={RetroMapStyles}
          showsUserLocation={true}
          region={this.state.region}
        >

          {
            this.state.destination.latitude === 0 ? null :
              <MapView.Marker
                coordinate={this.state.destination}
              />
          }

          {
            this.state.destination.latitude === 0 ? null :
              <MapViewDirections
                origin={origin}
                destination={this.state.destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={5}
                strokeColor="hotpink"
              />
          }
        </MapView>
        <Callout style={styles.calloutView}>
          <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
            listViewDisplayed={this.state.listView}    // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              reactotron.log(JSON.stringify(details, undefined, 3));
              //  alert(details.geometry.location.lng)
              this.setState({
                destination: {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                },
                listView:false
              })
              
            }}

            getDefaultValue={() => ''}

            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: GOOGLE_MAPS_APIKEY,
              language: 'en', // language of the results
              types: ["locality", "political", "geocode"] // default: 'geocode'
            }}

            styles={{
              textInputContainer: {
                width: '100%'
              },
              description: {
                fontWeight: 'bold'
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              }
            }}

            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }}
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: 'distance',
              type: 'cafe'
            }}

            GooglePlacesDetailsQuery={{
              // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
              fields: 'formatted_address',
            }}

            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            //  predefinedPlaces={[homePlace, workPlace]}

            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          //  renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
            renderRightButton={() => <Text onPress={()=>this.setState({listView:false})}>X</Text>}
          />


        </Callout>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  calloutView: {
    // flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    // borderRadius: 10,
    //  width: "100%",
    // marginLeft:'10%',
    // marginRight:'100%',
    // marginTop: 20
  },
});
AppRegistry.registerComponent('MapExample', () => MapExample);