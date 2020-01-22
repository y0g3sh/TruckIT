import React, { Component } from 'react'
import { StatusBar, Text, StyleSheet } from 'react-native'
import { Container, Content, Header, Left, Button, Icon, Title, Right, Body, List, ListItem } from 'native-base';
import firebase from 'react-native-firebase';
import reactotron from 'reactotron-react-native';

export default class DriverDetails extends Component {
    state = {
        key: null,
        userData: [],
        Name: '',
        TollCost: '',
        carnumber: '',
        destination: '',
        mobilenumber: '',
        ontrip: '',
        start: '',
        vehicleType: ''
    }
    componentDidMount() {
        const { navigation } = this.props;
        const key = navigation.getParam('key');
        this.setState({ key }, () => {
            reactotron.log('match key ' + this.state.key)
            this._retrieveData();
        })
    }
    _retrieveData = () => {
        firebase.database().ref(`Manager/rohanc/${this.state.key}`).on('value', (data) => {
            this.setState({ userData: data.val() }, () => {
                reactotron.log(JSON.stringify(this.state.userData))
                try {
                    this.setState({ Name:this.state.userData.Name,
                         TollCost:this.state.userData.TollCost,
                          carnumber:this.state.userData.carnumber, 
                          destination:this.state.userData.destination, 
                          mobilenumber:this.state.userData.mobilenumber, 
                          ontrip:this.state.userData.ontrip, 
                          vehicleType:this.state.userData.vehicleType
                         })
                } catch (e) { alert('no data yet') }
            })


        });
    }
    render() {
        return (
            <Container>
                <Content>
                    <Header span style={{ backgroundColor: '#00897b' }}>
                        <StatusBar backgroundColor="#00695c" />
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Driver Details</Title>
                        </Body>
                        <Right />

                    </Header>

                    <List>
                        <ListItem>
                            <Text style={styles.text}>Name</Text>
                            <Body />
                            <Right>
                                <Text style={styles.text}>{this.state.Name}</Text>
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.text}>Toll Cost</Text>
                            <Body />
                            <Right>
                                <Text style={styles.text}>{this.state.TollCost}</Text>
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.text}>Car Number</Text>
                            <Body />
                            <Right>
                                <Text style={styles.text}>{this.state.carnumber}</Text>
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.text}>Destination</Text>
                            <Body />
                            <Right>
                                <Text style={styles.text}>{this.state.destination}</Text>
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.text}>Mobile No</Text>
                            <Body />
                            <Right>
                                <Text style={styles.text}>{this.state.mobilenumber}</Text>
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.text}>On Trip</Text>
                            <Body />
                            <Right>
                                <Text style={styles.text}>{this.state.ontrip}</Text>
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.text}>Start</Text>
                            <Body />
                            <Right>
                                <Text style={styles.text}>{this.state.start}</Text>
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Text style={styles.text}>Vehicle Type</Text>
                            <Body />
                            <Right>
                                <Text style={styles.text}>{this.state.vehicleType}</Text>
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    text:{
        fontSize:16
    }
})