import React, { useMemo, useState } from 'react';
import { View, TextInput, FlatList, Text } from 'react-native';
import CategoryFilter from '../components/CategoryFilter';
import ExpenseCard from '../components/ExpenseCard';
import { useExpenses } from '../context/ExpensesContext';
import { isToday, isThisWeek, isThisMonth } from '../utils/dateRange';
import tw from 'twrnc';

const dateFilters = ['All', 'Today', 'This Week', 'This Month'];
           
export default function ExpenseListScreen() {
  const { expenses, deleteExpense } = useExpenses();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      if (category !== 'All' && e.category !== category) return false;
      if (query && !e.title.toLowerCase().includes(query.toLowerCase())) return false;
      if (dateFilter === 'Today' && !isToday(e.date)) return false;
      if (dateFilter === 'This Week' && !isThisWeek(e.date)) return false;
      if (dateFilter === 'This Month' && !isThisMonth(e.date)) return false;
      return true;
    });
  }, [expenses, category, query, dateFilter]);

  return (
    <View style={tw`flex-1 bg-neutral-50 p-4`}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search by title..."
        placeholderTextColor="#9ca3af"
        style={tw`bg-white text-neutral-900 rounded-2xl px-4 py-3 mb-3 border border-neutral-100`}
      />

      <CategoryFilter value={category} onChange={setCategory} />

      <View style={tw`flex-row mb-3`}>
        {dateFilters.map((f) => (
          <Text
            key={f}
            onPress={() => setDateFilter(f)}
            style={tw`${dateFilter === f ? 'bg-blue-600 text-white' : 'bg-neutral-100 text-neutral-700'} mr-2 px-3 py-1 rounded-full`}
          >
            {f}
          </Text>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseCard item={item} onDelete={(e) => deleteExpense(e.id)} />
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
}
