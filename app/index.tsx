import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Button,
} from "react-native";
import { Link, Redirect, router } from "expo-router";
import "../global.css";
import { images } from "../constants/index";
import CustomButton from "@/components/custombutton";
import { useGlobalContext } from "@/context/GlobalProvider";

const index = () => {
  const { islogged, loading } = useGlobalContext();

  if (!loading && islogged) {
    return <Redirect href={"/home"} />;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 16, // Optional, for consistent padding
        }}
      >
        {/* Container for all content */}
        <View className="space-y-8 w-full max-w-[400px] items-center">
          {/* Logo */}
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          {/* Card positioned under the logo */}
          <Image
            source={images.cards}
            className="w-full h-[300px] max-w-[380px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Go Beyond Your Imagination With{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[100px] h-[15px] absolute -top-2 -right-44"
              resizeMode="contain"
            />
          </View>
          <Text className="text-m font-pregular text-gray-100 text-center mt-5">
            Embark on a journey of limitless possibilities with Aora
          </Text>
          <CustomButton
            tittle="continue with email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
            isLoading={false}
            textStyles="text-white"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
