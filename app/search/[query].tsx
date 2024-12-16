import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/index";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import { searchVideos } from "@/lib/appwrite";
import { useAppwrite } from "@/hooks/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { videos: data, refetch } = useAppwrite(() =>
    searchVideos(query as string)
  );

  // const { videos: data } = useAppwrite(() => {});

  useEffect(() => {
    refetch();
  }, [query]);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-8 px-4 ">
            <Text className="font-pmedium text-lg text-gray-100">
              Search Results
            </Text>
            <Text className="font-psemibold text-2xl text-white my-2">
              {query}
            </Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query as string} />
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

export default Search;
