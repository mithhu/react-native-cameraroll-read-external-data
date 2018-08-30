import React, {Component} from 'react';
import {PermissionsAndroid, Platform, StyleSheet, Text, View, CameraRoll} from 'react-native';

export default class App extends Component {
  checkPlatform = async() => {
    if (Platform.OS === 'ios') {
      this.getPhotos()
    }
      // 
      if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          android.permission.READ_EXTERNAL_STORAGE,
          {
            'title': 'Alert',
            'message': 'This app would like to access your camera roll.'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.getPhotos()
        } else {
          console.log("Camera permission denied")
        }
      } catch (err) {
        console.warn(err)
      }
    }
    }


  async getPhotos() {
    try {
      const photos = await CameraRoll.getPhotos({ first: 10, assetType: 'All' })
      console.log('photos: ', photos)
    } catch (err) {
      console.log('error:', err)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text onPress={this.checkPlatform} style={styles.instructions}>Get Photos</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});
