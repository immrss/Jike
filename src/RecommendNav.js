import React, { PureComponent } from 'react'
import { StatusBar,Image } from 'react-native'
import { StackNavigator } from 'react-navigation';

import RecommendPage from './RecommendPage';
import TopicCenterPage from './TopicCenterPage';
import SearchPage from './SearchPage';
import VideoPlayPage from './VideoPlayPage';
import CommentPage from './CommentPage';

const RecommendNav = StackNavigator({
  root: { screen: RecommendPage },
  topicCenter: { screen: TopicCenterPage },
  search: { screen: SearchPage },
  video: { screen: VideoPlayPage },
  comment: { screen: CommentPage }
});

export default RecommendNav;
