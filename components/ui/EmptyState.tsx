import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type EmptyStateProps = {
  title: string;
  subtitle: string;
};

export default function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.iconCircle}>
        <Feather name="inbox" size={20} color="#8C7A53" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderColor: '#E4DAC5',
    backgroundColor: '#FFFDFA',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    gap: 6,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4EAD7',
  },
  title: {
    color: '#3A3123',
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
  },
  subtitle: {
    color: '#6F624C',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
});
