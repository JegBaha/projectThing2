import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Typography, Colors, Spacings } from 'react-native-ui-lib';

// Configure react-native-ui-lib
Colors.loadColors({
  primary: '#4A90E2',
  secondary: '#FF6B6B',
  accent: '#FFB347',
  textPrimary: '#2D3436',
  textSecondary: '#636E72',
  background: '#F8F9FA',
});

Typography.loadTypographies({
  h1: { fontSize: 32, fontWeight: 'bold' },
  h2: { fontSize: 24, fontWeight: 'bold' },
  h3: { fontSize: 18, fontWeight: 'bold' },
  text: { fontSize: 16 },
  small: { fontSize: 14 },
});

Spacings.loadSpacings({
  page: 20,
  card: 12,
  component: 8,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': require('@expo-google-fonts/inter/Inter_400Regular.ttf'),
    'Inter-Bold': require('@expo-google-fonts/inter/Inter_700Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}