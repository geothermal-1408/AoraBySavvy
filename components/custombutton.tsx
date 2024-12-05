import { Text, TouchableOpacity } from "react-native";
import React from "react";

type CustomButtonProps = {
  tittle: string;
  handlePress: () => void;
  containerStyles: string;
  textStyles: string;
  isLoading: boolean;
};

const CustomButton = ({
  tittle,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: CustomButtonProps): JSX.Element => {
  return (
    <TouchableOpacity
      className={`bg-secondary-200 rounded-xl min-h-[52px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {tittle}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
