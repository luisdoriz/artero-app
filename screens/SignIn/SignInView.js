import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableHighlight, Alert, ToastAndroid, AsyncStorage } from 'react-native'
import { loginUser } from '../../data/user';

const initialState = {
  email: undefined,
  password: undefined,
  loading: false,
}
class SignInView extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  submitForm = async () => {
    this.setState({ loading: true })
    const { email, password } = this.state;
    const data = {
      email, password
    };
    const response = await loginUser(data);
    if (response) {
      await AsyncStorage.setItem('tkn', response.token);
      this.props.updateToken(response.token);
      ToastAndroid.show('Inicio sesion de manera correcta', ToastAndroid.SHORT);
      this.setState({ loading: false })
    } else {
      ToastAndroid.show('No se pudo iniciar sesion con esos datos, favor de verificar.', ToastAndroid.SHORT);
      this.setState({ loading: false })
    }
  }

  validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({ email: text, emailValidate: true });
    }
    else {
      this.setState({ email: text, emailValidate: false });
    }
  }

  render() {
    const {
      password,
      email,
      loading,
      emailValidate,
    } = this.state;
    return (
      <View style={styles.view}>
        <Text style={styles.text}> Inica Sesion </Text>
        {emailValidate && <Text style={{ color: 'red', marginLeft: '8%' }}>El correo no es valido</Text>}
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          underlineColorAndroid={
            '#0077B6'
          }
          onChangeText={text => this.validate(text)}
          value={email}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Contraseña"
          type="password"
          secureTextEntry={true} 
          underlineColorAndroid={
            '#0077B6'
          }
          onChangeText={text => this.setState({ password: text })}
          value={password}
        />
        <TouchableHighlight onPress={
          () => { if (!loading) this.submitForm() }
        } style={{ width: '90%', alignSelf: 'center', borderRadius: 12, }} >
          <Text style={styles.button}> Iniciar Sesion </Text>
        </TouchableHighlight>

      </View>
    )
  }
}

export default SignInView;


const styles = StyleSheet.create({
  view: {
    padding: '2%',
  },
  text: {
    color: '#0077B6',
    alignSelf: 'center',
    fontSize: 50
  },
  textInput: {
    height: 40,
    paddingLeft: 6,
    marginBottom: 50,
    width: '90%',
    color: '#0077B6',
    alignSelf: "center",
  },
  button: {
    backgroundColor: 'white',
    borderColor: '#0077B6',
    borderWidth: 1,
    borderRadius: 12,
    color: '#0077B6',
    marginBottom: 30,
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
  },
  textButton: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
});
