import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import AppNavigation from './navigation/AppNavigation';
import SignIn from './screens/SignIn';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      token: undefined,
    }
  }
  componentDidMount() {
    this.getToken();
  }

  token = async () => (await AsyncStorage.getItem('tkn'));
  getToken = () => (
    this.token().then((token => this.setState({ token })))
  )
  render() {
    const { token } = this.state;
    console.log(token);
    if (token) {
      return <AppNavigation />
    }
    return (
      <SignIn updateToken={(e) => this.setState({ token: e })} />
    )
  }
}
