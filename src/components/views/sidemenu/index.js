import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { connect } from "react-redux";

class SideMenu extends Component {

    state = {
        buttons: [
            {
                value: "Home",
                iconName: "home",
                shoudNavTo: "farmersHub.Home",
                typeLink: "tab",
                index: 0,
                privacy: false
            },
            {
                value: "Sell",
                iconName: "dollar-sign",
                shoudNavTo: "farmersHub.AddItem",
                typeLink: "tab",
                index: 1,
                privacy: false
            },
            {
                value: "My Items",
                iconName: "folder-minus",
                shoudNavTo: "farmersHub.Home",
                typeLink: "view",
                index: null,
                privacy: true
            }
        ]
    }

    renderButton = (button) => (
        <Icon.Button
            key={button.value}
            name={button.iconName}
            backgroundColor='#ffffff'
            iconStyle={{ width: 18 }}
            color="#5EB14E"
            size={18}
            onPress={() => alert('fu')}
        >
            <Text style={styles.buttonText}>
                {button.value}
            </Text>
        </Icon.Button>

    )

    showSideMenuButtons = (buttons) => (
        buttons.map(button => (
            !button.privacy ?
                this.renderButton(button)
                : this.props.User.userData ?
                    this.renderButton(button)
                    : null
        ))
    )


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.menuTitle}>Farmers' Hub</Text>
                <View style={styles.buttonBar}>
                    {this.showSideMenuButtons(this.state.buttons)}
                </View>
            </View>
        )
    }
}

//styles for the components
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    buttonText: {
        fontSize: 18,
        color: "#000000",
        fontFamily: "Montserrat-Light",
    },
    buttonBar: {
        padding: 10,
        marginTop: 15,
    },
    menuTitle: {
        fontSize: 20,
        fontFamily: "Montserrat-Bold",
        textAlign: "center",
        marginTop: 30,
        fontWeight: "600",
        color: "#5EB14E"
    }
});

function mapStateToProps(state) {
    return {
        User: state.User
    }
}

export default connect(mapStateToProps, null)(SideMenu);