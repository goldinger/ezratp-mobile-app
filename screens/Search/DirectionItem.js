import PropTypes from "prop-types";
import {FlatList, Text, View} from "react-native";
import React from 'react';
import MissionItem from "./MissionItem";

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
        groupedMissions: [],
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
                let groupedMissions = {};
                missions.forEach(function (mission, index){
                    let ending = mission.stations[1].name;
                    if (!groupedMissions[ending]){
                        groupedMissions[ending] = []
                    }
                    groupedMissions[ending].push(mission);

                });
                let groupedList = [];
                for (const [key, value] of Object.entries(groupedMissions)){
                    groupedList.push({terminus: key, missions: value})
                }
                component.setState({
                    missions: missions,
                    groupedMissions: groupedList
                });
            });
    }

    _renderItem = ({item}) => {
        return <MissionItem
            terminus={item.terminus}
            missions={item.missions}
        />;
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>{this.state.directionName}</Text>
                <FlatList
                    data={this.state.groupedMissions}
                    extraData={this.state}
                    keyExtractor={(item) => item.terminus}
                    renderItem={this._renderItem}
                />
                <View style={{borderBottomColor: 'gray', borderBottomWidth: 1}}/>
            </View>
        )
    }
}

export default DirectionItem;