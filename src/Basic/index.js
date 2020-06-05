import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';

class Flash extends Component {

    //create the states for the animations
    state = {
        mainText: new Animated.Value(0), //animation for the text (farmers hub)
        // mainButton: new Animated.Value(0) //animation for the text (farmers hub)
    }

    componentDidMount() {
        Animated.sequence([
            Animated.timing(this.state.mainText, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        ]).start();
    }

    render() {
        return (
            <View style={styles.mainContainer}>  
                <View style={styles.container}>
                    <Animated.View style={{
                        opacity: this.state.mainText.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                            extrapolate: 'clamp',
                          }),
                    }}>
                        <Text style={styles.mainText}>FARMERS' HUB</Text>
                    </Animated.View>
                </View>
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
