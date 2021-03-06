import React from "react";
import { AsyncStorage, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from "react-native";
import { Slider, CheckBox, SocialIcon } from 'react-native-elements';
import { connect } from 'react-redux'
import { calculateWaterAction } from '../../actions/quisionerAction'
import { changeVisible } from '../../actions/userAction'

class Quisioner extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor() {
    super()

    this.state = {
      weight: 0,
      sportTime: 0,
      isSmoker: false,
      isNonSmoker: true,
      errorMessage: '',
      weightValidate: true
    }

    this.handleInputWeight = this.handleInputWeight.bind(this)
  }

  getQuisioner() {

    if (this.state.weight === 0 || this.state.weight === '') {
      this.setState({
        errorMessage: 'Please fill the form!'
      })
    } else {
      let activityNeed = 0
      let smokerWaterNeed = 0

      switch (this.state.sportTime) {
        case 0:
          activityNeed = 0.03
          break;
        case 1:
          activityNeed = 0.035
          break;
        case 2:
          activityNeed = 0.04
          break;
        default:
          break;
      }

      if (this.state.isSmoker) {
        smokerWaterNeed = 0.04
      } else {
        smokerWaterNeed = 0.03
      }


      let calculateWater = ((activityNeed + smokerWaterNeed) / 2) * (Number(this.state.weight))
      if (calculateWater > 0) {
        calculateWater = calculateWater.toFixed(2)
      }

      this.props.calculateWater(calculateWater, this.props.token)
      this.props.changeVisible()
      AsyncStorage.setItem('drimerToken', this.props.token)
    }


  }

  handleInputWeight(weight) {
    if ((/^[0-9]*$/.test(weight)) || weight === "") {
      this.setState({
        weightValidate: true,
        errorMessage: '',
        weight: weight
      })
    } else {
      this.setState({
        weightValidate: false,
        errorMessage: 'Weight should contain only number!'
      })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewTitle}>
          <Text style={styles.title}>Quesionnaire</Text>
        </View>
        <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
        <View style={styles.textInput}>
          <View style={styles.quisioner}>
            <Text style={{ fontWeight: 'bold' }}>How much is your weight? </Text>
            <TextInput keyboardType='numeric' placeholder="in kg" onChangeText={this.handleInputWeight} />
          </View>
          <View style={styles.quisioner}>
            <Text style={{ fontWeight: 'bold' }}>Are you a smoker ?</Text>
            <CheckBox
              title='Yes'
              checkedColor="#06a887"
              checked={this.state.isSmoker}
              onPress={() => {
                if (this.state.isSmoker) {
                  this.setState({
                    isSmoker: false,
                    isNonSmoker: true
                  })
                } else {
                  this.setState({
                    isSmoker: true,
                    isNonSmoker: false
                  })
                }
              }}
            />
            <CheckBox
              title='No'
              checkedColor="#06a887"
              checked={this.state.isNonSmoker}
              onPress={() => {
                if (this.state.isSmoker) {
                  this.setState({
                    isSmoker: false,
                    isNonSmoker: true
                  })
                } else {
                  this.setState({
                    isSmoker: true,
                    isNonSmoker: false
                  })
                }
              }}
            />
          </View>
          <View style={styles.quisioner}>
            <Text style={{ fontWeight: 'bold' }}>How much is your activity level?</Text>
            <View style={styles.slider}>
              <Text>Low</Text>
              <Text>Medium</Text>
              <Text>High</Text>
            </View>
            <Slider
              thumbTintColor='#06a887'
              minimumValue={0}
              maximumValue={2}
              step={1}
              value={this.state.sportTime}
              onValueChange={(value) => this.setState({ sportTime: value })} />
          </View>
          <SocialIcon style={{ backgroundColor: '#06a887' }} button title="Submit" onPress={() => this.getQuisioner()} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#e7fef9',
    alignItems: 'center',
    paddingTop: 30
  },
  textInput: {
    width: 300
  },
  slider: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10
  },
  quisioner: {
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewTitle: {
    marginBottom: 20
  }

})

const mapStateToProps = (state) => {
  return {
    token: state.userReducer.token
  }
}

const mapActionToProps = (dispatch) => {
  return {
    calculateWater: (waterNeeds, token) => dispatch(calculateWaterAction(waterNeeds, token)),
    changeVisible: () => dispatch(changeVisible())
  }
}

export default connect(mapStateToProps, mapActionToProps)(Quisioner)