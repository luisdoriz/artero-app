import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

const TouchableSquareView = (props) => {
    return (
        <TouchableOpacity style={styles.clickable} onPress={props.onPress}>
            {props.img !== null > 1 && <Image
                style={{ width: 50, height: 50 }}
                source={props.img}
            />}
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    )
}

TouchableSquareView.propTypes = {
    img: PropTypes.number,
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};

TouchableSquareView.defaultProps = {
    img: null,
};

export default TouchableSquareView;

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    clickable: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        borderRadius: 20,
        width: '70%',
        minHeight: 50,
        marginTop: 20,
        marginBottom: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: 'black',
    },
});
