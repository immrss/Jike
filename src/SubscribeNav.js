import React, { PureComponent } from 'react'
import { StackNavigator } from 'react-navigation';

import SubscribePage from './SubscribePage';
import TrendHotPage from './TrendHotPage';
import SearchPage from './SearchPage';

const SubscribeNav = StackNavigator({
  root: { screen: SubscribePage },
  trend: { screen: TrendHotPage },
  search: { screen: SearchPage }
});

export default SubscribeNav;
