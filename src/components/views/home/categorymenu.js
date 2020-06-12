import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, View, Text, ScrollView, } from 'react-native';

class CategoryMenu extends Component {

    renderButtons = (categories) =>(
        categories ?
            categories.map(item => (
                <View style={styles.categoryButton} key={item}>
                    <Text style={styles.categoryButtonText}>{item}</Text>
                </View>
            ))
        :null
    )

    render() {
        return (
            <ScrollView
                horizontal={true}
                decelerationRate={0}
                snapToInterval={200}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.categoryMenu}>
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
    categoryButton:{
        marginRight:10,
        backgroundColor: '#F2F2F2',
        marginTop: 15,
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: "center"
        
    },
    categoryButtonText:{
        textAlign: 'center',
        textAlignVertical: 'center',
        color: "#000000",
        fontFamily: "Montserrat-Light",

        
    }
})

export default CategoryMenu;