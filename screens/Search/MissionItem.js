import {Text, View} from "react-native";
import React from 'react';
import PropTypes from "prop-types";

class MissionItem extends React.PureComponent {
    static propTypes = {
        terminus: PropTypes.string,
        missions: PropTypes.arrayOf(PropTypes.object)
    };

    state = {
        first: {},
        next: {},
    };

    compare = (a, b) => {
        let adate = new Date(a['stationsDates']);
        let bdate = new Date(b['stationsDates']);
        if (adate < bdate){
            return -1
        }
        else if (adate > bdate){
            return 1
        }
        else {
            return 0
        }
    };

    componentWillMount(): void {
        let sorted = this.props.missions.sort(this.compare);
        if (sorted.length > 0){
            this.setState({first: sorted[0]})
        }
        else if (sorted.length > 1){
            this.setState({first: sorted[0], next: sorted[1]})
        }

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>{this.props.terminus}</Text>
                <Text>{this.state.first.stationsMessages}</Text>
                <Text>{this.state.next.stationsMessages}</Text>
            </View>
        )
    }
}

export default MissionItem;