import React, { PureComponent } from 'react'
import { View,Text,TouchableOpacity,StyleSheet,Image } from 'react-native'

export default class CommentCell extends PureComponent {
  render() {
    let data = this.props.data;
    let replyToComment = data.replyToComment;
    let replyText = '';
    if (replyToComment) {
      replyText = replyToComment.user.screenName+'：'+replyToComment.content;
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={()=>{}}
        >
          <Image style={styles.avatar} source={{uri:data.user.profileImageUrl+''}} />
        </TouchableOpacity>
        <View style={styles.right}>
          <Text style={styles.name}>{data.user.screenName}</Text>
          <Text style={styles.time}>{data.createdAt}</Text>
          <Text style={styles.content}>{data.content}</Text>
          {
            replyToComment ? (
              <View style={styles.replyToComment}>
                <View style={styles.replyFlag}></View>
                <Text style={styles.replyContent}>{replyText}</Text>
              </View>
            ) : null
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'white'
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#eef1f3'
  },
  right: {
    flex: 1,
    marginLeft: 15
  },
  name: {
    color: 'gray',
    fontSize: 15
  },
  time: {
    marginTop: 5,
    fontSize: 14,
    color: '#bcbcba'
  },
  content: {
    marginTop: 10,
    fontSize: 15
  },
  replyToComment: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15
  },
  replyFlag: {
    backgroundColor: '#1eaaf1',
    width: 3
  },
  replyContent: {
    marginLeft: 10
  }
});
