import { StyleSheet, Text, View } from 'react-native';

type UserAvatarProps = {
  name: string;
  size?: number;
};

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function UserAvatar({ name, size = 40 }: UserAvatarProps) {
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.initials, { fontSize: Math.max(11, Math.round(size * 0.3)) }]}>{getInitials(name)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#DCC79E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#463A25',
    fontFamily: 'Inter_700Bold',
  },
});
