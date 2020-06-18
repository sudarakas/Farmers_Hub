import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const TemplateItem = (props) => {

    const itemText = (item) => (
        <View style={styles.itemTextContainer}>
            <Text style={styles.itemTextTitle}>{item.title}</Text>
            <Text style={styles.itemTextUnit}>{item.unit}</Text>
            <Text style={styles.itemTextPrice}>{item.price} LKR</Text>
        </View>
    )

    const itemImage = (item) => (
        <View>
            <Image
                resizeMode={"cover"}
                style={styles.itemImage}
                source={{ uri: item.image }}
            />
        </View>

    )

    const itemBlock = ({ item, i }) => {

        //if row has 2 elements
        if (item.block02) {
            return (
                <View style={styles.itemBlockRow}>
                    <View style={styles.itemBlock}>
                        <TouchableOpacity

                            onPress={() => props.navigateTo(item.block01)}
                        >
                            <View>
                                {itemImage(item.block01)}
                                {itemText(item.block01)}
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.itemBlock}>
                        <TouchableOpacity
                            onPress={() => props.navigateTo(item.block02)}
                        >
                            <View>
                                {itemImage(item.block02)}
                                {itemText(item.block02)}
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            )

            //if row has 1 element
        } else {
            return (
                <View style={styles.itemBlockRow}>
                    <View style={styles.itemBlock}>
                        <TouchableOpacity

                            onPress={() => props.navigateTo(item.block01)}
                        >
                            <View>
                                {itemImage(item.block01)}
                                {itemText(item.block01)}
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            )
        }
    }

    return (
        <View>
            {itemBlock(props)}
        </View>
    )

}

const styles = StyleSheet.create({
    itemBlockRow: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        padding: 3,

    },
    itemBlock: {
        flex: 2,
        marginHorizontal: 5,
        backgroundColor: '#ffffff',
        borderColor: "#DFDFDF",
        borderWidth: 2,
        padding: 7,
        borderRadius: 8,

    },
    itemImage: {
        borderRadius: 10,
        width: '100%',
        height: 150,
        borderColor: "#DFDFDF",
        borderWidth: 0.5,
    },
    itemTextContainer: {
        marginVertical: 15,
        marginLeft: 5
    },
    itemTextTitle: {
        fontSize: 15,
        fontFamily: "Montserrat-Regular",
        color: '#000000'
    },
    itemTextUnit: {
        fontSize: 15,
        fontFamily: "Montserrat-Regular",
        color: '#000000'
    },
    itemTextPrice: {
        fontSize: 13,
        fontFamily: "Montserrat-Bold",
        color: '#5EB14E',
        marginTop: 3,
    }

})

export default TemplateItem;