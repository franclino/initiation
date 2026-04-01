// Bottom Tab Navigation — Wheel, Archetype, Journal, Profile
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

const S = COLORS.samhain;

function TabIcon({ label, focused }) {
  const icons = {
    Wheel: '⊛',
    Archetype: '◇',
    Journal: '☽',
    Profile: '◎',
  };
  return (
    <View style={styles.tabIcon}>
      <Text style={[styles.icon, focused && { color: S.glow, opacity: 1 }]}>
        {icons[label] || '•'}
      </Text>
      <Text style={[styles.label, focused && { color: S.glow, opacity: 1 }]}>
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="wheel"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Wheel" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="archetype"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Archetype" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Journal" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Profile" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0a0a0a',
    borderTopWidth: 1,
    borderTopColor: 'rgba(139,105,20,0.2)',
    height: 80,
    paddingTop: 8,
    paddingBottom: 20,
  },
  tabIcon: {
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    fontSize: 20,
    color: '#666',
    opacity: 0.5,
  },
  label: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 10,
    color: '#666',
    opacity: 0.5,
    letterSpacing: 1,
  },
});
