import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import Input from '../../util/forms/input'

class LoginForm extends Component {

    state = {
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
            form:duplicateForm
        })

    }

    render() {
        return (
            <View>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    }
})

export default LoginForm;