import GameCard from '@/components/GameCard';
import { games } from '@/data/games';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GamesScreen() {
  const router = useRouter();

  const handleGamePress = (gameId: string) => {
    router.push(`../game-viewer/${gameId}`);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>

      <View style={styles.container}>
        <Text style={styles.header}>🎮 Downloadable Games</Text>
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard
              id={item.id}
              title={item.title}
              description={item.description}
              thumbnail={item.thumbnail}
              zipUrl={item.zipUrl}
              onPress={() => handleGamePress(item.id)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});
