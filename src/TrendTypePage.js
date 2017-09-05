import React, { PureComponent } from 'react'
import { View,Text,FlatList,Alert,Modal,TouchableOpacity } from 'react-native'
import FeedCell from './FeedCell';

function Feed(avatar,username,userdesc,content,images,key,media) {
  this.avatar = avatar;
  this.username = username;
  this.userdesc = userdesc;
  this.content = content;
  this.images = images;
  this.key = key;
  this.media = media;
}

//https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2182925329,386985427&fm=117&gp=0.jpg

export default class TrendTypePage extends PureComponent {
  constructor() {
    super();
    this.state = {
      dataList: []
    }
  }

  componentWillMount() {
    let json;
    if (this.props.tabLabel == 'hot') {
      json = require('./TrendHot.json');
    } else if (this.props.tabLabel == 'video') {
      json = require('./TrendVideo.json');
    } else if (this.props.tabLabel == 'gif') {
      json = require('./TrendGif.json');
    } else if (this.props.tabLabel == 'music') {
      json = require('./TrendMusic.json');
    }
    if (json.data) {
      this.setState({dataList: json.data});
    }
  }

  renderCell(itemData) {
    let {item} = itemData;
    return (
      <FeedCell data={item} />
    )
  }
  render() {
    return (
      <View style={{backgroundColor:'white',flex:1}}>
        <FlatList
          data={this.state.dataList}
          keyExtractor={(item)=>item.id}
          renderItem={this.renderCell.bind(this)}
        />
      </View>
    )
  }
}