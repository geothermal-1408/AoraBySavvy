import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import * as animatable from "react-native-animatable";
import { Videos } from "@/types";

interface TrendingViewProps {
  posts: Array<Videos>;
}

const zoomIn: animatable.CustomAnimation = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 0.9 }],
  },
};
const zoomOut: animatable.CustomAnimation = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 0.9 }],
  },
};

const TrendingItem = ({ activateItem, item }: any) => {
  const [Playing, setPlaying] = useState(false);
  return (
    <animatable.View
      className="mr-5"
      animation={activateItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {Playing ? (
        <Text>Playing</Text>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlaying(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overdflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
    </animatable.View>
  );
};
const TrendingView: React.FC<TrendingViewProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);
  return (
    <FlatList
      data={posts}
      keyExtractor={(items) => items.$id || Math.random().toString()}
      renderItem={({ item }) => (
        <TrendingItem activateItem={activeItem} item={item} />
      )}
      horizontal
    ></FlatList>
  );
};

export default TrendingView;
