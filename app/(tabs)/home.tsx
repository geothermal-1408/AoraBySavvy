import { View, Text, SafeAreaView, FlatList, Image } from "react-native";
import React from "react";
import { images } from "@/constants/index";
import SearchInput from "@/components/SearchInput";

const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[
          { id: "a", name: "John", age: 25 },
          { id: "b", name: "John", age: 25 },
          { id: "c", name: "John", age: 25 },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={() => (
          <View>
            <Text className="text-white">Name: John</Text>
            <Text className="text-white">Age: 25</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="font-psemibold text-2xl text-gray-100">
                  Savvy
                </Text>
              </View>
              <View>
                <Image
                  source={images.logoSmall}
                  className="w-9 h-9"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput
              value=""
              handlechange={() => {}}
              placeholder="Search something"
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
