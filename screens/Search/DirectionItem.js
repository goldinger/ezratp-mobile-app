import PropTypes from "prop-types";
import {Text, TouchableOpacity, View} from "react-native";
import React from 'react';

class DirectionItem extends React.PureComponent {
    static propTypes = {
        onPressItem: PropTypes.func,
        stationName: PropTypes.string,
        lineId: PropTypes.string,
        directionName: PropTypes.string,
        directionSens: PropTypes.string
    };

    state = {
        missions: [],
        lineId: this.props.lineId,
        stationName: this.props.stationName,
        directionName: this.props.directionName,
        directionSens: this.props.directionSens
    };

    componentWillMount(): void {
        let component = this;
        fetch('https://ezratp.sghir.me/api/nextMissions?lineId=' + this.props.lineId + '&stationName=' + this.props.stationName + '&sens=' + this.props.directionSens)
            .then((response) => response.json())
            .then((responseJson) => {
                let missions = responseJson.missions;
                if(!Array.isArray(missions)){
                    missions = [missions]
                }
                component.setState({
                    missions: missions,
                });
            });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>{this.state.directionName}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                    {this.state.missions && this.state.missions.length > 0 &&
                    <Text>{this.state.missions[0].stationsMessages}</Text>
                    }
                    {this.state.missions && this.state.missions.length > 1 &&
                    <Text>{this.state.missions[1].stationsMessages}</Text>
                    }
                </View>
                <View style={{borderBottomColor: 'gray', borderBottomWidth: 1}}/>
            </View>
        )
    }
}

export default DirectionItem;