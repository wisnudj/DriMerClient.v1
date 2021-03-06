import React from "react";
import { ActivityIndicator, StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableOpacity, Picker, Alert } from "react-native";
import { connect } from 'react-redux'
import { actionRegister } from '../../actions/userAction'
import { SocialIcon } from 'react-native-elements'

class Register extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#F5FCFF'
    },
    title: "Register",
  }
  constructor(props) {
    super(props)
    this.state = {
      nameValue: '',
      email: '',
      password: '',
      age: '',
      gender: '',
      isDateTimePickerVisible: false,
      err: '',
      isLoading: false,
      nameValidate: true,
      ageValidate: true,
      errorMessage: ''
    }

    this.handleInputName = this.handleInputName.bind(this)
    this.handleInputAge = this.handleInputAge.bind(this)
  }
  register = () => {
    console.log("Masuk register....")
    if (this.state.email === '' || this.state.age === '' || this.state.gender === '' || this.state.nameValue === '') {
      this.setState({
        errorMessage: 'All forms must be filled.'
      })
    } else {
      if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))) {
        this.setState({
          errorMessage: '',
          isLoading: true
        })
        let dataUser = {
          name: this.state.nameValue,
          email: this.state.email,
          password: this.state.password,
          age: Number(this.state.age),
          gender: this.state.gender
        }
        this.props.register(dataUser)
      } else {
        this.setState({
          errorMessage: 'Please input the correct email. Ex: xxx@xxx.com'
        })
      }
    }

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isSuccess) {
      Alert.alert(
        'Success',
        'Register success',
        [
          { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
        ],
        { cancelable: false }
      )
    }
  }

  handleInputAge(age) {
    if ((/^[0-9]*$/.test(age)) || age === "") {
      this.setState({
        ageValidate: true,
        errorMessage: '',
        age: age
      })
    } else {
      this.setState({
        ageValidate: false,
        errorMessage: 'Age should contain only number!'
      })
    }
  }
  handleInputName(name) {
    if ((/^[a-zA-Z-' ']+$/.test(name)) || name === "") {
      this.setState({
        nameValidate: true,
        errorMessage: '',
        nameValue: name
      })
    } else {
      this.setState({
        nameValidate: false,
        errorMessage: "Name should contain only alphabetic!"
      })
    }
  }

  render() {
    console.log(this.props.isSuccess)
    var tunggu = <Text>Tunggu</Text>
    if (this.state.isLoading == false) {
      tunggu = <Text></Text>
    } else if (this.state.isSuccess == true) {
      tunggu = <Text></Text>
    } else {
      tunggu = <ActivityIndicator />
    }
    return (
      <View style={styles.container}>
        <Text style={styles.err}>{this.state.errorMessage}</Text>
        {tunggu}
        <View style={{ width: 300 }}>
          <View style={styles.input}>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)' placeholder="Name" onChangeText={this.handleInputName} />
          </View>
          <View style={styles.input}>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)' placeholder="Email" onChangeText={(text) => this.setState({ email: text })} />
          </View>
          <View style={styles.input}>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)' placeholder="Age" onChangeText={this.handleInputAge} />
          </View>
          <View style={styles.input}>
            <Picker style={styles.inputPicker}
              selectedValue={this.state.gender}
              onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}>
              <Picker.Item label="Your Gender" value="" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Male" value="Male" />
            </Picker>
          </View>
          <View style={styles.input}>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)' secureTextEntry placeholder="Password" onChangeText={(text) => this.setState({ password: text })} />
          </View>
          <SocialIcon type="user-plus" button style={{ backgroundColor: '#296666' }} title='Register' onPress={this.register} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#06a887'
  },
  err: {
    color: 'red'
  },
  input: {
    backgroundColor: '#e6fef9',
    borderRadius: 10,
    marginBottom: 10
  },
  birthPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 30
  },
  inputPicker: {
    color: 'grey'
  }
})
const mapStateToProps = (state) => {
  return {
    isSuccess: state.userReducer.isSuccess
  }
}
const mapActionToProps = (dispatch) => {
  return {
    register: (userData) => { dispatch(actionRegister(userData)) }
  }
}
export default connect(mapStateToProps, mapActionToProps)(Register)