import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../context/ExpensesContext';
import { useNavigation } from '@react-navigation/native';

export default function AddExpenseScreen() {
  const { addExpense } = useExpenses();
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Dining');
  const [loading, setLoading] = useState(false);

  const categories = [
    { name: 'Shopping', icon: 'cart-outline' },
    { name: 'Dining', icon: 'restaurant-outline' },
    { name: 'Transport', icon: 'car-outline' },
    { name: 'Utilities', icon: 'flash-outline' },
    { name: 'Health', icon: 'medkit-outline' },
    { name: 'Other', icon: 'ellipsis-horizontal-outline' },
  ];

  const handleAdd = async () => {
    if (!amount || !title) return Alert.alert('Oops!', 'Please enter the amount and what it was for.');
    setLoading(true);
    const res = await addExpense({ amount: parseFloat(amount), title, category });
    
    // Smooth delay for user experience
    setTimeout(() => {
        setLoading(false);
        if (res.success) {
          setAmount(''); setTitle('');
          navigation.navigate('Home');
        } else {
          Alert.alert('Error', 'Could not save that. Try again?');
        }
    }, 600);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <KeyboardAvoidingView style={tw`flex-1`} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={tw`px-6 pt-6 pb-6 bg-white flex-row items-center justify-between border-b border-gray-100`}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`w-10 h-10 items-center justify-center bg-gray-50 rounded-xl`}>
             <Ionicons name="close-outline" size={26} color="#1A1F36" />
          </TouchableOpacity>
          <Text style={tw`text-2xl font-black text-[#1A1F36] tracking-tighter`}>FIYO</Text>
          <TouchableOpacity style={tw`w-10 h-10 items-center justify-center`}>
             <Ionicons name="time-outline" size={24} color="#1A1F36" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={tw`px-6 pt-8 pb-40`} showsVerticalScrollIndicator={false}>
          {/* AMOUNT SECTION */}
          <View style={tw`mb-8`}>
             <Text style={tw`text-[11px] font-black text-gray-500 mb-2 uppercase tracking-widest`}>How much?</Text>
             <View style={tw`bg-white rounded-2xl px-5 py-6 border border-gray-200 flex-row items-center shadow-sm`}>
                <Text style={tw`text-3xl font-black text-gray-300 mr-2 tracking-tighter`}>$</Text>
                <TextInput
                   value={amount}
                   onChangeText={setAmount}
                   placeholder="0.00"
                   keyboardType="decimal-pad"
                   placeholderTextColor="#D1D5DB"
                   style={tw`flex-1 text-3xl font-black text-[#1A1F36] tracking-tight`}
                />
             </View>
          </View>

          {/* CATEGORY SECTION */}
          <View style={tw`mb-8`}>
            <Text style={tw`text-[11px] font-black text-gray-500 mb-5 uppercase tracking-widest`}>Category</Text>
            <View style={tw`flex-row flex-wrap justify-between`}>
               {categories.map((cat) => (
                 <TouchableOpacity 
                   key={cat.name} 
                   onPress={() => setCategory(cat.name)}
                   style={tw`w-[31%] aspect-square bg-${category === cat.name ? '[#1A1F36]' : 'white'} rounded-2xl items-center justify-center border border-${category === cat.name ? '[#1A1F36]' : 'gray-100'} shadow-sm mb-3`}
                 >
                    <Ionicons name={cat.icon} size={28} color={category === cat.name ? 'white' : '#1A1F36'} style={tw`mb-2`} />
                    <Text style={tw`text-[10px] font-black uppercase tracking-widest text-${category === cat.name ? 'white' : 'gray-400'}`}>{cat.name}</Text>
                 </TouchableOpacity>
               ))}
               <View style={tw`w-[31%]`} />
            </View>
          </View>

          {/* DATE & NOTE SECTION */}
          <View style={tw`mb-8`}>
             <Text style={tw`text-[11px] font-black text-gray-500 mb-2 uppercase tracking-widest`}>When?</Text>
             <View style={tw`bg-white rounded-2xl px-5 py-4 border border-gray-200 flex-row items-center justify-between shadow-sm mb-6`}>
                <Text style={tw`text-sm font-bold text-[#1A1F36]`}>Today, Oct 24</Text>
                <Ionicons name="calendar-outline" size={20} color="#1A1F36" />
             </View>

             <Text style={tw`text-[11px] font-black text-gray-500 mb-2 uppercase tracking-widest`}>What for?</Text>
             <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Brief description..."
                placeholderTextColor="#9CA3AF"
                multiline
                style={tw`bg-white rounded-2xl px-5 py-5 border border-gray-200 min-h-[100px] text-sm text-[#1A1F36] font-bold shadow-sm`}
             />
          </View>

          <TouchableOpacity
            onPress={handleAdd}
            disabled={loading}
            style={tw`bg-[#1A1F36] py-5 rounded-2xl flex-row items-center justify-center mt-4 shadow-lg`}
          >
            <Ionicons name="checkmark-circle" size={22} color="white" style={tw`mr-2`} />
            <Text style={tw`text-white font-black text-[14px] uppercase tracking-widest`}>{loading ? 'Saving...' : 'Add Transaction'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
