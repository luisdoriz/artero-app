import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableHighlight, Alert, ToastAndroid } from 'react-native'
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


  submitAppointment = async () => {
    const { navigation } = this.props;
    const { id } = this.props.navigation.state.params;
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

      const response = await postAppointment('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTU0ODRhZmVhOTM0NjE3MGJkYmYwMiIsIm5hbWUiOiJMdWlzIERvcml6IiwiaWF0IjoxNTcyNTQ1Nzg5fQ.gLKYQz36_O9f9qAsu9DWM5kn6pUP0H1vEljWJQmMQsQ', data);
      console.log(response);
      console.log(data);
      if (response) {
        ToastAndroid.show('Se registro con exito', ToastAndroid.SHORT);
        navigation.goBack();
      } else {
        Alert.alert(
          'Error',
          'Ocurrio un error al querer guardar el registro',
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
      <View>
        <Text> RegisterView </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Presion sistolica"
          keyboardType={'numeric'}
          underlineColorAndroid={
            '#D3D3D3'
          }
          onChangeText={text => this.setState({ systolicPressure: text })}
          value={systolicPressure}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Presion diastolica"
          keyboardType={'numeric'}
          underlineColorAndroid={
            '#D3D3D3'
          }
          onChangeText={text => this.setState({ diastolicPressure: text })}
          value={diastolicPressure}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Peso (kg)"
          keyboardType={'numeric'}
          underlineColorAndroid={
            '#D3D3D3'
          }
          onChangeText={text => this.setState({ wheight: text })}
          value={wheight}
        />
        <TouchableHighlight onPress={
          () => { if (!loading) this.submitAppointment() }
        } style={{ width: '90%', alignSelf: 'center', borderRadius: 12, }} >
          <Text style={styles.button}> Submit </Text>
        </TouchableHighlight>

      </View>
    )
  }
}

export default RegisterView;


const styles = StyleSheet.create({
  textInput: {
    height: 40,
    paddingLeft: 6,
    marginBottom: 15,
    width: '90%',
    alignSelf: "center",
  },
  button: {
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
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
