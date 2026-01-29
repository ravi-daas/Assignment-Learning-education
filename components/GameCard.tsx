import * as FileSystem from 'expo-file-system/legacy';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  zipUrl: string;
  onPress: () => void;
}

export default function GameCard({ id, title, description, thumbnail, zipUrl, onPress }: GameCardProps) {
  const [status, setStatus] = useState<'idle' | 'downloading' | 'ready'>('idle');
  const [downloadProgress, setDownloadProgress] = useState(0);

  const localZipUri = `${FileSystem.documentDirectory}${id}.zip`;

  useEffect(() => {
    FileSystem.getInfoAsync(localZipUri).then(info => {
      if (info.exists) setStatus('ready');
    });
  }, []);

  const handleDownload = async () => {
    setStatus('downloading');

    const downloadResumable = FileSystem.createDownloadResumable(
      zipUrl,
      localZipUri,
      {},
      (progress) => {
        const p = progress.totalBytesWritten / progress.totalBytesExpectedToWrite;
        setDownloadProgress(p * 100);
      }
    );

    try {
      const result = await downloadResumable.downloadAsync();
      if (result?.status === 200) {
        setStatus('ready');
      }
    } catch (e) {
      console.error(e);
      setStatus('idle');
      alert("Download failed. Check your connection.");
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: thumbnail }} style={styles.thumbnail} resizeMode="cover" />

      {status === 'idle' && (
        <TouchableOpacity style={styles.btn} onPress={handleDownload}>
          <Text style={styles.btnText}>Download (ZIP)</Text>
        </TouchableOpacity>
      )}

      {status === 'downloading' && (
        <View style={styles.progressRow}>
          <ActivityIndicator color="#007AFF" />
          <Text> {downloadProgress.toFixed(0)}%</Text>
        </View>
      )}

      {status === 'ready' && (
        <TouchableOpacity style={[styles.btn, styles.playBtn]} onPress={onPress}>
          <Text style={styles.btnText}>Play Offline</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  thumbnail: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111',
  },

  btn: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  playBtn: {
    backgroundColor: '#34C759',
  },

  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
