import { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const avatars = [
  {
    id: '1',
    name: 'Robot',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&q=80',
  },
  {
    id: '2',
    name: 'Astronaut',
    image: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=400&q=80',
  },
  {
    id: '3',
    name: 'Explorer',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&q=80',
  },
];

export default function CartoonScreen() {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [story, setStory] = useState('');
  const [isCustomizing, setIsCustomizing] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Çizgi Film Oluştur</Text>
        <Text style={styles.headerSubtitle}>Karakterini seç ve hikayeni anlat!</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Karakter Seç</Text>
            <Pressable
              style={styles.customizeButton}
              onPress={() => setIsCustomizing(!isCustomizing)}>
              <Text style={styles.customizeButtonText}>
                {isCustomizing ? 'Hazır Karakterler' : 'Özelleştir'}
              </Text>
            </Pressable>
          </View>

          {!isCustomizing ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.avatarList}>
              {avatars.map((avatar) => (
                <Pressable
                  key={avatar.id}
                  style={[
                    styles.avatarCard,
                    selectedAvatar?.id === avatar.id && styles.selectedAvatar,
                  ]}
                  onPress={() => setSelectedAvatar(avatar)}>
                  <Image source={{ uri: avatar.image }} style={styles.avatarImage} />
                  <Text style={styles.avatarName}>{avatar.name}</Text>
                </Pressable>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.customizeContainer}>
              <Text style={styles.customizeText}>
                Yakında kendi karakterini oluşturabileceksin! 🎨
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hikayeni Yaz</Text>
          <View style={styles.storyContainer}>
            <TextInput
              style={styles.storyInput}
              multiline
              placeholder="Hikayeni buraya yaz..."
              value={story}
              onChangeText={setStory}
            />
          </View>
        </View>

        <Pressable
          style={[
            styles.createButton,
            (!selectedAvatar || !story) && styles.createButtonDisabled,
          ]}
          disabled={!selectedAvatar || !story}>
          <Text style={styles.createButtonText}>Oluştur</Text>
          <Ionicons name="videocam" size={24} color="#FFFFFF" />
        </Pressable>
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
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D3436',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#636E72',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  customizeButton: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  customizeButtonText: {
    color: '#1565C0',
    fontWeight: 'bold',
  },
  avatarList: {
    flexDirection: 'row',
  },
  avatarCard: {
    width: 120,
    marginRight: 16,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 8,
  },
  selectedAvatar: {
    backgroundColor: '#E3F2FD',
    borderColor: '#1565C0',
    borderWidth: 2,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  avatarName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  customizeContainer: {
    padding: 20,
    alignItems: 'center',
  },
  customizeText: {
    fontSize: 16,
    color: '#636E72',
    textAlign: 'center',
  },
  storyContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
  },
  storyInput: {
    height: 120,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#2D3436',
  },
  createButton: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  createButtonDisabled: {
    backgroundColor: '#B0BEC5',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
});