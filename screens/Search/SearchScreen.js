import StationItem from "./StationItem";
import {FlatList, View} from "react-native";
import {SearchBar} from "react-native-elements";
import React from 'react';

class FindScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    state = {
        search: '',
        loading: false,
        results: [],
        selected: (new Map(): Map<string, boolean>)
    };

    _updateSearch = search => {
        this.setState({search});
        this._findStation(search);
    };

    _findStation = (stationName) => {
        this.setState({loading:true});
        let t = this;
        fetch('https://ezratp.sghir.me/api/stations?stationName=' + stationName)
            .then((response) => response.json())
            .then((responseJson) => {
                t.setState({results:responseJson, loading: false});
            });
    };

    _onPressItem = (item) => {
        this.props.navigation.navigate('StationDetailsScreen', {station: item})
    };

    _renderItem = ({item}) => {
        return <StationItem
            id={item}
            onPressItem={this._onPressItem}
            // selected={!!this.state.selected.get(item.id)}
            stationName={item.name}
            lineName={item.line.reseau.name}
            lineCode={item.line.code}
            lineImage={item.line.image}
            reseauImage={item.line.reseau.image}
        />;
    };

    render() {
        return <View style={{flex: 1}}>
            <SearchBar
                placeholder="Station name..."
                lightTheme
                round
                showLoading={this.state.loading}
                onChangeText={this._updateSearch}
                autocorrect={false}
                value={this.state.search}
            />
            <FlatList
                data={this.state.results}
                extraData={this.state}
                keyExtractor={(item) => item.id}
                renderItem={this._renderItem}
            />
        </View>;
    }
}

export default FindScreen;