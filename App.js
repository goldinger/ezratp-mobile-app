import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator, createAppContainer, HomeIconWithBadge} from "react-navigation";
import HomeScreen from "./screens/Home/HomeScreen";
import AccountScreen from "./screens/Account/AccountScreen";
import FindScreen from "./screens/Search/FindScreen";


const AppNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Find: {
            screen: FindScreen
        },
        Account: {
            screen: AccountScreen
        }
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: ({ navigation }) => ({
            header: null,
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Home') {
                    iconName = 'ios-home';
                } else if (routeName === 'Account') {
                    iconName = 'ios-person';
                } else if (routeName === 'Find') {
                    iconName = 'ios-search';
                }
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            showIcon: true
        }
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}