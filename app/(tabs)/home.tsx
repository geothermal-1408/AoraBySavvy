import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { images } from "@/constants/index";
import SearchInput from "@/components/SearchInput";
import TrendingView from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { getVideos } from "@/lib/appwrite";
import { useAppwrite } from "@/hooks/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { getLatestPost } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const Home = () => {
  const { videos: data, refetch } = useAppwrite(getVideos);
  const { videos: latest } = useAppwrite(getLatestPost);
  const { user, setUser } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    //refresh data
    await refetch();
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="font-psemibold text-2xl text-gray-100">
                  {user?.username || "User"}
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
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 font-pregular mb-3">
                Latest Videos
              </Text>
              <TrendingView posts={latest ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="no videos found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
