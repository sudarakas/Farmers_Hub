import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';


import LoadTabs from '../tabs';

class Home extends Component {
    render() {
        return (
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={styles.mainContainer} >
                    <Text style={styles.welcomeText}>Welcome</Text>
                    <Text style={styles.backText}>Back!</Text>
                    <Text style={styles.accessText}>Login to access to Farmers’ Hub</Text>
                </View>
            </ScrollView>
        )
    }
}

//styles for the components
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    welcomeText: {
        fontSize: 40,
        color: "#000000",
        fontFamily: "Montserrat-Bold",
        marginTop: 15,
        marginHorizontal: 20,
    },
    backText: {
        fontSize: 40,
        color: "#000000",
        fontFamily: "Montserrat-Bold",
        marginHorizontal: 20,
    },
    accessText: {
        fontSize: 20,
        color: "#A2A2A2",
        fontFamily: "Montserrat-Regular",
        marginHorizontal: 20,
    }
});

export default Home;
