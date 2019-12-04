import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList, TextInput, ScrollView, RefreshControl, AsyncStorage } from 'react-native';

import { fetchPatients, searchPatient } from '../../data/patients';
import TouchableSquare from '../../components/core/TouchableSquare';
import user from '../../icons/user.png';

const initialState = {
	patients: [],
	registerPatients: false,
	filter: '',
	loading: true,
};

class SelectPatientView extends Component {
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
		this.setState({ filter: text, });
		// if (text.length === 0) {
		// 	this.getPatients()
		// } else {
		// 	const response = await searchPatient(text);
		// 	if (response) {
		// 		this.setState({ patients: response, loading: false });
		// 	} else {
		// 		this.setState({ loading: false });
		// 	}
		// }
	}
	getToken = async () => (await AsyncStorage.getItem('tkn'));


	renderPatients = (patients) => {
		const { navigation } = this.props;

		let filtered = patients;
		if (this.state.filter.length > 0) {
			filtered = patients.filter(patient => {
				return patient && patient.patient.handleName.toLowerCase().includes(this.state.filter.toLocaleLowerCase());
			});
		}
		return filtered.size !== 0 ? <FlatList
			data={filtered}
			renderItem={({ item }) =>
				<TouchableSquare
					text={item.patient.handleName}
					img={user}
					onPress={() =>
						navigation.navigate(
							'Register',
							{
								id: item.patient._id
							}
						)}
				/>
			}
			keyExtractor={(item) => item._id}
		/> : <Text> No tiene pacientes registrados </Text>;
	}

	onRefresh = () => {
		this.setState({ loading: true });
		setTimeout(() => {
			this.getPatients();
		}, 2000);
	};

	render() {
		const { patients, filter, loading } = this.state;
		return (
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={loading} onRefresh={() => this.onRefresh()} />
				}
				style={styles.container}>
				<TextInput
					underlineColorAndroid={
						'#333333'
					}
					style={styles.textInput}
					placeholder="Nombre del paciente"
					onChangeText={(text) => this.searchPatientByName(text)}
					value={filter}
				/>
				{loading ? <ActivityIndicator size="large" color="#0000ff" /> : this.renderPatients(patients)}
			</ScrollView>
		)
	}
}

export default SelectPatientView;


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
		color: '#333333',
		alignSelf: "center",
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10
	}
});
