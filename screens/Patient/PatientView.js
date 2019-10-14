import React, { Component } from 'react'
import { Text, View, ActivityIndicator, StyleSheet, FlatList } from 'react-native'

import { fetchPatient } from '../../data/patients';
import { getAppointments } from '../../data/appointment';

const initialState = {
    patient: undefined,
    appointments: [],
};
class PatientView extends Component {
    constructor(props) {
        super(props)
        this.state = initialState;
    }

    componentDidMount() {
        this.getPatient()
        this.fetchAppointments()
    }

    getPatient = async () => {
        const { id } = this.props.navigation.state.params;
        const response = await fetchPatient('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTU0ODRhZmVhOTM0NjE3MGJkYmYwMiIsIm5hbWUiOiJMdWlzIERvcml6IiwiaWF0IjoxNTcxMDI4MzQzfQ.mnNI2rW_jRx4vqpPrcvsjZKuUZqgC4rr7HdGGDKCnCI', id);
        if (response) {
            this.setState({ patient: response });
        }
    }

    fetchAppointments = async () => {
        const { id } = this.props.navigation.state.params;
        const response = await getAppointments('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTU0ODRhZmVhOTM0NjE3MGJkYmYwMiIsIm5hbWUiOiJMdWlzIERvcml6IiwiaWF0IjoxNTcxMDI4MzQzfQ.mnNI2rW_jRx4vqpPrcvsjZKuUZqgC4rr7HdGGDKCnCI', id);
        if (response) {
            this.setState({ appointments: response });
        }
    }

    render() {
        const { patient, appointments } = this.state;

        if (patient === undefined) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>)
        }
        return (
            <View>
                {patient.height && (<Text> Altura: {patient.height}m </Text>)}
                {patient.sex ? (<Text> Sexo: Masculino </Text>) : (<Text> Sexo: Femenino </Text>)}
                {patient.weight && (<Text> Altura: {patient.weight}kg </Text>)}
                {patient.birthday && (<Text> birth: {patient.birthday} </Text>)}
                <Text>Registros: </Text>
                {appointments.size !== 0 && <FlatList
                    data={appointments}
                    renderItem={({ item }) => (
                        <View>
                            <Text>Fecha: {item.date}</Text>
                            <Text>Presion sistolica: {item.systolicPressure}</Text>
                            <Text>Presion diastolica: {item.diastolicPressure}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item._id}
                />}
            </View>
        )
    }
}

export default PatientView

const styles = StyleSheet.create({
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
