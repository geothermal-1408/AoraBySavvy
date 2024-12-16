import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as animatable from "react-native-animatable";
import { Videos } from "@/types";
import { icons } from "@/constants";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";

interface TrendingViewProps {
  posts: Array<Videos>;
}

const Zoomin: animatable.CustomAnimation = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 1.1 }],
  },
};
const Zoomout: animatable.CustomAnimation = {
  0: {
    transform: [{ scale: 1.1 }],
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
      animation={activateItem === item.$id ? Zoomin : Zoomout}
      duration={500}
    >
      {Playing ? (
        <Video
          source={{ uri: item.video }}
          style={{
            width: 208,
            height: 288,
            borderRadius: 35,
            overflow: "hidden",
            shadowColor: "#000",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
            if (status.isLoaded && status.didJustFinish) {
              setPlaying(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {
            setPlaying(true);
          }}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </animatable.View>
  );
};
const TrendingView: React.FC<TrendingViewProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewingItem = ({ viewableItems }: any) => {
    // viewableItems.forEach((viewableItem: any) => {
    //   console.log("Viewable item video:", viewableItem.item.video);
    // });
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item.$id);
    }
  };
  return (
    <FlatList
      horizontal
      data={posts}
      keyExtractor={(items) => items.$id}
      renderItem={({ item }) => (
        <TrendingItem activateItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewingItem}
      viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
      contentOffset={{ x: 100, y: 0 }}
    ></FlatList>
  );
};

export default TrendingView;
