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

const HomeNavigation = createStackNavigator({
	Home: Home,
	AddPatient: AddPatient,
});

const PatientsNavigation = createStackNavigator({
	Patients: Patients,
	Patient: {
		screen: Patient,
		navigationOptions: ({ navigation }) => ({
			title: navigation.state.params.patient.name,
			headerTitleStyle: {
				width: WIDTH - 75,
			},
		}),
	},
});

const AppNavigation = createBottomTabNavigator({
	Home: HomeNavigation,
	Register: Patients,
	Patients: PatientsNavigation,
});

export default createAppContainer(AppNavigation);