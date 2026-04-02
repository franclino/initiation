// TAB: Profile — User profile, journeys, settings
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { COLORS, FONTS } from '../../constants/theme';
import { useThemeMode } from '../../constants/ThemeContext';

const S = COLORS.samhain;

const JOURNEYS = [
  { key: 'samhain', name: 'Samhain — Crone / Magician', status: 'active' },
  { key: 'yule', name: 'Yule — Sage / Mystic', status: 'locked' },
  { key: 'imbolc', name: 'Imbolc — Maiden / Warrior', status: 'locked' },
  { key: 'ostara', name: 'Ostara — Youth / Explorer', status: 'locked' },
  { key: 'beltane', name: 'Beltane — Lover / Artist', status: 'locked' },
  { key: 'litha', name: 'Litha — Sovereign / Guardian', status: 'locked' },
  { key: 'lammas', name: 'Lammas — Mother / Provider', status: 'locked' },
  { key: 'mabon', name: 'Mabon — Harvest Keeper', status: 'locked' },
];

const REPRESENTATIVES = [
  { key: 'knife', name: 'Knife', cost: 18, unlocked: false },
  { key: 'hecate', name: 'Hecate', cost: 25, unlocked: false },
  { key: 'cauldron', name: 'Cauldron', cost: 30, unlocked: false },
  { key: 'kali', name: 'Kali', cost: 33, unlocked: false },
];

export default function ProfileTab() {
  const router = useRouter();
  const [name] = useState('Seeker');
  const { isDark, toggle } = useThemeMode();

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Text style={styles.logoText}>✦</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Avatar + Name */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>◎</Text>
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.role}>Initiate</Text>
        </View>

        {/* Archetypal Journeys */}
        <Text style={styles.sectionTitle}>ARCHETYPAL JOURNEYS</Text>
        {JOURNEYS.map((j) => (
          <View key={j.key} style={[styles.journeyCard, j.status === 'locked' && styles.journeyLocked]}>
            <View style={styles.journeyRow}>
              <Text style={[styles.journeyName, j.status === 'locked' && styles.lockedText]}>{j.name}</Text>
              <Text style={[styles.journeyStatus, j.status === 'active' && styles.activeStatus]}>
                {j.status === 'active' ? 'Active' : j.status === 'completed' ? 'Completed' : 'Locked'}
              </Text>
            </View>
          </View>
        ))}

        {/* Representatives */}
        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>UNLOCKED REPRESENTATIVES</Text>
        {REPRESENTATIVES.filter((r) => r.unlocked).length === 0 ? (
          <Text style={styles.emptyText}>
            No representatives unlocked yet.{'\n'}Complete Level 1 to enter the Chamber.
          </Text>
        ) : (
          REPRESENTATIVES.filter((r) => r.unlocked).map((r) => (
            <View key={r.key} style={styles.repCard}>
              <Text style={styles.repName}>{r.name}</Text>
            </View>
          ))
        )}

        {/* Journal shortcut */}
        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>JOURNAL</Text>
        <TouchableOpacity
          style={styles.journalLink}
          onPress={() => router.push('/(tabs)/journal')}
          activeOpacity={0.7}
        >
          <Text style={styles.journalLinkText}>Open Journal</Text>
        </TouchableOpacity>

        {/* Settings */}
        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>SETTINGS</Text>
        <View style={styles.settingsGroup}>
          <TouchableOpacity style={styles.settingRow} onPress={toggle} activeOpacity={0.7}>
            <Text style={styles.settingText}>{isDark ? '☽ Dark Mode' : '☀ Light Mode'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
            <Text style={styles.settingText}>Edit Name</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
            <Text style={styles.settingText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
            <Text style={styles.settingText}>Export Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
            <Text style={[styles.settingText, { opacity: 0.4 }]}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: S.background },
  logoRow: { alignSelf: 'center', paddingTop: 60, paddingBottom: 4 },
  logoText: { fontSize: 24, color: S.accent, opacity: 0.8 },
  scroll: { paddingHorizontal: 24, paddingBottom: 100 },
  avatarSection: { alignItems: 'center', marginBottom: 32 },
  avatar: {
    width: 80, height: 80, borderRadius: 40, borderWidth: 1, borderColor: S.glow,
    alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(155,89,182,0.08)',
    marginBottom: 12,
  },
  avatarText: { fontSize: 32, color: S.glow, opacity: 0.85 },
  name: { fontFamily: FONTS.heading, fontSize: 20, color: S.text },
  role: { fontFamily: FONTS.body, fontSize: 13, color: S.text, opacity: 0.4, marginTop: 2 },
  sectionTitle: {
    fontFamily: FONTS.heading, fontSize: 12, color: S.text, opacity: 0.4,
    letterSpacing: 3, marginBottom: 12,
  },
  journeyCard: {
    borderWidth: 1, borderColor: 'rgba(139,105,20,0.2)', borderRadius: 4,
    padding: 14, marginBottom: 8,
  },
  journeyLocked: { opacity: 0.4 },
  journeyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  journeyName: { fontFamily: FONTS.body, fontSize: 14, color: S.text, flex: 1 },
  lockedText: { opacity: 0.85 },
  journeyStatus: { fontFamily: FONTS.bodyMedium, fontSize: 11, color: S.text, opacity: 0.4 },
  activeStatus: { color: S.glow, opacity: 1 },
  emptyText: {
    fontFamily: FONTS.body, fontSize: 14, color: S.text, opacity: 0.3,
    textAlign: 'center', lineHeight: 22, marginBottom: 12,
  },
  repCard: {
    borderWidth: 1, borderColor: S.glow, borderRadius: 4, padding: 14, marginBottom: 8,
    backgroundColor: 'rgba(155,89,182,0.06)',
  },
  repName: { fontFamily: FONTS.heading, fontSize: 14, color: S.text },
  journalLink: {
    borderWidth: 1, borderColor: 'rgba(139,105,20,0.3)', borderRadius: 4,
    padding: 14, alignItems: 'center',
  },
  journalLinkText: { fontFamily: FONTS.body, fontSize: 14, color: S.text, opacity: 0.85 },
  settingsGroup: { marginBottom: 40 },
  settingRow: {
    borderBottomWidth: 1, borderBottomColor: 'rgba(139,105,20,0.1)',
    paddingVertical: 14,
  },
  settingText: { fontFamily: FONTS.body, fontSize: 14, color: S.text, opacity: 0.85 },
});
