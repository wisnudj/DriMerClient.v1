import React from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'

class Suggestion extends React.Component {
  static navigationOptions = {
    title: "Suggestion"
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Text>Suggestion</Text>
        <Text>{this.props.waterNeed}</Text>
        <Button
          onPress={ () => navigate('Profile')}
          title="To Profile"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    paddingTop: 30
  }
})

const mapStateToProps = (state) => {
  return {
    waterNeed: state.quisionerReducer.waterNeeds
  }
}

export default connect(mapStateToProps, null)(Suggestion)
