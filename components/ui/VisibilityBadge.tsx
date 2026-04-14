import { StyleSheet, Text, View } from 'react-native';

type Visibility = 'PUBLIC' | 'FOLLOWERS' | 'ONLY_ME';

type VisibilityBadgeProps = {
  visibility: Visibility;
};

const labelMap: Record<Visibility, string> = {
  PUBLIC: 'Public',
  FOLLOWERS: 'Followers',
  ONLY_ME: 'Only Me',
};

export default function VisibilityBadge({ visibility }: VisibilityBadgeProps) {
  return (
    <View style={styles.pill}>
      <Text style={styles.text}>{labelMap[visibility]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E4D7BD',
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: '#F8F1E0',
  },
  text: {
    color: '#5B4E34',
    fontFamily: 'Inter_700Bold',
    fontSize: 10,
  },
});
