import React from 'react';
import { Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';

export default class RotatingEarth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start();
  }

  render() {
    return (
      <LottieView style={{backgroundColor:'#2196F3',width:'100%'}} source={require('../assets/animations/1055-world-locations.json')} 
      loop={true} autoSize autoPlay={true}
      />
    );
  }
}