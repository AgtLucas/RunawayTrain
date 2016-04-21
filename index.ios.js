/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  AcitivityIndicatorIOS,
  View
} from 'react-native'

class RunawayTrain extends Component {
  constructor () {
    super()
    this.state = {
      wallsJSON: [],
      isLoading: false
    }
  }

  componentDidMount () {
    this.fetchWallsJSON()
  }

  fetchWallsJSON () {
    let url = 'https://unsplash.it/list'

    fetch(url)
      .then(response => response.json())
      .then(jsonData => {
        console.log(jsonData)
      })
      .catch(error => console.log(`Fetch error: ${error}`))
  }

  renderLoadingMessage () {
    return (
      <View style={styles.loadingContainer}>
        <AcitivityIndicatorIOS
          animating={true}
          color={'#FFF'}
          size={'small'}
          style={{margin: 15}} />
        <Text style={{color: '#fff'}}>Unsplash &copy;</Text>
      </View>
    )
  }

  renderResults () {
    return (
      <View>
        <Text>Data loaded</Text>
      </View>
    )
  }

  render () {
    let { isLoading } = this.state

    if (isLoading) {
      return this.renderLoadingMessage()
    } else {
      return this.renderResults()
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})

AppRegistry.registerComponent('RunawayTrain', () => RunawayTrain)
