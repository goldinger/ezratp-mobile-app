import PropTypes from "prop-types";
import {Text, TouchableOpacity, View} from "react-native";
import React from 'react';

class StationItem extends React.PureComponent {
    static propTypes = {
        onPressItem: PropTypes.func,
        stationName: PropTypes.string,
        lineName: PropTypes.string,
        lineCode: PropTypes.string
    };

    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        // const textColor = this.props.selected ? 'red' : 'black';
        return (
            <View>
                <TouchableOpacity style={{flex:1, flexDirection: 'column', padding: 10}} onPress={this._onPress}>
                    <Text style={{}}>{this.props.stationName}</Text>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={{}}>{this.props.lineName} - {this.props.lineCode}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{borderBottomColor: 'gray', borderBottomWidth: 1}}/>
            </View>
        )
    }
}

export default StationItem;