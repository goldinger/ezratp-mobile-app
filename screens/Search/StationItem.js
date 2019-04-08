import PropTypes from "prop-types";
import {Text, TouchableOpacity, View} from "react-native";
import React from 'react';
import {Image} from "react-native-elements";

class StationItem extends React.PureComponent {
    static propTypes = {
        onPressItem: PropTypes.func,
        stationName: PropTypes.string,
        lineName: PropTypes.string,
        lineCode: PropTypes.string,
        lineImage: PropTypes.any,
        reseauImage: PropTypes.string
    };

    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        let codeImage;
        if (typeof this.props.lineImage === 'string'){
            codeImage = <Image
                resizeMode={'contain'}
                style={{width: 30, height: 20}}
                source={{uri: 'https://ezratp.sghir.me/api/image/' + this.props.lineImage}}/>
        } else {
            codeImage = <Text>{this.props.lineCode}</Text>
        }
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity style={{flexDirection: 'row', padding: 10}} onPress={this._onPress}>
                    <Image
                        resizeMode={'contain'}
                        style={{width: 40, height: 40, marginRight: 10}}
                        source={{uri: 'https://ezratp.sghir.me/api/image/' + this.props.reseauImage}}/>
                    <View>
                        <Text style={{}}>{this.props.stationName}</Text>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={{}}>{this.props.lineName} </Text>
                            {codeImage}
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{borderBottomColor: 'gray', borderBottomWidth: 1}}/>
            </View>
        )
    }
}

export default StationItem;