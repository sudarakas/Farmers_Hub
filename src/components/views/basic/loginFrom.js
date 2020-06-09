import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Input from '../../util/forms/input';
import Validation from '../../util/forms/validation';
import LoadTabs from '../tabs';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signUp, signIn } from '../../store/actions/user_actions';

class LoginForm extends Component {
    _isMounted = false;

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
                    isRequired: true,
                    isEmail: true
                }
            },
            password: {
                value: "",
                valid: false,
                type: "textinput",
                rules: {
                    isRequired: true,
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

    componentDidUpdate() {
        this._isMounted = true;
    }

    updateInput = (name, value) => {
        this.setState({
            hasErrors: false
        })

        //to update the form after applying the logic       
        let duplicateForm = this.state.form;
        duplicateForm[name].value = value;


        //validate the rules
        let rules = duplicateForm[name].rules
        let valid = Validation(value, rules, duplicateForm);

        duplicateForm[name].valid = valid;

        this.setState({
            form: duplicateForm
        })

    }

    forgotPassword = () => {
        if (this.state.type != 'Register') {
            return

        } else {
            return null;
        }
    }

    confirmPassword = () => {
        if (this.state.type != 'Login') {
            return <View>
                <Text style={styles.labelConfirmPassword}>Confirm Password</Text>
                <Input
                    placeholder="Confirm your password"
                    type={this.state.form.confirmPassword.type}
                    value={this.state.form.confirmPassword.value}
                    onChangeText={value => this.updateInput("confirmPassword", value)}
                    secureTextEntry
                />
            </View>
        } else {
            return <Text style={styles.forgotPassword}>Forgot Password?</Text>
        }
    }

    //show form errors
    showFormErrors = () => {
        if (this.state.hasErrors) {
            return <View style={styles.errorContainer}>
                <Text style={styles.errorMessage}> Oops! Please check your inputs.</Text>
            </View>
        } else {
            return null
        }

    }

    //update the form type
    changeFormType = () => {

        const type = this.state.type;
        this.setState({
            type: type === 'Login' ? 'Register' : 'Login',
            action: type === 'Login' ? 'SIGN UP' : 'SIGN IN',
            actionType: type === 'Login' ? "Already have an account?" : "Don't have an account? Sign Up",
            infoText: type === 'Login' ? "By creating an account, you are agreeing to our Terms and Conditions" : "Continue to Farmers' Hub",
        })
        const returnType = this.state.type === 'Login' ? 'Register' : 'Login';
        //update the parent page
        this.props.onChangeChildPageType(returnType);


    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    //submit the form
    submitUserForm = () => {
        let isValidForm = true;
        let submitForm = {};
        const duplicateForm = this.state.form;

        for (let key in duplicateForm) {

            //for login form
            if (this.state.type === 'Login') {
                if (key !== 'confirmPassword') {
                    //check the input filed is valid or not
                    isValidForm = isValidForm && duplicateForm[key].valid;
                    submitForm[key] = duplicateForm[key].value;
                }
            }
            //for register form
            else {
                //check the input filed is valid or not
                isValidForm = isValidForm && duplicateForm[key].valid;
                submitForm[key] = duplicateForm[key].value;
            }
        }

        //submit the form to firebase
        if (isValidForm) {
            this.state.type === 'Login' ?
                this.props.signIn(submitForm).then(() => {
                    console.log(this.props.User)
                })
                :
                this.props.signUp(submitForm).then(() => {
                    console.log(this.props.User)
                })
        } else {
            this.setState({
                hasErrors: true
            })
        }
    }

    navigateToHome = () => {
        this.state.type === 'Login' ? LoadTabs() : null
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

                {/* render element on regitser page */}
                {this.confirmPassword()}

                {/* display the error */}
                {this.showFormErrors()}

                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.submitUserForm}
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
                        onPress={this.navigateToHome}
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
    labelConfirmPassword: {
        marginHorizontal: 5,
        fontFamily: "Montserrat-Regular",
        color: "#A2A2A2",
        marginTop: 15
    },
    forgotPassword: {
        color: "#000000",
        textAlign: "right",
        marginTop: 22,
        fontSize: 15,
        fontFamily: "Montserrat-Light",
    },
    button: {
        alignItems: "center",
        backgroundColor: "#5EB14E",
        marginTop: 15,
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
    },
    errorContainer: {
        marginTop: 10,
    },
    errorMessage: {
        textAlign: "center",
        fontFamily: "Montserrat-Bold",
        fontSize: 15,
        color: "#E0002F"
    }
})

function mapStateToProps(state) {
    return {
        User: state.User
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ signUp, signIn }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);