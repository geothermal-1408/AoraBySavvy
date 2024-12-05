import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants/index";

type CustomFormProps = {
  tittle: string;
  value: string;
  handlechange: (e: string) => void;
  otherStyles: string;
  keyBoardType?: string;
  placeholder: string;
};
const CustomForm: React.FC<CustomFormProps> = ({
  tittle,
  value,
  handlechange,
  otherStyles,
  placeholder,
}: CustomFormProps): JSX.Element => {
  const [showPassword, setshowPassword] = useState(false);
  const [isFocused, setisFocused] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium mb-3">
        {tittle}
      </Text>
      <View
        className={`w-full h-16 px-4 bg-black-100 rounded-2xl border-2  ${isFocused} ? "border-secondary-200" : "border-secondary-200" items-center flex-row`}
      >
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B7B"
          onChangeText={handlechange}
          secureTextEntry={tittle === "Password" && !showPassword}
          onPress={() => setisFocused(true)}
          onBlur={() => setisFocused(false)}
        />
        {tittle === "Password" && (
          <TouchableOpacity
            onPress={() => {
              setshowPassword(!showPassword);
            }}
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6 "
              resizeMode="contain"
              style={{ marginTop: -9 }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomForm;
