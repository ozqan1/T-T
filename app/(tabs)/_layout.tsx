import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PressableScale } from '@/components/PressableScale';
import { useTheme } from '@/theme/useTheme';
import { haptic } from '@/lib/haptics';

type IconName = keyof typeof Ionicons.glyphMap;

const TAB_META: Record<string, { label: string; icon: IconName }> = {
  index: { label: 'TikTok', icon: 'logo-tiktok' },
  twitter: { label: 'X', icon: 'logo-twitter' },
  instagram: { label: 'Instagram', icon: 'logo-instagram' },
  settings: { label: 'Ayarlar', icon: 'settings-sharp' },
};

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const theme = useTheme();
  const c = theme.colors;
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <BlurView
        intensity={40}
        tint="dark"
        style={[styles.bar, { backgroundColor: c.tabBar, borderColor: c.border }]}
      >
        {state.routes.map((route, index) => {
          const meta = TAB_META[route.name];
          if (!meta) return null;
          const focused = state.index === index;
          return (
            <PressableScale
              key={route.key}
              hapticOnPress={false}
              scaleTo={0.9}
              style={styles.tab}
              onPress={() => {
                haptic('select');
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
              }}
            >
              <Ionicons name={meta.icon} size={22} color={focused ? c.accent : c.textDim} />
              <Text style={[styles.label, { color: focused ? c.accent : c.textDim }]}>
                {meta.label}
              </Text>
            </PressableScale>
          );
        })}
      </BlurView>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: 'transparent' } }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="twitter" />
      <Tabs.Screen name="instagram" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 14,
    backgroundColor: 'transparent',
  },
  bar: {
    flexDirection: 'row',
    borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10,
    overflow: 'hidden',
  },
  tab: { flex: 1, alignItems: 'center', gap: 3 },
  label: { fontSize: 11, fontWeight: '700' },
});
