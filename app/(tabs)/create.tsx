import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import CustomForm from "@/components/customform";
import { ResizeMode, Video } from "expo-av";
import { icons } from "@/constants";
import CustomButton from "@/components/custombutton";

type selectTypeprops = "video" | "image";
type formProps = {
  tittle: string;
  video: DocumentPicker.DocumentPickerAsset | null;
  thumbnail: DocumentPicker.DocumentPickerAsset | null;
  prompt: string;
};

const Create = () => {
  const [uploading, setuploading] = useState(false);
  const [form, setForm] = useState<formProps>({
    tittle: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const selector = async (selectType: selectTypeprops) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === "image" ? ["*/*", "*/*"] : ["*/*", "*/*"],
      multiple: true,
    });
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        Alert.alert("document picked", JSON.stringify(result, null, 2));
      }, 1000);
    }
  };

  const submit = () => {};
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
        <CustomForm
          tittle="Video Tittle"
          value={form.tittle}
          placeholder="Give your video a catchy tittle"
          handlechange={(e) => setForm({ ...form, tittle: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => selector("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                style={{ width: "100%", height: 256, borderRadius: 16 }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center mt-5">
                <View className="w-14 h-14 border border-dashed border-secondary-200 justify-center items-center">
                  <Image source={icons.upload} className="h-1/2 w-1/2" />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => selector("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="contain"
              />
            ) : (
              <View className="w-full h-16 px-6 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2 mt-5">
                <Image source={icons.upload} className="h-5 w-5" />
                <Text className="text-sm text-gray-100 font-pmedium mx-2">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <CustomForm
          tittle="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          handlechange={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          tittle="submit & publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
          textStyles=""
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
