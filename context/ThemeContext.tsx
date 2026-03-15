import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  colors: typeof darkColors;
};

const darkColors = {
  background: '#0f0f1a',
  card: '#1a1a2e',
  text: '#ffffff',
  subtext: '#888888',
  border: '#2a2a3e',
  positive: '#4caf50',
  negative: '#f44336',
  accent: '#7c6fff',
  incomeBox: '#0d2b1f',
  expenseBox: '#2b0d0d',
};

const lightColors = {
  background: '#f0f2f5',
  card: '#ffffff',
  text: '#1a1a2e',
  subtext: '#666666',
  border: '#e0e0e0',
  positive: '#2e7d32',
  negative: '#c62828',
  accent: '#5c4fd6',
  incomeBox: '#e8f5e9',
  expenseBox: '#ffebee',
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  toggleTheme: () => {},
  colors: darkColors,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const saved = await AsyncStorage.getItem('theme');
      if (saved !== null) setIsDark(saved === 'dark');
    } catch (e) {}
  };

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{
      isDark,
      toggleTheme,
      colors: isDark ? darkColors : lightColors,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);