import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Animated } from 'react-native';

import LoginForm from './loginFrom';

class LoginPanel extends Component {

    state = {
        animationDone: false,
        inputForm: new Animated.Value(0), //animation for form
        signUpText: new Animated.Value(0) //animation for signup text 
    }

    //run the animation after the text animation done and login form animation is not completed
    componentWillReceiveProps(nextProps) {
        if (nextProps.show && !this.state.animationDone) {
            Animated.parallel([
                Animated.timing(this.state.inputForm, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(this.state.signUpText, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ]).start(
                this.setState({ animationDone: true })
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View
                    style={{
                        opacity: this.state.inputForm
                    }}
                >
                    <LoginForm />
                </Animated.View>

                <Animated.View
                    style={{
                        opacity: this.state.signUpText
                    }}
                >
                    <Text>Sign up</Text>
                </Animated.View>
            </View>
        )
    }
}

//styles for the components
const styles = StyleSheet.create({
    container:{
        marginTop: 40
    }
})


export default LoginPanel;