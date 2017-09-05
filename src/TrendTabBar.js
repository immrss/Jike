import React, { PureComponent } from 'react'
import { View,Image,TouchableOpacity,StyleSheet,Dimensions } from 'react-native'

export default class TrendTabBar extends PureComponent {
  render() {
    let tabs = this.props.tabs.map((tab, i) => {
      let image = this.props.icons[tab];
      let isActive = this.props.activeTab === i;
      let icon = isActive ? image.selected : image.unselected;
      return (
        <TouchableOpacity 
          style={styles.tab}
          key={tab} 
          onPress={() => this.props.goToPage(i)}
        >
          <Image source={icon} />
        </TouchableOpacity>
      )
    });
    return (
      <View style={styles.bar}>
      { tabs }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 36,
    justifyContent: 'space-around' 
  },
  tab: {
    width: 26,
    height: 26,
    marginTop: 5
  }
});