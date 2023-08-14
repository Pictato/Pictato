import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../components/Main';
import Login from '../components/Login';
import MainTabs from './MainTabs';
import SignUp from '../components/SignUp';

const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
    );
}

export default MyStack;
