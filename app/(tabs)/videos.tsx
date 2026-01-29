import VideoCard from '@/components/Videocard';
import { useRouter } from 'expo-router';
import React from 'react';
import { Animated, FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const educationalVideos = [
    {
        id: '1',
        title: 'Plastics 101',
        duration: '3 min watch',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr4JjS9Xj8USaOQy0aW_pYvRRBMdNHhiLR7BtcIJhQ8Ei5vluk-L_3_-kysizrdCqWqvIprn1KFJ9zyCpGVXhDR55XF1pIiROIyTnaxrq6PEJ3lZ54Kt26DK6YQ2pCby3UVbBzZClrG4T2w37VHwA5R67gPAmFgoUsWTi_SItASFA-rgfsJ7PWh1CpJQh3O2muadEospVDPEzd_6MOUOIyHUzPhZdCRInaawug5sz9mKRGIJ9efKirWUsRjUz2PwV2MnDkq-bVsd8',
        videoUrl: 'https://www.tata.com/content/dam/tata/videos/newsroom/desktop/two_bins_edited.mp4'
    },
];

export default function HomeScreen() {

    const router = useRouter();

    const handleVideoPress = (videoUrl: string, title: string) => {
        router.push({
            pathname: '../video-player',
            params: { url: videoUrl, title }
        });
    };
    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <Animated.View
                style={styles.section}
            >
                <Text style={styles.sectionTitle}>Learn to Segregate Waste</Text>
                <FlatList
                    data={educationalVideos}
                    renderItem={({ item }) => (
                        <VideoCard
                            title={item.title}
                            duration={item.duration}
                            imageUrl={item.imageUrl}
                            onPress={() => handleVideoPress(item.videoUrl, item.title)}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    horizontal
                    scrollEnabled={true}
                    style={styles.videoList}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.videoListContent}
                />
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    topic: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        fontSize: 16,
    },
    section: {
        gap: 12,
        paddingHorizontal: 16,
        marginBottom: 24
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: -0.015,
        marginTop: 8,
    },
    videoList: {
        marginHorizontal: -16,
        paddingBottom: 8

    },
    videoListContent: {
        paddingHorizontal: 16,
    },
});
