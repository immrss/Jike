import React, { PureComponent } from 'react';
import { View,Text,TextInput,Image,StyleSheet } from 'react-native';

export default class SearchBar extends PureComponent {

  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  render() {
    return (
      <View style={[styles.container,this.props.style]}>
        <Image style={styles.icon} source={require('./image/searchbar_icon.png')}/>
        <TextInput 
          style={styles.input}
          returnKeyType='search'
          clearButtonMode='always'
          numberOfLines={1}
          enablesReturnKeyAutomatically={true}
          placeholder={this.props.placeholder}
          onChangeText={(text)=>this.setState({text:text})}
          onSubmitEditing={()=>{
            if (this.props.submit) {
              this.props.submit(this.state.text)
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeef',
    height: 30,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginLeft: 10,
    width: 15,
    height: 15
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    height: 25,
    fontSize: 14
  }
});