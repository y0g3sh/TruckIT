import React, { Component } from 'react'
import { Text, View } from 'react-native'
import DriverScreen from './DriverScreen';
import BottomNavigationBar from './BottomNavigationBar';
import { Container, Content } from 'native-base';
import { withNavigation } from 'react-navigation';

 class DriverScreenLayout extends Component {
  render() {
    return (
      <Container>

 <BottomNavigationBar />   

      </Container>
    )
  }
}
export default withNavigation(DriverScreenLayout)