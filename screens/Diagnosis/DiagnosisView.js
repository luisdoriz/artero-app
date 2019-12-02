import React, { Component } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native'
import { getAppointment } from '../../data/appointment';

class DiagnosticView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      diagnosis: {},
    }
  }

  componentDidMount() {
    this.fetchDiagnosis();
  }
	getToken = async () => (await AsyncStorage.getItem('tkn'));

  fetchDiagnosis = async () => {
    const { diagnosis } = this.props.navigation.state.params;
    const token = await this.getToken();
    const response = await getAppointment(token, diagnosis.appointment._id);
    if (response) {
      this.setState({ diagnosis: response, loading: false });
    }
  }

  render() {
    const { loading, diagnosis } = this.state;
    if (loading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>);
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Indice de masa corporal: {Math.round(diagnosis.icm * 100) / 100}</Text>
    <Text style={styles.text}>Hipertensión: {diagnosis.hipertension}</Text>
  <Text style={styles.text}>Riesgo Cardiovascular: {diagnosis.cr}%</Text>
        {diagnosis.medicines.length ? (
          <View>
            <Text style={styles.text}>Medicinas:</Text>
            {diagnosis.medicines.map((med) => (<Text key={med} style={styles.text}>- {med.medicine.name}</Text>))}
          </View>) :
          (<Text style={styles.text}>Recomendaciones: Caminar 30 min diarios, no fumar, dieta dash</Text>)
        }
      </View>
    )
  }
}

export default DiagnosticView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 10

  },
  horizontal: {
    // flexDirection: 'col',
    // justifyContent: 'center',
  },
  text: {
    color: '#0077B6',
    fontSize: 25,
    marginTop: 5,
  },
});
