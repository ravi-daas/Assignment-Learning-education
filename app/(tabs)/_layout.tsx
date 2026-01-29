import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Home, LucideGamepad, Video } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Home color={color} size={focused ? size + 4 : size} />
          ),
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          title: 'Video Learning',
          tabBarIcon: ({ color, size, focused }) => (
            <Video color={color} size={focused ? size + 4 : size} />
          ),
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: 'Game Downloads',
          tabBarIcon: ({ color, size, focused }) => (
            <LucideGamepad color={color} size={focused ? size + 4 : size} />
          ),
        }}
      />

      <Tabs.Screen name="video" options={{ href: null, title: 'Video' }} />
    </Tabs>
  );
}
