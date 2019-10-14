import React, { Component } from 'react'
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native'

import { fetchPatient } from '../../data/patients';

const  initialState = {
    patient: undefined,
};
class PatientView extends Component {
    constructor(props) {
        super(props)
        this.state = initialState;
    }
    
    componentDidMount() {
        this.getPatient()
    }

    getPatient = async () => {
        const { id } = this.props.navigation.state.params;
        console.log(id);
        const  response = await fetchPatient('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTU0ODRhZmVhOTM0NjE3MGJkYmYwMiIsIm5hbWUiOiJMdWlzIERvcml6IiwiaWF0IjoxNTcxMDI4MzQzfQ.mnNI2rW_jRx4vqpPrcvsjZKuUZqgC4rr7HdGGDKCnCI', id);
        if (response) {
            console.log(response)
            this.setState({ patient: response});
        }
    }

    render() {
        const { patient } = this.state;

        if (patient === undefined) {
            return (
				<View style={[styles.container, styles.horizontal]}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>) 
        }
        return (
            <View>
                {patient.height && (<Text> Altura: {patient.height}m </Text>)}
                {patient.sex ? (<Text> Sexo: Masculino </Text>) : (<Text> Sexo: Femenino </Text>) }
                {patient.weight && (<Text> Altura: {patient.weight}kg </Text>)}
                {patient.birthday && (<Text> birth: {patient.birthday} </Text>)}
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
