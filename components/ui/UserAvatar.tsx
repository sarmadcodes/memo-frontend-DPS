import { Image, StyleSheet, Text, View } from 'react-native';

type UserAvatarProps = {
  name: string;
  size?: number;
  avatar?: any;
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

export default function UserAvatar({ name, size = 40, avatar }: UserAvatarProps) {
  if (avatar) {
    return (
      <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, overflow: 'hidden' }]}>
        <Image source={typeof avatar === 'string' ? { uri: avatar } : avatar} style={{ width: size, height: size }} />
      </View>
    );
  }
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
