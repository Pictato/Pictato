import React from 'react';
import { View, Text, StyleSheet, 
    TextInput, Button, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;

function Post() {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button title="Choose Image" onPress={() => {}} />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Memo"
                multiline
            />
            <View style={styles.buttonContainer}>
                <Button title="POST" onPress={() => {}} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        flex:1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: WIDTH*0.8,
        marginBottom: 20,
    },
    buttonContainer: {
        flex: 0.5,
        justifyContent: 'space-around',
        width: WIDTH*0.8
    },
});

export default Post;
