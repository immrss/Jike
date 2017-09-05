import React, { PureComponent } from 'react'
import { View,Text,Image,TouchableOpacity,StyleSheet } from 'react-native'

export default class ImageButton extends PureComponent {

  render() {
    let title = this.props.title&&this.props.title.length ? (<Text style={styles.title}>{this.props.title}</Text>) : null;
    return (
      <TouchableOpacity style={[styles.container,this.props.style]} onPress={()=>this.props.onPress()}>
          <Image style={styles.image} source={this.props.image} />
          { title }
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 20,
    height: 20
  },
  title: {
    fontSize: 14,
    color: '#807f81',
    marginLeft: 7
  }
});


