import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Navigation } from 'react-native-navigation';

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
    //render the menu button as defined in the state
    renderButton = (button) => (
        <Icon.Button
            key={button.value}
            name={button.iconName}
            backgroundColor='#ffffff'
            iconStyle={{ width: 18 }}
            color="#5EB14E"
            size={18}
            onPress={() => this.navigateFromSideMenu(button)}
        >
            <Text style={styles.buttonText}>
                {button.value}
            </Text>
        </Icon.Button>

    )

    //generate the menu buttons
    showSideMenuButtons = (buttons) => (
        buttons.map(button => (
            !button.privacy ?
                this.renderButton(button)
                : this.props.User.userData ?
                    this.renderButton(button)
                    : null
        ))
    )

    //naviagate from the side menu buttons
    navigateFromSideMenu = (button) => {

        //for tab switching
        if (button.typeLink === 'tab') {
            Navigation.mergeOptions('BOTTOM_TABS_LAYOUT', {
                bottomTabs: {
                    currentTabIndex: button.index
                },
                sideMenu: {
                    left: {
                        visible: false
                    }
                }
            })
        }
        //for page navigation (modal)
        else{
            Navigation.showModal({
                stack: {
                  children: [{
                    component: {
                      name: 'farmersHub.UserItems',
                      options: {
                        topBar: {
                            backButton: {
                                visible: false
                            }
                        }
                      }
                    },
                  }]
                }
              });
        }
    }

    


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