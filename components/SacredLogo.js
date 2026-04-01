// Sacred geometry logo — the interconnected octagonal web
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LOGO } from '../constants/theme';

export default function SacredLogo({ size = 48, onPress, style }) {
  const router = useRouter();

  const handlePress = onPress || (() => router.push('/home'));

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container, style]} activeOpacity={0.7}>
      <Image
        source={LOGO.dark}
        style={[styles.logo, { width: size, height: size }]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingTop: 60,
    paddingBottom: 8,
  },
  logo: {
    opacity: 0.9,
  },
});
