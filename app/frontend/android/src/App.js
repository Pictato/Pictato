import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './screens/MyStack';

export default function App() {
    return (
            <NavigationContainer>
              <MyStack />
            </NavigationContainer>
    );
}
