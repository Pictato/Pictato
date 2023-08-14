import React, { useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";

const Register = () => {
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
    <>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="아이디"
          ref={username}
          required
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="이메일"
          ref={email}
          required
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry={true}
          ref={password}
          required
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={styles.input}
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
        <Text style={styles.buttonText}>가입하기</Text>
      </TouchableOpacity>
      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>Already have an account?</Text>
      </View>
    </>
  );
};

const styles = {
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    padding: 10,
    backgroundColor: "#ffcc00",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  linkContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  linkText: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
};

export default Register;
