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

import Swiper from 'react-native-swiper'
import { uniqueRandonNumber } from './utils/random-manager'

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
        <Swiper
          dot={<View style={styles.swiperDot} />}
          activeDot={<View style={styles.swiperActiveDot} />}
          loop={false}
          >
          {wallsJSON.map((wallpaper, index) => {
            return (
              <Text key={index}>{wallpaper.id}</Text>
            )
          })}
        </Swiper>
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
  },
  swiperDot: {
    backgroundColor: 'rgba(255,255,255,.4)',
    width: 8,
    height: 8,
    borderRadius: 10,
    marginTop: 3,
    marginRight: 3,
    marginBottom: 3,
    marginLeft: 3
  },
  swiperActiveDot: {
    backgroundColor: '#fff',
    width: 13,
    height: 13,
    borderRadius: 7,
    marginTop: 7,
    marginRight: 7,
    marginLeft: 7
  }
})

AppRegistry.registerComponent('RunawayTrain', () => RunawayTrain)
