import React, { useRef, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";

const WIDTH = Dimensions.get('window').width;

const Register = ({ navigation }) => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const handleSubmit = () => {
    if (password.current && password.current.value !== confirmPassword.current.value) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const attributeData = new CognitoUserAttribute({
      Name: "email",
      Value: email.current,
    });

    UserPool.signUp(
      username.current,
      password.current,
      [attributeData],
      null,
      (err, data) => {
        if (err) console.log(err);
        console.log(data);
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          placeholder="아이디"
          ref={username}
          required
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          placeholder="이메일"
          ref={email}
          required
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호"
          secureTextEntry={true}
          ref={password}
          required
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          placeholder="비밀번호 확인"
          secureTextEntry={true}
          ref={confirmPassword}
          required
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.LoginTextLink}>
        <Text style={styles.askSignUPTxt}>
          Already have an account?{'    '}
          <Text
            style={styles.signUpTxtBtn}
            onPress={() => navigation.navigate('Login')}>
            로그인하기
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    alignSelf: 'flex-start',
    marginTop: 30,
    marginBottom: 50,
    marginLeft: 50, 
    fontSize: 30,
    fontFamily: 'PTSerif-BoldItalic',
  },
  input: {
    width: WIDTH * 0.8,
    marginBottom: 15,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 5,
  },
  button: {
    height: 50,
    width: 200,
    backgroundColor: '#F5DEB3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontFamily: 'PTSerif-BoldItalic',
    fontSize: 20,
  },
  LoginTextLink: {
    marginTop: 10,
    alignItems: "center",
  },
  askSignUPTxt: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
  signUpTxtBtn: {
    color: "#007bff",
    textDecorationLine: "underline",
    fontFamily: 'PTSerif-BoldItalic',
  },
});

export default Register;
