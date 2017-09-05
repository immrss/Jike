import React, { PureComponent } from 'react';
import { View,Text,TouchableOpacity,Dimensions } from 'react-native';
import SearchBar from './SearchBar';

export default class SubscribePage extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: null,
    headerStyle: { backgroundColor: 'white' },
    headerLeft: (
      <SearchBar style={{marginLeft:15, width: Dimensions.get('screen').width-90}} />
    ),
    headerRight: (
      <TouchableOpacity 
        style={{marginRight: 15}}
        onPress={()=>navigation.navigate('search')}
      >
        <Text style={{height:18,fontSize:18}}>分类</Text>
      </TouchableOpacity>
    )
  });
  constructor() {
    super();
  }
  render() {
    return (
      <View style={{backgroundColor:'white',flex:1}}>
        <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}
          onPress={()=>this.props.navigation.navigate('trend')}
        >
          <Text>{'jump'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}