import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';

class Home extends Component{
    render() {
        return(
            <View style={styles.mainContainer}>
                <Text>Home Screen</Text>
            </View>
        )
    }
}

//styles for the components
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    }
});

export default Home;
