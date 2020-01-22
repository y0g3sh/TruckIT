import React, { Component } from 'react'
import{StatusBar} from 'react-native'
import { Container, Content, Header, Left, Button, Icon, Title, Right, Form, Label, Item, Footer, FooterTab,Body,Input,Text,StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

export default class ManagerLogin extends Component {
    render() {
        return (
            <StyleProvider style={getTheme(material)}>
            <Container>
                <Content>
                
                    <Header span style={{backgroundColor:'#00BCD4'}}>
                    <StatusBar backgroundColor="#0097A7"/>
                        <Left>
                            <Button transparent onPress={()=>this.props.navigation.goBack()}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Manager</Title>
                        </Body>
                        <Right />

                    </Header>

                    <Form>
                        <Item floatingLabel>
                        <Label>Username</Label>
                            <Input  />
                        </Item>
                        <Item floatingLabel last>
                        <Label>Password</Label>
                            <Input  />
                        </Item>
                        <Button full style={{margin:20,borderRadius:20}} danger>
                            <Text>Login</Text>
                        </Button>
                    </Form>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full style={{backgroundColor:'#03A9F4'}}><Text style={{color:'#fff',fontWeight:'bold'}} onPress={()=>this.props.navigation.navigate('Signup')}>Dont have an account?</Text></Button>
                    </FooterTab>

                </Footer>
            </Container>
            </StyleProvider>
        )
    }
}
