import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList, TextInput, ScrollView, RefreshControl } from 'react-native';

import { fetchPatients, searchPatient } from '../../data/patients';
import TouchableSquare from '../../components/core/TouchableSquare';
import user from '../../icons/user.png';

const initialState = {
	patients: [],
	registerPatients: false,
	filter: '',
	loading: true,
};

class PatientsView extends Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	componentDidMount() {
		this.getPatients();
	}

	getPatients = async () => {
		const response = await fetchPatients('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTU0ODRhZmVhOTM0NjE3MGJkYmYwMiIsIm5hbWUiOiJMdWlzIERvcml6IiwiaWF0IjoxNTc0NDE2MzQzfQ.A0DwBC1ZF6HvbbjFs15Od8rbIgJAdQSMI9w1p1fAKLo');
		if (response) {
			this.setState({ patients: response, loading: false });
		} else {
			this.setState({ registerPatients: true, loading: false })
		}
	}


	searchPatientByName = async (text) => {
		// this.setState({ loading: true });
		this.setState({ filter: text });
		// if (text.length === 0) {
		// 	this.getPatients()
		// } else {
		// 	const response = await searchPatient('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTU0ODRhZmVhOTM0NjE3MGJkYmYwMiIsIm5hbWUiOiJMdWlzIERvcml6IiwiaWF0IjoxNTc0NDE2MzQzfQ.A0DwBC1ZF6HvbbjFs15Od8rbIgJAdQSMI9w1p1fAKLo', text);
		// 	console.log(response, '😎');
		// 	if (response) {
		// 		console.log(response, '😎');
		// 		this.setState({ patients: response, loading: false });
		// 	} else {
		// 		this.setState({ loading: false });
		// 	}
		// 	// this.changeLoading();
		// }
	}

	renderPatients = (patients) => {
		const { navigation } = this.props;
		let filtered = patients
		if (this.state.filter.length > 0) {
			filtered = patients.filter(patient => {
				return patient && patient.patient.handleName.toLowerCase().includes(this.state.filter.toLocaleLowerCase());
			});
		}
		return filtered.size !== 0 ? <FlatList
			data={filtered}
			extraData={this.state.loading}
			renderItem={({ item }) =>
				<TouchableSquare
					text={item.patient.handleName}
					img={user}
					onPress={() =>
						navigation.navigate(
							'Patient',
							{
								patient: item.patient.handleName,
								id: item.patient._id
							}
						)}
				/>
			}
			keyExtractor={(item) => item._id}
		/> : <Text> No tiene pacientes registrados </Text>;
	}

	changeLoading = () => {
		this.setState({ loading: !this.state.loading });
	}

	onRefresh = () => {
		this.changeLoading();
		setTimeout(() => {
			this.getPatients();
			// if (this.state.filter.length === 0) {

			// } else {
			// 	this.searchPatientByName(this.state.filter);
			// }
		}, 2000);
	};

	render() {
		const { patients, registerPatients, filter, loading } = this.state;
		const { navigation } = this.props;
		return (
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={loading} onRefresh={() => this.onRefresh()} />
				}
				style={styles.container}>
				<TextInput
					style={{ height: 40, alignSelf: 'center' }}
					placeholder="Nombre del paciente"
					onChangeText={(text) => this.searchPatientByName(text)}
					value={filter}
				/>
				{loading ? <ActivityIndicator size="large" color="#0000ff" /> : this.renderPatients(patients)}
			</ScrollView>
		)
	}
}

export default PatientsView;


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10
	}
});
