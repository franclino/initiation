// Journal — New Entry (standalone from stack nav)
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { COLORS, FONTS } from '../../constants/theme';

const S = COLORS.samhain;

export default function NewJournalEntry() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const save = () => {
    // TODO: persist to storage/backend
    router.back();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.logo}>
        <Text style={styles.logoText}>✦</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>New Entry</Text>

        <TextInput
          style={styles.titleInput}
          placeholder="Title (optional)"
          placeholderTextColor="rgba(212,212,212,0.3)"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.contentInput}
          placeholder="Write what arises..."
          placeholderTextColor="rgba(212,212,212,0.3)"
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.saveButton} onPress={save}>
          <Text style={styles.saveText}>Save Entry</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: S.background },
  logo: { alignSelf: 'center', paddingTop: 60, paddingBottom: 4 },
  logoText: { fontSize: 24, color: S.accent, opacity: 0.8 },
  scroll: { paddingHorizontal: 28, paddingBottom: 60 },
  heading: {
    fontFamily: FONTS.heading, fontSize: 22, color: S.text, textAlign: 'center', marginBottom: 24,
  },
  titleInput: {
    fontFamily: FONTS.heading, fontSize: 16, color: S.text,
    borderBottomWidth: 1, borderBottomColor: 'rgba(139,105,20,0.2)',
    paddingBottom: 12, marginBottom: 16,
  },
  contentInput: {
    fontFamily: FONTS.body, fontSize: 15, color: S.text, lineHeight: 26,
    minHeight: 240, marginBottom: 32,
  },
  saveButton: {
    borderWidth: 1, borderColor: S.glow, borderRadius: 4, padding: 16,
    alignItems: 'center', backgroundColor: 'rgba(155,89,182,0.1)',
  },
  saveText: { fontFamily: FONTS.heading, fontSize: 14, color: S.text, letterSpacing: 1 },
});
