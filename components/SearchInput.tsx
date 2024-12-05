import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants/index";

type InputProps = {
  value: string;
  handlechange: (e: string) => void;
  otherStyles?: string;
  keyBoardType?: string;
  placeholder: string;
};
const SearchInput: React.FC<InputProps> = ({
  value,
  handlechange,
  otherStyles,
  placeholder,
}: InputProps): JSX.Element => {
  const [isFocused, setisFocused] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View
        className={`w-full h-16 px-4 bg-black-100 rounded-2xl border-2  ${isFocused} ? "border-secondary-200" : "border-secondary-200" items-center flex-row`}
      >
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B7B"
          onChangeText={handlechange}
          onPress={() => setisFocused(true)}
          onBlur={() => setisFocused(false)}
        />
        <TouchableOpacity>
          <Image
            source={icons.search}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchInput;
