import React, { PureComponent } from 'react';
import { View,Text,TouchableOpacity,StyleSheet } from 'react-native';

export default class TagComponent extends PureComponent {
  render() {
    let tags = this.props.tags.map((tag,i)=>{
      return (
        <TouchableOpacity
          key={i}
          style={styles.tagBox}
          onPress={()=>this.props.onPress(i)}
        >
          <Text style={styles.text} numberOfLines={1}>{tag}</Text>
        </TouchableOpacity>
      );
    });
    return (
      <View style={[styles.container,this.props.style]}>
        { tags }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tagBox: {
    borderRadius: 6,
    height: 35,
    backgroundColor: '#eaedf2',
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginRight: 10,
    marginVertical: 5
  },
  text: {
    color:'#717070',
    fontSize: 15
  }
});
