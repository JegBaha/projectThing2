import { useState } from 'react';
import { StyleSheet, ScrollView, Pressable, Dimensions, Platform, Image , TouchableOpacity} from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';



const { width } = Dimensions.get('window');

const activities = [
  {
    id: 'daily',
    title: 'Günün Görevleri',
    description: 'Bugünün özel aktiviteleri',
    color: '#FF9F43',
    gradient: ['#FFB347', '#FF9F43'],
    icon: 'calendar',
    image: 'https://images.unsplash.com/photo-1435527173128-983b87201f4d?w=400&q=80',
  },
  {
    id: 'cartoon',
    title: 'Çizgi Film',
    description: 'Kendi filmini yarat',
    color: '#FF6B6B',
    gradient: ['#FF8787', '#FF6B6B'],
    icon: 'film',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80',
  },
  {
    id: 'discover',
    title: 'Çevremizi Keşfedelim',
    description: 'Yeni şeyler keşfet',
    color: '#4A90E2',
    gradient: ['#5C9CE6', '#4A90E2'],
    icon: 'search',
    image: 'https://images.unsplash.com/photo-1459478309853-2c33a60058e7?w=400&q=80',
  },
  {
    id: 'learn',
    title: 'Birlikte Öğrenelim',
    description: 'Eğlenceli aktiviteler',
    color: '#98D8AA',
    gradient: ['#A8E0B9', '#98D8AA'],
    icon: 'book',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80',
  },
];

export default function HomeScreen() {
  const [isParentMode, setIsParentMode] = useState(false);

  const handleParentModeToggle = () => {
    if (!isParentMode) {
      router.push('/parent-auth');
    } else {
      setIsParentMode(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Pressable onPress={handleParentModeToggle} style={styles.modeButton}>
            <Text style={styles.modeText}>{isParentMode ? 'Ebeveyn' : 'Çocuk'}</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.beeContainer}>
      
        <Image 
            source={require('C:/Users/bahab/OneDrive/Masaüstü/project/assets/images/bee.png')} 
          style={styles.beeImage} 
            />
            <Image 
            source={require('C:/Users/bahab/OneDrive/Masaüstü/project/assets/images/soundwave.png')} 
          style={styles.beeUnderImage} 
            />
        </View>
        <Text style={styles.welcomeText}>Bugün Ne Yapmak İstersinn?</Text>
        <View style={styles.activitiesContainer}>
          {activities.map((activity) => (
            <Pressable
              key={activity.id}
              style={styles.activityCard}
              onPress={() => router.push(`/${activity.id}`)}>
              <LinearGradient
                colors={activity.gradient}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                <View style={styles.activityContent}>
                  <View style={styles.iconContainer}>
                    <Image
                      source={{ uri: activity.image }}
                      style={styles.activityImage}
                    />
                    <View style={styles.iconOverlay}>
                      <Ionicons name={activity.icon} size={32} color="#FFFFFF" />
                    </View>
                  </View>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityDescription}>{activity.description}</Text>
                </View>
              </LinearGradient>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modeButton: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  modeText: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  beeContainer: {
    alignItems: 'center',
    backgroundColor: '#92c7f0',
    marginBottom: 30,
  },
  beeImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  beeUnderImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
    textAlign: 'center',
    marginTop: 16,
  },
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  activityCard: {
    width: (width - 56) / 2,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  gradient: {
    borderRadius: 20,
  },
  activityContent: {
    padding: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    marginBottom: 12,
    borderRadius: 40,
    overflow: 'hidden',
    position: 'relative',
  },
  activityImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  iconOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
});