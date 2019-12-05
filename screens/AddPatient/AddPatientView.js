import React, { Component } from 'react'
import { Text, View, Picker, TextInput, StyleSheet, TouchableHighlight, Alert, ScrollView, AsyncStorage } from 'react-native'
import { CheckBox } from 'react-native-elements'

import DatePicker from 'react-native-datepicker';
import { addPatient } from '../../data/patients';

const initialState = {
  name: undefined,
  birthday: undefined,
  email: undefined,
  wheight: '0',
  height: '0',
  sex: 0,
  loading: false,
  smoke: false,
  bronchitis: false,
  hearthDisease: false,
  renalDisease: false,
  prostaticHyperplasia: false,
  pregnancy: false,
  hyperthyroidism: false,
  cough: false,
  venousInsufficiency: false,
  cardioInsufficiency: false,
  migraine: false,
  goutDisease: false,
  anxiety: false,
  cocaineAddiction: false,
  depression: false,
  emailValidate: false,
  diabetes: 0,
}
class AddPatientView extends Component {
  constructor(props) {
    super(props);
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
      smoke,
      bronchitis,
      hearthDisease,
      renalDisease,
      prostaticHyperplasia,
      pregnancy,
      hyperthyroidism,
      cough,
      venousInsufficiency,
      cardioInsufficiency,
      migraine,
      goutDisease,
      anxiety,
      cocaineAddiction,
      depression,
      diabetes,
      loading,
      emailValidate,
    } = this.state;
    this.setState({ loading: true });
    if (name === undefined || wheight === undefined || height === undefined || email === undefined || birthday === undefined || emailValidate) {
      if (name === undefined || wheight === undefined || height === undefined || email === undefined || birthday === undefined) {
        Alert.alert(
          'Error',
          'Debe de completar todos los campos',
          [
            { text: 'Entendido' },
          ],
          { cancelable: false },
        );
      }

    } else {

      const data = {
        name,
        wheight,
        birthday,
        email,
        height,
        sex,
        bronchitis,
        smoke,
        hearthDisease,
        renalDisease,
        prostaticHyperplasia,
        pregnancy,
        hyperthyroidism,
        cough,
        venousInsufficiency,
        cardioInsufficiency,
        migraine,
        goutDisease,
        anxiety,
        cocaineAddiction,
        depression,
        diabetes,
      };
      const token = await this.getToken();
      const response = await addPatient(token, data);
      if (response.doctorProfile !== undefined) {
        Alert.alert(
          'Listo',
          'Se agrego con éxito el paciente',
          [
            {text: 'Entendido'},
          ],
          {cancelable: false},
        );
        navigation.goBack();
      } else {
        Alert.alert(
          'Error',
          'Este paciente ya le pertenece',
          [
            { text: 'Entendido' },
          ],
          { cancelable: false },
        );
      }
    }
    this.setState({ loading: false });
  }

  changeNumber = (name, value) => {
    if (Number(value) >= 0) {
      this.setState({ [name]: value });
    }
  }
  getToken = async () => (await AsyncStorage.getItem('tkn'));

  renderCheckBox = (disease) => (
    <View key={disease.name} style={styles.horizontal}>
      <CheckBox
        style={styles.checkbox}
        title={disease.label}
        onPress={() => this.setState({ [disease.name]: !this.state[disease.name] })}
        checked={this.state[disease.name]}
      />
    </View>
  );

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
      name,
      wheight,
      birthday,
      email,
      height,
      sex,
      loading,
      diabetes,
      emailValidate,
    } = this.state;
    let pregnancyValue = null;
    if (!sex) {
      pregnancyValue = {
        name: 'pregnancy',
        label: 'Embarazo'
      };
    }
    const diseases = [
      {
        name: 'smoke',
        label: '¿Fuma?'
      },
      {
        name: 'bronchitis',
        label: 'Bronquitis'
      },
      {
        name: 'hearthDisease',
        label: 'Enfermedad cardiaca'
      },
      {
        name: 'renalDisease',
        label: 'Enfermedad renal'
      },
      {
        name: 'prostaticHyperplasia',
        label: 'Hiperplasia prostática'
      },
      pregnancyValue,
      {
        name: 'hyperthyroidism',
        label: 'Hipertiroidismo'
      },
      {
        name: 'cough',
        label: 'Tos'
      },
      {
        name: 'venousInsufficiency',
        label: 'Insuficiencia Venosa'
      },
      {
        name: 'cardioInsufficiency',
        label: 'Insuficiencia Cardiaca'
      },
      {
        name: 'migraine',
        label: 'Migraña'
      },
      {
        name: 'goutDisease',
        label: 'Gota'
      },
      {
        name: 'anxiety',
        label: 'Ansiedad'
      },
      {
        name: 'cocaineAddiction',
        label: 'Cocaína'
      },
      {
        name: 'depression',
        label: 'Depresión'
      }
    ];
    return (
      <ScrollView style={styles.view}>
        <Text style={styles.text}> Registro </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nombre"
          underlineColorAndroid={
            '#333333'
          }
          onChangeText={text => this.setState({ name: text })}
          value={name}
        />
        {emailValidate && <Text style={{ color: 'red', marginLeft: '8%' }}>El correo no es valido</Text>}
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          underlineColorAndroid={
            '#333333'
          }
          onChangeText={text => this.validate(text)}
          value={email}
        />
        <View>
        <Picker
          selectedValue={sex}
          style={{ height: 50, width: '90%', alignSelf: 'center', marginBottom: 50 }}
          onValueChange={(itemValue) =>
            this.setState({ sex: itemValue })
          }>
          <Picker.Item label="Femenino" value="0" />
          <Picker.Item label="Masculino" value="1" />
        </Picker>
        </View>
       
        <View
          style={{ alignSelf: 'center', width: '90%', alignContent: 'center', marginBottom: 50 }}
        >
          <DatePicker
            style={{ width: 200 }}
            date={birthday}
            mode="date"
            placeholder="Fecha de nacimiento"
            format="YYYY-MM-DD"
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
        <Text style={styles.label}>Peso (kg)</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Peso (kg)"
          keyboardType={'numeric'}
          underlineColorAndroid={
            '#333333'
          }
          onChangeText={text => this.changeNumber('wheight', text)}
          value={wheight}
        />
        <Text style={styles.label}>Altura (cm)</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Altura (cm)"
          keyboardType={'numeric'}
          underlineColorAndroid={
            '#333333'
          }
          onChangeText={text => this.changeNumber('height', text)}
          value={height}
        />
        <Text style={{ alignSelf: 'center', color: '#333333', fontSize: 20 }}>Diabetes</Text>
        <Picker
          selectedValue={diabetes}
          style={{ height: 50, width: '90%', alignSelf: 'center', fontSize: 20, marginBottom: 25 }}
          onValueChange={(itemValue) =>
            this.setState({ diabetes: itemValue })
          }>
          <Picker.Item label="No tiene" value="0" />
          <Picker.Item label="Tipo 1" value="1" />
          <Picker.Item label="Tipo 2" value="2" />
        </Picker>
        {diseases.map(disease => disease !=null && this.renderCheckBox(disease))}
        <TouchableHighlight onPress={
          () => { if (!loading) this.submitPatient() }
        } style={{ width: '90%', alignSelf: 'center', borderRadius: 12 }} >
          <Text style={styles.button}> Agregar Paciente </Text>
        </TouchableHighlight>

      </ScrollView>
    )
  }
}

export default AddPatientView;

const styles = StyleSheet.create({
  view: {
    padding: '2%',
  },
  checkbox: {
    alignItems: 'center',
  },
  text: {
    color: '#333333',
    alignSelf: 'center',
    fontSize: 50
  },
  label: {
    color: '#333333',
    alignSelf: 'center',
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
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  scroll: {
    margin: 10,
    height: 300,
  }
});


