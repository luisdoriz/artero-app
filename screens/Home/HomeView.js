import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

import user from '../../icons/user.png';
import TouchableSquare from '../../components/core/TouchableSquare';

class HomeView extends Component {
    
    render() {
        const { navigation } = this.props;

        return (
            <View style={styles.contianer}>
                <TouchableSquare text="Agregar Paciente" img={user} onPress={() => navigation.navigate('AddPatient')} />
            </View>
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

