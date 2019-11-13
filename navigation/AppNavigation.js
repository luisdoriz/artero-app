import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { Dimensions } from 'react-native';
const WIDTH = Dimensions.get('window').width;

import Home from '../screens/Home';
import AddPatient from '../screens/AddPatient';
import Patients from '../screens/Patients';
import Patient from '../screens/Patient';
import SelectPatient from '../screens/SelectPatient';
import Register from '../screens/Register';

const HomeNavigation = createStackNavigator({
	Home: Home,
	AddPatient: AddPatient,
});

const RegisterNavigation = createStackNavigator({
	Patients: {
		screen: SelectPatient,
		navigationOptions: () => ({
			title: 'Selección de paciente',
			headerTitleStyle: {
				width: WIDTH - 75,
				color: '#038BD3'
			},
		}),
	},
	Register: {
		screen: Register,
		navigationOptions: () => ({
			title: 'Registro de Presión',
			headerTitleStyle: {
				width: WIDTH - 75,
				color: '#038BD3'
			},
		}),
	}
});

const PatientsNavigation = createStackNavigator({
	Patients: Patients,
	Patient: {
		screen: Patient,
		navigationOptions: ({ navigation }) => ({
			title: navigation.state.params.patient,
			headerTitleStyle: {
				width: WIDTH - 75,
				color: '#038BD3'
			},
		}),
	},
});

const AppNavigation = createMaterialBottomTabNavigator({
	Home: {
		screen: HomeNavigation,
		navigationOptions: {
			tabBarLabel: 'Home',
			tabBarIcon: ({ tintColor }) => (
				<View>
					<Icon style={[{ color: tintColor }]} size={25} name={'ios-person'} />
				</View>),
		}
	},
	Register: {
		screen: RegisterNavigation,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => (
				<View>
					<Icon style={[{ color: tintColor }]} size={25} name={'ios-medkit'} />
				</View>),
		}
	},
	Patients: {
		screen: PatientsNavigation,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => (
				<View>
					<Icon style={[{ color: tintColor }]} size={25} name={'ios-stats'} />
				</View>),
		}
	},
},
{
	activeColor: '#FFFFFF',
		inactiveColor: '#D6D6D6',
			barStyle: { backgroundColor: '#038BD3' },
});

export default createAppContainer(AppNavigation);