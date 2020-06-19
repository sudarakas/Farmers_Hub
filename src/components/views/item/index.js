import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';

const Item = (props) => {

    //render the image on the page
    const renderItemImage = () => (
        <View style={styles.itemImageContainer}>
            <Image
                resizeMode={'cover'}
                style={styles.itemImage}
                source={{ uri: props.itemData.image }}
            />
        </View>
    )

    const renderItemDetail = () => (
        <View style={styles.itemDetailContainer}>
            <View style={styles.itemPriceUnitContainer}>
                <Text style={styles.itemPrice}>{props.itemData.price} LKR</Text>
                <Text style={styles.itemUnit}>{props.itemData.unit}</Text>
            </View>
            <Text style={styles.itemTitle}>{props.itemData.title}</Text>
            <Text style={styles.itemDescTitle}>Product Details</Text>
            <Text style={styles.itemDesc}>{props.itemData.description}</Text>
        </View>
    )

    const renderContactSeller = () => (
        <View style={styles.itemContactButtonContainer}>
            <TouchableOpacity
                style={styles.itemContactButton}
                onPress={() => { Linking.openURL(`tel:${props.itemData.contact}`) }}
            >
                <Text style={styles.itemContactButtonText}>Contact Seller</Text>
            </TouchableOpacity>
        </View>
    )


    return (
        <ScrollView style={styles.mainContainer}>
            {renderItemImage()}
            {renderItemDetail()}
            {renderContactSeller()}
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#ffffff',
        marginTop: 5
    },
    itemImageContainer: {
        position: 'relative',
    },
    itemImage: {
        width: '100%',
        height: 250,
    },
    itemDetailContainer: {
        marginTop: 35,
        marginHorizontal: 15,
    },
    itemPriceUnitContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemPrice: {
        textAlign: 'left',
        fontSize: 20,
        fontFamily: "Montserrat-Bold",
        color: '#5EB14E',
    },
    itemUnit: {
        textAlign: 'right',
        fontSize: 20,
        fontFamily: "Montserrat-Regular",
        color: '#C2C2C2',
    },
    itemTitle: {
        marginVertical: 10,
        fontSize: 25.5,
        color: '#000000',
        fontFamily: "Montserrat-Light",
    },
    itemDescTitle: {
        marginTop: 10,
        fontSize: 18,
        color: '#000000',
        fontFamily: "Montserrat-Light",

    },
    itemDesc: {
        marginTop: 10,
        fontSize: 16,
        color: '#A2A2A2',
        fontFamily: "Montserrat-Regular",
    },
    itemContactButtonContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        marginVertical: 20,
    },
    itemContactButton: {
        backgroundColor: "#5EB14E",
        marginTop: 20,
        paddingVertical: 20,
        borderRadius: 10,
        width: '80%'
    },
    itemContactButtonText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#ffffff',
        fontFamily: "Montserrat-Bold",
    }
});

export default Item;