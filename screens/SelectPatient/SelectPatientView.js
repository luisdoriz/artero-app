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

class SelectPatientView extends Component {
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
		this.setState({ filter: text, });
		// if (text.length === 0) {
		// 	this.getPatients()
		// } else {
		// 	const response = await searchPatient('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTU0ODRhZmVhOTM0NjE3MGJkYmYwMiIsIm5hbWUiOiJMdWlzIERvcml6IiwiaWF0IjoxNTc0NDE2MzQzfQ.A0DwBC1ZF6HvbbjFs15Od8rbIgJAdQSMI9w1p1fAKLo', text);
		// 	if (response) {
		// 		this.setState({ patients: response, loading: false });
		// 	} else {
		// 		this.setState({ loading: false });
		// 	}
		// }
	}

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
					style={{ height: 40, alignSelf: 'center' }}
					placeholder="Nombre del paciente"
					onChangeText={(text) => this.searchPatientByName(text)}
					value={filter}
				/>
				{loading ? 	<ActivityIndicator size="large" color="#0000ff" /> : this.renderPatients(patients)}
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
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10
	}
});
