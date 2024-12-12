import { View, Text, Image } from "react-native";
import React from "react";

import { images } from "@/constants/index";
import CustomButton from "./custombutton";

type EmptyStateProps = {
  title: string;
  subtitle: string;
};

const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-pmedium text-m text-gray-100">{subtitle}</Text>
      <Text className="font-psemibold text-2xl text-gray-100 mt-2">
        {title}
      </Text>
      <CustomButton
        tittle="Create Video"
        handlePress={() => {}}
        containerStyles="mt-5 w-full "
        textStyles=""
        isLoading={false}
      />
    </View>
  );
};

export default EmptyState;
