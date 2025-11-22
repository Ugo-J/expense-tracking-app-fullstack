import { Slot } from 'expo-router';
import { AuthProvider } from '../src/context/authContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}