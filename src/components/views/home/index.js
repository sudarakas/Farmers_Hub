import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, View, Text, } from 'react-native';

import { navigatorDeepLink } from "../../util/misc";

class Home extends Component {

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Text>Home Screen</Text>

            </View>
        )
    }

    //side bar navigation
    navigationButtonPressed({ buttonId }) {
        if (buttonId === 'sideMenu') {
            Navigation.mergeOptions(this.props.componentId, {
                sideMenu: {
                    left: {
                        visible: true,
                    }
                }
            });
        }

    }
}

//styles for the components
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    }
});

export default Home;
