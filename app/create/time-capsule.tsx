import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, ScrollView, KeyboardAvoidingView, Platform, Image, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TimeCapsuleScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  
  // Date and Time picker state
  const defaultDate = new Date();
  defaultDate.setFullYear(defaultDate.getFullYear() + 1); // Default to 1 year from now
  const [unlockDate, setUnlockDate] = useState<Date>(defaultDate);
  const [showPicker, setShowPicker] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      setImages((prev) => [...prev, ...result.assets.map(a => a.uri)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSeal = () => {
    // API logic for sealing the capsule goes here
    router.replace('/(tabs)/feed');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.header, { paddingTop: Math.max(20, insets.top) }]}>
        <Pressable onPress={() => router.back()} style={styles.iconBtn}>
          <Feather name="x" size={24} color="#2A2419" />
        </Pressable>
        <Text style={styles.headerTitle}>Time Capsule</Text>
        <Pressable 
          onPress={handleSeal}
          disabled={!content.trim() && images.length === 0}
          style={[styles.sealBtn, (!content.trim() && images.length === 0) && styles.sealBtnDisabled]}
        >
          <Text style={styles.sealBtnText}>Seal</Text>
        </Pressable>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.unlockSection}>
          <Text style={styles.sectionLabel}>Unlock Date</Text>
          <Pressable 
            style={styles.dateSelector} 
            onPress={() => {
              Keyboard.dismiss();
              setShowPicker(!showPicker);
            }}
          >
            <Feather name="calendar" size={18} color="#5C5441" />
            <Text style={styles.dateSelectorText}>
              {unlockDate.toLocaleDateString('en-US', {
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
              })}
            </Text>
            <Feather name={showPicker ? "chevron-up" : "chevron-down"} size={18} color="#8D8471" />
          </Pressable>
          
          {showPicker && (
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={unlockDate}
                mode="date"
                display="spinner"
                minimumDate={new Date()}
                onChange={(event, selectedDate) => {
                  if (Platform.OS === 'android') {
                    setShowPicker(false);
                  }
                  if (selectedDate) setUnlockDate(selectedDate);
                }}
                themeVariant="light"
                textColor="#2A2419"
              />
            </View>
          )}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Write a message to your future self..."
          placeholderTextColor="#A1998A"
          multiline
          autoFocus={false} // Removed autofocus so they can see the layout properly
          onFocus={() => setShowPicker(false)}
          value={content}
          onChangeText={setContent}
        />

        {images.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagePreviewScroll}>
            {images.map((uri, idx) => (
              <View key={idx} style={styles.imagePreviewContainer}>
                <Image source={{ uri }} style={styles.imagePreview} />
                <Pressable style={styles.removeImageBtn} onPress={() => removeImage(idx)}>
                  <Feather name="x" size={14} color="#FFF" />
                </Pressable>
              </View>
            ))}
          </ScrollView>
        )}
      </ScrollView>

      <View style={[styles.toolbar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <Pressable style={styles.toolbarBtn} onPress={pickImage}>
          <Ionicons name="image-outline" size={24} color="#5C5441" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EBE5DB',
    backgroundColor: '#FAF8F5',
  },
  iconBtn: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: 'Inter_600SemiBold',
    color: '#2A2419',
  },
  sealBtn: {
    backgroundColor: '#2A2419',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  sealBtnDisabled: {
    backgroundColor: '#D1C9BC',
  },
  sealBtnText: {
    color: '#FFF',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  content: {
    padding: 20,
    flexGrow: 1,
  },
  unlockSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontFamily: 'Inter_500Medium',
    color: '#8D8471',
    fontSize: 13,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBE5DB',
  },
  dateSelectorText: {
    flex: 1,
    fontFamily: 'Inter_500Medium',
    color: '#2A2419',
    fontSize: 15,
    marginLeft: 12,
  },
  pickerContainer: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBE5DB',
    padding: 8,
    overflow: 'hidden',
  },
  input: {
    flex: 1, // Expand to push everything up naturally
    fontFamily: 'Inter_400Regular',
    fontSize: 17,
    color: '#2A2419',
    lineHeight: 26,
    minHeight: 150,
    textAlignVertical: 'top',
  },
  imagePreviewScroll: {
    marginTop: 16,
    flexGrow: 0,
  },
  imagePreviewContainer: {
    marginRight: 12,
    position: 'relative',
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  removeImageBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EBE5DB',
    backgroundColor: '#FAF8F5',
  },
  toolbarBtn: {
    padding: 8,
    marginRight: 8,
  },
});
