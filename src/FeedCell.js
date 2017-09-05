
import React, { PureComponent } from 'react'
import { 
  View,
  Text,
  FlatList,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  PixelRatio
} from 'react-native'
import FeedImageComponent from './FeedImageComponent';
import Video from 'react-native-video';
import ImageButton from './ImageButton';
import {feedCellImage} from './Resource';

let pixelRatio = PixelRatio.get();
let contentW = Dimensions.get('screen').width-20;

export default class FeedCell extends PureComponent {
  constructor() {
    super();
  }
  render = ()=>{
    let data = this.props.data;
    if (!data) {
      return null;
    }
    let topic = data.topic;
    let date = new Date(data.createdAt);
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <View style={styles.top}>
            <TouchableOpacity onPress={()=>this.props.avatarPress()}>
              <Image source={{uri:topic.thumbnailUrl}} style={styles.avatar}/>
            </TouchableOpacity>
            <View style={styles.topRight}>
              <TouchableOpacity>
                <Text style={{fontSize:14,color:'#1eaaf1'}}>{topic.content}</Text>
              </TouchableOpacity>
              <Text style={{fontSize: 13}}>{date.toLocaleString()}</Text>
            </View>
            <TouchableOpacity
              style={styles.arrow}
              onPress={(event)=>{
                if (this.props.arrowPress) {
                  this.props.arrowPress(data,{x:event.nativeEvent.pageX,y:event.nativeEvent.pageY});
                }
              }}
            >
              <Image source={feedCellImage.arrow} style={{width:12,height:7}}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.content}>{data.content}</Text>
          {
            data.pictureUrls&&data.pictureUrls.length ? 
            (
              <FeedImageComponent
                style={{marginTop: 10}}
                images={data.pictureUrls}
                onPress={(index)=>this.props.imagePress(data,index)}
              />
            ) : null
          }
          {
            data.media ? (<FeedMusicComponent media={data.media} style={{marginTop:10}} />) : null
          }
          {
            data.video ? 
            (
              <TouchableWithoutFeedback onPress={()=>this.props.videoPress()}>
                <View style={styles.video}>
                  <Image style={styles.videoThumb} source={{uri:data.video.thumbnailUrl}} resizeMode='stretch' />
                  <Image style={styles.videoPlay} source={feedCellImage.playVideo} />
                </View>
              </TouchableWithoutFeedback>
            ) : null
          }
          <View style={styles.footer}>
            <ImageButton 
              title={data.likeCount.toString()} 
              image={feedCellImage.like} 
              onPress={()=>this.props.likePress(data)}
            />
            <ImageButton 
              style={{marginLeft:30}} 
              title={data.commentCount.toString()} 
              image={feedCellImage.comment} 
              onPress={()=>this.props.commentPress(data)}/>
            <ImageButton 
              style={{marginLeft:30}} 
              image={feedCellImage.repost}
              onPress={()=>this.props.repostPress(data)}
            />
            <ImageButton 
              style={styles.share} 
              image={feedCellImage.share}
              onPress={()=>this.props.sharePress(data)}
            />
          </View>
        </View>
      </View>
    );
  }
}

let screenW = Dimensions.get('screen').width;
let screenH = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    paddingBottom: 7
  },
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: 'white'
  },
  top: {
    flexDirection: 'row'
  },
  topRight: {
    justifyContent: 'space-between',
    paddingLeft: 10
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 4
  },
  arrow: {
    width:22,
    height:22,
    position:'absolute',
    right:0,
    top:0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 23
  },
  video: {
    marginTop: 10,
    height: contentW*0.6
  },
  videoThumb:{
    flex: 1
  },
  videoPlay: {
    position: 'absolute',
    left: (screenW-46)/2.0,
    top: (240-26)/2,
    width: 26,
    height: 26,
  },
  footer: {
    borderTopWidth: 1/pixelRatio,
    borderTopColor: '#dbdadc',
    marginTop: 10,
    flexDirection: 'row',
    paddingTop: 10
  },
  share: {
    position: 'absolute',
    right: 0,
    bottom: 0
  }
});

let uri = 'http://sh.yinyuetai.com/uploads/videos/common/88DC015DB03C829C2126EEBBB5A887CB.mp4'

class FeedMusicComponent extends PureComponent {
  constructor() {
    super();
    this.state = {
      playing: false
    };
  }
  render() {
    let media = this.props.media;
    return (
      <View style={[musicStyles.container,this.props.style]}>
        <TouchableOpacity 
          style={musicStyles.avatar}
          onPress={()=>this.setState({playing: !this.state.playing})}
        >
          <Image style={{flex:1}} source={{uri:media.coverUrl}} />
          <Image style={musicStyles.icon} source={require('./image/ic_personaltab_activity_audio_play.png')} /> 
        </TouchableOpacity>
        <View style={musicStyles.textContainer}>
          <Text style={{fontSize:16}} numberOfLines={1}>{media.title}</Text>
          <Text style={{fontSize:14,color:'#807f81'}} numberOfLines={1}>{media.author}</Text>
        </View>
        <Video 
          source={{uri:uri}}
          rate={this.state.playing ? 1 : 0}
          volume={1.0}
          muted={false}
          paused={false}
          resizeMode="cover"
          repeat={false}
          onLoadStart={this.loadStart}
          onLoad={this.setDuration}
          onProgress={this.setTime}
          onEnd={this.onEnd}
          onError={this.videoError}
        />
      </View>
    );
  }
}

const musicStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f2f5',
    flex: 1,
    flexDirection: 'row',
    padding: 5
  },
  avatar: {
    width: 60,
    height: 60
  },
  icon: {
    position:'absolute',
    top: 15,
    bottom: 15,
    left: 15,
    right: 15
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'space-around'
  }
});