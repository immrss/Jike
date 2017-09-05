import React, {
  PureComponent 
} from 'react'
import { 
  View,
  Text,
  Image,
  Alert,
  Slider,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Dimensions 
} from 'react-native'
import Video from 'react-native-video';
import { videoPageImage } from './Resource'; 

let uri = 'http://sh.yinyuetai.com/uploads/videos/common/88DC015DB03C829C2126EEBBB5A887CB.mp4';

let screeW = Dimensions.get('screen').width;

function formatTime(seconds) {
  if (seconds == 0) {
    return '00:00';
  } else {
    let min;
    if (seconds/60 < 10) {
      min = '0' + parseInt(seconds/60);
    } else {
      min = parseInt(seconds/60).toString();
    }
    let sec;
    if (seconds%60 < 10) {
      sec = '0' + parseInt(seconds%60);
    } else {
      sec = parseInt(seconds%60).toString();
    }
    return min + ':' + sec;
  }
}

export default class VideoPlayPage extends PureComponent {
  
  static navigationOptions = ({ navigation }) => ({
    header: null,
    tabBarVisible: false
  })

  constructor() {
    super();
    this.barHide = false;
    this.timer = null;
    this.state = {
      progress: 0.0,
      current: 0.0,
      duration: 0.0,
      rate: 1,
      paused: false,
      finish: false,
      barOpacity: new Animated.Value(1)
    }
  }

  componentDidMount() {
    this.barStateAnimation(2000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  barStateAnimation(delay=0) {
    let to = this.barHide ? 1 : 0;
    Animated.timing(
      this.state.barOpacity,{
        toValue: to,
        duration: 250,
        easing: Easing.linear,
        delay: delay
      }
    ).start((finish)=>{
      if (finish) {
        this.barHide = !this.barHide;
        if (!this.state.finish) {
          if (!this.barHide) {
            this.timer = setTimeout(()=>{
              this.barStateAnimation();
            },4000);
          }
        }
      }
    });
  }

  render() {
    let playButtonImage = this.state.paused ? videoPageImage.play : videoPageImage.pause;
    let progress = this.state.duration > 0 ? this.state.current/this.state.duration : 0;
    let progressText = formatTime(this.state.current) + '/' +formatTime(this.state.duration);
    return (
      <TouchableWithoutFeedback 
        onPress={()=>{
          if (this.barHide) {
          } else {
            if (this.timer) {
              clearTimeout(this.timer);
            }
          }
          this.barStateAnimation();
        }}
      >
        <View style={styles.container}>
          <Video 
            style={styles.video} 
            ref='player'
            source={{uri:uri}}
            volume={1.0}
            muted={false}
            paused={this.state.paused} 
            resizeMode="center"
            repeat={false}
            onLoadStart={this.loadStart}
            onLoad={(data)=>this.setState({duration: data.duration})}
            onProgress={(data)=>{
              if (data.currentTime <= this.state.duration) {
                this.setState({current: data.currentTime})
              }
            }}
            onEnd={()=>{
              this.setState({finish:true});
              if (this.barHide) {
                this.barStateAnimation();
              }
            }}
            onError={()=>this.setState({finish:true})}
          />
          {
            this.state.finish ? (
              <View style={styles.finishMask}>
                <TouchableOpacity 
                  style={styles.replay}
                  onPress={()=>{
                    this.refs.player.seek(0);
                    this.setState({
                      finish: false
                    });
                  }}
                >
                  <Image style={{flex:1}} source={videoPageImage.replay} />
                </TouchableOpacity>
              </View>
            ) : null
          }
          <Animated.View style={[styles.topBar,{opacity:this.state.barOpacity}]}>
            <TouchableOpacity 
              style={{width:20,height:20}} 
              onPress={()=>this.props.navigation.goBack()}
            >
              <Image style={{flex:1}} source={videoPageImage.close} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={{width:20,height:20}}
              onPress={()=>this.setState({paused: true})}
            >
              <Image style={{flex:1}} source={videoPageImage.pip} />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.bottomBar,{opacity:this.state.barOpacity}]}>
            <TouchableOpacity
              style={{width:16,height:16}}
              onPress={()=>this.setState({paused:!this.state.paused})}
            >
              <Image style={{flex:1}} source={playButtonImage} />
            </TouchableOpacity>
            <Slider 
              style={{width:screeW/2}}
              minimumTrackTintColor='#1eaaf1'
              value={progress}
              thumbImage={videoPageImage.sliderThumb}
              onSlidingComplete={(value)=>this.refs.player.seek(this.state.duration*value)}
            />
            <Text style={{color: 'white',fontSize:12}}>{progressText}</Text>
            <TouchableOpacity
              style={{width:16,height:16}}
              onPress={()=>this.setState({rate:this.state.rate ? 0 : 1})}
            >
              <Image style={{flex:1}} source={playButtonImage} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 30
  },
  video: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  finishMask: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  replay: {
    width: 44,
    height: 44
  },
  bottomBar: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',    
    alignItems: 'center',
    paddingHorizontal: 12    
  }
});