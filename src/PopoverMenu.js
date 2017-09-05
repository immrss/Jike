import React, { PureComponent } from 'react'
import { View,Text,Image,Dimensions,Modal,StyleSheet,TouchableWithoutFeedback,TouchableOpacity,Animated } from 'react-native'

let screenW = Dimensions.get('screen').width;
let screenH = Dimensions.get('screen').height;
let margin = 2;
let contentW = screenW - 2*margin;
let contentH = contentW * 0.5;

export default class PopoverMenu extends PureComponent {

  constructor() {
    super();
    this.contentScale = new Animated.Value(0.85);
    this.state = {
      visible: false,
      items: [],
      position: {
        x:0,
        y:0
      }
    }
  }

  show = (items,position,onSelect)=>{
    this.onSelect = onSelect;
    this.setState({
      visible: true,
      position: position,
      items: items
    });
    this.contentScale.setValue(0.85);
    Animated.spring(
      this.contentScale,
      {
        toValue: 1,
        friction: 4
      }
    ).start();
  }

  dismiss = ()=>{
    this.setState({visible: false});
  }

  render = ()=>{
    let y = this.state.position.y;
    let top = y < screenH/2 ? y+20 : y-contentH-20;
    let items = this.state.items.map((item,index)=>{
      let style = (index != this.state.items.length-1) ? 
      [styles.item,{borderBottomWidth:1,borderColor:'#dbdadc'}] : styles.item;
      return (
        <TouchableOpacity
          style={style}
          key={index}
          onPress={()=>{
            if (this.onSelect) {
              this.onSelect(index);
            }
            this.dismiss();
          }}
        >
          <Image source={item.image} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      );
    });
    return (
      <Modal
        visible={this.state.visible}
        transparent={true}
      >
        <TouchableWithoutFeedback 
          onPress={this.dismiss}
        >
          <View style={styles.overlay}>
            <Animated.View style={[styles.content,{top:top,transform:[{scale:this.contentScale}]}]}>
              {items}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1
  },
  content: {
    backgroundColor: 'white',
    position: 'absolute',
    left: margin,
    width: contentW,
    height: contentH,
    borderRadius: 8,
    paddingHorizontal: 15
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: contentH/2
  },
  image: {
    width: 20,
    height: 20
  },
  title: {
    marginLeft: 15,
    fontSize: 17
  }
});
