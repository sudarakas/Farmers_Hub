import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, View, Text, ScrollView, } from 'react-native';

import { connect } from "react-redux";
import { getItems } from "../../store/actions/item_actions";
import { bindActionCreators } from "redux";

import CategoryMenu from '../home/categorymenu';

class Home extends Component {

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);

        this.state = {
            categories: ['All', 'Vegetables', 'Meat', 'Fruits', 'Cereals', 'Flowers', 'Others'],
            selectedCategory: 'All'
        }
    }

    //update the state
    updateSelectedCategory = (category) => {
        this.setState({
            selectedCategory: category
        })
    }

    //fetch the items from the database
    componentDidMount(){
        this.props.getItems('All').then(() =>{
            console.log(this.props.Items.list)
        })
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.mainContainer}>
                    <CategoryMenu
                        categories={this.state.categories}
                        selectedCategory={this.state.selectedCategory}
                        updateSelectedCategory={this.updateSelectedCategory}
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

function mapStateToProps(state) {
    return {
        Items: state.Item
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getItems }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
