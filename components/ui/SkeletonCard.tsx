import { StyleSheet, View } from 'react-native';

type SkeletonCardProps = {
  compact?: boolean;
};

export default function SkeletonCard({ compact = false }: SkeletonCardProps) {
  return (
    <View style={[styles.card, compact ? styles.compactCard : null]}>
      <View style={styles.row}>
        <View style={styles.avatar} />
        <View style={styles.metaWrap}>
          <View style={[styles.line, { width: '55%' }]} />
          <View style={[styles.line, { width: '35%', marginTop: 6 }]} />
        </View>
      </View>
      <View style={[styles.line, { marginTop: 12, width: '92%' }]} />
      <View style={[styles.line, { marginTop: 8, width: '70%' }]} />
      {!compact ? <View style={styles.image} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: '#F2ECDD',
    borderWidth: 1,
    borderColor: '#E6DCC8',
    padding: 12,
    gap: 8,
  },
  compactCard: {
    minHeight: 118,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E7DDC9',
  },
  metaWrap: {
    flex: 1,
  },
  line: {
    height: 10,
    borderRadius: 6,
    backgroundColor: '#E2D6BE',
  },
  image: {
    marginTop: 8,
    height: 164,
    borderRadius: 12,
    backgroundColor: '#E7DDC9',
  },
});
