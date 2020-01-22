import React, { Component } from 'react'
import { Text, BackHandler,Alert } from 'react-native'
import { Container, Content, Header, Tabs, Icon, Tab, TabHeading, Left, Body, Right,Button, Footer, FooterTab } from 'native-base';
import { withNavigation } from 'react-navigation';
import Firebase_Databse from './Firebase_Databse';

class DriverScreen extends Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
      }
      
      componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
      }
      onBackPress = () => {
        if (this.props.navigation.isFocused()) {
           Alert.alert(
             'Confirm exit',
             'Do you want to exit App?',
             [
               {text: 'CANCEL', style: 'cancel'},
               {text: 'OK', onPress: () => {
                 BackHandler.exitApp()
                }
              }
             ]
          );
          return true
        } 
        else {
          return false;
        }
      }
    render() {
        return (
            <Container>
               
             <Content>
             <Header span>
                    <Left>
                        <Button transparent onPress={this.onBackPress}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{fontSize:20,color:'#ffff'}}>
                            Driver Screen
                        </Text>
                    </Body>
                    <Right />
                </Header>
                <Firebase_Databse />
             </Content>

            </Container>
        )
    }
}
export default  withNavigation(DriverScreen)
