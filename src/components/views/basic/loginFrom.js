import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Input from '../../util/forms/input'

class LoginForm extends Component {

    state = {
        type: 'Login',
        action: 'SIGN IN',
        actionType: "Don't have an account? Sign Up",
        infoText: "Continue to Farmers' Hub",
        hasErrors: false,
        form: {
            email: {
                value: "",
                valid: false,
                type: "textinput",
                rules: {
                    isEmail: true
                }
            },
            password: {
                value: "",
                valid: false,
                type: "textinput",
                rules: {
                    minLength: 6
                }
            },
            confirmPassword: {
                value: "",
                valid: false,
                type: "textinput",
                rules: {
                    confirmPass: "password"
                }
            }
        }
    }

    updateInput = (name, value) => {
        this.setState({
            hasErrors: false
        })

        //to update the form after applying the logic       
        let duplicateForm = this.state.form;
        duplicateForm[name].value = value;

        this.setState({
            form: duplicateForm
        })

    }

    changeFormType = () => {
        const type = this.state.type;
        this.setState({
            type: type === 'Login' ? 'Register' : 'Login',
            action: type === 'Login' ? 'SIGN UP' : 'SIGN IN',
            actionType: type === 'Login' ? "Already have an account?" : "Don't have an account? Sign Up",
            infoText: type === 'Login' ? "By creating an account, you are agreeing to our Terms and Conditions" : "Continue to Farmers' Hub",
        })
        this.props.onChangeChildPageType(this.state.type);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.labelEmail}>Email ID</Text>
                <Input
                    placeholder="Enter your email"
                    type={this.state.form.email.type}
                    value={this.state.form.email.value}
                    onChangeText={value => this.updateInput("email", value)}
                    autoCapitalize={"none"}
                    keyboardType={"email-address"}
                />

                <Text style={styles.labelPassword}>Password</Text>
                <Input
                    placeholder="Enter your password"
                    type={this.state.form.password.type}
                    value={this.state.form.password.value}
                    onChangeText={value => this.updateInput("password", value)}
                    secureTextEntry
                />

                <Text style={styles.forgotPassword}>Forgot Password?</Text>

                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => alert('sign in')}
                    >
                        <Text style={styles.buttonText}>{this.state.action}</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text
                        style={styles.signUpText}
                        onPress={this.changeFormType}
                    >
                        {this.state.actionType}
                    </Text>

                    <Text
                        style={styles.continueText}
                        onPress={() => alert("regitser")}
                    >
                        {this.state.infoText}
                    </Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
    },
    labelEmail: {
        marginHorizontal: 5,
        fontFamily: "Montserrat-Regular",
        color: "#A2A2A2",
        marginTop: 10
    },
    labelPassword: {
        marginHorizontal: 5,
        fontFamily: "Montserrat-Regular",
        color: "#A2A2A2",
        marginTop: 15
    },
    forgotPassword: {
        color: "#000000",
        textAlign: "right",
        marginVertical: 22,
        fontSize: 15,
        fontFamily: "Montserrat-Light",
    },
    button: {
        alignItems: "center",
        backgroundColor: "#5EB14E",
        paddingVertical: 22,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff',
        fontFamily: "Montserrat-Bold",
    },
    signUpText: {
        textAlign: "center",
        marginVertical: 15,
        fontFamily: "Montserrat-Light",
        fontSize: 15,
        color: "#000000"
    },
    continueText: {
        textAlign: "center",
        marginVertical: 10,
        fontFamily: "Montserrat-Regular",
        fontSize: 15,
        color: "#5EB14E"
    }
})

export default LoginForm;