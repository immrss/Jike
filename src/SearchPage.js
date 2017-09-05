import React, { PureComponent } from 'react';
import { View,Text,Dimensions,TouchableOpacity,AsyncStorage } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import MinePage from './MinePage';
import SearchAllPage from './SearchAllPage';
import SearchBar from './SearchBar'

export default class SearchPage extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Home',
    headerStyle: { backgroundColor: 'white' },
    headerLeft: (
      <SearchBar 
        style={{marginLeft:15, width: Dimensions.get('screen').width-90}} 
        submit={(text)=>{
          let key = 'search_history';
          AsyncStorage.getItem(key,(err,result)=>{
            if (!err) {
              let old = result ? result.split(',') : [];
              old.push(text);
              AsyncStorage.setItem(key,old.join(','),(err)=>{
                if (!err) {
                  
                }
              });
            }
          });
        }}  
      />
    ),
    headerRight: (
      <TouchableOpacity 
        style={{marginRight: 15}}
        onPress={()=>navigation.goBack()}
      >
        <Text style={{height:18,fontSize:18}}>返回</Text>
      </TouchableOpacity>
    )
  });

  constructor() {
    super();
  }
  render() {
    return (
      <View style={{backgroundColor:'white',flex:1}}>
        <ScrollableTabView
          tabBarUnderlineStyle={{backgroundColor:'#1eaaf1',height:2}}
          tabBarInactiveTextColor='#bfbfc0'
          tabBarActiveTextColor='#1eaaf1'
          tabBarBackgroundColor='white'
          ref="scrollableTabView"
          tabBarTextStyle={{fontSize:15}}
          initialPage={0}
          renderTabBar={() => <DefaultTabBar style={{height:44}}/>}
        >
          <SearchAllPage tabLabel="综合" ref='searchAll' />
          <MinePage tabLabel="主题" />
          <MinePage tabLabel="消息" />
          <MinePage tabLabel="用户" />
        </ScrollableTabView>
      </View>
    )
  }
}