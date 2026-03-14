import { StyleSheet, Text, View } from 'react-native';

export default function Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>blocked</Text>
      <Text style={styles.subtitle}>Memo screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F5EF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#2A2419',
    textTransform: 'capitalize',
  },
  subtitle: {
    marginTop: 8,
    color: '#6B6254',
    fontFamily: 'Inter_400Regular',
  },
});
