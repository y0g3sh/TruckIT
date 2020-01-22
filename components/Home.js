import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import RotatingEarth from './RotatingEarth';
import { Container, Content, StyleProvider, Button, Text, Footer, FooterTab } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation';

 class Home extends Component {

  render() {

    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Content>
            <StatusBar backgroundColor="#1976D2" />
            <RotatingEarth />
            <Text style={{ fontSize: 30, fontWeight: 'bold', margin: 40 }}>
              Heavy Duty Vehicle Assistant
            </Text>
          </Content>
          <Footer >
            <FooterTab style={styles.buttonContainer}>
              <Animatable.View animation='bounceInRight' delay={500} style={styles.buttons}>
                <Button small style={{ backgroundColor: '#f4511e' }} onPress={() => this.props.navigation.navigate('driverLogin')}>
                  <Text style={styles.text}> Driver   </Text>
                </Button>
              </Animatable.View>
            </FooterTab>
            <FooterTab  style={styles.buttonContainer}>
              <Animatable.View animation='bounceInLeft' delay={500} style={styles.buttons}>
                <Button small style={{ backgroundColor: '#f4511e' }} onPress={() => this.props.navigation.navigate('managerLogin')}>
                  <Text style={styles.text}>Manager</Text>
                </Button>
              </Animatable.View>
            </FooterTab>
          </Footer>
        </Container>
      </StyleProvider>
    )
  }
}

const styles = StyleSheet.create({
  text:{
    fontSize: 15 , 
    color:'#fff'
  },
  buttonContainer: {
    backgroundColor: '#9575cd',
    justifyContent: 'space-evenly',
  },
  buttons: {
    color: '#e53935',
    borderRadius: 3,
    marginTop: 8,
    marginBottom: 8,
  }
})
export default withNavigation(Home)