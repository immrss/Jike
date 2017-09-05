import React, { PureComponent } from 'react'
import { View,Text,TouchableOpacity } from 'react-native'

export default class TopicCenterPage extends PureComponent {
  constructor() {
    super();
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.name,
    headerStyle: { backgroundColor: 'white' },
    headerRight: (
      <TouchableOpacity style={{marginRight:10}}>
        <Text>分享</Text>
      </TouchableOpacity>
    )
  });

  render() {
    return (
      <View style={{backgroundColor:'cyan',flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>TopicCenter</Text>
      </View>
    )
  }
}
