import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import React from "react";
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import DrawerNavigator from "./DrawerNavigator";
import {
  HomeIcon,
  UserIcon,
  DocumentPlusIcon,
} from "react-native-heroicons/solid";
import UploadSrc from "../Screens/UploadSrc/UploadSrc";
import UserSrc from "../Screens/UserSrc/UserSrc";
import { COLORS } from "../utils/Style";

type Props = {};

const BottomNav = (props: Props) => {
  const BtnStck = createBottomTabNavigator();

  return (
    <BtnStck.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.bgColor,
          borderTopColor: "gray",
        },
      }}
    >
      <BtnStck.Screen
        name="HomeSrc"
        component={DrawerNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <HomeIcon color={focused ? "white" : "#666"} />
          ),
        }}
      />
      <BtnStck.Screen
        name="UploadSrc"
        component={UploadSrc}
        options={{
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,

          tabBarIcon: ({ focused }) => (
            <DocumentPlusIcon color={focused ? "white" : "#666"} />
          ),
        }}
      />
      <BtnStck.Screen
        name="UserSrc"
        component={UserSrc}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <UserIcon color={focused ? "white" : "#666"} />
          ),
        }}
      />
    </BtnStck.Navigator>
  );
};

export default BottomNav;
