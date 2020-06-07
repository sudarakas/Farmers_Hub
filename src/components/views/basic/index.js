import { Navigation } from 'react-native-navigation';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated, ScrollView, Easing } from 'react-native';

import { getOrientation, setOrientationListener, removeOrientationListener } from '../../util/misc';


class Flash extends Component {

    constructor(props) {
        super(props)

        this.state = {
            orientation: getOrientation(500),
            mainText: new Animated.Value(0) //animation for the text (farmers hub)
        }

        setOrientationListener(this.changeOrientation)
    }

    changeOrientation = () => {
        this.setState({
            orientation: getOrientation(500)
        })
    }

    //action after component uncomunted
    componentWillUnmount() {
        removeOrientationListener()
    }

    //navigate to the login page
    navigateToLoginPage() {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'farmersHub.Login',
                options: {
                    animations: {
                        push: {
                            content: {
                                alpha: {
                                    from: 0,
                                    to: 1,
                                    duration: 500
                                }
                            }
                        }
                    },
                }
            }
        })
    }

    componentDidMount() {
        //run the animation
        Animated.sequence([
            Animated.timing(this.state.mainText, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
                easing: Easing.easeOutCubic
            })
        ]).start();

        //after 3ms navigate to the login page
        setTimeout(() => { this.navigateToLoginPage() }, 4000);

    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <View style={styles.mainContainer} >
                    <View style={styles.container}>
                        <Animated.View style={{
                            //increase the opacity of the text
                            opacity: this.state.mainText.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                                extrapolate: "clamp",
                            }),
                        }}>
                            <Text style={
                                this.state.orientation === 'portrait'   //specify the styles for the orientation
                                    ? styles.mainTextPortrait
                                    : styles.mainTextLandscape
                            }>FARMERS' HUB</Text>
                        </Animated.View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

//styles for the components
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#5EB14E',
    },
    mainTextPortrait: {
        fontSize: 60,
        color: "#ffffff",
        fontFamily: "Montserrat-Black",
        marginHorizontal: 20,
    },
    mainTextLandscape: {
        fontSize: 100,
        color: "#ffffff",
        fontFamily: "Montserrat-Black",
        marginHorizontal: 20,
    }
});

export default Flash;
