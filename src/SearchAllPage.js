import React, { PureComponent } from 'react'
import { View,Text,StyleSheet,Alert,Image,TouchableOpacity,AsyncStorage,ScrollView,Dimensions } from 'react-native'
import TagComponent from './TagComponent'

export default class SearchAllPage extends PureComponent {
  
  constructor() {
    super();
    this.state = {
      words: [],
      history: []
    };
  }

  updateHistory() {
    AsyncStorage.getItem('search_history',(err,result)=>{
      if (!err) {
        if (result) {
          this.setState({
            history: result.split(',')
          });
        }
      }
    });
  }

  componentDidMount() {
    let wrodData = require('./SearchSuggestWord.json');
    let words = wrodData.data.searchSuggestionWords.topic;
    if (words.length) {
      words = words.map((item)=>item.word);
      this.setState({ words: words });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex:1,backgroundColor:'white'}}>
          <Text style={styles.text}>试试搜索这些</Text>
          <TagComponent 
            style={styles.tag} 
            tags={this.state.words} 
            onPress={(index)=>{
              let oldTag = this.state.history;
              let tag = this.state.words[index];
              let newTag = oldTag.concat(tag);
              if (oldTag.indexOf(tag) < 0) {
                AsyncStorage.setItem('search_history',newTag.join(','),(err)=>{
                  if (!err) {
                    this.setState({
                      history: newTag
                    });
                  }
                });
              }
            }}
          />
          {
            this.state.history.length ? (
              <View style={styles.history}>
                <Text style={{color:'#717070',fontSize:16}}>搜索历史</Text>
                <TouchableOpacity 
                  onPress={()=>{
                    if (!this.state.history.length) {
                      return;
                    }
                    AsyncStorage.removeItem('search_history',(err)=>{
                      if (!err) {
                        this.setState({
                          history: []
                        });
                      }
                    });
                  }}
                >
                  <Image 
                    style={{width:16,height:16}} 
                    source={require('./image/ic_common_close_black_rounded.png')} 
                  />
                </TouchableOpacity>
              </View>
            ) : null
          }
          <TagComponent 
            style={styles.tag} 
            tags={this.state.history} 
            onPress={(index)=>Alert.alert('click','asdasd')}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  text: {
    color: '#717070',
    fontSize: 16,
    marginHorizontal: 20,
    marginTop: 15
  },
  tag: {
    marginTop: 10,
    marginHorizontal: 20
  },
  history: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 20
  }
});