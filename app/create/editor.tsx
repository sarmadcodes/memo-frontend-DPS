import { StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView, Platform, Keyboard, Image, ScrollView, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useRef, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

export default function EditorScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  
  const isPhotoDump = params.type === 'photo_dump';
  const postType = isPhotoDump ? 'Photo Dump' : 'Freewrite';

  const [content, setContent] = useState('');
  // Support multiple images for Photo Dump, or single image as fallback
  const [images, setImages] = useState<string[]>([]);
  
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    // If it's a photo dump and we have no images yet, open the picker automatically
    if (isPhotoDump && images.length === 0) {
      pickImage();
    }
  }, [isPhotoDump]);

  const handlePost = () => {
    Keyboard.dismiss();
    router.push('/create/visibility');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: isPhotoDump, // multiple for photo dump
      quality: 0.8,
    });

    if (!result.canceled) {
      const selectedUris = result.assets.map(a => a.uri);
      setImages(prev => isPhotoDump ? [...prev, ...selectedUris] : selectedUris);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Render varying UI based on mode
  if (isPhotoDump) {
    // ---- PHOTO DUMP UI ----
    return (
      <KeyboardAvoidingView 
        style={[styles.container, styles.photoDumpContainer]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.photoHeader, { paddingTop: Math.max(20, insets.top) }]}>
          <Pressable onPress={() => router.back()} style={styles.iconBtn}>
            <Feather name="x" size={24} color="#FFF" />
          </Pressable>
          <Text style={[styles.headerTitle, { color: '#FFF' }]}>{postType}</Text>
          <Pressable 
            onPress={handlePost} 
            style={[styles.postBtnLine, (images.length === 0) && styles.postBtnLineDisabled]}
            disabled={images.length === 0}
          >
            <Text style={[styles.postBtnLineText, (images.length === 0) && styles.postBtnTextDisabled]}>Next</Text>
          </Pressable>
        </View>

        <ScrollView 
          contentContainerStyle={styles.photoDumpScroll}
          keyboardShouldPersistTaps="handled"
        >
          {images.length === 0 ? (
            <Pressable style={styles.emptyPhotoState} onPress={pickImage}>
              <View style={styles.emptyPhotoCircle}>
                <Feather name="camera" size={32} color="#FFF" />
              </View>
              <Text style={styles.emptyPhotoText}>Tap to select memories</Text>
            </Pressable>
          ) : (
            <View>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                snapToInterval={width * 0.85 + 16}
                decelerationRate="fast"
                contentContainerStyle={styles.photoDumpGrid}
              >
                {images.map((uri, idx) => (
                  <View key={idx} style={[styles.photoDumpImageWrapper, { width: width * 0.85 }]}>
                    <Image source={{ uri }} style={styles.photoDumpImage} />
                    <Pressable style={styles.removePhotoDumpBtn} onPress={() => removeImage(idx)}>
                      <Feather name="x" size={16} color="#FFF" />
                    </Pressable>
                  </View>
                ))}
                <Pressable style={[styles.addMorePhotoBtn, { width: 100 }]} onPress={pickImage}>
                  <Feather name="plus" size={24} color="#FFF" />
                  <Text style={styles.addMorePhotoText}>Add{'\n'}More</Text>
                </Pressable>
              </ScrollView>
              
              <View style={styles.photoCaptionWrap}>
                <TextInput
                  style={styles.photoCaptionInput}
                  placeholder="Write a caption..."
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  multiline
                  value={content}
                  onChangeText={setContent}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  // ---- FREEWRITE UI ----
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.header, { paddingTop: Math.max(20, insets.top) }]}>
        <Pressable onPress={() => router.back()} style={styles.iconBtn}>
          <Feather name="x" size={24} color="#2A2419" />
        </Pressable>
        <Text style={styles.headerTitle}>{postType}</Text>
        <Pressable 
          onPress={handlePost} 
          style={[styles.postBtn, (!content.trim() && images.length === 0) && styles.postBtnDisabled]}
          disabled={!content.trim() && images.length === 0}
        >
          <Text style={[styles.postBtnText, (!content.trim() && images.length === 0) && styles.postBtnTextDisabled]}>Next</Text>
        </Pressable>
      </View>

      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        placeholderTextColor="#A89F91"
        multiline
        autoFocus
        value={content}
        onChangeText={setContent}
      />

      {images.map((uri, idx) => (
        <View key={idx} style={styles.imagePreviewContainer}>
          <Image source={{ uri }} style={styles.imagePreview} />
          <Pressable style={styles.clearImageBtn} onPress={() => removeImage(idx)}>
            <Feather name="x-circle" size={24} color="#FFF" />
          </Pressable>
        </View>
      ))}

      <View style={[styles.toolbar, { paddingBottom: Math.max(16, insets.bottom, 16) }]}>
        <View style={styles.toolbarLeft}>
          <Pressable style={styles.toolbarIcon} onPress={pickImage}>
            <Feather name="image" size={20} color="#6A5323" />
          </Pressable>
          <Pressable style={styles.toolbarIcon}>
            <Feather name="map-pin" size={20} color="#6A5323" />
          </Pressable>
          <Pressable style={styles.toolbarIcon}>
            <Feather name="mic" size={20} color="#6A5323" />
          </Pressable>
        </View>
        <Text style={styles.charCount}>{content.length}/500</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E7DDCB',
  },
  iconBtn: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#2A2419',
  },
  postBtn: {
    backgroundColor: '#2A2419',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postBtnDisabled: {
    backgroundColor: '#E7DDCB',
  },
  postBtnText: {
    color: '#FFF',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  postBtnTextDisabled: {
    color: '#A89F91',
  },
  input: {
    flex: 1,
    padding: 20,
    fontSize: 20,
    fontFamily: 'Inter_400Regular',
    color: '#2A2419',
    textAlignVertical: 'top',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E7DDCB',
    backgroundColor: '#FFF9F1',
  },
  toolbarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  toolbarIcon: {
    padding: 8,
    backgroundColor: '#F3ECD8',
    borderRadius: 20,
  },
  charCount: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: '#A89F91',
  },
  imagePreviewContainer: {
    padding: 16,
    position: 'relative',
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  clearImageBtn: {
    position: 'absolute',
    top: 24,
    right: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    padding: 4,
  },
  photoDumpContainer: {
    backgroundColor: '#1E1A14',
  },
  photoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2820',
  },
  postBtnLine: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EBE5DB',
  },
  postBtnLineDisabled: {
    backgroundColor: '#353026',
  },
  postBtnLineText: {
    color: '#2A2419',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  photoDumpScroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyPhotoState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyPhotoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2D2820',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyPhotoText: {
    color: '#8D8471',
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
  },
  photoDumpGrid: {
    paddingHorizontal: 16,
    paddingTop: 32,
    gap: 16,
    alignItems: 'center',
  },
  photoDumpImageWrapper: {
    height: 400,
    borderRadius: 24,
    backgroundColor: '#2D2820',
    overflow: 'hidden',
    position: 'relative',
  },
  photoDumpImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removePhotoDumpBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMorePhotoBtn: {
    height: 400,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#353026',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  addMorePhotoText: {
    color: '#FFF',
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    textAlign: 'center',
  },
  photoCaptionWrap: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  photoCaptionInput: {
    fontFamily: 'Lora_400Regular_Italic',
    fontSize: 18,
    color: '#FFF',
    lineHeight: 28,
    borderLeftWidth: 2,
    borderLeftColor: '#353026',
    paddingLeft: 12,
  },
});
