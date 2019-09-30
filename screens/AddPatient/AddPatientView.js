import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

class AddPatientView extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Text> AddPatientView </Text>
        <Button
          title="Go to add"
          onPress={
            () => navigation.navigate('Patients')
          }
        />
      </View>
    )
  }
}

export default AddPatientView;
