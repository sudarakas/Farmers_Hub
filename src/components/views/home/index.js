import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { connect } from "react-redux";
import { getItems } from "../../store/actions/item_actions";
import { bindActionCreators } from "redux";
import { generateGridPanel } from "../../util/misc";

import CategoryMenu from '../home/categorymenu';
import TemplateItem from '../home/templateItem';

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
            loading: true,
            selectedCategory: category,
            items: []
        })
        //display accroding to the category
        this.props.getItems(category).then(() => {
            console.log(this.props.Items.list)
            const newItems = generateGridPanel(this.props.Items.list);
            this.setState({
                loading: false,
                items: newItems
            })
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
        })
    }

    //display the item on the screen
    displayItems = () => (
        this.state.items.map((item, i) => (
            <TemplateItem
                key={`column-${i}`}
                item={item}
                iteration={i}
            />
        ))
    )


    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.mainContainer}>
                    <CategoryMenu
                        categories={this.state.categories}
                        selectedCategory={this.state.selectedCategory}
                        updateSelectedCategory={this.updateSelectedCategory}
                    />

                    {/* for loading animation while fetching data from server */}
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

                    <View style={styles.itemContainer}>
                        <View style={styles.itemBox}>
                            {this.displayItems()}
                        </View>
                    </View>

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
        backgroundColor: '#ffffff',
    },
    loading: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 150,
    },
    loadingText: {
        fontFamily: "Montserrat-Regular",
        color: '#A2A2A2'
    },
    itemContainer: {
        marginTop: 10,
        padding: 10,
        justifyContent: 'space-between',

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
