import React, { 
  PureComponent 
} from 'react'
import { 
  View,
  Text,
  FlatList,
  Alert,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated 
} from 'react-native'
import FeedCell from './FeedCell';
import ImageBrowser from './ImageBrowser';
import VideoPlayPage from './VideoPlayPage';
import PopoverMenu from './PopoverMenu';
import SearchBar from './SearchBar';

function Feed(avatar,username,userdesc,content,images,key,media) {
  this.avatar = avatar;
  this.username = username;
  this.userdesc = userdesc;
  this.content = content;
  this.images = images;
  this.key = key;
  this.media = media;
}

export default class RecommendPage extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: '推荐',
    headerTintColor: 'black',
    headerStyle: { backgroundColor: 'white' }  
  });
  constructor() {
    super();
    this.state = {
      showSearchBar: false,
      dataList: [],
      modalVisible: false,
      images: []
    }
  }

  componentWillMount = ()=>{
    let json = require('./TrendHot.json');
    if (json.data) {
      this.setState({dataList: json.data});
    }
  }

  _itemArrowAction = (item,position)=>{
    let image1 = item.collected ? 
    require('./image/ic_messages_collect_selected.png') : 
    require('./image/ic_messages_collect_unselected.png');
    let title1 = item.collected ? '取消收藏' : '加入收藏';
    let image2 = require('./image/ic_common_close_black_rounded.png');
    let title2 = '不感兴趣';
    let items = [
      {image:image1,title:title1},
      {image:image2,title:title2}
    ];
    this.refs.moreMenu.show(items,position,(index)=>{
      if (index==0) {
        item.collected = !item.collected;
      } else if (index==1) {
        let index = -1;
        let list = this.state.dataList;
        for (let i=0;i<list.length;i++) {
          let data = list[i];
          if (item.id == data.id) {
            index = i;
            break;
          }
        }
        if (index >= 0) {
          list.splice(index,1);
          this.setState({dataList:list.slice()});
        }
      }
    });
  }

  _itemCommentAction = (item)=>{
    this.props.navigation.navigate('comment',{data:item});
  }

  _itemImageAction = (item,index)=>{

  }
  
  _itemVideoAction = (item)=>{
    this.props.navigation.navigate('video');
  }

  _itemAvatarAction = (item)=>{

  }
  _renderCell = (itemData)=>{
    let {item} = itemData;
    return (
      <FeedCell
        data={item}
        avatarPress={this._itemAvatarAction}
        imagePress={this._itemImageAction}
        commentPress={this._itemCommentAction}
        videoPress={this._itemVideoAction}
        arrowPress={this._itemArrowAction}
      />
    )
  }

  render = ()=>{
    return (
      <View style={{backgroundColor:'white',flex:1}}>
        <FlatList
          style={{flex:1}}
          data={this.state.dataList}
          keyExtractor={(item)=>item.id}
          renderItem={this._renderCell}
          onScroll={this.flatListOnScroll}
        />
        <PopoverMenu ref='moreMenu' />
      </View>
    )
  }

  _flatListOnScroll = (event)=>{
    let offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 200) {
      if (!this.state.showSearchBar) {
        this.setState({showSearchBar: true});        
      }
    } else {
      if (this.state.showSearchBar) {
        this.setState({showSearchBar: false});        
      }
    }
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    position:'absolute',
    left:0,
    top:0,
    right:0,
    height:64,
  },
  searchBar: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10
  }
});