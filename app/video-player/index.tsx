import ActivityModal from '@/components/ActivityModal';
import { ResizeMode, Video } from 'expo-av';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function VideoScreen() {
  const { url, title } = useLocalSearchParams<{ url: string; title: string }>();

  const [showModal, setShowModal] = useState(false);

  const videoRef = useRef<Video>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      videoRef.current?.pauseAsync();
    });

    return unsubscribe;
  }, [navigation]);

  const lastMinuteRef = useRef(0);

  const handlePlaybackStatusUpdate = (status: any) => {
    if (!status.isLoaded) return;

    if (!status.isPlaying) return;

    const currentMinute = Math.floor(status.positionMillis / 60000);

    if (
      currentMinute > 0 &&
      currentMinute !== lastMinuteRef.current
    ) {
      lastMinuteRef.current = currentMinute;
      setShowModal(true);
    }
  };


  const handleActivityComplete = () => {
    setShowModal(false);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.title}>{title}</Text>
      <Video
        ref={videoRef} 
        style={styles.video}
        source={{ uri: url }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        shouldPlay={!showModal}
      />

      <ActivityModal visible={showModal} onComplete={handleActivityComplete} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  video: {
    width: '100%',
    height: 300,
    backgroundColor: '#000',
  },
});
