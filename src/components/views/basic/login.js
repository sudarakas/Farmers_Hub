import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, Animated, Easing } from 'react-native';

import { getOrientation, setOrientationListener, removeOrientationListener } from '../../util/misc';

import LoginPanel from "./loginPanel";

class Home extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)

        this.state = {
            orientation: getOrientation(500),
            topicText: new Animated.Value(0), //animation for the topic text (welcome back)
            accessText: new Animated.Value(0), //animation for the accessText text (login access..)
            textAnimations: false,

            pageType: "Login",
            firstTitleText: "Welcome",
            secondTitleText: "Back!",
            subTitleText: "Login to access the Farmers’ Hub",

        }

        this.onChangeType = this.onChangeType.bind(this);
        setOrientationListener(this.changeOrientation)
    }

    changeOrientation = () => {
        this.setState({
            orientation: getOrientation(500)
        })
    }

    componentDidUpdate() {
        this._isMounted = true;
    }

    onChangeType = (type) => {
        const pageType = type;
        if (this._isMounted) {
            this.setState({
                pageType: pageType === 'Register' ? 'Register' : 'Login',
                firstTitleText: pageType === 'Register' ? 'Create New' : 'Welcome',
                secondTitleText: pageType === 'Register' ? 'Account' : 'Back!',
                subTitleText: pageType === 'Register' ? 'Please fill all the details to create a new account' : 'Login to access the Farmers’ Hub',
            })
        }
    }

    showLoginForm = () => {
        this.setState({
            textAnimations: true
        })
    }

    //action after component uncomunted
    UNSAFE_componentWillUnmount() {
        removeOrientationListener()
        this._isMounted = false;
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
            <View style={styles.topContainer}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                                <Text style={styles.welcomeText}>{this.state.firstTitleText}</Text>
                                <Text style={styles.backText}>{this.state.secondTitleText}</Text>
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
                            <Text style={styles.accessText}>{this.state.subTitleText}</Text>
                        </Animated.View>

                        <LoginPanel
                            show={this.state.textAnimations}
                            onChangePageType={this.onChangeType}
                            orientation={this.state.orientation}
                        />
                    </View>
                </ScrollView>
            </View>
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
    topContainer: {
        flex: 1,
        height: '100%',
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
        fontSize: 15,
        color: "#A2A2A2",
        fontFamily: "Montserrat-Regular",
    }
});

export default Home;
