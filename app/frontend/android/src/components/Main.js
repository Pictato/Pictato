import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import * as Font from 'expo-font';
import PictatoImage from '../assets/images/pictato.png';

const WIDTH = Dimensions.get('window').width;

function Main({ navigation }) {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'GowunBatang-Bold': require('../assets/fonts/GowunBatang-Bold.ttf'),
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
            <Text style={styles.title}>Pictato</Text>
            
            <Image source={PictatoImage} style={styles.image} resizeMode="cover" />
            <View style={styles.content}>
                <Text style={styles.slogan}>눈에 보이는 감동,
                    {'\n'}마음에 기록되는 순간</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Go to Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontFamily: 'PTSerif-BoldItalic',
        marginTop: -80,
        marginBottom: 30,
    },

    slogan: {
        fontSize: 20,
        fontFamily: 'GowunBatang-Bold',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 50,
    },
    image: {
        flex: 0.3,
        aspectRatio: 0.8,
        paddingBottom: 50
    },
    content: {
        width: WIDTH,
        marginTop: 50,
        alignItems: 'center',
    },
    badge: {
        color: 'white',
        backgroundColor: '#888',
        paddingHorizontal: 6,
        paddingVertical: 2,
        fontSize: 14,
    },
    button: {
        backgroundColor: '#F5DEB3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: 'black',
        fontFamily: 'PTSerif-BoldItalic',
        fontSize: 18,
    },
});

export default Main;
