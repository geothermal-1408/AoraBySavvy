import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Videos } from "../types";

export const useAppwrite = (fn: Function) => {
  const [videos, setVideos] = useState<Videos[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const data = await fn();
      setVideos(data);
    } catch (error) {
      Alert.alert("Error fetching videos in home");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchVideos();
  }, []);

  const refetch = () => fetchVideos();

  return { videos, loading, refetch };
};
