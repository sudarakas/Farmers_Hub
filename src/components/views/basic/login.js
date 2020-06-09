import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, Animated, Easing, ActivityIndicator } from 'react-native';
import { getOrientation, setOrientationListener, removeOrientationListener, getTokens, storeTokens } from '../../util/misc';

import LoginPanel from "./loginPanel";

import { connect } from "react-redux";
import { autoSignIn } from '../../store/actions/user_actions';
import { bindActionCreators } from "redux";
import LoadTabs from '../tabs';


class Home extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)

        this.state = {
            loading: true,
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

        //check the device has tokens
        getTokens((value) => {
            if (value[0][1] === null) {
                //if not redirects to the login
                this.setState({ loading: false })
            } else {
                //check the existing token
                this.props.autoSignIn(value[1][1]).then(() => {
                    //if stored token is not valid redirect to login 
                    if (!this.props.User.userData.token) {
                        this.setState({ loading: false })
                    } else {
                        //otherwise update the data in store and redirect to home
                        storeTokens(this.props.User.userData, () => {
                            LoadTabs();
                        })
                    }
                })
            }
        })

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

        if (this.state.loading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator
                        size="large"
                        color="#5EB14E"
                    />
                </View>
            )
        }
        else {
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
    },
    loading: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: "center",
        justifyContent: "center"
    }
});

function mapStateToProps(state) {
    return {
        User: state.User
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ autoSignIn }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
