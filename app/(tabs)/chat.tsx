import { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import { useLocalSearchParams, router } from 'expo-router';

export default function ChatScreen() {
  const { fromCamera, theme } = useLocalSearchParams<{ fromCamera: string; theme: string }>();
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; audio?: string }>>([
    { text: 'Merhaba! Ben senin arkadaşın Bilge. Birlikte öğrenmeye ne dersin?', isUser: false },
  ]);
  const [input, setInput] = useState('');
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [savedRecordings, setSavedRecordings] = useState<string[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    (async () => {
      await Audio.requestPermissionsAsync();
    })();
  }, []);

  useEffect(() => {
    if (fromCamera === 'true') {
      const photoMessage = { text: 'Fotoğraf çekildi! Ne gördüğümü söyleyeyim...', isUser: false };
      setMessages(prev => [...prev, photoMessage]);
      
      setTimeout(() => {
        const aiResponse = {
          text: 'Bu fotoğrafta çok ilginç şeyler görüyorum! Birlikte keşfedelim!',
          isUser: false,
        };
        setMessages(prev => [...prev, aiResponse]);
        Speech.speak(aiResponse.text, { language: 'tr' });
      }, 1000);
    }

    if (theme) {
      const themeMessages = {
        '1': 'Doğa hakkında konuşmaya hazırım! Bitkiler, hayvanlar ve doğa hakkında ne öğrenmek istersin?',
        '2': 'Müzik dünyasına hoş geldin! Hangi müzik aleti hakkında konuşmak istersin?',
        '3': 'Yeni kelimeler öğrenmeye hazır mısın? Hangi konuda kelime öğrenmek istersin?',
      };
      
      const message = {
        text: themeMessages[theme] || 'Bu konu hakkında konuşmaya hazırım!',
        isUser: false,
      };
      setMessages(prev => [...prev, message]);
      Speech.speak(message.text, { language: 'tr' });
    }
  }, [fromCamera, theme]);

  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setIsRecording(false);
      
      if (uri) {
        setSavedRecordings(prev => [...prev, uri]);
        const message = { text: '🎤 Ses kaydı gönderildi', isUser: true, audio: uri };
        setMessages(prev => [...prev, message]);
        
        setTimeout(() => {
          const aiResponse = {
            text: 'Ses kaydını aldım! Nasıl yardımcı olabilirim?',
            isUser: false,
          };
          setMessages(prev => [...prev, aiResponse]);
          Speech.speak(aiResponse.text, { language: 'tr' });
        }, 1000);
      }
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const playRecording = async (uri: string) => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri });
      await sound.playAsync();
    } catch (err) {
      console.error('Failed to play recording', err);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const responses = [
      'Harika bir soru! Birlikte öğrenelim!',
      'Çok güzel düşünmüşsün!',
      'Bu konuda sana yardımcı olabilirim!',
      'Haydi birlikte keşfedelim!',
      'Ne kadar meraklısın! Bu çok güzel!'
    ];

    setTimeout(() => {
      const aiResponse = {
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
      };
      setMessages(prev => [...prev, aiResponse]);
      Speech.speak(aiResponse.text, { language: 'tr' });
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={90}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              message.isUser ? styles.userBubble : styles.aiBubble,
            ]}>
            <Text style={styles.messageText}>{message.text}</Text>
            {message.audio && (
              <Pressable
                style={styles.audioButton}
                onPress={() => playRecording(message.audio!)}>
                <Ionicons name="play" size={20} color="#4A90E2" />
                <Text style={styles.audioButtonText}>Dinle</Text>
              </Pressable>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <Pressable
          onPress={() => setShowVoiceModal(true)}
          style={styles.voiceButton}>
          <Ionicons name="mic" size={24} color="#4A90E2" />
        </Pressable>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Bir şeyler yaz..."
          placeholderTextColor="#999"
          multiline
        />
        <Pressable onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#FFFFFF" />
        </Pressable>
      </View>

      <Modal
        visible={showVoiceModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowVoiceModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ses Kaydı</Text>
            
            <Pressable
              style={[styles.recordButton, isRecording && styles.recordingButton]}
              onPress={isRecording ? stopRecording : startRecording}>
              <Ionicons
                name={isRecording ? "stop" : "mic"}
                size={32}
                color="#FFFFFF"
              />
              <Text style={styles.recordButtonText}>
                {isRecording ? 'Kaydı Durdur' : 'Kayda Başla'}
              </Text>
            </Pressable>

            {savedRecordings.length > 0 && (
              <View style={styles.recordingsList}>
                <Text style={styles.recordingsTitle}>Önceki Kayıtlar</Text>
                {savedRecordings.map((uri, index) => (
                  <Pressable
                    key={index}
                    style={styles.recordingItem}
                    onPress={() => playRecording(uri)}>
                    <Ionicons name="play" size={20} color="#4A90E2" />
                    <Text style={styles.recordingText}>Kayıt {index + 1}</Text>
                  </Pressable>
                ))}
              </View>
            )}

            <Pressable
              style={styles.closeButton}
              onPress={() => setShowVoiceModal(false)}>
              <Text style={styles.closeButtonText}>Kapat</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  userBubble: {
    backgroundColor: '#E3F2FD',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: '#F5F5F5',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: '#2D3436',
    fontSize: 16,
    lineHeight: 22,
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    padding: 4,
  },
  audioButtonText: {
    color: '#4A90E2',
    marginLeft: 4,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    alignItems: 'center',
  },
  voiceButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    fontSize: 16,
    maxHeight: 100,
    color: '#2D3436',
  },
  sendButton: {
    width: 44,
    height: 44,
    backgroundColor: '#4A90E2',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 300,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
    textAlign: 'center',
    marginBottom: 20,
  },
  recordButton: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  recordingButton: {
    backgroundColor: '#FF6B6B',
  },
  recordButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  recordingsList: {
    marginTop: 20,
  },
  recordingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 12,
  },
  recordingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F5F7FA',
    borderRadius: 8,
    marginBottom: 8,
  },
  recordingText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#2D3436',
  },
  closeButton: {
    backgroundColor: '#F5F7FA',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#2D3436',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});