import React, { PureComponent } from 'react'
import { View,Text,SectionList,TouchableOpacity,StyleSheet,Alert } from 'react-native'
import CommentCell from './CommentCell';
import FeedCell from './FeedCell';

export default class CommentPage extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: '消息详情',
    headerTintColor: 'black',
    headerStyle: { backgroundColor: 'white' },
    tabBarVisible: false    
  });

  constructor() {
    super();
    this.state = {comment: {}}
  }

  componentDidMount() {
    let comment = require('./comment.json');
    this.setState({comment: comment});
  }

  renderItem(data) {
    return <CommentCell data={data.item} />
  }

  renderSectionHeader(data) {
    return (
      <View style={styles.sectionHeader}>
        <View style={{marginTop:8,backgroundColor:'white',flex:1,justifyContent:'center'}}>
          <Text style={{fontSize:15,marginLeft:15}}>{data.section.key}</Text>
        </View>
      </View>
    );
  }

  renderSeparator() {
    return <View style={{height:1,backgroundColor:'#dbdadc'}}></View>
  }

  render() {
    var sections = [];
    let hot = this.state.comment.hotComments;
    let data = this.state.comment.data;
    if (hot && hot.length) {
      sections.push({
        key: '热门评论',
        data: hot
      });
    }
    if (data && data.length) {
      sections.push({
        key: '最新评论',
        data: data
      });
    }
    return (
      <View style={{ flex: 1 }}>
        <SectionList
          keyExtractor={(item)=>item.commentId}
          sections={sections}
          ItemSeparatorComponent={this.renderSeparator}
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderItem}
          ListHeaderComponent={() => <FeedCell data={this.props.navigation.state.params.data} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    height:52,
    backgroundColor:'#f0f3f5',
    borderBottomColor:'#dbdadc',
    borderBottomWidth:1
  }
})