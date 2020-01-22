import React, { Component } from 'react'
import { Text, Share, StyleSheet } from 'react-native'
import { Container, Content } from 'native-base';
import firebase from 'react-native-firebase';
import reactotron from 'reactotron-react-native';
import { Button } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

 class Firebase_Databse extends Component {
    state = {
        user_key: null,
        managerName: [],
        userName:''
    }

    componentDidMount() {
        this._retrieveData();
    }
    storeData = async (user_key) => {
        try {
          await AsyncStorage.setItem('key', user_key)
        } catch (e) {
          reactotron.log(e)
        }
      }
    _retrieveData = () => {
        const user_key = firebase.database().ref('Driver/').push({
            assigned: 0,
        }).key;
      this._getUserDetails();
        this.setState({ user_key }, () => {
            reactotron.log("user_key:" + this.state.user_key)
            this.storeData(this.state.user_key)
        })
    }
    _getUserDetails = async()=>{
        var user = firebase.auth().currentUser;
        this.setState({userName:user.displayName})
    }

    _shareKey = async () => {
        try {
            const result = await Share.share({
                message:
                    `Your Drivers Code Is ${this.state.key}`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    _checkAssigned = () => {
        firebase.database().ref(`Driver/${this.state.user_key}`).on('value', (data) => {
            this.setState({ managerName: data.val() }, () => {
                reactotron.log(JSON.stringify(this.state.managerName))
            })
            try{
                if (this.state.managerName.assigned) {
                    this.props.navigation.navigate('DriverDetails',{
                        key:this.state.user_key
                    })
                 }
                 else {
                     alert('wait for your manager to enter your token')
                 }
            }
            catch(e){
                alert(e)
            }
          

        });
    }
    render() {
        return (
            <Container>
                <Content style={styles.container}>
                    <Text style={styles.welcomeText}>
                        welcome {this.state.userName}
                    </Text>
                    <Button style={styles.button} icon="share" color="" mode="Text button" onPress={this._shareKey}>
                        <Text style={styles.buttonText}>Share your code</Text>
                    </Button>

                    <Button style={styles.button} icon="check-box" color="" mode="Text button" onPress={this._checkAssigned}>
                        <Text style={styles.buttonText}>Check</Text>
                    </Button>

                </Content>

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingTop:50
    },
    button: {
        marginTop: 20,
    },
    welcomeText:{
        textAlign: 'center',
        fontSize:20,
        marginTop:20
    },
    buttonText:{
        fontSize:20
    }
})
export default withNavigation(Firebase_Databse)