import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [name, setName] = useState('Maya Moore');
  const [username, setUsername] = useState('mayayaya');
  const [bio, setBio] = useState('Just looking around.');
  const [avatarUri, setAvatarUri] = useState<string | null>('https://i.pravatar.cc/300?img=33');
  const [bannerUri, setBannerUri] = useState<string | null>('https://images.unsplash.com/photo-1579546929518-9e396f3cc809');

  const pickImage = async (setImageUri: (uri: string) => void, aspect: [number, number] = [1, 1]) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    // Save logic
    router.back();
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[
        styles.content, 
        { paddingTop: Math.max(20, insets.top + 10), paddingBottom: 24 + insets.bottom }
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Edit Profile</Text>
        <Pressable onPress={handleSave} style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save</Text>
        </Pressable>
      </View>

      <View style={styles.mediaContainer}>
        {/* Banner Pick */}
        <TouchableOpacity 
          style={styles.bannerContainer}
          activeOpacity={0.8}
          onPress={() => pickImage(setBannerUri, [21, 9])}
        >
          {bannerUri ? (
             <Image source={{ uri: bannerUri }} style={styles.bannerImage} />
          ) : (
             <View style={styles.bannerPlaceholder} />
          )}
          <View style={styles.overlay}>
             <Ionicons name="camera" size={24} color="#FFF" />
             <Text style={styles.overlayText}>Change Banner</Text>
          </View>
        </TouchableOpacity>

        {/* Avatar Pick */}
        <TouchableOpacity 
          style={styles.avatarContainer}
          activeOpacity={0.8}
          onPress={() => pickImage(setAvatarUri, [1, 1])}
        >
          {avatarUri ? (
             <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
          ) : (
             <View style={styles.avatarPlaceholder} />
          )}
          <View style={[styles.overlay, styles.avatarOverlay]}>
             <Ionicons name="camera" size={20} color="#FFF" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput 
            style={styles.input} 
            value={name} 
            onChangeText={setName} 
            placeholder="Your name"
            placeholderTextColor="#9A9283"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput 
            style={styles.input} 
            value={username} 
            onChangeText={setUsername} 
            placeholder="your_username"
            placeholderTextColor="#9A9283"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Bio</Text>
          <TextInput 
            style={[styles.input, styles.bioInput]} 
            value={bio} 
            onChangeText={setBio} 
            placeholder="A little about yourself..."
            placeholderTextColor="#9A9283"
            multiline
            textAlignVertical="top"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAF7',
  },
  content: {
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#2A2418',
  },
  saveBtn: {
    backgroundColor: '#C9A84C',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveBtnText: {
    color: '#FFF',
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
  },
  mediaContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  bannerContainer: {
    width: '100%',
    height: 140,
    backgroundColor: '#E4DAC5',
    position: 'relative',
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E4DAC5',
  },
  avatarContainer: {
    position: 'absolute',
    bottom: -40,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FAFAF7',
    backgroundColor: '#FFFDFA',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E4DAC5',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  avatarOverlay: {
    borderRadius: 50,
  },
  overlayText: {
    color: '#FFF',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
  },
  formContainer: {
    paddingHorizontal: 16,
    gap: 20,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#6E604C',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E4DAC5',
    backgroundColor: '#FFFDFA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#3E3324',
    fontFamily: 'Inter_400Regular',
  },
  bioInput: {
    minHeight: 100,
  },
});
