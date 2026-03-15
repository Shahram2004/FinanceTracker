import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebase';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async () => {
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.replace('/');
    } catch (e: any) {
      setError(e.message.replace('Firebase: ', ''));
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>

      <View style={styles.topSection}>
        <Text style={styles.logo}>💰</Text>
        <Text style={styles.title}>FinanceTracker</Text>
        <Text style={styles.subtitle}>Your AI-powered money manager</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{isSignUp ? 'Create Account' : 'Welcome Back'}</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="you@email.com"
          placeholderTextColor="#444"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#444"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.authBtn} onPress={handleAuth} disabled={loading}>
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.authBtnText}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { setIsSignUp(!isSignUp); setError(''); }}>
          <Text style={styles.switchText}>
            {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a', justifyContent: 'center', padding: 20 },
  topSection: { alignItems: 'center', marginBottom: 40 },
  logo: { fontSize: 60 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 10 },
  subtitle: { color: '#888', fontSize: 14, marginTop: 6 },
  card: { backgroundColor: '#1a1a2e', borderRadius: 24, padding: 24 },
  cardTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  label: { color: '#888', fontSize: 13, marginBottom: 8 },
  input: { backgroundColor: '#0f0f1a', color: '#fff', borderRadius: 12, padding: 14, fontSize: 15, marginBottom: 16 },
  errorText: { color: '#f44336', fontSize: 13, marginBottom: 12 },
  authBtn: { backgroundColor: '#7c6fff', borderRadius: 14, padding: 16, alignItems: 'center', marginBottom: 16 },
  authBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  switchText: { color: '#7c6fff', textAlign: 'center', fontSize: 14 },
});