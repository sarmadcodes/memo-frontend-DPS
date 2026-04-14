import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EmptyState from '../../components/ui/EmptyState';
import SkeletonCard from '../../components/ui/SkeletonCard';

function Row({ label, danger = false }: { label: string; danger?: boolean }) {
  return (
    <Pressable style={({ pressed }) => [styles.row, pressed ? styles.pressed : null]}>
      <Text style={[styles.rowText, danger ? styles.dangerText : null]}>{label}</Text>
    </Pressable>
  );
}

export default function Screen() {
  const insets = useSafeAreaInsets();
  const [biometricLock, setBiometricLock] = useState(false);
  const [isLoading] = useState(false);
  const hasSettings = true;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: Math.max(20, insets.top + 10), paddingBottom: 24 + insets.bottom }]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Settings</Text>

      {isLoading ? <SkeletonCard compact /> : null}

      {!isLoading && !hasSettings ? (
        <EmptyState title="Settings unavailable" subtitle="Please try again in a moment." />
      ) : null}

      {!isLoading && hasSettings ? <View style={styles.group}>
        <Row label="Edit Profile" />
        <Row label="Change Username" />
        <Row label="Privacy (Default Visibility)" />
        <View style={styles.rowSwitch}>
          <Text style={styles.rowText}>Biometric Lock</Text>
          <Switch value={biometricLock} onValueChange={setBiometricLock} trackColor={{ true: '#C9A84C' }} />
        </View>
        <Row label="Notification Preferences" />
      </View> : null}

      <Text style={styles.groupTitle}>Account</Text>
      {!isLoading && hasSettings ? <View style={styles.group}>
        <Row label="Change Password" />
        <Row label="Sign Out" />
        <Row label="Delete Account" danger />
      </View> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF7' },
  content: { paddingHorizontal: 16, gap: 12 },
  title: { color: '#2A2418', fontSize: 30, fontFamily: 'Inter_700Bold' },
  groupTitle: {
    marginTop: 6,
    color: '#6E604C',
    fontFamily: 'Inter_700Bold',
    fontSize: 12,
    letterSpacing: 0.6,
  },
  group: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E4DAC5',
    backgroundColor: '#FFFDFA',
    overflow: 'hidden',
  },
  row: {
    minHeight: 50,
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0E8D8',
  },
  rowSwitch: {
    minHeight: 50,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E8D8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowText: { color: '#3E3324', fontFamily: 'Inter_400Regular' },
  dangerText: { color: '#A33A3A', fontFamily: 'Inter_700Bold' },
  pressed: { opacity: 0.82 },
});
