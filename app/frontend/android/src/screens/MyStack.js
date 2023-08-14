import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../components/Main';
import Login from '../components/SignIn';
import MainTabs from './MainTabs';
import Register from '../components/Register';

const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
    );
}

export default MyStack;
