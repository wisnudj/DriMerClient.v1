import React from "react";
import { ActivityIndicator, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, AsyncStorage, Modal } from "react-native";
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import AwesomeAlert from 'react-native-awesome-alerts';
import { getSuggestion } from "../../actions/quisionerAction";
import icon from 'react-native-vector-icons/Ionicons';
import PushNotification from 'react-native-push-notification';

class Suggestion extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Suggestion',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name='data-usage'
        color='#06a887' />
    ),
  }

  constructor() {
    super()
    this.state = {
      persen: 100,
      air: 0,
      konstanta: 0,
      showAlert: false,
      modalVisible: true,
      goalStatus: false,
      persentaseAir: 0,
      persenVisible: false
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('drimerToken').then((value) => {
      this.props.getSuggestion(value)
    })
    .catch((err) => {
      console.log(err)
    })

      PushNotification.configure({
        onNotification: function(notification) {
          console.log( 'NOTIFICATION:', notification );
        },
        popInitialNotification: true,
        requestPermissions: true,
      })

    PushNotification.localNotification({

      id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      ticker: "My Notification Ticker", // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
      subText: "This is a subText", // (optional) default: none
      color: "red", // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: "group", // (optional) add group to message
      ongoing: false, // (optional) set whether this is an "ongoing" notification
    });

    PushNotification.localNotificationSchedule({
      title: `Let's drink`,
      message: `A glass of water can help you stay to healthy.`, // (required)
      date: new Date(Date.now()), // in 60 secs
      repeatType: 'time',
      repeatTime: 3600000,
      soundName: 'watersound.mp3'
    })
  }

  componentWillReceiveProps(nextProps) {
    AsyncStorage.getItem('air').then((value) => {
      if (value) {
        this.setState({
          air: value,
          konstanta: nextProps.waterNeed.toFixed(2)
        })
      } else {
        this.setState({
          air: nextProps.waterNeed.toFixed(2),
          konstanta: nextProps.waterNeed.toFixed(2)
        })
      }
    })

    AsyncStorage.getItem('persen').then((value) => {
      if (value) {
        this.setState({
          persen: Number(value),
        })
      }
    })

    AsyncStorage.getItem('persentaseAir').then((value) => {
      console.log('dapat persentase air dari componen willmoun', value)
      if(value) {
        this.setState({
          persentaseAir: Number(value)
        })
      }
    }).catch((err) => {
      console.log('gagal mendapatkan persentase air', err)
    })

    if(nextProps.waterNeed) {
      this.setState({
        modalVisible: false
      })
    }
  }

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  changeVisiblePersen = () => {
    if(this.state.persenVisible) {
      this.setState({
        persenVisible: false
      })
    } else {
      this.setState({
        persenVisible: true
      })
    }
  }

  minum(jumlahminum) {
    if(this.state.air <= 0) {
      var persen = this.state.persen
      var air = this.state.air
      var persentaseAir = this.state.persentaseAir

      var kurang = (jumlahminum / this.state.konstanta) * 100

      air = (air - jumlahminum).toFixed(2)
      persen = persen - kurang
      persentaseAir = persentaseAir + kurang

      AsyncStorage.setItem('air', air).then(() => {
        console.log('yeah')
      }).catch((err) => {
        console.log(err)
      })

      AsyncStorage.setItem('persen', persen.toString()).then(() => {
        console.log('yeah')
      }).catch((err) => {
        console.log(err)
      })

      AsyncStorage.setItem('persentaseAir', persentaseAir.toString()).then(() => {
        console.log('berhasil menyimpan persentase air')
      }).catch((err) => {
        console.log(err)
      })

      this.setState({
        air: air,
        persen: persen,
        goalStatus: true,
        persentaseAir: persentaseAir
      })
    }

    else if (this.state.air - jumlahminum >= 0) {
      var persen = this.state.persen
      var air = this.state.air
      var persentaseAir = this.state.persentaseAir

      var kurang = (jumlahminum / this.state.konstanta) * 100

      air = (air - jumlahminum).toFixed(2)
      persen = persen - kurang
      persentaseAir = persentaseAir + kurang

      AsyncStorage.setItem('air', air).then(() => {
        console.log('yeah')
      }).catch((err) => {
        console.log(err)
      })

      AsyncStorage.setItem('persen', persen.toString()).then(() => {
        console.log('yeah')
      }).catch((err) => {
        console.log(err)
      })

      AsyncStorage.setItem('persentaseAir', persentaseAir.toString()).then(() => {
        console.log('berhasil menyimpan persentase air')
      }).catch((err) => {
        console.log(err)
      })

      this.setState({
        air: air,
        persen: persen,
        persentaseAir: persentaseAir
      })
    }

    else if(!this.state.air - jumlahminum < 0) {
      var persen = this.state.persen
      var air = this.state.air
      var persentaseAir = this.state.persentaseAir

      var kurang = (jumlahminum / this.state.konstanta) * 100

      air = (air - jumlahminum).toFixed(2)
      persen = persen - kurang
      persentaseAir = persentaseAir + kurang

      AsyncStorage.setItem('air', air).then(() => {
        console.log('yeah')
      }).catch((err) => {
        console.log(err)
      })

      AsyncStorage.setItem('persen', persen.toString()).then(() => {
        console.log('yeah')
      }).catch((err) => {
        console.log(err)
      })

      AsyncStorage.setItem('persentaseAir', persentaseAir.toString()).then(() => {
        console.log('berhasil menyimpan persentase air')
      }).catch((err) => {
        console.log(err)
      })

      this.setState({
        air: air,
        persen: persen,
        showAlert: true,
        goalStatus: true,
        persentaseAir: persentaseAir
      })
    }
  }

  render() {
    var airPersen = null
    var satuan = null
    if(this.state.persenVisible) {
      airPersen = this.state.persentaseAir.toFixed(2)
      satuan = 'percent'
    } else {
      airPersen = this.state.air < 0? "+" + this.state.air * -1: this.state.air
      satuan = 'Liter / day'
    }

    return (
      <View>
        <Modal
         visible={this.state.modalVisible}
         animationType={'fade'}
         onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Text style={styles.modalText}>Please wait</Text>
              <ActivityIndicator size="large" color="#06a887" />
            </View>
          </View>
        </Modal>
        <View style={styles.container}>
          <Text style={styles.textRec}>Todays Drink Target</Text>
          <TouchableOpacity onPress={() => {this.changeVisiblePersen()}}>
            <AnimatedCircularProgress
              style={{
                marginTop: 20
              }}
              size={180}
              width={8}
              fill={this.state.persen}
              tintColor="#00e0ff"
              backgroundColor="white">
              {
                (fill) => (
                  <View>
                    <Text style={styles.numberLiter}>
                      {airPersen}
                    </Text>
                    <Text style={styles.points}>
                      {satuan}
                    </Text>
                  </View>
                )
              }
            </AnimatedCircularProgress>
          </TouchableOpacity>
          <Text style={styles.textRec}>Tap your drink</Text>
          <View style={{width: 300, height: 150, flexDirection: 'row', alignItems: 'center' ,justifyContent: 'space-around'}}>
          <TouchableOpacity style={styles.ButtonStyle} onPress={() => { this.minum(0.6) }}>
            <Icon
            name='md-battery-full'
            type='ionicon'
            color='white'
            />
            <Text style={{color: 'white'}}>600 ml</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ButtonStyle} onPress={() => { this.minum(0.24) }}>
            <Icon
            name='cup'
            type='material-community'
            color='white'
            />
            <Text style={{color: 'white'}}>240 ml</Text>
          </TouchableOpacity>
          </View>
        </View>

        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title="Congratulation"
          message="You have completed your liquid needs"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#296666',
    height: 550
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  numberLiter: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center'
  },

  points: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  innerContainer: {
    alignItems: 'center',
  },
  modalText: {
    color: '#06a887',
    marginBottom: 30
  },

  ButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#06a887',
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 20
  },

  textRec: {
    fontSize: 18,
    color: "white",
    marginTop: 40

  }
});

const mapStateToProps = (state) => {
  // console.log('ini map', state)
  return {
    waterNeed: state.quisionerReducer.waterNeeds
  }
}

const mapActionToProps = (dispatch) => {
  return {
    getSuggestion: (token) => dispatch(getSuggestion(token))
  }
}

export default connect(mapStateToProps, mapActionToProps)(Suggestion)
