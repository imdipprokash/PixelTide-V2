import {Dimensions} from 'react-native';

export const DUMMY_TITLES = [
  {id: '1', title: 'All', onClick: () => {}},
  {id: '2', title: 'New', onClick: () => {}},
  {id: '3', title: 'Popular', onClick: () => {}},
  {id: '4', title: 'Trending', onClick: () => {}},
];
export const GradientColors = [
  {
    id: 1,
    color_1: '#1b9fe7',
    color_2: '#e6a970',
    color_3: '#d6b5e1',
    title: 'All',
  },
  {
    id: 4,
    color_1: '#d2861b',
    color_2: '#27b04a',
    color_3: '#20658b',
    title: 'Anime',
  },
  {
    id: 2,
    color_1: '#1b9fe7',
    color_2: '#e6a970',
    color_3: '#d6b5e1',
    title: 'Sci-Fi',
  },
  {
    id: 3,
    color_1: '#1b9fe7',
    color_2: '#e6a970',
    color_3: '#d6b5e1',
    title: 'Character',
  },

  {
    id: 5,
    color_1: '#d2861b',
    color_2: '#27b04a',
    color_3: '#20658b',
    title: 'Architecture',
  },
  {
    id: 6,
    color_1: '#a29f2a',
    color_2: '#ec4c9c',
    color_3: '#77ed99',
    title: 'Animal',
  },
  {
    id: 7,
    color_1: '#1b9fe7',
    color_2: '#e6a970',
    color_3: '#d6b5e1',
    title: 'Art',
  },
];

export const AppColor = {
  bgColor: '#DFEBF3',
  iconColor: '#999',
  titleTextColor: '#000',
  btnBgColor: '#d4d4d8',
  activeBgColor: '#3F64F5',
};
export const SIZES = {
  ScreenWidth: Dimensions.get('screen').width,
  ScreenHeight: Dimensions.get('screen').height,
};
export const baseUrl = 'https://jdxpvt.netlify.app/api';
