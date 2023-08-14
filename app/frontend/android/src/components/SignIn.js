import React, { useState, useEffect } from 'react';
import { View, Button, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';

const WIDTH = Dimensions.get('window').width;

function Login({ navigation }) {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'PTSerif-BoldItalic' : require('../assets/fonts/PTSerif-BoldItalic.ttf'),
                'PTSerif-Regular' : require('../assets/fonts/PTSerif-Regular.ttf')
            });
            setFontLoaded(true);
        }

        loadFonts();
    }, []);

    if (!fontLoaded) {
        return null; 
    }

    return (
    <View style={styles.container}>
    <Text style={styles.headerTxt}>Welcome{'\n'}to Pictato</Text>
    <View style={styles.subView}>
        <Text style={styles.subTxt}>Login</Text>
        <TextInput
            style={styles.nameInput}
            placeholder="ID"
        // onChangeText={(ID) => { this.setState({ ID }) }}
        />
        <TextInput
            style={styles.nameInput}
            placeholder="Password"
        />
        <TouchableOpacity
            style={styles.btn} 
            onPress={() => navigation.navigate('MainTabs')}>
            <Text style={styles.btnTxt}>Login</Text>

        </TouchableOpacity>
        <View style={styles.signUpView}>
                    <Text style={styles.askSignUPTxt}>
                        Create an account?{'    '}
                        <Text
                            style={styles.signUpTxtBtn}
                            onPress={() => navigation.navigate('Register')}>
                            회원가입
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        width: WIDTH,
        backgroundColor: '#FAF0E6',
        justifyContent: 'center', 
    },
    subView: {
        flex: 2,
        width: WIDTH,
        backgroundColor: 'white',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    headerTxt: {
        flex: 0.8,
        marginTop: 150, 
        marginBottom: -30,
        fontSize: 40,
        marginLeft: 30,
        color: 'gray',
        fontFamily: 'PTSerif-BoldItalic',
    },
    subTxt: {
        color: 'black',
        marginTop: 50,
        fontSize: 30,
        fontFamily: 'PTSerif-BoldItalic',
        marginLeft: 40,
    },
    nameInput: {
        height: 40,
        width: 270,
        marginLeft: 40,
        borderBottomWidth: 1,
        marginTop: 30,
    },
    btn: {
        height: 50,
        width: 200,
        backgroundColor: '#F5DEB3',
        borderRadius: 10,
        marginLeft: 70,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',       
        },
    btnTxt: {
        color: 'black',
        fontFamily: 'PTSerif-BoldItalic',
        fontSize: 20,
    },
    signView: {
        marginTop: 50,
        width: WIDTH,
        flexDirection: 'row',
    },
    askSignUPTxt: {
        fontSize: 15,
        fontFamily: 'PTSerif-Regular',
        marginTop: 30,
        marginLeft: 50,
    },
    signUpTxtBtn: {
        fontFamily: 'PTSerif-BoldItalic',
        fontSize: 20,
    },
});

export default Login;
