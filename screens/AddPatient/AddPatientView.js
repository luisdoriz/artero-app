import React, { Component } from 'react'
import { Text, View, Button, TextInput, StyleSheet, TouchableHighlight } from 'react-native'
import DatePicker from 'react-native-datepicker';

const initialState = {
  name: undefined,
  birthday: '2019-01-01',
  email: undefined,
  wheight: undefined,
}
class AddPatientView extends Component {
  constructor(props) {
    super(props)

    this.state = initialState;
  }

  changeDate = (date) => {
    this.setState({ name: date });
    console.log(date);
  }

  render() {
    const { navigation } = this.props;
    const {
      name,
      wheight,
      birthday,
    } = this.props;
    console.log(birthday)
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
          value={name}
        />
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
            onDateChange={(date) => this.changeDate(date)}
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

        <TouchableHighlight onPress={
          () => console.log('Patients')
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
