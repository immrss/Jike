import React, { PureComponent } from 'react'
import { View,Text,Image,Button,Alert } from 'react-native'
import Video from 'react-native-video';

let uri = 'http://sh.yinyuetai.com/uploads/videos/common/88DC015DB03C829C2126EEBBB5A887CB.mp4'

class VideoComponent extends PureComponent {
  constructor() {
    super();
    this.state = {
      playing: true
    }
  }

  render() {
    return (
      <View style={this.props.style}>
        <Video 
          source={{uri:uri}} // Can be a URL or a local file.
          rate={this.state.playing ? 1 : 0}                   // 0 is paused, 1 is normal.
          volume={1.0}                 // 0 is muted, 1 is normal.
          muted={false}                // Mutes the audio entirely.
          paused={false}               // Pauses playback entirely.
          resizeMode="cover"           // Fill the whole screen at aspect ratio.
          repeat={true}                // Repeat forever.
          onLoadStart={this.loadStart} // Callback when video starts to load
          onLoad={this.setDuration}    // Callback when video loads
          onProgress={this.setTime}    // Callback every ~250ms with currentTime
          onEnd={this.onEnd}           // Callback when playback finishes
          onError={this.videoError}    // Callback when video cannot be loaded
          style={{width:400,height:250}}
        >
        </Video>
        <Button 
          style={{backgroundColor:'white'}} 
          title='click'
          onPress={()=>this.setState({
            playing: !this.state.playing
          })}
        ></Button>
      </View>
    )
  }
}

export default class DiscoverPage extends PureComponent {
  constructor() {
    super();
  }

  static options = {
    name: 'asdasd',
    age: 25
  }
  render() {
    return (
      <View style={{backgroundColor:'black',flex:1}}>
        <VideoComponent style={{marginTop:40, width: 414,height:250}} 
          >
          <Image style={{width:160,height:160}} source={require('./image/ic_mediaplayer_videoplayer_play.png')}/>
        </VideoComponent>
        
      </View>
    )
  }


}
