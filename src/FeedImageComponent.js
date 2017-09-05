import React, { PureComponent } from 'react'
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import {feedCellImage} from './Resource';

let screenW = Dimensions.get('screen').width;
let padding = 10;
let componentW = screenW - 2*padding;
let margin = 5;
let imageW = parseInt((componentW-2*margin)/3);
let imageH = imageW;

export default class FeedImageComponent extends PureComponent {

  render() {
    let images = [];
    let style = {};
    if (this.props.images.length == 1) {
      let image = this.props.images[0];
      images = (
        <TouchableOpacity 
          key={0} 
          style={{width:250,height:200}}
          onPress={()=>{this.props.onPress(0)}}
        >
          <Image style={{flex:1}} source={{uri:image.picUrl}} /> 
          {
            image.format == 'gif' ? 
            (
              <Image source={feedCellImage.gif} style={styles.gif} />
            ) : null
          }
        </TouchableOpacity>
      );
      style = {flex:1};
    } else {
      images = this.props.images.map((image,i)=>{
        let left = parseInt(i%3)*(imageW+margin);
        let top = parseInt(i/3)*(imageH+margin);
        return (
          <TouchableOpacity 
            key={i} 
            style={{position:'absolute',left:left,top:top,width:imageW,height:imageH}}
            onPress={()=>this.props.onPress(i)}
          >
            <Image source={{uri:image.picUrl}} style={{flex:1}} />
            {
              image.format == 'gif' ? 
              (
                <Image source={feedCellImage.gif} style={styles.gif} />
              ) : null
            }
          </TouchableOpacity>
        )
      });
      let row = parseInt((this.props.images.length-1)/3) + 1;
      style = {height:row*imageH+(row-1)*margin};
    }
    return (
      <View style={[style,this.props.style]}>
        {images}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gif: {
    width:30,
    height:30,
    position:'absolute',
    bottom:0,
    right:10
  }
});