import React, { Component } from 'react'
import { Text, View, ActivityIndicator, StyleSheet, FlatList, ScrollView, RefreshControl, Button, AsyncStorage } from 'react-native'

import { fetchPatient } from '../../data/patients';
import { getAppointments } from '../../data/appointment';

const initialState = {
    patient: undefined,
    appointments: [],
    loading: true,
};
class PatientView extends Component {
    constructor(props) {
        super(props)
        this.state = initialState;
    }

    componentDidMount() {
        this.getPatient();
        this.fetchAppointments();
    }

    getPatient = async () => {
        const { id } = this.props.navigation.state.params;
        const token = await this.getToken();
        const response = await fetchPatient(token, id);
        if (response) {
            this.setState({ patient: response });
        }
        this.changeLoading();
    }

	getToken = async () => (await AsyncStorage.getItem('tkn'));

    fetchAppointments = async () => {
        const { id } = this.props.navigation.state.params;
        const token = await this.getToken();
        const response = await getAppointments(token, id);
        if (response) {
            this.setState({ appointments: response });
        }
    }

    navigatePatientConditions = () => {
        const { navigation } = this.props;
        const { patient } = this.state;
        navigation.navigate(
            'PatientConditions',
            {
                patient: patient,
            }
        )
    }

    getDate = (iso) => {
        date = new Date(iso);
        year = date.getFullYear();
        month = date.getMonth() + 1;
        dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return (dt + '/' + month + '/' + year);
    }

    changeLoading = () => {
        this.setState({ loading: !this.state.loading });
    }

    onRefresh = () => {
        this.changeLoading();
        setTimeout(() => {
            this.getPatient();
            this.fetchAppointments();
        }, 2000);
    };


    render() {
        const { patient, appointments, loading } = this.state;

        if (loading) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>)
        }
        return (
            <View>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={() => this.onRefresh()} />
                    }
                    style={{ width: '90%', alignSelf: 'center' }}>
                    {patient.height && (<Text style={styles.text}> Altura: {patient.height}m </Text>)}
                    {patient.sex ? (<Text style={styles.text}> Sexo: Masculino </Text>) : (<Text style={styles.text}> Sexo: Femenino </Text>)}
                    {patient.weight && (<Text style={styles.text}> Altura: {patient.weight}kg </Text>)}
                    {patient.birthday && (<Text style={styles.text}> birth: {this.getDate(patient.birthday)} </Text>)}
                    <Button title={'Condiciones'} onPress={() => this.navigatePatientConditions()} style={{ borderColor: '#fff500', backgroundColor:'#333333', color: '#fff500' }}/>
                    <Text style={styles.header}>Registros: </Text>
                    {appointments.size !== 0 && <FlatList
                        data={appointments}
                        renderItem={({ item }) => (
                            <View style={{
                                width: '90%',
                                alignSelf: 'center',
                            }}>
                                <Text style={styles.text}>{this.getDate(item.date)}</Text>
                                <View style={{
                                    alignSelf: 'center',
                                    justifyContent: 'space-between',
                                    borderRadius: 2,
                                    marginBottom: 10,
                                    padding: 15,
                                    borderWidth: 1,
                                    borderColor: '#0077B6'
                                }}>
                                    <Text style={styles.text}>Presión Sistólica   : {item.systolicPressure}</Text>
                                    <Text style={styles.text}>Presión Diastólica   : {item.diastolicPressure}</Text>
                                    <Text style={styles.text}>Peso: {item.wheight}kg</Text>
                                    <Text style={styles.text}>Indice de masa muscular: {item.icm}</Text>
                                    <Text style={styles.text}>Riesgo: {item.cr}%</Text>
                                    <Text style={styles.text}>Hipertension: {item.hipertension}</Text>
                                    {item.medicines.length ? (<Text style={styles.text}>Medicinas: {item.medicines.map(med => med.medicine.name)}</Text>) :
                                        (<Text style={styles.text}>Recomendaciones: Caminar 30 min diarios, no fumar, dieta dash</Text>)
                                    }
                                </View>
                            </View>
                        )
                        }
                        keyExtractor={(item) => item._id
                        }
                    />}
                </ScrollView >
            </View>
        )
    }
}

export default PatientView

const styles = StyleSheet.create({
    header: {
        color: '#0077B6',
        fontSize: 20,
        alignSelf: 'center',
    },
    text: {
        color: '#0077B6',
        fontSize: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});
