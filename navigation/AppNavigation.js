import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
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
			title: 'Seleccion de paciente',
			headerTitleStyle: {
				width: WIDTH - 75,
			},
		}),
	},
	Register: {
		screen: Register,
		navigationOptions: () => ({
			title: 'Registro de presion',
			headerTitleStyle: {
				width: WIDTH - 75,
			},
		}),
	}
});

const PatientsNavigation = createStackNavigator({
	Patients: Patients,
	Patient: {
		screen: Patient,
		navigationOptions: ({ navigation }) => ({
			title: navigation.state.params.handleName,
			headerTitleStyle: {
				width: WIDTH - 75,
			},
		}),
	},
});

const AppNavigation = createBottomTabNavigator({
	Home: HomeNavigation,
	Register: RegisterNavigation,
	Patients: PatientsNavigation,
});

export default createAppContainer(AppNavigation);