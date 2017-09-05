import React, { PureComponent } from 'react';
import { View,Text,FlatList,Alert,Modal,Dimensions,TouchableOpacity,StyleSheet,ScrollView,Image } from 'react-native';


var screenW = Dimensions.get('window').width;

// 引入资源:require
export default class MinePage extends PureComponent {
    render() {
        return (

            <View style={{flex:1}}>
                <ScrollView style={{flex:1,backgroundColor:'white'}}

                            // 监听滚动开始
                            onMomentumScrollBegin={this._onMomentumScrollBegin.bind(this)}

                            // 监听滚动结束
                            onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}

                            // 监听开始拖拽
                            onScrollBeginDrag={this._onScrollBeginDrag.bind(this)}

                            // 监听结束拖拽
                            onScrollEndDrag={this._onScrollEndDrag.bind(this)}

                            // 监听滚动动画完成
                            onScrollAnimationEnd={this._onScrollAnimationEnd.bind(this)}

                            // 监听滚动的时候
                            onScroll={this._onScroll.bind(this)}

                            // 设置滚动频率,一滚动就监听
                            scrollEventThrottle={1}

                            ref="scrollView"
                >
                    {this.setupChildView()}
                </ScrollView>
            </View>
        );
    }

    // 滚动的时候 会传入一个合成事件

    // 在 React 中， 事件的处理由其内部自己实现的事件系统完成，触发的事件都叫做 合成事件（SyntheticEvent）

    // 通过合成事件能获取原生事件nativeEvent,原生事件nativeEvent会有我们想要的信息.
    _onScrollAnimationEnd (e) {
        console.log('滚动的完成时候调用');

    }
    _onScroll(e) {
       // console.log('滚动的时候调用');
        // 不能通过scrollView获取,因为在RN中,滚动的时候,不会给scrollView组件的contentOffset属性赋值,只能通过nativeEvent事件获取
       //  var scrollView = this.refs.scrollView;
       //
       //  console.log(scrollView.props.contentOffset);

        var nativeEvent = e.nativeEvent;

        console.log(nativeEvent.contentOffset);
    }

    _onScrollBeginDrag(e) {
        console.log('开始拖拽的时候调用');


    }

    _onScrollEndDrag(e) {
        console.log('结束拖拽的时候调用');
    }


    _onMomentumScrollBegin(e) {
        console.log('当一帧滚动开始的时候');
    }

    _onMomentumScrollEnd(e) {
        console.log('当一帧滚动结束的时候');
    }


    setupChildView(){
        var childs = [];
        for (let i = 0;i < 7;i++){
            childs.push(
                <Image key={i} style={{marginBottom:10,width:screenW,height:200}} source={require('./image/test.png')}/>
            )
        }
        return childs;
    }

}

var styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#6A85B1'
  }
});
