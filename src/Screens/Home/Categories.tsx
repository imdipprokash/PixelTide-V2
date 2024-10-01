import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColor, SIZES} from '../../utils/Constant';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {GetImageCategory} from '../../apis/Images';

// ads ins
import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-3346761957556908/9282538858';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

type Props = {};

const Categories = (props: Props) => {
  const [categories, setCategories] = useState([]);
  const chunkArray = (array: any, size: any) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const GetCategoryHandler = async () => {
    const result = await GetImageCategory();
    if (result !== 0) {
      setCategories(result);
    }
  };
  const [loaded, setLoaded] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = interstitial.addAdEventListener(
        AdEventType.LOADED,
        () => {
          setLoaded(true);
        },
      );

      interstitial.load();

      return unsubscribe;
    }, [loaded]),
  );

  useEffect(() => {
    GetCategoryHandler();
  }, []);

  const rows = chunkArray(categories, 2);

  const nav = useNavigation<any>();
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleTextStyle}>Categories</Text>

      <View style={styles.container}>
        {rows.map((row, rowIndex) => (
          <View style={styles.row} key={rowIndex}>
            {row.map((item: any, index: any) => (
              <TouchableOpacity
                onPress={() => {
                  if (loaded) {
                    interstitial.show().then(() => {
                      setLoaded(false);
                      nav.navigate('CategoryScr', {
                        category_name: item?.category_name,
                      });
                    });
                  } else {
                    nav.navigate('CategoryScr', {
                      category_name: item?.category_name,
                    });
                  }
                }}
                key={index}
                activeOpacity={0.7}
                style={styles.btnStyle}>
                <ImageBackground
                  source={{uri: item?.image_url}}
                  style={styles.bgImage}
                />
                <Text style={styles.textStyle}>{item?.category_name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  titleTextStyle: {
    color: AppColor.titleTextColor,
    fontSize: 19,
    fontFamily: 'PTSansBold',
  },
  mainContainer: {
    gap: 15,
  },
  container: {
    flex: 1,
    gap: 15,
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnStyle: {
    width: SIZES.ScreenWidth * 0.44,
    height: SIZES.ScreenHeight * 0.12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bgImage: {
    width: SIZES.ScreenWidth * 0.44,
    height: SIZES.ScreenHeight * 0.12,
    zIndex: -10,
    borderRadius: 50,
    opacity: 0.7,
  },
  textStyle: {
    position: 'absolute',
    alignSelf: 'center',
    top: '38%',
    fontSize: 20,
    fontFamily: 'PTSansBold',
    color: '#ffffff',
  },
});
