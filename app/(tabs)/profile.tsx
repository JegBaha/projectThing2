import { useState } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../../context/UserContext';

export default function ProfileScreen() {
  const { userName, setUserName, level, timeSpent } = useUser();
  const [isParentMode, setIsParentMode] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);
  const [pin, setPin] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(userName);
  const correctPin = '1234';

  const handlePinSubmit = () => {
    if (pin === correctPin) {
      setIsParentMode(true);
      setShowPinInput(false);
      setPin('');
    } else {
      setPin('');
    }
  };

  const handleNameSave = () => {
    if (newName.trim()) {
      setUserName(newName.trim());
      setIsEditing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} dakika`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil 👤</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.profileCard}>
          <View style={[styles.avatarContainer, { backgroundColor: isParentMode ? '#E5F3FF' : '#FFE5E5' }]}>
            <Ionicons 
              name={isParentMode ? "person" : "happy"} 
              size={60} 
              color={isParentMode ? '#4A90E2' : '#FF6B6B'} 
            />
          </View>
          
          {isEditing ? (
            <View style={styles.editNameContainer}>
              <TextInput
                style={styles.nameInput}
                value={newName}
                onChangeText={setNewName}
                placeholder="İsminizi girin"
              />
              <Pressable style={styles.saveButton} onPress={handleNameSave}>
                <Text style={styles.saveButtonText}>Kaydet</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable onPress={() => setIsEditing(true)}>
              <Text style={styles.profileName}>{userName} ✏️</Text>
            </Pressable>
          )}
          
          <Text style={styles.levelText}>Seviye {level} 🏆</Text>
          
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Bugünkü İstatistikler 📊</Text>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Öğrenme Süresi:</Text>
              <Text style={styles.statValue}>{formatTime(timeSpent.learn)} 📚</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Sohbet Süresi:</Text>
              <Text style={styles.statValue}>{formatTime(timeSpent.chat)} 💭</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Keşif Süresi:</Text>
              <Text style={styles.statValue}>{formatTime(timeSpent.camera)} 🔍</Text>
            </View>
          </View>
        </View>

        {!isParentMode && (
          <Pressable 
            style={styles.switchButton}
            onPress={() => setShowPinInput(true)}
          >
            <Ionicons name="lock-closed" size={24} color="#FFFFFF" />
            <Text style={styles.switchButtonText}>Ebeveyn Moduna Geç</Text>
          </Pressable>
        )}

        {isParentMode && (
          <Pressable 
            style={[styles.switchButton, { backgroundColor: '#4A90E2' }]}
            onPress={() => setIsParentMode(false)}
          >
            <Ionicons name="happy" size={24} color="#FFFFFF" />
            <Text style={styles.switchButtonText}>Çocuk Moduna Geç</Text>
          </Pressable>
        )}

        {showPinInput && (
          <View style={styles.pinCard}>
            <Text style={styles.pinTitle}>Ebeveyn PIN Kodu</Text>
            <TextInput
              style={styles.pinInput}
              value={pin}
              onChangeText={setPin}
              placeholder="PIN kodunu girin"
              keyboardType="numeric"
              secureTextEntry
              maxLength={4}
            />
            <Pressable 
              style={styles.pinButton}
              onPress={handlePinSubmit}
            >
              <Text style={styles.pinButtonText}>Onayla</Text>
            </Pressable>
          </View>
        )}
      </View>
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
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8,
  },
  editNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  nameInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 8,
    fontSize: 20,
    marginRight: 8,
    minWidth: 150,
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 16,
  },
  statsContainer: {
    width: '100%',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 12,
    textAlign: 'center',
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#636E72',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  switchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  switchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  pinCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 20,
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  pinTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 16,
  },
  pinInput: {
    backgroundColor: '#F8F9FA',
    width: '100%',
    padding: 16,
    borderRadius: 12,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
    color: '#2D3436',
  },
  pinButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
  },
  pinButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});