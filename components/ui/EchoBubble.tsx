import { StyleSheet, Text, View } from 'react-native';

type EchoBubbleProps = {
  text: string;
  count?: number;
};

export default function EchoBubble({ text, count }: EchoBubbleProps) {
  return (
    <View style={styles.pill}>
      <Text style={styles.text}>{text}</Text>
      {typeof count === 'number' ? <Text style={styles.count}>{count}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E4D7BD',
    backgroundColor: '#F8F1E0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  text: {
    color: '#594B30',
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
  },
  count: {
    color: '#3E3424',
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
  },
});
