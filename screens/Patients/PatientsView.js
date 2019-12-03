import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList, TextInput, ScrollView, RefreshControl, Button, AsyncStorage } from 'react-native';

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
		const token = await this.getToken();
		const response = await fetchPatients(token);
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
		// 	const response = await searchPatient(text);
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

	logOut = async () => {
		await AsyncStorage.setItem('tkn', 'false');
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

	getToken = async () => (await AsyncStorage.getItem('tkn'));

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
					underlineColorAndroid={
						'#0077B6'
					}
					style={styles.textInput}
					placeholder="Nombre del paciente"
					onChangeText={(text) => this.searchPatientByName(text)}
					value={filter}
				/>
				<Button title={'Agregar Paciente'} onPress={() => navigation.navigate('AddPatient')} style={{ borderColor: '#fff500', backgroundColor:'#333333', color: '#fff500' }} />

				{loading ? <ActivityIndicator size="large" color="#0000ff" /> : this.renderPatients(patients)}
				<Button title={'Cerrar sesion'} onPress={() => this.logOut()} style={{ borderColor: '#fff500', backgroundColor:'#333333', color: '#fff500' }} />
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
	textInput: {
		height: 40,
		paddingLeft: 6,
		marginBottom: 50,
		width: '90%',
		color: '#0077B6',
		alignSelf: "center",
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10
	}
});
