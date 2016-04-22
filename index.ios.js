import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  ActivityIndicatorIOS,
  Dimensions,
  PanResponder,
  CameraRoll,
  AlertIOS,
  View
} from 'react-native'

import Swiper from 'react-native-swiper'
import NetworkImage from 'react-native-image-progress'
import Progress from 'react-native-progress'
import { uniqueRandonNumber } from './utils/random-manager'
import distance from './utils/distance'
import ProgressHUD from './components/ProgressHUD'

const NUM_WALLPAPERS = 5
const DOUBLE_TAP_DELAY = 300
const DOUBLE_TAP_RADIUS = 20

let { width, height } = Dimensions.get('window')

class RunawayTrain extends Component {
  constructor () {
    super()
    this.state = {
      wallsJSON: [],
      isLoading: true,
      isHudVisible: false
    }
    this.imagePanResponder = {}
    this.prevTouchInfo = {
      prevTouchX: 0,
      prevTouchY: 0,
      prevTouchTimeStamp: 0
    }
    this.currentWallIndex = 0

    this.handlePanResponderGrant = this.handlePanResponderGrant.bind(this)
    this.onMomentumScrollEnd = this.onMomentumScrollEnd.bind(this)
  }

  componentDidMount () {
    this.fetchWallsJSON()
  }

  componentWillMount () {
    this.imagePanResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd
    })
  }

  handleStartShouldSetPanResponder (e, gestureState) {
    return true
  }

  handlePanResponderGrant (e, gestureState) {
    let currentTouchTimeStamp = Date.now()

    if (this.isDoubleTap(currentTouchTimeStamp, gestureState)) {
      this.saveCurrentWallpaperToCameraRoll()
    }

    this.prevTouchInfo = {
      prevTouchX: gestureState.x0,
      prevTouchY: gestureState.y0,
      prevTouchTimeStamp: currentTouchTimeStamp
    }
  }

  handlePanResponderEnd (e, gestureState) {
    console.log('Finger pulled up from the image.')
  }

  isDoubleTap (currentTouchTimeStamp, {x0, y0}) {
    let { prevTouchX, prevTouchY, prevTouchTimeStamp } = this.prevTouchInfo
    let dt = currentTouchTimeStamp - prevTouchTimeStamp

    return (dt < DOUBLE_TAP_DELAY && distance(prevTouchX, prevTouchY, x0, y0) < DOUBLE_TAP_RADIUS)
  }

  saveCurrentWallpaperToCameraRoll () {
    this.setState({ isHudVisible: true })

    let { wallsJSON } = this.state
    let currentWall = wallsJSON[this.currentWallIndex]
    let currentWallUrl = `http://unsplash.it/${currentWall.width}/${currentWall.height}?image=${currentWall.id}`

    this.setState({ isHudVisible: false })

    CameraRoll.saveImageWithTag(currentWallUrl)
      .then(data => {
        AlertIOS.alert(
          'Saved!',
          'Wallpaper successfully saved to Camera Roll',
          [
            {
              text: 'High 5!',
              onPress: () => console.log('Ok, pressed!')
            }
          ]
        )
      })
      .catch(err => console.log('Error saving to Camera Roll', err))
  }

  onMomentumScrollEnd (e, state, context) {
    this.currentWallIndex = state.index
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
    let { wallsJSON, isLoading, isHudVisible } = this.state

    if (!isLoading) {
      return (
        <View>
          <Swiper
            dot={<View style={styles.swiperDot} />}
            activeDot={<View style={styles.swiperActiveDot} />}
            loop={false}
            onMomentumScrollEnd={this.onMomentumScrollEnd}
            index={this.currentWallIndex}
            >
            {wallsJSON.map((wallpaper, index) => {
              return (
                <View key={wallpaper.id}>
                  <NetworkImage
                    source={{uri: `https://unsplash.it/${wallpaper.width}/${wallpaper.height}?image=${wallpaper.id}`}}
                    indicator={Progress.Circle}
                    indicatorProps={{
                      color: 'rgba(255, 255, 255, 1)',
                      size: 60,
                      thickness: 7
                    }}
                    {...this.imagePanResponder.panHandlers}
                    style={styles.wallpaperImage}>
                    <Text style={styles.label}>Photo by</Text>
                    <Text style={styles.authorNameLabel}>{wallpaper.author}</Text>
                  </NetworkImage>
                </View>
              )
            })}
          </Swiper>
          <ProgressHUD width={width} height={height} isVisible={isHudVisible} />
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
    marginRight: 7,
    marginLeft: 7
  },
  wallpaperImage: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: '#000'
  },
  label: {
    position: 'absolute',
    color: '#fff',
    fontSize: 13,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 2,
    paddingLeft: 5,
    top: 20,
    left: 20,
    width: width / 2
  },
  authorNameLabel: {
    position: 'absolute',
    color: '#fff',
    fontSize: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 2,
    paddingLeft: 5,
    top: 41,
    left: 20,
    fontWeight: 'bold',
    width: width / 2
  }
})

AppRegistry.registerComponent('RunawayTrain', () => RunawayTrain)
