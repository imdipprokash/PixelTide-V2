import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const _mainStyle = StyleSheet.create({
  _mainView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
  },
  _btnStyle: {},
});
