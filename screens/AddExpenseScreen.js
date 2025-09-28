import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useExpenses } from '../context/ExpensesContext';
import tw from 'twrnc';

const categories = ['Food', 'Travel', 'Shopping', 'Bills', 'Others'];

export default function AddExpenseScreen() {
  const nav = useNavigation();
  const { addExpense } = useExpenses();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const onSave = async () => {
    if (!title || !amount) {
      Alert.alert('Missing info', 'Please enter title and amount');
      return;
    }
    await addExpense({ title, amount: Number(amount), category, date });
    nav.goBack();
  };

  return (
    <View style={tw`flex-1 bg-neutral-50 p-4`}>
      <View style={tw`bg-white rounded-2xl p-5 shadow-sm border border-neutral-100`}>
        <Text style={tw`text-neutral-700 mb-1`}>Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="e.g., Pizza"
          placeholderTextColor="#9ca3af"
          style={tw`bg-neutral-100 text-neutral-900 rounded-xl px-3 py-2 mb-4`}
        />

        <Text style={tw`text-neutral-700 mb-1`}>Amount</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="e.g., 200"
          keyboardType="numeric"
          placeholderTextColor="#9ca3af"
          style={tw`bg-neutral-100 text-neutral-900 rounded-xl px-3 py-2 mb-4`}
        />

        <Text style={tw`text-neutral-700 mb-1`}>Category</Text>
        <View style={tw`flex-row flex-wrap -m-1 mb-4`}>
          {categories.map((c) => (
            <TouchableOpacity key={c} onPress={() => setCategory(c)} style={tw`p-1 w-1/3`}>
              <View style={tw`${category === c ? 'bg-blue-600' : 'bg-neutral-100'} rounded-full px-3 py-2 items-center`}>
                <Text style={tw`${category === c ? 'text-white' : 'text-neutral-700'}`}>{c}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={tw`text-neutral-700 mb-1`}>Date (YYYY-MM-DD)</Text>
        <TextInput
          value={date}
          onChangeText={setDate}
          placeholder="2025-09-28"
          placeholderTextColor="#9ca3af"
          style={tw`bg-neutral-100 text-neutral-900 rounded-xl px-3 py-2 mb-4`}
        />

        <TouchableOpacity onPress={onSave} style={tw`bg-blue-600 rounded-xl py-3 items-center`}>
          <Text style={tw`text-white font-semibold`}>Save Expense</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
