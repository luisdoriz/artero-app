import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableHighlight, Alert, AsyncStorage } from 'react-native';

import { postAppointment } from '../../data/appointment';

const initialState = {
  systolicPressure: undefined,
  diastolicPressure: undefined,
  wheight: undefined,
  loading: false,
}
class RegisterView extends Component {
  constructor(props) {
    super(props)

    this.state = initialState;
  }

  getToken = async () => (await AsyncStorage.getItem('tkn'));

  submitAppointment = async () => {
    const { navigation } = this.props;
    const { id } = navigation.state.params;
    const {
      systolicPressure,
      diastolicPressure,
      wheight,
    } = this.state;
    this.setState({ loading: true });
    if (diastolicPressure === undefined || systolicPressure === undefined || wheight === undefined) {
      Alert.alert(
        'Error',
        'Debe de completar todos los campos',
        [
          { text: 'Entendido' },
        ],
        { cancelable: false },
      );
    } else {

      const data = {
        systolicPressure,
        diastolicPressure,
        wheight,
        patientId: id,
      };
      const token = await this.getToken();
      console.log(token);

      const response = await postAppointment(token, data);
      console.log(response);
      if (response) {
        navigation.navigate(
          'Diagnosis',
          {
            diagnosis: response,
          }
        )
        Alert.alert(
          'Listo',
          'Se registro con éxito',
          [
            {text: 'Entendido'},
          ],
          {cancelable: false},
        );
      } else {
        Alert.alert(
          'Error',
          'Ocurrió un error al querer guardar el registro',
          [
            { text: 'Entendido' },
          ],
          { cancelable: false },
        );
      }
    }
    this.setState({ loading: false });
  }

  render() {
    const {
      systolicPressure,
      diastolicPressure,
      loading,
      wheight,
    } = this.state;
    return (
      <View style={{ padding: '2%' }}>
        <Text style={styles.text}>Diagnóstico</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Presión Sistólica"
          keyboardType={'numeric'}
          underlineColorAndroid={
            '#333333'
          }
          onChangeText={text => this.setState({ systolicPressure: text })}
          value={systolicPressure}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Presión Diastólica"
          keyboardType={'numeric'}
          underlineColorAndroid={
            '#333333'
          }
          onChangeText={text => this.setState({ diastolicPressure: text })}
          value={diastolicPressure}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Peso (kg)"
          keyboardType={'numeric'}
          underlineColorAndroid={
            '#333333'
          }
          onChangeText={text => this.setState({ wheight: text })}
          value={wheight}
        />
        <TouchableHighlight onPress={
          () => { if (!loading) this.submitAppointment() }
        } style={{ width: '90%', alignSelf: 'center', borderRadius: 12, }} >
          <Text style={styles.button}> Terminar </Text>
        </TouchableHighlight>

      </View>
    )
  }
}

export default RegisterView;

const styles = StyleSheet.create({
  text: {
    color: '#333333',
    alignSelf: 'center',
    marginBottom: 50,
    fontSize: 50
  },
  textInput: {
    height: 40,
    paddingLeft: 6,
    marginBottom: 50,
    width: '90%',
    color: '#333333',
    alignSelf: "center",
  },
  button: {
    backgroundColor: '#333333',
    borderColor: '#fff500',
    borderWidth: 1,
    borderRadius: 12,
    color: '#fff500',
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
  }
});


