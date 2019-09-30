import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';

const initialState = {
	patients: [],
	registerPatients: false,
};

class PatientsView extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	// componentDidMount() {
	// 	this.getPatients();
	// }

	// getPatients = async () => {
	// 	const { response } = await fetchPatients('token');
	// 	if (response) {
	// 		this.setState({ patients: response });
	// 	} else {
	// 		this.setState({ registerPatients: true })
	// 	}
	// }

	render() {
		const { patients, registerPatients } = this.state;
		if (registerPatients) {
			return (
				<View style={styles.container}>
					<Text> No tiene pacientes registrados </Text>
				</View>
			)
		} else if (patients.length === 0) {
			return (
				<View style={[styles.container, styles.horizontal]}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>)
		}
		return (
			<View style={styles.container}>
				<Text> Patients list </Text>
			</View>
		)
	}
}

export default PatientsView;


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
