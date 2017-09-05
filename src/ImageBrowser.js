import React, { PureComponent } from 'react'
import { 
  View,
  Text,
  Image,
  Alert,
  Modal,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native'

let screenW = Dimensions.get('screen').width;
let screenH = Dimensions.get('screen').height;

export default class ImageBrowser extends PureComponent {

  constructor() {
    super();
    this.state = {
      modalVisible: false,
      images: [],
      initialIndex: 0
    }
  }

  show = (images,index)=>{
    this.setState({
      modalVisible: true,
      images: images,
      initialIndex: index
    });
  }

  _dismiss = ()=>{
    this.setState({
      modalVisible: false
    });
  }

  render = ()=>{
    if (!this.state.images.length) {
      return null;
    }
    return (
      <Modal
        visible={this.state.modalVisible}
        style={{backgroundColor:'black'}}
      >
        <ScrollView
          ref={(scrollView) => {
            if (scrollView) {
              scrollView.scrollTo({x:screenW*this.state.initialIndex,y:0,animated:false});
            }
          }}
          style={{flex:1,backgroundColor:'black'}}
          showsHorizontalScrollIndicator = {false}
          horizontal={true}
          pagingEnabled={true}
          alwaysBounceHorizontal={this.state.images.length>1}
        >
          {
            this.state.images.map((image,i)=>{
              let r = (i==this.state.images.length-1) ? 0 : 10;
              return (
                <TouchableWithoutFeedback
                  key={i}
                  onPress={this._dismiss} 
                >
                  <Image 
                    resizeMode='contain'
                    style={{width:screenW,height:screenH}} 
                    source={{uri:image.picUrl}} 
                  />
                </TouchableWithoutFeedback>
              )
            })
          }
        </ScrollView>
      </Modal>
    );
  }
}





