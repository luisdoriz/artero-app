import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList, TextInput } from 'react-native';

import { fetchPatients, searchPatient } from '../../data/patients';
import TouchableSquare from '../../components/core/TouchableSquare';
import user from '../../icons/user.png';

const initialState = {
	patients: [],
	registerPatients: false,
	filter: undefined,
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
		const response = await fetchPatients('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTU0ODRhZmVhOTM0NjE3MGJkYmYwMiIsIm5hbWUiOiJMdWlzIERvcml6IiwiaWF0IjoxNTcyNTQ1Nzg5fQ.gLKYQz36_O9f9qAsu9DWM5kn6pUP0H1vEljWJQmMQsQ');
		if (response) {
			console.log(response)
			this.setState({ patients: response, loading: false });
		} else {
			this.setState({ registerPatients: true, loading: false })
		}
	}

	searchPatientByName = async (text) => {
		this.setState({ filter: text, });
		if (text.length === 0) {
			this.getPatients()
		} else {
			const response = await searchPatient('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTU0ODRhZmVhOTM0NjE3MGJkYmYwMiIsIm5hbWUiOiJMdWlzIERvcml6IiwiaWF0IjoxNTcyNTQ1Nzg5fQ.gLKYQz36_O9f9qAsu9DWM5kn6pUP0H1vEljWJQmMQsQ', text);
			if (response) {
				this.setState({ patients: response, loading: false });
			} else {
				this.setState({ loading: false });
			}
		}
	}

	render() {
		const { patients, registerPatients, filter, loading } = this.state;
		const { navigation } = this.props;
		if (registerPatients) {
			return (
				<View style={styles.container}>
					<TextInput
						style={{ height: 40 }}
						placeholder="Nombre del paciente!"
						onChangeText={(text) => this.searchPatientByName(text)}
						value={filter}
					/>
					<Text> No tiene pacientes registrados </Text>
				</View>
			)
		} else if (loading) {
			return (
				<View style={[styles.container, styles.horizontal]}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>)
		}
		console.log(patients.size);
		return (
			<View style={styles.container}>
				<TextInput
					style={{ height: 40 }}
					placeholder="Nombre del paciente!"
					onChangeText={(text) => this.searchPatientByName(text)}
					value={filter}
				/>
				{patients.size !== 0 && <FlatList
					data={patients}
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
				/>}
			</View>
		)
	}
}

export default SelectPatientView;


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
