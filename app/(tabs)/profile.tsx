import { View, FlatList, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { icons } from "@/constants/index";
import EmptyState from "@/components/EmptyState";
import { getUserPost, signOut } from "@/lib/appwrite";
import { useAppwrite } from "@/hooks/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import InfoBox from "@/components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIslogged } = useGlobalContext();
  const { videos: data } = useAppwrite(() => getUserPost(user.$id));
  //const { videos: data } = useAppwrite(() => {});

  const logout = async () => {
    await signOut();
    setUser(null);
    setIslogged(false);

    router.replace("/(auth)/sign-in");
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center px-4 mt-6 mb-12">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary-100 justify-center items-center rounded-lg">
              <Image
                source={user?.avatar}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user.username || "user"}
              containerStyle="mt-5"
              tileStyle="text-lg"
            />

            <View className="mt-5 flex-row">
              <InfoBox
                title={(data?.length || 0).toString()}
                subtitle="posts"
                containerStyle="mr-20"
                tileStyle="text-xl"
              />
              <InfoBox title="0k" subtitle="Followers" tileStyle="text-xl" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="no videos found"
            subtitle="No videos found for the search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
