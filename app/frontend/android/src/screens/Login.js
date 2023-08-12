import React from 'react';
import { View, Button } from 'react-native';

function Login({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Go to Main" onPress={() => navigation.navigate('MainTabs')} />
        </View>
    );
}

export default Login;
