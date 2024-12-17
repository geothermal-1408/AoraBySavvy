import { View, Text } from "react-native";
import React from "react";

type InfoBoxProps = {
  title: string | "";
  containerStyle?: string;
  tileStyle?: string;
  subtitle?: string;
};
const InfoBox = ({
  title,
  containerStyle,
  tileStyle,
  subtitle,
}: InfoBoxProps) => {
  return (
    <View className={containerStyle}>
      <Text className={`text-white text-center font-psemibold ${tileStyle}`}>
        {title}
      </Text>
      <Text className="text-sm font-pregular text-gray-100 text-center">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
