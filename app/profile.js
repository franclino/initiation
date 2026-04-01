// Profile placeholder
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile — Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.general.background, justifyContent: 'center', alignItems: 'center' },
  text: { fontFamily: FONTS.body, fontSize: 16, color: COLORS.general.text, opacity: 0.6 },
});
