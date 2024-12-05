import { View, Text, FlatList } from "react-native";
import React from "react";

interface TrendingViewProps {
  posts: Array<{ id: number }>; // Replace 'any' with the appropriate type if known
}

const TrendingView: React.FC<TrendingViewProps> = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(items) => items.id.toString()}
      renderItem={({ item }) => (
        <View>
          <Text className="text-white">{item.id}</Text>
        </View>
      )}
      horizontal
    ></FlatList>
  );
};

export default TrendingView;
