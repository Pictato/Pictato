import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Feed from './Feed';
import Profile from './Profile';
import Post from './Post';

const Tab = createBottomTabNavigator();

function MainTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Feed"
            screenOptions={{
            tabBarActiveTintColor: '#e91e63',
        }}
        >
        <Tab.Screen
            name="Pictato"
            component={Feed}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
        }}
        />
        <Tab.Screen
            name="새게시물"
            component={Post}
            options={{
                tabBarLabel: 'Upload',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="image-multiple" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
            tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
            }}
        />
        </Tab.Navigator>
    );
}

export default MainTabs;
