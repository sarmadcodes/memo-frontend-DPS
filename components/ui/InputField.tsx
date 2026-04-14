import { StyleSheet, Text, TextInput, View } from 'react-native';

type InputFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  maxLength?: number;
  multiline?: boolean;
};

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  error,
  maxLength,
  multiline,
}: InputFieldProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {typeof maxLength === 'number' ? (
          <Text style={styles.counter}>{value.length}/{maxLength}</Text>
        ) : null}
      </View>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9A8F7D"
        secureTextEntry={secureTextEntry}
        maxLength={maxLength}
        multiline={multiline}
        style={[styles.input, multiline ? styles.multilineInput : null, error ? styles.inputError : null]}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: '#3D3121',
    fontFamily: 'Inter_700Bold',
    fontSize: 13,
  },
  counter: {
    color: '#8A7C66',
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2D8C6',
    backgroundColor: '#FFFCF8',
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: '#342A1C',
    fontFamily: 'Inter_400Regular',
  },
  multilineInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#A73D3D',
  },
  error: {
    color: '#A73D3D',
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
  },
});
