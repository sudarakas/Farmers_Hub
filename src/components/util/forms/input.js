import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-community/picker';


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
        case "picker":
            template =
                <Picker
                    selectedValue={props.value}
                    style={{ width: '100%',fontFamily: "Montserrat-Light"}}
                    {...props}
                >
                    {
                        props.options.map((item, i) => (
                            <Picker.Item key={i} label={item} value={item} />
                        ))
                    }
                </Picker>
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
    },

})

export default input;