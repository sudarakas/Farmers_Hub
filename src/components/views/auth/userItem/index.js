import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, View, Text, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserItems } from "../../../store/actions/user_actions"

class UserItems extends Component {

    constructor(props) {
        //refer the propos
        super(props);

        this.state = {
            items: []
        }
    }

    componentDidMount() {
        const UID = this.props.User.userData.uid;
        const po = this.props.getUserItems(UID);
        console.log(UID)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.User.userItems) {
            this.setState({
                items: nextProps.User.userItems,
            })
        }
    }

    showUserItems = (items) => (
        items ?
            items.map(item => (
                <View style={styles.itemContainer} key={item.id}>
                    <View style={styles.image}>
                        <Image
                            resizeMode={"cover"}
                            style={styles.itemImage}
                            source={{ uri: item.image }}
                        />
                    </View>
                    <View style={styles.detail}>
                        <Text style={styles.category}>{item.category}</Text>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.price}>{item.price} LKR</Text>
                    </View>
                    <View style={styles.deleteContainer}>
                        <View style={styles.delete}>
                            <TouchableWithoutFeedback
                                style={styles.deleteButton}
                                onPress={() => alert('delete')}
                            >
                                <Text style={styles.deleteText}>Delete</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            ))
            : null
    )

    render() {
        return (
            <ScrollView>
                <View style={styles.mainContainer}>
                    <View>
                        <Text style={styles.count}>You have added {this.state.items.length} products</Text>
                    </View>

                    {this.showUserItems(this.state.items)}

                </View>
            </ScrollView>
        )
    }
}

//styles for the components
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        marginVertical: 15
    },
    count: {
        textAlign: 'right',
        fontSize: 13,
        marginHorizontal: 5,
        color: '#A2A2A2',
        fontWeight: "800",
        fontFamily: "Montserrat-Light",
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 5,
        backgroundColor: '#ffffff',
        borderColor: "#DFDFDF",
        borderWidth: 0.5,
        padding: 8,
        borderRadius: 8,
    },
    image: {
        flex: 3,
        marginRight: 15
    },
    itemImage: {
        borderRadius: 10,
        width: '100%',
        height: 130,
        borderColor: "#DFDFDF",
        borderWidth: 0.5,
    },
    detail: {
        flex: 4,
        marginTop: 10
    },
    category: {
        fontSize: 12,
        color: '#5EB14E',
        fontWeight: "800",
        fontFamily: "Montserrat-Bold",
    },
    title: {
        fontSize: 22,
        color: '#000000',
        fontFamily: "Montserrat-Light",

    },
    price: {
        fontSize: 15,
        color: '#5EB14E',
        fontWeight: "800",
        fontFamily: "Montserrat-Bold",
        marginTop: 10
    },
    deleteContainer: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        margin: 5,
    },
    delete:{
        backgroundColor: '#E0002F',
        padding: 5,
        borderRadius: 7,
    },
    deleteText: {
        color: '#ffffff',
        paddingHorizontal: 35
    }
});

function mapStateToProps(state) {
    console.log(state)
    return {
        User: state.User
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getUserItems }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserItems);