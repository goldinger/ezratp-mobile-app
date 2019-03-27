import React from "react";
import {FlatList, Text, View} from "react-native";
import DirectionItem from "./DirectionItem";

class StationDetailsScreen extends React.Component {
    componentWillMount(): void {
        let station = this.props.navigation.getParam('station');
        this.setState({station});
    };

    componentDidMount(): void {
        let component = this;
        fetch('https://ezratp.sghir.me/api/directions/' + this.state.station.line.id)
            .then((response) => response.json())
            .then((responseJson) => {
                component.setState({directions: responseJson.directions});
            });
    };

    _renderItem = ({item}) => {
        return <DirectionItem
            stationName={this.state.station.name}
            lineId={this.state.station.line.id}
            directionName={item.name}
            directionSens={item.sens}
        />;
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "space-between" }}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text>{this.state.station.name}</Text>
                    <Text>{this.state.station.line.reseau.name}</Text>
                    <Text>{this.state.station.line.code}</Text>
                </View>
                <FlatList
                    data={this.state.directions}
                    extraData={this.state}
                    keyExtractor={(item) => item.sens}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

export default StationDetailsScreen;