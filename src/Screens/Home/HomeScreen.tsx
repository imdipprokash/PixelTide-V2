import {
  StatusBar,
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./HomeScreenStyle";
import { COLORS } from "../../utils/Style";
import data from "../../assets/Data/MOCK_DATA.json";
import { uuid } from "../../utils/uuid";

const HomeScreen = (props: any) => {
  const [activeItem, setActiveItem] = useState("Newest");

  const renderItem = (item: {
    id: number;
    image_path: string;
    profile_pic: string;
    name: string;
    created_at: string;
  }) => {
    return (
      <View
        className="bg-white  mb-4 mx-5 rounded-lg overflow-hidden"
        key={uuid()}
      >
        <Image
          source={{
            uri: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg",
          }}
          className="w-60 h-60"
          resizeMode="cover"
        />
      </View>
    );
  };
  return (
    <View style={styles.mainView}>
      <StatusBar backgroundColor={COLORS.bgColor} barStyle={"light-content"} />
      {/* Header Section */}
      <View className="flex flex-row items-center justify-center">
        <Image
          source={require("../../assets/logo.png")}
          className="w-10 h-8"
          resizeMode="cover"
        />
        <Text className="text-center text-lg font-semibold text-white">
          PixelTide
        </Text>
      </View>

      {/* tabs */}
      <View className="flex-row items-center justify-evenly py-3 ">
        <TouchableOpacity onPress={() => setActiveItem("Newest")}>
          <Text
            className={`${
              activeItem === "Newest" ? "text-blue-400" : "text-gray-400"
            }`}
          >
            Newest
          </Text>
        </TouchableOpacity>
        <View className="w-[0.5px] h-4 bg-gray-200" />
        <TouchableOpacity onPress={() => setActiveItem("Popular")}>
          <Text
            className={`${
              activeItem === "Popular" ? "text-blue-400" : "text-gray-400"
            }`}
          >
            Popular
          </Text>
        </TouchableOpacity>
        <View className="w-[0.5px] h-4 bg-gray-200" />
        <TouchableOpacity onPress={() => setActiveItem("Following")}>
          <Text
            className={`${
              activeItem === "Following" ? "text-blue-400" : "text-gray-400"
            }`}
          >
            Following
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => uuid()}
          renderItem={(item) => renderItem(item.item)}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
