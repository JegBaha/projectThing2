import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';

const learningCategories = [
  {
    title: 'Sayılar',
    icon: 'calculator',
    color: '#FF6B6B',
    bgColor: '#FFE5E5',
    items: ['1️⃣ Bir', '2️⃣ İki', '3️⃣ Üç', '4️⃣ Dört', '5️⃣ Beş'],
  },
  {
    title: 'Renkler',
    icon: 'color-palette',
    color: '#4A90E2',
    bgColor: '#E5F3FF',
    items: ['🔴 Kırmızı', '🔵 Mavi', '💚 Yeşil', '💛 Sarı', '💜 Mor'],
  },
  {
    title: 'Hayvanlar',
    icon: 'paw',
    color: '#FFB347',
    bgColor: '#FFF3E5',
    items: ['🐱 Kedi', '🐶 Köpek', '🐦 Kuş', '🐴 At', '🐰 Tavşan'],
  },
];

export default function LearnScreen() {
  const handleItemPress = (text: string) => {
    const wordOnly = text.split(' ')[1];
    Speech.speak(wordOnly, { language: 'tr' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Haydi Öğrenelim! 🎓</Text>
        <Text style={styles.headerSubtitle}>Kelimelere dokun ve dinle!</Text>
      </View>

      <ScrollView style={styles.content}>
        {learningCategories.map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <View style={[styles.categoryHeader, { backgroundColor: category.bgColor }]}>
              <Ionicons name={category.icon} size={32} color={category.color} />
              <Text style={[styles.categoryTitle, { color: category.color }]}>
                {category.title}
              </Text>
            </View>
            <View style={styles.itemsContainer}>
              {category.items.map((item, itemIndex) => (
                <Pressable
                  key={itemIndex}
                  style={({ pressed }) => [
                    styles.item,
                    { backgroundColor: category.bgColor },
                    pressed && styles.itemPressed
                  ]}
                  onPress={() => handleItemPress(item)}>
                  <Text style={[styles.itemText, { color: category.color }]}>{item}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ))}
        <View style={styles.bottomPadding} />
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
  categoryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 8,
  },
  item: {
    borderRadius: 12,
    padding: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  itemPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 20,
  },
});