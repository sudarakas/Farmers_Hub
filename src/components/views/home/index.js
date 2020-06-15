import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { connect } from "react-redux";
import { getItems } from "../../store/actions/item_actions";
import { bindActionCreators } from "redux";
import { generateGridPanel } from "../../util/misc";

import CategoryMenu from '../home/categorymenu';

class Home extends Component {

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);

        this.state = {
            loading: true,
            items: [],
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
    componentDidMount() {
        this.props.getItems('All').then(() => {
            const newItems = generateGridPanel(this.props.Items.list);

            this.setState({
                loading: false,
                items: newItems
            })
            console.log(newItems);
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

                    {
                        this.state.loading ?
                            <View style={styles.loading}>
                                <ActivityIndicator
                                    size="large"
                                    color="#5EB14E"
                                />
                                <Text style={styles.loadingText}>Please wait ....</Text>

                            </View>
                            : null
                    }
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
    },
    loading: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 150,
    },
    loadingText:{
        fontFamily: "Montserrat-Regular",
        color: '#A2A2A2'
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
