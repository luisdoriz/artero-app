import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { Dimensions } from 'react-native';
const WIDTH = Dimensions.get('window').width;

import Home from '../screens/Home';
import SignIn from '../screens/SignIn';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import AddPatient from '../screens/AddPatient';
import Patients from '../screens/Patients';
import Patient from '../screens/Patient';
import SelectPatient from '../screens/SelectPatient';
import Register from '../screens/Register';
import PatientConditions from '../screens/PatientsConditions';
import Diagnosis from '../screens/Diagnosis';

const HomeNavigation = createStackNavigator({
	Home: Home,
});

const RegisterNavigation = createStackNavigator({
	Patients: {
		screen: SelectPatient,
		navigationOptions: () => ({
			title: 'Selección de paciente',
			headerTitleStyle: {
				width: WIDTH - 75,
				color: '#333333'
			},
		}),
	},
	Register: {
		screen: Register,
		navigationOptions: () => ({
			title: 'Registro de Presión',
			headerTitleStyle: {
				width: WIDTH - 75,
				color: '#333333'
			},
		}),
	},
	Diagnosis: {
		screen: Diagnosis,
		navigationOptions: () => ({
			title: 'Diagnositco',
			headerTitleStyle: {
				width: WIDTH - 75,
				color: '#333333'
			},
		}),
	}
});

const PatientsNavigation = createStackNavigator({
	Patients: Patients,
	AddPatient: AddPatient,
	Patient: {
		screen: Patient,
		navigationOptions: ({ navigation }) => ({
			title: navigation.state.params.patient,
			headerTitleStyle: {
				width: WIDTH - 75,
				color: '#333333'
			},
		}),
	},
	PatientConditions: {
		screen: PatientConditions,
		navigationOptions: ({ navigation }) => ({
			title: `Condiciones de ${navigation.state.params.patient.handleName}`,
			headerTitleStyle: {
				width: WIDTH - 75,
				color: '#333333'
			},
		}),
	},
});

// const auth = createSwitchNavigator(
// 	{
// 		AuthLoading: AuthLoadingScreen,
// 		App: AppNavigation,
// 		Auth: authStack,
// 	},
// 	{
// 		initialRouteName: 'AuthLoading',
// 	}
// );

// const authStack = createStackNavigator({ SignIn: SignIn});

const AppNavigation = createMaterialBottomTabNavigator({
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
	activeBackgroundColor: '#333333',
	activeColor: '#fff500',
			barStyle: {
				backgroundColor: '#333333',
		},
}
);

export default createAppContainer(AppNavigation);