import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';
import moment from 'moment';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usd: 0,
      oneHour: 0,
      twentyFourHour: 0,
      sevenDay: 0,
      update: ''
    };

    this.handlePress = this.handlePress.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  componentDidMount() {
    this.updateState();
  }

  handlePress() {
    this.updateState();
  }

  updateState() {
    axios('https://api.coinmarketcap.com/v1/ticker/ripple/').then(res => {
      const data = res.data[0];
      console.log(data);
      this.setState({
        usd: Number(data.price_usd).toFixed(2),
        oneHour: data['percent_change_1h'],
        twentyFourHour: data['percent_change_24h'],
        sevenDay: data['percent_change_7d'],
        update: moment.unix(data['last_updated']).format('MM/DD/YY hh:mm:ss')
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Ripple Stats</Text>
        <View style={styles.data}>
          <Text style={styles.text}>USD: ${this.state.usd}</Text>
          <Text style={styles.text}>
            1h:
            <Text style={this.state.oneHour < 0 ? styles.down : styles.up}>{this.state.oneHour}%</Text>
          </Text>
          <Text style={styles.text}>
            24h:
            <Text style={this.state.twentyFourHour < 0 ? styles.down : styles.up}>{this.state.twentyFourHour}%</Text>
          </Text>
          <Text style={styles.text}>
            7d:
            <Text style={this.state.sevenDay < 0 ? styles.down : styles.up}>{this.state.sevenDay}%</Text>
          </Text>
          <Text style={{ marginBottom: 10 }}>Last Upadted: {this.state.update}</Text>
          <Button color="hsl(204, 86%, 53%)" onPress={this.handlePress} title="Refresh" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsl(0, 0%, 96%)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  data: {
    width: '60%',
    borderColor: 'black',
    borderWidth: 0.5,
    padding: 10,
    backgroundColor: 'white'
  },
  text: {
    marginBottom: 5,
    fontSize: 20,
    color: 'hsl(0, 0%, 21%)'
  },
  textAllign: {
    width: 60
  },
  down: {
    color: 'hsl(348, 100%, 61%)'
  },
  up: {
    color: 'hsl(141, 71%, 48%)'
  },
  header: {
    fontSize: 30,
    marginBottom: 5
  }
});
