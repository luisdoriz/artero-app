import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Alert, AsyncStorage } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { putPatient } from '../../data/patients';

class PatientConditionsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      smoke: this.props.navigation.state.params.patient.smoke,
      bronchitis: this.props.navigation.state.params.patient.bronchitis,
      hearthDisease: this.props.navigation.state.params.patient.hearthDisease,
      renalDisease: this.props.navigation.state.params.patient.renalDisease,
      prostaticHyperplasia: this.props.navigation.state.params.patient.prostaticHyperplasia,
      pregnancy: this.props.navigation.state.params.patient.pregnancy,
      hyperthyroidism: this.props.navigation.state.params.patient.hyperthyroidism,
      cough: this.props.navigation.state.params.patient.cough,
      venousInsufficiency: this.props.navigation.state.params.patient.venousInsufficiency,
      cardioInsufficiency: this.props.navigation.state.params.patient.cardioInsufficiency,
      migraine: this.props.navigation.state.params.patient.migraine,
      goutDisease: this.props.navigation.state.params.patient.goutDisease,
      anxiety: this.props.navigation.state.params.patient.anxiety,
      cocaineAddiction: this.props.navigation.state.params.patient.cocaineAddiction,
      depression: this.props.navigation.state.params.patient.depression,
    };
  }

  editPatient = async (attr) => {
    const { patient } = this.props.navigation.state.params;
    const data = {
      [attr]: !this.state[attr]
    };
    const token = await this.getToken();
    const response = await putPatient(token, patient._id, data);
    if (response) {
      Alert.alert(
        'Listo',
        'Se modifico con éxito el paciente',
        [
          {text: 'Entendido'},
        ],
        {cancelable: false},
      );
    }
  }
	getToken = async () => (await AsyncStorage.getItem('tkn'));

  renderCheckBox = (disease) => (
    <View key={disease.name} style={styles.horizontal}>
      <CheckBox
        style={styles.checkbox}
        title={disease.label}
        onPress={() => {
          this.editPatient(disease.name);
          this.setState({ [disease.name]: !this.state[disease.name]
          });
        }}
        checked={this.state[disease.name]}
      />
    </View>
  );

  render() {
    const { patient } = this.props.navigation.state.params;
    let pregnancyValue = null;
    if (!patient.sex) {
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
        label: 'Insuficencia Venosa'
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
      <ScrollView>
        {diseases.map(disease => disease != null && this.renderCheckBox(disease))}

      </ScrollView>
    )
  }
}

export default PatientConditionsView;

const styles = StyleSheet.create({
  view: {
    padding: '2%',
  },
  text: {
    color: '#333333',
    alignSelf: 'center',
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
    backgroundColor: 'white',
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 12,
    color: '#333333',
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

