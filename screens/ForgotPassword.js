

import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';
import firebase from '@react-native-firebase/app'


class ForgotPassword extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      MonEmail:null
    }
  }
  passwordReset() {
    console.log("Email :           "+this.state.MonEmail)
    return firebase.auth().sendPasswordResetEmail(this.state.MonEmail)
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.text}>Reset my Password </Text>

      <FormInput
        onChangeText={(userEmail) => {this.setState({MonEmail:userEmail})}}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />


      <FormButton
        buttonTitle="Valider"
        onPress={() => {this.passwordReset();this.props.navigation.navigate('Login')}}
      />

    </View>
    );
  }
}

export default ForgotPassword;


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});