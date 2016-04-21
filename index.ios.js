import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  ActivityIndicatorIOS,
  Dimensions,
  View
} from 'react-native'

import Swiper from 'react-native-swiper'
import NetworkImage from 'react-native-image-progress'
import Progress from 'react-native-progress'
import { uniqueRandonNumber } from './utils/random-manager'

const NUM_WALLPAPERS = 5

let { width, height } = Dimensions.get('window')

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
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          >
          {wallsJSON.map((wallpaper, index) => {
            return (
              <View key={index}>
                <NetworkImage
                  source={{uri: `https://unsplash.it/${wallpaper.width}/${wallpaper.height}?image=${wallpaper.id}`}}
                  indicator={Progress.Circle}
                  style={styles.wallpaperImage}
                  >

                </NetworkImage>
              </View>
            )
          })}
        </Swiper>
      )
    }
  }

  onMomentumScrollEnd () {
    console.log(123)
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
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
    marginLeft: 6
  },
  wallpaperImage: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: '#000'
  }
})

AppRegistry.registerComponent('RunawayTrain', () => RunawayTrain)
