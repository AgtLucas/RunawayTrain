import React, {
  View,
  Text,
  Component,
  ActivityIndicatorIOS
} from 'react-native'

class ProgressHUD extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let { width, height, isVisible } = this.props
    if (isVisible) {
      return (
        <View
          style={{
            position: 'absolute',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: width,
            height: height,
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, .5)'
          }}>
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

export default ProgressHUD
