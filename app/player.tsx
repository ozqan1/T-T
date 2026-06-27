import { useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { PressableScale } from '@/components/PressableScale';

export default function PlayerScreen() {
  const { uri, title } = useLocalSearchParams<{ uri: string; title?: string }>();
  const videoRef = useRef<Video>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <View style={styles.fill}>
      <StatusBar style="light" />
      <SafeAreaView style={styles.fill} edges={['top']}>
        <View style={styles.header}>
          <PressableScale onPress={() => router.back()} style={styles.closeBtn}>
            <Ionicons name="chevron-down" size={26} color="#fff" />
          </PressableScale>
          <Text style={styles.title} numberOfLines={1}>
            {title ?? 'Video'}
          </Text>
          <View style={styles.closeBtn} />
        </View>

        <View style={styles.videoWrap}>
          {uri ? (
            <Video
              ref={videoRef}
              source={{ uri }}
              style={styles.video}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay
              isLooping
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setError(true);
              }}
            />
          ) : (
            <Text style={styles.error}>Video bulunamadı.</Text>
          )}
          {loading && !error ? (
            <ActivityIndicator color="#fff" size="large" style={StyleSheet.absoluteFill as object} />
          ) : null}
          {error ? <Text style={styles.error}>Video oynatılamadı.</Text> : null}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: '#000' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  closeBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, color: '#fff', fontSize: 15, fontWeight: '700', textAlign: 'center' },
  videoWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  video: { width: '100%', height: '100%' },
  error: { color: '#F87171', fontSize: 15, fontWeight: '600', position: 'absolute' },
});
