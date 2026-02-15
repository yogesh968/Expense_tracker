import React, { useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import FloatingButton from '../components/FloatingButton';
import { useNavigation } from '@react-navigation/native';
import { useExpenses } from '../context/ExpensesContext';
import { isThisMonth } from '../utils/dateRange';
import tw from 'twrnc';

const categories = ['Food', 'Travel', 'Shopping', 'Bills', 'Other'];

export default function HomeScreen() {
  const nav = useNavigation();
  const { expenses } = useExpenses();

  const monthExpenses = useMemo(() => expenses.filter((e) => isThisMonth(e.date)), [expenses]);
  const total = useMemo(() => monthExpenses.reduce((sum, e) => sum + Number(e.amount || 0), 0), [monthExpenses]);

  const byCategory = useMemo(() => {
    const map = Object.fromEntries(categories.map((c) => [c, 0]));
    monthExpenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + Number(e.amount || 0);
    });
    return map;
  }, [monthExpenses]);

  return (
    <View style={tw`flex-1 bg-neutral-50`}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={tw`bg-white rounded-2xl p-5 shadow-sm border border-neutral-100`}>
          <Text style={tw`text-neutral-500`}>This Month</Text>
          <Text style={tw`text-3xl font-bold mt-1 text-neutral-900`}>₹ {total.toFixed(2)}</Text>
        </View>

        <Text style={tw`mt-5 mb-2 text-neutral-700 font-semibold`}>Quick Summary</Text>
        <View style={tw`flex-row flex-wrap -m-1`}>
          {categories.map((c) => (
            <View key={c} style={tw`w-1/2 p-1`}>
              <View style={tw`bg-white rounded-2xl p-4 shadow-sm border border-neutral-100`}>
                <Text style={tw`text-neutral-500`}>{c}</Text>
                <Text style={tw`text-xl font-bold text-neutral-900`}>₹ {byCategory[c].toFixed(0)}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <FloatingButton onPress={() => nav.navigate('AddExpense')} />
    </View>
  );
}
