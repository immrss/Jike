import React, { PureComponent } from 'react'
import { View,Text,Image,Button,Alert,Modal,ScrollView,Dimensions } from 'react-native'

let screenW = Dimensions.get('screen').width;
let screenH = Dimensions.get('screen').height;

export default class ImageBrowser extends PureComponent {
  render() {
    if (!this.props.images.length) {
      return null;
    }
    return (
      <Modal
        visible={this.props.modalVisible}
        style={{backgroundColor:'black'}}
      >
        <ScrollView
          style={{flex:1,backgroundColor:'black'}}
          showsHorizontalScrollIndicator = {false}
          horizontal={true}
          pagingEnabled={true}
          alwaysBounceHorizontal={this.props.images.length>1}
        >
          {
            this.props.images.map((image,i)=>{
              let r = (i==this.props.images.length-1) ? 0 : 10;
              return (
                <Image 
                  resizeMode='center'
                  key={i} 
                  style={{width:screenW,height:screenH,marginRight:r}} 
                  source={{uri:image.picUrl}} 
                />
              )
            })
          }
        </ScrollView>
      </Modal>
    );
  }
}





