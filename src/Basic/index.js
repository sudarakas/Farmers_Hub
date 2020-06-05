import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';

class Flash extends Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.mainText}>FARMERS' HUB</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#5EB14E',
    },
    mainText: {
        fontSize: 60,
        color: "#ffffff",
        fontFamily: "Montserrat-Black",
        marginHorizontal: 20,
    }
});


export default Flash;
