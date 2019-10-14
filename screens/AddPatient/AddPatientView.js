import React, { Component } from 'react'
import { Text, View, Picker, TextInput, StyleSheet, TouchableHighlight, Alert, ToastAndroid } from 'react-native'
import DatePicker from 'react-native-datepicker';
import { addPatient } from '../../data/patients';

const initialState = {
  name: undefined,
  birthday: undefined,
  email: undefined,
  wheight: undefined,
  height: undefined,
  sex: 0,
  loading: false,
}
class AddPatientView extends Component {
  constructor(props) {
    super(props)

    this.state = initialState;
  }


  submitPatient = async () => {
    const { navigation } = this.props;
    const {
      name,
      wheight,
      birthday,
      email,
      height,
      sex,
      loading,
    } = this.state;
    this.setState({loading: true});
    if (name === undefined || wheight === undefined || height === undefined || email === undefined || birthday === undefined) {
      Alert.alert(
        'Error',
        'Debe de completar todos los campos',
        [
          {text: 'Entendido'},
        ],
        {cancelable: false},
      );
    } else {

    const data = {
      name,
      wheight,
      birthday,
      email,
      height,
      sex,
    };
    
    const response = await addPatient('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTU0ODRhZmVhOTM0NjE3MGJkYmYwMiIsIm5hbWUiOiJMdWlzIERvcml6IiwiaWF0IjoxNTcxMDI4MzQzfQ.mnNI2rW_jRx4vqpPrcvsjZKuUZqgC4rr7HdGGDKCnCI', data);
    if (response.doctorProfile !== undefined) {
      ToastAndroid.show('Se agregon exito el paciente', ToastAndroid.SHORT);
      navigation.goBack();
    } else {
      Alert.alert(
        'Error',
        'Este paciente ya le pertenece',
        [
          {text: 'Entendido'},
        ],
        {cancelable: false},
      );
    }
  }
  this.setState({loading: false});
  }

  render() {
    const {
      name,
      wheight,
      birthday,
      email,
      height,
      sex,
      loading,
    } = this.state;
    return (
      <View>
        <Text> AddPatientView </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nombre"
          underlineColorAndroid={
            '#D3D3D3'
          }
          onChangeText={text => this.setState({ name: text })}
          value={name}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          underlineColorAndroid={
            '#D3D3D3'
          }
          onChangeText={text => this.setState({ email: text })}
          value={email}
        />
        <Picker
          selectedValue={sex}
          style={{ height: 50, width: '90%', alignSelf: 'center' }}
          onValueChange={(itemValue) =>
            this.setState({ sex: itemValue })
          }>
          <Picker.Item label="Femenino" value="0" />
          <Picker.Item label="Masculino" value="1" />
        </Picker>
        <View
          style={{ alignSelf: 'center', width: '90%', alignContent: 'center' }}
        >
          <DatePicker
            style={{ width: 200 }}
            date={birthday}
            mode="date"
            placeholder="Fecha de nacimiento"
            format="YYYY-MM-DD"
            minDate="1930-01-01"
            maxDate="2019-01-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => this.setState({ birthday: date })}
          />
        </View>

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

        <TextInput
          style={styles.textInput}
          placeholder="Altura (m)"
          keyboardType={'numeric'}
          underlineColorAndroid={
            '#D3D3D3'
          }
          onChangeText={text => this.setState({ height: text })}
          value={height}
        />

        <TouchableHighlight onPress={
          () => {if (!loading) this.submitPatient()}
        } style={{ width: '90%', alignSelf: 'center', borderRadius: 12, }} >
          <Text style={styles.button}> AddPatientView </Text>
        </TouchableHighlight>

      </View>
    )
  }
}

export default AddPatientView;


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
