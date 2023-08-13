import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './Main';
import Login from './Login';
import MainTabs from './MainTabs';

const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
    );
}

export default MyStack;
