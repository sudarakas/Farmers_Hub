import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, View, Text, ScrollView, } from 'react-native';

import CategoryMenu from '../home/categorymenu';

class Home extends Component {

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);

        this.state ={
            categories:['Vegetables','Meat', 'Fruits','Cereals','Flowers','Others']
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.mainContainer}>
                    <CategoryMenu
                        categories={this.state.categories}
                    />
                </View>
            </ScrollView>
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
