import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Animated } from 'react-native';

import LoginForm from './loginFrom';

class LoginPanel extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);

        this.onChangePageType = this.onChangePageType.bind(this);
    }
    state = {
        animationDone: false,
        inputForm: new Animated.Value(0), //animation for form
    }

    componentDidMount() {
        this._isMounted = true;
    }

    //run the animation after the text animation done and login form animation is not completed
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.show && !this.state.animationDone) {
            Animated.parallel([
                Animated.timing(this.state.inputForm, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ]).start(
                this.setState({ animationDone: true })
            )
        }
    }

    onChangePageType = (type) => {
        if (this._isMounted) {
            this.props.onChangePageType(type);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View
                    style={{
                        opacity: this.state.inputForm
                    }}
                >
                    <LoginForm
                        onChangeChildPageType={this.onChangePageType}
                    />
                </Animated.View>
            </View>
        )
    }
}

//styles for the components
const styles = StyleSheet.create({
    container: {
        marginTop: 30
    }
})


export default LoginPanel;