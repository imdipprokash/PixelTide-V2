import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {TitlesType} from '../../Typing';
import {SCREEN_HEIGHT} from '../utils/Style';

const TabBtn = ({title, onClick, key, id, activeTile}: TitlesType) => {
  return (
    <TouchableOpacity
      key={key}
      activeOpacity={0.7}
      style={{
        shadowColor: '#000',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.001,
        shadowRadius: 8,
        elevation: activeTile === id ? 10 : 0,
        height: SCREEN_HEIGHT * 0.037,
      }}
      onPress={() => onClick(id)}
      className={`py-[5px] px-6 ${
        activeTile === id ? 'bg-slate-50' : ''
      }  m-2  rounded-xl`}>
      <Text className="text-black text-center">{title}</Text>
    </TouchableOpacity>
  );
};

export default TabBtn;

const styles = StyleSheet.create({});
