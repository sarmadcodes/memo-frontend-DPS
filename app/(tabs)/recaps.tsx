import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, Alert, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { RECAP_DATES, RECAP_MEMORIES } from '../../constants/dummyData';

export default function RecapsScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [selectedDate, setSelectedDate] = useState(3);

  const handleOpenCalendar = () => {
    Alert.alert('Select Date', 'Imagine a date picker opening here, allowing you to go to any year and date!');
  };

  return (
    <LinearGradient colors={['#F7F5F0', '#EAE5D8']} style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: Math.max(20, insets.top + 10), paddingBottom: 132 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Recaps</Text>
            <Pressable style={({ pressed }) => [styles.calendarBtn, pressed && { opacity: 0.7 }]} onPress={handleOpenCalendar}>
              <Feather name="calendar" size={18} color="#5B4D33" />
            </Pressable>
          </View>
          <Text style={styles.subtitle}>Relive your past memories</Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.timelineScroll} 
          contentContainerStyle={styles.timelineContent}
        >
          {RECAP_DATES.map((item) => (
            <Pressable 
              key={item.id} 
              onPress={() => setSelectedDate(item.id)}
              style={[styles.dateItem, selectedDate === item.id && styles.dateItemSelected]}
            >
              <Text style={[styles.dayText, selectedDate === item.id && styles.dayTextSelected]}>{item.day}</Text>
              <Text style={[styles.dateText, selectedDate === item.id && styles.dateTextSelected]}>{item.date}</Text>
              {selectedDate === item.id && <View style={styles.selectedDot} />}
            </Pressable>
          ))}
        </ScrollView>

        <View style={[styles.recapContainer, { maxWidth: Math.min(width - 32, 600), alignSelf: 'center' }]}>
          <View style={styles.recapHeader}>
            <View>
              <Text style={styles.recapTitle}>{RECAP_DATES.find(d => d.id === selectedDate)?.day}day Highlights</Text>
              <Text style={styles.recapSubtitle}>{RECAP_MEMORIES.length} memories • 1 location</Text>
            </View>
            <View style={styles.headerRight}>
              <Image source={require('../../assets/images/IMG_0711.jpg')} style={styles.authorAvatar} />
              <Pressable style={styles.playButton}>
                <Feather name="play" size={16} color="#FFF" style={{ marginLeft: 3 }} />
              </Pressable>
            </View>
          </View>
          
          {RECAP_MEMORIES.map(memory => {
            if (memory.type === 'photo') {
              return (
                <Pressable key={memory.id} style={({ pressed }) => [styles.recapCard, pressed && { transform: [{ scale: 0.98 }] }]}>
                  <Image 
                    source={typeof memory.image === 'string' ? { uri: memory.image } : memory.image} 
                    style={styles.recapImage}
                    contentFit="cover"
                    transition={200}
                    cachePolicy="memory-disk"
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.recapOverlay}
                  >
                    <View style={styles.recapHashtagRow}>
                      <BlurView intensity={20} tint="light" style={styles.recapTag}>
                        <Text style={styles.recapTagText}>{memory.tag}</Text>
                      </BlurView>
                      <Text style={styles.recapTimestamp}>{memory.timestamp}</Text>
                    </View>
                    <Text style={styles.recapNote}>{memory.note}</Text>
                  </LinearGradient>
                </Pressable>
              );
            } else {
              return (
                <View key={memory.id} style={styles.textCard}>
                  <View style={styles.textCardHeader}>
                    <View style={styles.recapTagAlt}>
                      <Text style={styles.recapTagTextAlt}>{memory.tag}</Text>
                    </View>
                    <Text style={styles.recapTimestampAlt}>{memory.timestamp}</Text>
                  </View>
                  <Text style={styles.textCardBody}>
                    {memory.body}
                  </Text>
                </View>
              );
            }
          })}

        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 0,
    gap: 20,
  },
  headerContainer: {
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 34,
    color: '#2C2418',
    fontFamily: 'Inter_700Bold',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#7A6B52',
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  calendarBtn: {
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: '#F0EAD9',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5B4D33',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timelineScroll: {
    marginHorizontal: 0,
    flexGrow: 0,
  },
  timelineContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  dateItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: '#EAE1CB',
    minWidth: 70,
    elevation: 1,
    shadowColor: '#3B3121',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dateItemSelected: {
    backgroundColor: '#2C2418',
    borderColor: '#4A3D2C',
    elevation: 4,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  selectedDot: {
    width: 4,
    height: 4,
    backgroundColor: '#F8F1E5',
    borderRadius: 2,
    marginTop: 6,
    position: 'absolute',
    bottom: 8,
  },
  dayText: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: '#7A6B52',
    marginBottom: 4,
  },
  dayTextSelected: {
    color: '#D8CBB6',
  },
  dateText: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: '#3D3121',
  },
  dateTextSelected: {
    color: '#F8F1E5',
  },
  recapContainer: {
    gap: 16,
    paddingHorizontal: 16,
    width: '100%',
  },
  recapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  authorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#EAE1CB',
  },
  recapTitle: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    color: '#2C2418',
    letterSpacing: -0.3,
  },
  recapSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#7A6B52',
    marginTop: 2,
  },
  playButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#2C2418',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#2C2418',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  recapCard: {
    height: 400,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#EAE1CB',
    elevation: 4,
    shadowColor: '#3B3121',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  recapImage: {
    width: '100%',
    height: '100%',
  },
  recapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingTop: 60,
  },
  recapHashtagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  recapTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recapTagText: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  recapTimestamp: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
  },
  recapNote: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Lora_400Regular',
    lineHeight: 24,
  },
  textCard: {
    backgroundColor: '#F8F1E5',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E8DCC2',
  },
  textCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  recapTagAlt: {
    backgroundColor: '#E8DCC2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recapTagTextAlt: {
    color: '#5B4D33',
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  recapTimestampAlt: {
    color: '#8A7B61',
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
  },
  textCardBody: {
    color: '#3D3121',
    fontSize: 16,
    fontFamily: 'Lora_400Regular',
    lineHeight: 26,
  },
});

