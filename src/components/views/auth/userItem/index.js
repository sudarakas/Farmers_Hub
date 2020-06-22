import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, View, Text, } from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserItems } from "../../../store/actions/user_actions"

class UserItems extends Component {

    componentDidMount() {
        const UID = this.props.User.userData.uid;
        this.props.getUserItems(UID);
    }

    render() {
        return (
            <Text>User Post</Text>
        )
    }
}

//styles for the components
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
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