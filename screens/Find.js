import React, { Component } from 'react';
import { View } from 'react-native';
import { SearchBar, Button, ListItem } from "react-native-elements";

class FindScreen extends Component {
    state = {
        search: '',
        loading: false,
        results: []
    };

    updateSearch = search => {
        let state = this.state;
        state.search = search;
        this.setState(state);
        this.findStation(search);
    };

    findStation = (search) => {
        let state = this.state;
        state.loading = true;
        this.setState(state);
        let t = this;
        fetch('https://ezratp.sghir.me/api/stations?stationName=' + search)
            .then((response) => response.json())
            .then((responseJson) => {
                state.results = responseJson;
                state.loading = false;
                t.setState(state);
            });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <SearchBar
                    placeholder="Station name..."
                    showLoading={this.state.loading}
                    onChangeText={this.updateSearch}
                    value={this.state.search}
                />
                {/*<Button*/}
                    {/*title="Find it !"*/}
                    {/*onPress={() => this.findStation(this.state.search)}*/}
                    {/*loading={this.state.loading}*/}
                    {/*disabled={this.state.loading}*/}
                {/*/>*/}
                {
                    this.state.results.map((result) => (
                        <ListItem
                            key={result.id}
                            title={result.name + ' - ' + result.line.reseau.name + ' ' + result.line.code}
                        />
                    ))
                }
            </View>
        );
    }
}

export default FindScreen;