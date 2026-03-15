import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { auth } from '../firebase';

type Transaction = {
  id: string;
  amount: string;
  note: string;
  category: string;
  type: 'expense' | 'income';
  date: string;
};

export default function HomeScreen() {
  const router = useRouter();
  const { colors, isDark, toggleTheme } = useTheme();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  const loadTransactions = async () => {
    try {
      const data = await AsyncStorage.getItem('transactions');
      if (data) setTransactions(JSON.parse(data));
    } catch (e) {
      console.log('Error loading', e);
    }
  };

  const deleteTransaction = async (id: string) => {
    const confirmed = window.confirm('Delete this transaction?');
    if (!confirmed) return;
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    await AsyncStorage.setItem('transactions', JSON.stringify(updated));
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>

      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.greeting, { color: colors.text }]}>👋 Hello!</Text>
          <Text style={[styles.subtitle, { color: colors.subtext }]}>Your Financial Overview</Text>
        </View>
        <View style={styles.headerBtns}>
          <TouchableOpacity onPress={toggleTheme} style={[styles.iconBtn, { backgroundColor: colors.card }]}>
            <Text style={styles.iconBtnText}>{isDark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => auth.signOut()} style={[styles.logoutBtn, { backgroundColor: colors.card }]}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.balanceCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.balanceLabel, { color: colors.subtext }]}>Total Balance</Text>
        <Text style={[styles.balanceAmount, { color: colors.text }]}>${balance.toFixed(2)}</Text>
        <View style={styles.row}>
          <View style={[styles.incomeBox, { backgroundColor: colors.incomeBox }]}>
            <Text style={[styles.boxLabel, { color: colors.subtext }]}>Income</Text>
            <Text style={[styles.incomeText, { color: colors.positive }]}>+${totalIncome.toFixed(2)}</Text>
          </View>
          <View style={[styles.expenseBox, { backgroundColor: colors.expenseBox }]}>
            <Text style={[styles.boxLabel, { color: colors.subtext }]}>Expenses</Text>
            <Text style={[styles.expenseText, { color: colors.negative }]}>-${totalExpenses.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.card }]} onPress={() => router.push('/add-expense')}>
          <Text style={styles.actionIcon}>➕</Text>
          <Text style={[styles.actionLabel, { color: colors.subtext }]}>Add Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.card }]} onPress={() => router.push('/charts')}>
          <Text style={styles.actionIcon}>📊</Text>
          <Text style={[styles.actionLabel, { color: colors.subtext }]}>View Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.card }]} onPress={() => router.push('/ai-advice')}>
          <Text style={styles.actionIcon}>🤖</Text>
          <Text style={[styles.actionLabel, { color: colors.subtext }]}>AI Advice</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Transactions</Text>

      {transactions.length === 0 && (
        <View style={[styles.emptyBox, { backgroundColor: colors.card }]}>
          <Text style={[styles.emptyText, { color: colors.text }]}>No transactions yet!</Text>
          <Text style={[styles.emptySubtext, { color: colors.subtext }]}>Tap ➕ to add your first one</Text>
        </View>
      )}

      {[...transactions].reverse().slice(0, 10).map((item) => (
        <View key={item.id} style={[styles.transactionItem, { backgroundColor: colors.card }]}>
          <View style={styles.transactionInfo}>
            <Text style={[styles.transactionName, { color: colors.text }]}>{item.category} {item.note ? `— ${item.note}` : ''}</Text>
            <Text style={[styles.transactionDate, { color: colors.subtext }]}>{item.date}</Text>
          </View>
          <Text style={[styles.transactionAmount,
            item.type === 'income' ? { color: colors.positive } : { color: colors.negative }]}>
            {item.type === 'income' ? '+' : '-'}${parseFloat(item.amount).toFixed(2)}
          </Text>
          <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteTransaction(item.id)}>
            <Text style={styles.deleteText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  headerRow: { marginTop: 50, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontSize: 28, fontWeight: 'bold' },
  subtitle: { fontSize: 14, marginTop: 4 },
  headerBtns: { flexDirection: 'row', gap: 8 },
  iconBtn: { borderRadius: 10, padding: 8 },
  iconBtnText: { fontSize: 16 },
  logoutBtn: { borderRadius: 10, padding: 8 },
  logoutText: { color: '#f44336', fontSize: 13, fontWeight: 'bold' },
  balanceCard: { borderRadius: 20, padding: 24, marginBottom: 24 },
  balanceLabel: { fontSize: 14 },
  balanceAmount: { fontSize: 42, fontWeight: 'bold', marginVertical: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  incomeBox: { borderRadius: 12, padding: 12, flex: 0.48 },
  expenseBox: { borderRadius: 12, padding: 12, flex: 0.48 },
  boxLabel: { fontSize: 12 },
  incomeText: { fontSize: 18, fontWeight: 'bold' },
  expenseText: { fontSize: 18, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, marginTop: 8 },
  actionBtn: { borderRadius: 16, padding: 16, alignItems: 'center', flex: 0.3 },
  actionIcon: { fontSize: 24 },
  actionLabel: { fontSize: 11, marginTop: 6, textAlign: 'center' },
  emptyBox: { borderRadius: 14, padding: 30, alignItems: 'center' },
  emptyText: { fontSize: 16, fontWeight: 'bold' },
  emptySubtext: { fontSize: 13, marginTop: 6 },
  transactionItem: { borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  transactionInfo: { flex: 1 },
  transactionName: { fontSize: 15, fontWeight: '600' },
  transactionDate: { fontSize: 12, marginTop: 2 },
  transactionAmount: { fontSize: 16, fontWeight: 'bold', marginRight: 10 },
  deleteBtn: { padding: 6 },
  deleteText: { fontSize: 18 },
});