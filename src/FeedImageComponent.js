import React, { PureComponent } from 'react'
import { View,Image,StyleSheet,TouchableOpacity,Dimensions,Alert } from 'react-native'

let screenW = Dimensions.get('screen').width;
let padding = 10;
let componentW = screenW - 2*padding;
let margin = 5;
let imageW = parseInt((componentW-2*margin)/3);
let imageH = imageW;

export default class FeedImageComponent extends PureComponent {

  render() {
    let images;
    let style;
    if (this.props.images.length == 1) {
      images = (
        <TouchableOpacity 
          key={0} 
          style={{width:250,height:200}}
          onPress={()=>{this.props.onPress(0)}}
        >
          <Image style={{flex:1}} source={{uri:this.props.images[0]}} /> 
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
            <Image source={{uri:image}} style={{flex:1}} />
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