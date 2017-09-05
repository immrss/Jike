/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan
 * @flow
 */
 
//import liraries
import React, { PureComponent } from 'react'
import { StatusBar,Image } from 'react-native'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import RecommendPage from './RecommendPage';
import SubscribePage from './SubscribePage';
import DiscoverPage from './DiscoverPage';
import MinePage from './MinePage';
import RecommendNav from './RecommendNav';
import SubscribeNav from './SubscribeNav';

class TabBarItem extends PureComponent {
    render() {
        let selectedImage = this.props.selectedImage ? this.props.selectedImage : this.props.normalImage
        return (
            <Image
                source={this.props.focused
                    ? selectedImage
                    : this.props.normalImage}
                style={{ tintColor: this.props.tintColor, width: 25, height: 25 }}
            />
        );
    }
}

class RootScene extends PureComponent {
  constructor() {
    super()
  }

  render() {
    return (
      <Tab/>
    );
  }
}

const Tab = TabNavigator(
    {
        Recommend: {
            screen: RecommendNav,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '推荐',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./image/tabbar/ic_tabbar_recommend_unselected.png')}
                        selectedImage={require('./image/tabbar/ic_tabbar_recommend_selected.png')}
                    />
                )
            }),
        },
        Subscribe: {
            screen: SubscribeNav,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '关注',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./image/tabbar/ic_tabbar_subscription_unselected@.png')}
                        selectedImage={require('./image/tabbar/ic_tabbar_subscription_selected.png')}
                    />
                )
            }),
        },

        Discover: {
            screen: DiscoverPage,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '发现',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./image/tabbar/ic_tabbar_discovery_unselected.png')}
                        selectedImage={require('./image/tabbar/ic_tabbar_discovery_selected.png')}
                    />
                )
            }),
        },

        Mine: {
            screen: MinePage,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '我的',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./image/tabbar/ic_tabbar_personal_unselected.png')}
                        selectedImage={require('./image/tabbar/ic_tabbar_personal_selected.png')}
                    />
                )
            }),
        },
    },
    {
      tabBarComponent: TabBarBottom,
      tabBarPosition: 'bottom',
      swipeEnabled: false,
      animationEnabled: false,
      lazy: true,
      tabBarOptions: {
      activeTintColor: '#1eaaf1',
      inactiveTintColor: '#a2a2a2',
      style: { backgroundColor: '#ffffff' },
    },
  }
);
const Navigator = StackNavigator(
  {
    Tab: { screen: Tab },
  },
  {
    navigationOptions: {
      // headerStyle: { backgroundColor: color.theme }
      headerBackTitle: null,
      headerTintColor: '#333333',
      showIcon: true,
    }
  }
);
export default RootScene;
