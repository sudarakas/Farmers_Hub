import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, View, Text, ScrollView, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserItems, deleteUserItem } from "../../../store/actions/user_actions"

class UserItems extends Component {

    constructor(props) {
        //refer the propos
        super(props);

        this.state = {
            items: [],
            isModalVisible: false,
            setModalVisible: false,
            deleteProduct: ''
        }
    }

    componentDidMount() {
        const UID = this.props.User.userData.uid;
        this.props.getUserItems(UID);
        // console.log(UID)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.User.userItems) {
            this.setState({
                items: nextProps.User.userItems,
            })
        }
    }

    //modal dismiss
    toggleModal = () => {
        this.setState({ setModalVisible: false })
    };

    //confirm message to the user
    confirmDelete = (productId) => {
        this.setState({
            setModalVisible: true,
            deleteProduct: productId
        })
    };

    //delete user item
    deleteItem = (itemId) => {
        //pass the itemId and user token to the deleteUserItem function
        this.props.deleteUserItem(itemId, this.props.User.userData).then(() => {
            const UID = this.props.User.userData.uid;
            this.props.getUserItems(UID);

            this.setState({
                setModalVisible: false,
                deleteProduct: ''
            })
        });
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
                                onPress={() => this.confirmDelete(item.id)}
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

                    {/* delete modal */}

                    {
                        this.state.setModalVisible ?

                            <View style={{ flex: 1 }}>
                                <Modal
                                    isVisible={true}
                                    animationIn='slideInUp'
                                    style={styles.modal}
                                    onSwipeComplete={this.toggleModal}
                                    swipeDirection={['up', 'left', 'right', 'down']}
                                >
                                    <View style={styles.modalContainer}>
                                        <Text style={styles.topText}>Delete! Are you sure?</Text>
                                        <Text style={styles.bottomText}>You won't be able to undo this action.</Text>
                                        <TouchableOpacity
                                            style={styles.deleteConfirmButton}
                                            onPress={() => this.deleteItem(this.state.deleteProduct)}
                                        >
                                            <Text style={styles.deleteConfirmButtonText}>Delete Product</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            </View>

                            : null
                    }
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
    delete: {
        backgroundColor: '#E0002F',
        padding: 5,
        borderRadius: 7,
    },
    deleteText: {
        color: '#ffffff',
        paddingHorizontal: 35
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    deleteConfirmButton: {
        backgroundColor: "#E0002F",
        borderRadius: 3,
    },
    deleteConfirmButtonText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#ffffff',
        marginHorizontal: 15,
        marginVertical: 5,
        fontFamily: "Montserrat-Bold",
    },
    topText: {
        textAlign: 'center',
        color: '#E0002F',
        fontSize: 18,
        fontFamily: "Montserrat-Light",
    },
    bottomText: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 12,
        fontFamily: "Montserrat-Light",
        marginBottom: 13,
        letterSpacing: 3
    },
});

function mapStateToProps(state) {
    console.log(state)
    return {
        User: state.User
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getUserItems, deleteUserItem }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserItems);