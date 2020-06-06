import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, Animated, Easing } from 'react-native';

import { getOrientation, setOrientationListener, removeOrientationListener } from '../../util/misc';

import LoginPanel from "./loginPanel";

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            orientation: getOrientation(500),
            topicText: new Animated.Value(0), //animation for the topic text (welcome back)
            accessText: new Animated.Value(0), //animation for the accessText text (login access..)
            textAnimations: false,
        }

        setOrientationListener(this.changeOrientation)
    }

    changeOrientation = () => {
        this.setState({
            orientation: getOrientation(500)
        })
    }

    showLoginForm = () => {
        this.setState({
            textAnimations: true
        })
    }

    //action after component uncomunted
    componentWillUnmount() {
        removeOrientationListener()
    }

    componentDidMount() {
        Animated.sequence([
            Animated.timing(this.state.topicText, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
                easing: Easing.easeOutCube
            }),
            Animated.timing(this.state.accessText, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
                easing: Easing.easeOutCube
            })
        ]).start(() => {
            this.showLoginForm()
        })
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={styles.mainContainer} >
                    <Animated.View style={{
                        //increase the opacity of the text
                        opacity: this.state.topicText.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                            extrapolate: "clamp",
                        }),
                    }}>
                        <View style={styles.topicText}>
                            <Text style={styles.welcomeText}>Welcome</Text>
                            <Text style={styles.backText}>Back!</Text>
                        </View>
                    </Animated.View>

                    <Animated.View style={{
                        //increase the opacity of the text
                        opacity: this.state.accessText.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1],
                            extrapolate: "clamp",
                        }),
                    }}>
                        <Text style={styles.accessText}>Login to access to Farmers’ Hub</Text>
                    </Animated.View>

                    <LoginPanel
                        show={this.state.textAnimations}
                        orientation={this.state.orientation}
                    />
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
        paddingHorizontal: 20,
    },
    topicText: {

    },
    welcomeText: {
        fontSize: 40,
        color: "#000000",
        fontFamily: "Montserrat-Bold",
        marginTop: 15,
    },
    backText: {
        fontSize: 40,
        color: "#000000",
        fontFamily: "Montserrat-Bold",
        marginTop: -15  //bad
    },
    accessText: {
        fontSize: 20,
        color: "#A2A2A2",
        fontFamily: "Montserrat-Regular",
    }
});

export default Home;
