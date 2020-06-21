import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

import ImagePicker from 'react-native-image-picker'
import UUIDGenerator from 'react-native-uuid-generator';
import storage from '@react-native-firebase/storage';

import Input from '../../../util/forms/input';
import Validation from '../../../util/forms/validation';

import { uploadPostToCloud, clearItemReducers, getItem } from "../../../store/actions/item_actions";
import { autoSignIn } from "../../../store/actions/user_actions";
import { getTokens, storeTokens } from "../../../util/misc";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class AddItem extends Component {

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    state = {
        hasErrors: false,
        imageUpload: false,
        postUpload: false,
        form: {
            category: {
                value: "",
                name: "category",
                valid: false,
                type: "picker",
                options: ['Select Product Category', 'Vegetables', 'Meat', 'Fruits', 'Cereals', 'Flowers', 'Others'],
                rules: {
                    isRequired: true,
                }
            },
            title: {
                value: "",
                valid: false,
                type: "textinput",
                rules: {
                    isRequired: true,
                    maxLength: 50
                }
            },
            description: {
                value: "",
                valid: false,
                type: "textinput",
                rules: {
                    isRequired: true
                }
            },
            unit: {
                value: "",
                name: "unit",
                valid: false,
                type: "picker",
                options: ['Select Unit', 'Kg', 'Unit'],
                rules: {
                    isRequired: true,
                }
            },
            price: {
                value: "",
                valid: false,
                type: "textinput",
                rules: {
                    isRequired: true
                }
            },
            contact: {
                value: "",
                valid: false,
                type: "textinput",
                rules: {
                    isRequired: true
                }
            },
            image: {
                value: ""
            }
        }
    }

    updateInput = (name, value) => {
        this.setState({
            hasErrors: false
        })

        //to update the form after applying the logic       
        let duplicateForm = this.state.form;
        duplicateForm[name].value = value;


        //validate the rules
        let rules = duplicateForm[name].rules
        let valid = Validation(value, rules, duplicateForm);

        duplicateForm[name].valid = valid;

        this.setState({
            form: duplicateForm
        })

    }

    //upload the image to firestore
    uploadAndReturnFirestoreLink = async (loaclPath, folderPath) => {
        try {
            //reference the image folder
            const imageRef = storage().ref(folderPath);
            //upload the image to the defined folder
            await imageRef.putFile(loaclPath, { contentType: 'image/jpg' });
            //get the image link for adding to the state
            const url = await imageRef.getDownloadURL();
            //set the uploadloding as false to confim upload is done
            this.setState({
                imageUpload: false
            });
            return url
        } catch (e) {
            console.log(e);
        }
    };

    //upload imag and set the image state
    uploadImageFirestore = () => {

        //define the image uplaod options
        const options = {
            title: 'Select Product Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        //trigger the image uploader
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                //set the uploadloding as true to confim upload is started
                this.setState({
                    imageUpload: true
                });

                //used a UUID generator to generate a random name for the image
                UUIDGenerator.getRandomUUID((uuid) => {
                    this.uploadAndReturnFirestoreLink(response.path, 'products/images/' + `${uuid}`).then((url) => {
                        this.updateInput("image", url)
                    })
                });

            }
        });
    }

    navigateToItem = (props) => {
        Navigation.showModal({
            stack: {
                children: [{
                    component: {
                        name: 'farmersHub.Item',
                        passProps: {
                            itemData: props
                        }
                    }
                }]
            },
        });
    }

    //navigate the user to product page
    navigateToItem = (props) => {
        Navigation.showModal({
            stack: {
                children: [{
                    component: {
                        name: 'farmersHub.Item',
                        passProps: {
                            itemData: props
                        }
                    }
                }]
            },
        });
    }

    //get the product data and navigate the user to product
    viewAddedItem = (itemId) => {

        this.props.getItem(itemId).then((response) => {
            this.navigateToItem(response.payload)
        })
    }


    //switch the user to Home
    navigateToHome = (addedItemId) => {

        Navigation.mergeOptions('BOTTOM_TABS_LAYOUT', {
            bottomTabs: {
                currentTabIndex: 0
            }
        });

        //popup an alert for user
        Alert.alert(
            'Success',
            'Product has been added!',
            [
                {
                    text: 'Cancels',
                    onPress: () => console.log('OK Pressed')
                },
                {
                    text: 'View Product',
                    onPress: () => this.viewAddedItem(addedItemId)
                }
            ],
            { cancelable: true }
        );


    }

    //reset the form after successfull submission
    resetAddProductForm = () => {
        const duplicateForm = this.state.form;

        for (let key in duplicateForm) {
            duplicateForm[key].valid = false;
            duplicateForm[key].value = "";
        }

        this.setState({
            hasErrors: false,
            uploadPost: false
        })

        //clear the reducers
        this.props.clearItemReducers()
    }

    //upload the post to the firebase
    uploadPost = () => {
        let isValidForm = true;
        let submitForm = {};
        const duplicateForm = this.state.form;

        //loop the each element and check the validations
        for (let key in duplicateForm) {
            isValidForm = isValidForm && duplicateForm[key].valid
            submitForm[key] = this.state.form[key].value
        }

        //after check the form validation submit the form to cloud
        if (isValidForm) {
            getTokens((value) => {
                //get the current date and time
                const currentDate = new Date();
                //get the timestamp
                const expiration = currentDate.getTime();
                //combine the form with user id
                const form = {
                    ...submitForm,
                    uid: value[3][1]
                }
                //check the stored token is expired or not
                //if expired, used auto login to refresh the token
                //otherwise submit the form

                if (expiration > value[2][1]) {
                    this.props.autoSignIn(value[1][1]).then(() => {
                        //update the new token
                        storeTokens(this.props.User.userData, () => {
                            this.props.uploadPostToCloud(form, this.props.User.userData.token).then(() => {
                                this.navigateToHome()
                            })
                        })
                    })
                } else {
                    this.props.uploadPostToCloud(form, value[0][1]).then((response) => {
                        this.resetAddProductForm()
                        this.navigateToHome(response.payload.name)
                    })
                }

            })

        } else {
            this.setState({ hasErrors: true })
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.mainContainer}>

                    <View style={styles.inputText}>
                        <Text style={styles.label}>Product Title*</Text>
                        <Input
                            placeholder="Enter your product title"
                            type={this.state.form.title.type}
                            value={this.state.form.title.value}
                            overrideStyle={{ fontSize: 16 }}
                            style={styles.inputText}
                            onChangeText={value => this.updateInput("title", value)}
                        />
                    </View>

                    <View style={styles.inputText}>
                        <Text style={styles.label}>Product Description*</Text>
                        <Input
                            placeholder="Enter your product description"
                            type={this.state.form.description.type}
                            value={this.state.form.description.value}
                            overrideStyle={{ fontSize: 16, paddingBottom: 30, }}
                            style={styles.inputText}
                            onChangeText={value => this.updateInput("description", value)}
                            multiline={true}
                        />
                    </View>



                    {/* for picker */}
                    <Text style={styles.label}>Unit*</Text>
                    <View style={styles.picker}>
                        <Input
                            placeholder="Unit"
                            type={this.state.form.unit.type}
                            value={this.state.form.unit.value}
                            onValueChange={value => this.updateInput("unit", value)}
                            options={this.state.form.unit.options}
                        />
                    </View>

                    <View style={styles.inputText}>
                        <Text style={styles.label}>Price (LKR)*</Text>
                        <Input
                            placeholder="Enter your unit price"
                            type={this.state.form.price.type}
                            value={this.state.form.price.value}
                            overrideStyle={{ fontSize: 16 }}
                            style={styles.inputText}
                            onChangeText={value => this.updateInput("price", value)}
                            keyboardType={"numeric"}
                        />
                    </View>

                    {/* for picker */}
                    <Text style={styles.label}>Category*</Text>
                    <View style={styles.picker}>
                        <Input
                            placeholder="Category"
                            type={this.state.form.category.type}
                            value={this.state.form.category.value}
                            onValueChange={value => this.updateInput("category", value)}
                            options={this.state.form.category.options}
                        />
                    </View>

                    <View style={styles.inputText}>
                        <Text style={styles.label}>Mobile No*</Text>
                        <Input
                            placeholder="Enter your contact number"
                            type={this.state.form.contact.type}
                            value={this.state.form.contact.value}
                            overrideStyle={{ fontSize: 16 }}
                            style={styles.inputText}
                            onChangeText={value => this.updateInput("contact", value)}
                        />
                    </View>

                    <TouchableWithoutFeedback style={{ marginBottom: 15 }} onPress={this.uploadImageFirestore}>
                        <Text style={styles.imageUpload}>Pick an image</Text>
                    </TouchableWithoutFeedback>

                </View>

                <View>
                    {this.state.imageUpload ? (
                        <View style={styles.imageUploadLoading}>
                            <ActivityIndicator
                                size="small"
                                color="#5EB14E"
                            />
                            <Text style={styles.imageUploadLoadingText}>Please wait... Image is uploading</Text>
                        </View>
                    ) : (
                            null
                        )}
                </View>

                {
                    //show form errors
                    this.state.hasErrors ?
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorMessage}> Oops! Please check your inputs.</Text>
                        </View>
                        :
                        null
                }

                <View style={styles.itemContactButtonContainer}>
                    {
                        this.state.postUpload ?
                            <View style={styles.imageUploadLoading}>
                                <ActivityIndicator
                                    size="small"
                                    color="#5EB14E"
                                />
                                <Text style={styles.imageUploadLoadingText}>Please wait... your post is submitting</Text>
                            </View>
                            :
                            <TouchableOpacity
                                style={styles.itemContactButton}
                                onPress={this.uploadPost}
                            >
                                <Text style={styles.itemContactButtonText}>Sell Product</Text>
                            </TouchableOpacity>
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
        paddingHorizontal: 15,
        paddingTop: 20
    },
    label: {
        color: '#A2A2A2',
        fontFamily: "Montserrat-Medium",
        fontSize: 13,
        paddingLeft: 1
    },
    picker: {
        borderBottomWidth: 1,
        borderColor: '#DBDBDB',
        fontSize: 15,
        marginBottom: 20,
        fontFamily: "Montserrat-Light",
    },
    inputText: {
        marginBottom: 20,
    },
    imageUpload: {
        marginTop: 5,
        marginBottom: 10,
        fontSize: 18,
        color: '#5EB14E',
        fontFamily: "Montserrat-Regular",

    },
    itemContactButtonContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        marginVertical: 15,
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
    },
    imageUploadLoading: {
        alignContent: 'center',
    },
    imageUploadLoadingText: {
        textAlign: 'center',
        color: '#A2A2A2',
        fontSize: 12,
        fontFamily: "Montserrat-Light",
    },
    errorContainer: {
        alignContent: 'center',
        marginTop: 10
    },
    errorMessage: {
        textAlign: 'center',
        color: '#E0002F',
        fontSize: 12,
        fontFamily: "Montserrat-Bold",
    }
});

function mapStateToProps(state) {
    return {
        Items: state.Item,
        User: state.User
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ uploadPostToCloud, autoSignIn, clearItemReducers, getItem }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
