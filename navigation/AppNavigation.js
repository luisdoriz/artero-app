import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Home from '../screens/Home';
import AddPatient from '../screens/AddPatient';
import Patients from '../screens/Patients';

const HomeNavigation = createStackNavigator({
	Home: Home,
	AddPatient: AddPatient,
});

const PatientsNavigation = createStackNavigator({
	Patients: Patients,
	// Patient: Patient,
});

const AppNavigation = createBottomTabNavigator({
	Home: HomeNavigation,
	Register: Patients,
	Patients: PatientsNavigation,
});

export default createAppContainer(AppNavigation);