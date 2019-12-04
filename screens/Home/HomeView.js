import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native'

import user from '../../icons/user.png';
import TouchableSquare from '../../components/core/TouchableSquare';

class HomeView extends Component {
    logOut = async () => {
        await AsyncStorage.setItem('tkn', undefined);
    }
    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.contianer}>
                <TouchableSquare text="Agregar Paciente" img={user} onPress={() => navigation.navigate('AddPatient')} />
                <TouchableOpacity onPress={() => this.logOut()}>
                    <Text>Signout</Text>
                </TouchableOpacity>
            </View >
        )
    }
}

export default HomeView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

