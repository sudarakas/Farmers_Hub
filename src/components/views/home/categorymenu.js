import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';

class CategoryMenu extends Component {

    //render the category button based on the selection
    renderButtons = (categories) => (
        categories ?
            categories.map(item => (
                this.props.selectedCategory === item ?
                    <TouchableWithoutFeedback key={item} onPress={() => this.props.updateSelectedCategory(item)}>
                        <View style={styles.categoryButtonSelected}>
                            <Text style={styles.categoryButtonTextSelected}>{item}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    :
                    <TouchableWithoutFeedback key={item} onPress={() => this.props.updateSelectedCategory(item)}>
                        <View style={styles.categoryButton}>
                            <Text style={styles.categoryButtonText}>{item}</Text>
                        </View>
                    </TouchableWithoutFeedback>
            ))
            : null
    )

    render() {
        return (
            <ScrollView
                horizontal={true}
                decelerationRate={0}
                snapToInterval={200}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.categoryMenu}
                    onPress
                >
                    {this.renderButtons(this.props.categories)}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    categoryMenu: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        width: '100%',
        height: 50
    },
    categoryButton: {
        marginRight: 10,
        backgroundColor: '#F2F2F2',
        marginTop: 15,
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: "center"
    },
    categoryButtonText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: "#000000",
        fontFamily: "Montserrat-Regular",
    },
    categoryButtonSelected: {
        marginRight: 10,
        backgroundColor: '#5EB14E',
        marginTop: 15,
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: "center"
    },
    categoryButtonTextSelected: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: "#ffffff",
        fontFamily: "Montserrat-Regular",
    }
})

export default CategoryMenu;