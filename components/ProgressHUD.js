import React, {
  View,
  Text,
  Component,
  StyleSheet,
  ActivityIndicatorIOS
} from 'react-native'

class ProgressHUD extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { isVisible } = this.props
    if (isVisible) {
      return (
        <View style={styles.progressHudView}>
          <ActivityIndicatorIOS
            animating={true}
            color={'#fff'}
            size={'large'}
            style={{margin: 15}}
            />
          <Text style={{color: '#fff'}}>Please wait...</Text>
        </View>
      )
    } else {
      return (<View />)
    }
  }
}

const styles = StyleSheet.create({
  progressHudView: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: this.props.width,
    height: this.props.height,
    top: 0,
    left: 0,
    backgroundColor: 'rbga(0, 0, 0, 0.5)'
  }
})

export default ProgressHUD
