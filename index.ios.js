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
  ActivityIndicatorIOS,
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
        this.setState({
          isLoading: false
        })
      })
      .catch(error => console.log(`Fetch error: ${error}`))
  }

  renderLoadingMessage () {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicatorIOS
          animating={true}
          color={'#FFF'}
          size={'small'}
          style={{margin: 15}} />
        <Text style={{color: '#fff'}}>Contacting Unsplash api</Text>
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
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  }
})

AppRegistry.registerComponent('RunawayTrain', () => RunawayTrain)
