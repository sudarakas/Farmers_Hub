import React, { Component } from 'react';
import { StyleSheet, View, Text, InputText, TextInput } from 'react-native';


const input = (props) => {

    let template = null;

    //check the input type
    switch (props.type) {
        case "textinput":
            template =
                <TextInput
                    underlineColorAndroid="transparent"
                    {...props}
                    style={[styles.input, props.overrideStyle]}
                />
            break;
        default:
            return template
    }

    return template

}



const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: "#DBDBDB",
        fontSize: 18,
        paddingBottom: 10,
        fontFamily: "Montserrat-Light",
    }
})

export default input;