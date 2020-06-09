import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Home extends Component{
    render() {
        return(
            <View style={styles.mainContainer}>
                <Text>Home Screen <Icon name="user" size={30} color="#900" /></Text>
                
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
