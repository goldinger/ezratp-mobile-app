import React, {Component} from "react";
import {createStackNavigator, createAppContainer} from "react-navigation";
import {Text, View} from "react-native";

class AccountScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>My Account</Text>
      </View>
    );
  }
}

export default AccountScreen