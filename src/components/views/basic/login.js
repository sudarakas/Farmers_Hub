import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';


import LoadTabs from '../tabs';

class Home extends Component {
    render() {
        return (
            <View>
                <Button
                    title="load home"
                    onPress={() => {
                        LoadTabs();
                    }}
                />
                <Text>Login</Text>
            </View>
        )
    }
}

export default Home;
