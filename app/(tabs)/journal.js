// TAB: Journal — Digital diary / sacred journal
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { COLORS, FONTS } from '../../constants/theme';

const S = COLORS.samhain;

export default function JournalTab() {
  const [entries, setEntries] = useState([]);
  const [composing, setComposing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const saveEntry = () => {
    if (!content.trim()) return;
    const entry = {
      id: Date.now().toString(),
      title: title.trim() || 'Untitled',
      content: content.trim(),
      date: new Date(),
      season: 'Samhain',
    };
    setEntries([entry, ...entries]);
    setTitle('');
    setContent('');
    setComposing(false);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Text style={styles.logoText}>✦</Text>
      </View>

      <Text style={styles.heading}>Journal</Text>
      <Text style={styles.subheading}>Your sacred space for reflection</Text>

      {!composing && (
        <TouchableOpacity style={styles.newButton} onPress={() => setComposing(true)} activeOpacity={0.7}>
          <Text style={styles.newButtonText}>+ New Entry</Text>
        </TouchableOpacity>
      )}

      {composing && (
        <View style={styles.composeBox}>
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
          <View style={styles.composeActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => { setComposing(false); setTitle(''); setContent(''); }}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={saveEntry}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {entries.length === 0 && !composing && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>☽</Text>
            <Text style={styles.emptyText}>
              Your journal is empty.{'\n'}Begin writing to capture your reflections.
            </Text>
          </View>
        )}

        {entries.map((entry) => {
          const isExpanded = expandedId === entry.id;
          return (
            <TouchableOpacity
              key={entry.id}
              style={styles.entryCard}
              onPress={() => setExpandedId(isExpanded ? null : entry.id)}
              activeOpacity={0.8}
            >
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{entry.title}</Text>
                <Text style={styles.entryDate}>{formatDate(entry.date)}</Text>
              </View>
              <Text style={styles.entrySeason}>{entry.season}</Text>
              <Text style={styles.entryContent} numberOfLines={isExpanded ? undefined : 3}>
                {entry.content}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: S.background },
  logoRow: { alignSelf: 'center', paddingTop: 60, paddingBottom: 4 },
  logoText: { fontSize: 24, color: S.accent, opacity: 0.8 },
  heading: {
    fontFamily: FONTS.heading, fontSize: 22, color: S.text, textAlign: 'center',
    textShadowColor: S.glow, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 6,
  },
  subheading: {
    fontFamily: FONTS.body, fontSize: 13, color: S.text, opacity: 0.5,
    textAlign: 'center', marginTop: 4, marginBottom: 24,
  },
  newButton: {
    borderWidth: 1, borderColor: S.glow, borderRadius: 4, padding: 14,
    marginHorizontal: 24, alignItems: 'center', backgroundColor: 'rgba(155,89,182,0.08)',
    marginBottom: 20,
  },
  newButtonText: { fontFamily: FONTS.heading, fontSize: 14, color: S.text, letterSpacing: 1 },
  composeBox: {
    marginHorizontal: 24, borderWidth: 1, borderColor: S.accent, borderRadius: 4,
    padding: 16, backgroundColor: 'rgba(139,105,20,0.06)', marginBottom: 20,
  },
  titleInput: {
    fontFamily: FONTS.heading, fontSize: 16, color: S.text, borderBottomWidth: 1,
    borderBottomColor: 'rgba(139,105,20,0.2)', paddingBottom: 10, marginBottom: 12,
  },
  contentInput: {
    fontFamily: FONTS.body, fontSize: 15, color: S.text, lineHeight: 24,
    minHeight: 120, marginBottom: 16,
  },
  composeActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  cancelButton: { padding: 10 },
  cancelText: { fontFamily: FONTS.body, fontSize: 14, color: S.text, opacity: 0.4 },
  saveButton: {
    borderWidth: 1, borderColor: S.glow, borderRadius: 4, paddingVertical: 10,
    paddingHorizontal: 20, backgroundColor: 'rgba(155,89,182,0.1)',
  },
  saveText: { fontFamily: FONTS.heading, fontSize: 14, color: S.text },
  scroll: { paddingHorizontal: 24, paddingBottom: 100 },
  emptyState: { alignItems: 'center', paddingTop: 60 },
  emptyIcon: { fontSize: 40, color: S.glow, opacity: 0.3, marginBottom: 16 },
  emptyText: { fontFamily: FONTS.body, fontSize: 15, color: S.text, opacity: 0.4, textAlign: 'center', lineHeight: 24 },
  entryCard: {
    borderWidth: 1, borderColor: 'rgba(139,105,20,0.2)', borderRadius: 4,
    padding: 18, marginBottom: 12, backgroundColor: 'rgba(139,105,20,0.04)',
  },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  entryTitle: { fontFamily: FONTS.heading, fontSize: 15, color: S.text, flex: 1 },
  entryDate: { fontFamily: FONTS.body, fontSize: 11, color: S.text, opacity: 0.4 },
  entrySeason: { fontFamily: FONTS.bodyMedium, fontSize: 10, color: S.glow, opacity: 0.6, letterSpacing: 1, marginBottom: 8 },
  entryContent: { fontFamily: FONTS.body, fontSize: 14, color: S.text, opacity: 0.7, lineHeight: 22 },
});
