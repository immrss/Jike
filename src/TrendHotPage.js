import React, { PureComponent } from 'react';
import { View,Text } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TrendTabBar from './TrendTabBar';
import TrendTypePage from './TrendTypePage';

let icons = {
  hot: {
    unselected: require('./image/subscribe/ic_trends_hot_unselected.png'),
    selected: require('./image/subscribe/ic_trends_hot_selected.png')
  },
  video: {
    unselected: require('./image/subscribe/ic_trends_video_unselected.png'),
    selected: require('./image/subscribe/ic_trends_video_selected.png')
  },
  gif: {
    unselected: require('./image/subscribe/ic_trends_gif_unselected.png'),
    selected: require('./image/subscribe/ic_trends_gif_selected.png')
  },
  music: {
    unselected: require('./image/subscribe/ic_trends_music_unselected.png'),
    selected: require('./image/subscribe/ic_trends_music_selected.png')
  }
}

export default class TrendHotPage extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: '最新热门',
    headerTintColor: 'black',
    headerStyle: { backgroundColor: 'white' },
    tabBarVisible: false    
  });
  constructor() {
    super();
  }
  render() {
    return (
      <View style={{backgroundColor:'white',flex:1}}>
        <ScrollableTabView
          tabBarUnderlineColor='#e7e7e7'
          tabBarInactiveTextColor='mintcream'
          tabBarActiveTextColor='white'
          tabBarBackgroundColor='red'
          ref="scrollableTabView"
          initialPage={0}
          renderTabBar={() => <TrendTabBar icons={icons}/>}
        >
          <TrendTypePage tabLabel="hot" />
          <TrendTypePage tabLabel="video" />
          <TrendTypePage tabLabel="gif" />
          <TrendTypePage tabLabel="music" />
        </ScrollableTabView>
      </View>
    )
  }
}