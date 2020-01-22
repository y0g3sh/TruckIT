import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { Container, Content, Header, Left, Button, Icon, Title, Right, Form, Label, Item, Body, Input, Text} from 'native-base';
import firebase from 'react-native-firebase';

export default class Signup extends Component {
    state = {
        email: '',
        pass: '',
        errorMessage: null
    }

    _signUp = () => {
        if (this.state.email === '' || this.state.pass === '') {
            alert('Please enter both email and pass')
        }
        else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.pass)
                .then(user => this.props.navigation.navigate('driverScreen'))
                .catch(error => alert(error))
        }
    }
    render() {
        return (
            <Container>
                <Header span style={{ backgroundColor: '#00897b' }}>
                    <StatusBar backgroundColor="#00695c" />
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Signup</Title>
                    </Body>
                    <Right />

                </Header>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input onChangeText={email => this.setState({ email })} />
                        </Item>
                        <Item floatingLabel >
                            <Label>Password</Label>
                            <Input onChangeText={pass => this.setState({ pass })} />
                        </Item>
                        <Button full style={{ margin: 20, borderRadius: 20 }} danger onPress={this._signUp}>
                            <Text>Singup</Text>
                            {this.state.errorMessage &&
                                <Text style={{ color: 'red' }}>
                                    {this.state.errorMessage}
                                </Text>}
                        </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}
