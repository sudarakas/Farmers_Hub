import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';

import Input from '../../../util/forms/input';
import Validation from '../../../util/forms/validation';

class AddItem extends Component {

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    state = {
        hasErrors: false,
        form: {
            category: {
                value: "",
                name: "category",
                valid: false,
                type: "picker",
                options: ['Vegetables', 'Meat', 'Fruits', 'Cereals', 'Flowers', 'Others'],
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
                options: ['Kg', 'Unit'],
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
            image: null
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

                <View style={styles.itemContactButtonContainer}>
            <TouchableOpacity
                style={styles.itemContactButton}
                onPress={() => { this.uploadPost}}
            >
                <Text style={styles.itemContactButtonText}>Sell Product</Text>
            </TouchableOpacity>
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
    imageUpload:{
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
        width: '90%'
    },
    itemContactButtonText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#ffffff',
        fontFamily: "Montserrat-Bold",
    }
});

export default AddItem;
