import { ScrollView, Text, View, Pressable, FlatList } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { Akrep3DCarousel } from '@/components/akrep-3d-carousel';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/use-colors';
import { useTheme } from '@/lib/theme-system';
import { useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';

interface AlbumItem {
  id: string;
  title: string;
  count: number;
}

/**
 * Akrep Galeri - Ana Ekran
 * 3D Carousel, Tema Sistemi ve Medya Yönetimi
 */
export default function HomeScreen() {
  const colors = useColors();
  const theme = useTheme('dark');
  const [albums, setAlbums] = useState<AlbumItem[]>([]);
  const [selectedTab, setSelectedTab] = useState<'photos' | 'videos' | 'albums'>(
    'albums'
  );

  useEffect(() => {
    loadAlbums();
  }, []);

  const loadAlbums = async () => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (permission.granted) {
        const allAlbums = await MediaLibrary.getAlbumsAsync();
        const formattedAlbums = allAlbums.map((album: any) => ({
          id: album.id,
          title: album.title,
          count: album.assetCount,
        }));
        setAlbums(formattedAlbums);
      }
    } catch (error) {
      console.error('Albümler yüklenemedi:', error);
    }
  };

  const sampleAlbums = [
    { id: '1', title: 'Tatil Fotoğrafları', count: 45 },
    { id: '2', title: 'Aile Anıları', count: 128 },
    { id: '3', title: 'Doğa Fotoğrafları', count: 67 },
    { id: '4', title: 'Şehir Görüntüleri', count: 92 },
    { id: '5', title: 'Portre Koleksiyonu', count: 34 },
  ];

  const displayAlbums = albums.length > 0 ? albums : sampleAlbums;

  return (
    <ScreenContainer className="bg-black">
      <View style={{ flex: 1 }}>
        {/* Başlık */}
        <View className="px-6 pt-4 pb-2">
          <Text className="text-4xl font-bold text-white">Akrep Galeri</Text>
          <Text className="text-sm text-gray-400 mt-1">
            Medyalarınızı güvenle yönetin
          </Text>
        </View>

        {/* Sekme Seçimi */}
        <View className="flex-row gap-2 px-6 py-4 border-b border-gray-800">
          {(['photos', 'videos', 'albums'] as const).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 8,
                backgroundColor:
                  selectedTab === tab ? theme.primary : 'transparent',
                borderWidth: 1,
                borderColor:
                  selectedTab === tab ? theme.primary : theme.border,
              }}
            >
              <Text
                style={{
                  color: selectedTab === tab ? '#fff' : theme.muted,
                  fontSize: 14,
                  fontWeight: '500',
                }}
              >
                {tab === 'photos'
                  ? 'Fotoğraflar'
                  : tab === 'videos'
                    ? 'Videolar'
                    : 'Albümler'}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* İçerik */}
        {selectedTab === 'albums' && (
          <View style={{ flex: 1 }}>
            {/* 3D Carousel */}
            <View className="h-80 px-4 py-6">
              <Akrep3DCarousel
                items={displayAlbums}
                itemWidth={160}
                itemHeight={240}
                gap={12}
                rotationAngle={45}
                renderItem={(album) => (
                  <Pressable
                    style={{
                      flex: 1,
                      backgroundColor: theme.surface,
                      borderRadius: 12,
                      padding: 12,
                      justifyContent: 'space-between',
                      borderWidth: 1,
                      borderColor: theme.border,
                    }}
                  >
                    <View>
                      <Ionicons
                        name="images"
                        size={32}
                        color={theme.primary}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: theme.foreground,
                          fontSize: 14,
                          fontWeight: '600',
                        }}
                        numberOfLines={2}
                      >
                        {album.title}
                      </Text>
                      <Text
                        style={{
                          color: theme.muted,
                          fontSize: 12,
                          marginTop: 4,
                        }}
                      >
                        {album.count} öğe
                      </Text>
                    </View>
                  </Pressable>
                )}
              />
            </View>

            {/* Albüm Listesi */}
            <View className="flex-1 px-4">
              <Text
                style={{
                  color: theme.foreground,
                  fontSize: 16,
                  fontWeight: '600',
                  marginBottom: 12,
                }}
              >
                Tüm Albümler
              </Text>
              <FlatList
                data={displayAlbums}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <Pressable
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 12,
                      paddingHorizontal: 12,
                      marginBottom: 8,
                      backgroundColor: theme.surface,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: theme.border,
                    }}
                  >
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 8,
                        backgroundColor: theme.primary,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 12,
                      }}
                    >
                      <Ionicons
                        name="images"
                        size={24}
                        color="#fff"
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          color: theme.foreground,
                          fontSize: 14,
                          fontWeight: '500',
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          color: theme.muted,
                          fontSize: 12,
                          marginTop: 2,
                        }}
                      >
                        {item.count} öğe
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={theme.muted}
                    />
                  </Pressable>
                )}
              />
            </View>
          </View>
        )}

        {(selectedTab === 'photos' || selectedTab === 'videos') && (
          <View className="flex-1 justify-center items-center">
            <Ionicons
              name={selectedTab === 'photos' ? 'image' : 'play-circle'}
              size={64}
              color={theme.primary}
            />
            <Text
              style={{
                color: theme.foreground,
                fontSize: 16,
                fontWeight: '600',
                marginTop: 16,
              }}
            >
              {selectedTab === 'photos'
                ? 'Fotoğraflar'
                : 'Videolar'} yakında
            </Text>
            <Text
              style={{
                color: theme.muted,
                fontSize: 14,
                marginTop: 8,
              }}
            >
              Bu bölüm geliştirme aşamasındadır
            </Text>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}
