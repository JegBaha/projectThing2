import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';
import { router } from 'expo-router';

export default function ParentAuthScreen() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const correctPin = '1234'; // In a real app, this would be stored securely

  const handleSubmit = () => {
    if (pin === correctPin) {
      router.push('/parent-dashboard');
    } else {
      setError('Yanlış PIN kodu. Lütfen tekrar deneyin.');
      setPin('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ebeveyn Girişi</Text>
      <Text style={styles.subtitle}>Lütfen PIN kodunuzu girin</Text>
      
      <TextInput
        style={styles.input}
        value={pin}
        onChangeText={setPin}
        placeholder="PIN Kodu"
        keyboardType="numeric"
        secureTextEntry
        maxLength={4}
      />
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <Button
        label="Giriş Yap"
        onPress={handleSubmit}
        style={styles.button}
      />
      
      <Button
        label="Geri Dön"
        onPress={() => router.back()}
        style={styles.backButton}
        outline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3436',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#636E72',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  error: {
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    height: 56,
    borderRadius: 12,
    marginBottom: 12,
  },
  backButton: {
    height: 56,
    borderRadius: 12,
  },
});