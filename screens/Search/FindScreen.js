import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import SearchScreen from "./SearchScreen";
import StationDetailsScreen from "./StationDetailsScreen";


const AppNavigator = createStackNavigator({
        SearchScreen: {
            screen: SearchScreen
        },
        StationDetailsScreen: {
            screen: StationDetailsScreen
        }
    },
    {
        initialRouteName: "SearchScreen",
    }
);

export default createAppContainer(AppNavigator);