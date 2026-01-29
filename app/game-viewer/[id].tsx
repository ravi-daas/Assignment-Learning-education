// app/game-viewer/[id].tsx
import { games } from '@/data/games';
import { downloadAndExtractGame } from '@/utils/downloader';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function GameViewerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [gameUri, setGameUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGame = async () => {
      try {
        const gameEntry = games.find((g) => g.id === id);
        if (!gameEntry) {
          Alert.alert('Error', 'Game not found');
          return;
        }

        const uri = await downloadAndExtractGame(id, gameEntry.zipUrl);

        console.log('Game extracted to:', uri);

        setGameUri(uri);
      } catch (err) {
        Alert.alert('Download Failed', 'Could not download or extract game.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadGame();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading game...</Text>
      </View>
    );
  }

  if (!gameUri) {
    return (
      <View style={styles.centered}>
        <Text>Error loading game.</Text>
      </View>
    );
  }

  return (
    <WebView
      source={{ uri: gameUri }}
      style={{ flex: 1 }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowFileAccess
      allowUniversalAccessFromFileURLs
      originWhitelist={['*']}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
