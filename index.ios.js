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

import { uniqueRandonNumber, randomNumberInRange } from './utils/random-manager'

const NUM_WALLPAPERS = 5

class RunawayTrain extends Component {
  constructor () {
    super()
    this.state = {
      wallsJSON: [],
      isLoading: true
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
        let randomIds = uniqueRandonNumber(NUM_WALLPAPERS, 0, jsonData.length)
        let walls = []
        randomIds.forEach(randomId => {
          walls.push(jsonData[randomId])
        })
        this.setState({
          isLoading: false,
          wallsJSON: [].concat(walls)
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
    let { wallsJSON, isLoading } = this.state

    if (!isLoading) {
      return (
        <View>
          {wallsJSON.map((wallpaper, index) => {
            return (
              <Text key={index}>{wallpaper.id}</Text>
            )
          })}
        </View>
      )
    }
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
    backgroundColor: '#08C'
  }
})

AppRegistry.registerComponent('RunawayTrain', () => RunawayTrain)
