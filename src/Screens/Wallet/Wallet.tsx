import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SCREEEN_WIDTH, SCREEN_HEIGHT} from '../../utils/Style';
import CustomHeader from '../../components/CustomHeader';
import {useAppSelector} from '../../hooks/reduxHook';
import {getCoin} from '../../utils/UtilsFN';
import {useFocusEffect} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import {LinearGradient} from 'react-native-svg';

type Props = {};

const Wallet = (props: Props) => {
  const {id} = useAppSelector(state => state.user);
  const [walletInfo, setWalletInfo] = useState<any>(null);

  const GetWalletInfo = async () => {
    if (id) {
      const res = await getCoin(id);
      if (res) {
        setWalletInfo(res?.documents[0]);
      } else {
        ToastAndroid.showWithGravity(
          'Please try again later!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      GetWalletInfo();
    }, []),
  );

  const WithdrawalHandler = () => {
    ToastAndroid.showWithGravity(
      'Need a minimum of 100 INR',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  return (
    <View className="mx-6 py-2 flex-1">
      <CustomHeader toggleDrawer={() => {}} title="Wallet" />
      <View className=" w-full rounded-md shadow-md  h-1/5 bg-orange-400 items-center justify-center">
        <Text className="text-xl font-extrabold text-white">
          Wallet Blance : ₹ {walletInfo?.total_download}
        </Text>
      </View>

      {/*  */}
      <View className="flex-row items-start justify-center py-4 gap-4">
        <TouchableOpacity
          className="w-1/2 bg-blue-300 rounded-md"
          onPress={WithdrawalHandler}>
          <Text className="text-lg font-extrabold text-black text-center p-2">
            Withdrawal
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({});
