import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

// Your eBird API key for demonstration
const API_KEY = '5ms7hdo849vo';
const REGION_CODE = 'US-NY'; // For New York as an example

export default class App extends Component {
  state = {
    birdSighting: null,
    error: null,
  };

  fetchBirdSighting = () => {
    fetch(`https://api.ebird.org/v2/data/obs/${REGION_CODE}/recent`, {
      headers: {
        'X-eBirdApiToken': API_KEY,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          this.setState({ birdSighting: data[0], error: null });
        } else {
          throw new Error('No sightings found');
        }
      })
      .catch(error => {
        this.setState({ error: error.toString() });
      });
  };

  render() {
    const { birdSighting, error } = this.state;

    return (
      <View style={styles.container}>
        <Button title="Fetch Bird Sighting" onPress={this.fetchBirdSighting} />

        {birdSighting && (
          <View style={styles.dataContainer}>
            <Text>Species: {birdSighting.comName}</Text>
            <Text>Location: {birdSighting.locName}</Text>
            <Text>Date: {birdSighting.obsDt}</Text>
          </View>
        )}

        {error && <Text>Error: {error}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  dataContainer: {
    marginTop: 20,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
});

