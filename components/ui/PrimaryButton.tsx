import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
};

type ButtonVariantStyle = {
  button: object;
  label: object;
  spinnerColor: string;
};

export default function PrimaryButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
}: PrimaryButtonProps) {
  const styleSet: ButtonVariantStyle =
    variant === 'secondary' ? secondaryStyles : variant === 'danger' ? dangerStyles : primaryStyles;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        styleSet.button,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={styleSet.spinnerColor} />
      ) : (
        <Text style={[styles.label, styleSet.label]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  label: {
    fontFamily: 'Inter_700Bold',
    fontSize: 15,
  },
  pressed: {
    opacity: 0.82,
  },
  disabled: {
    opacity: 0.5,
  },
});

const primaryStyles: ButtonVariantStyle = {
  button: {
    backgroundColor: '#2D261A',
  },
  label: {
    color: '#FFF7E9',
  },
  spinnerColor: '#FFF7E9',
};

const secondaryStyles: ButtonVariantStyle = {
  button: {
    backgroundColor: '#F3EBD9',
    borderWidth: 1,
    borderColor: '#E4D6BB',
  },
  label: {
    color: '#4D402B',
  },
  spinnerColor: '#4D402B',
};

const dangerStyles: ButtonVariantStyle = {
  button: {
    backgroundColor: '#A22D2D',
  },
  label: {
    color: '#FFF2F2',
  },
  spinnerColor: '#FFF2F2',
};
