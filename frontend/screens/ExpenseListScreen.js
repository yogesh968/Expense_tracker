import React, { useMemo } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../context/ExpensesContext';

export default function ExpenseListScreen() {
  const { expenses } = useExpenses();

  const categories = useMemo(() => {
    const map = {};
    (expenses || []).forEach(e => {
        map[e.category] = (map[e.category] || 0) + Number(e.amount || 0);
    });
    
    const limits = {
        'Housing & Rent': 2500, 'Dining': 800, 'Transport': 500,
        'Shopping': 400, 'Utilities': 300, 'Health': 200, 'Other': 500
    };

    return Object.keys(limits).map(cat => ({
        name: cat,
        val: map[cat] || 0,
        limit: limits[cat],
        desc: cat === 'Housing' ? 'Fixed monthly cost' : 'Variable spending',
        color: (map[cat] || 0) > limits[cat] ? '#EF4444' : '#1A1F36',
        icon: cat === 'Dining' ? 'restaurant-outline' : cat === 'Transport' ? 'car-outline' : cat === 'Shopping' ? 'cart-outline' : 'card-outline'
    })).sort((a,b) => b.val - a.val);
  }, [expenses]);

  const totalSpent = useMemo(() => (expenses || []).reduce((acc, curr) => acc + Number(curr.amount || 0), 0), [expenses]);
  const budgetGoal = 5000;

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`px-6 pt-6 pb-6 bg-white flex-row justify-between items-center border-b border-gray-100 shadow-xs`}>
          <Text style={tw`text-3xl font-black text-[#1A1F36] tracking-tighter`}>FIYO</Text>
          <TouchableOpacity style={tw`w-10 h-10 items-center justify-center bg-gray-50 rounded-xl`}>
             <Ionicons name="notifications-outline" size={24} color="#1A1F36" />
          </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={tw`pb-40`} showsVerticalScrollIndicator={false}>
         <View style={tw`px-6 py-8`}>
            <View style={tw`flex-row justify-between items-end mb-4`}>
               <View>
                  <Text style={tw`text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1`}>Budget Velocity</Text>
                  <Text style={tw`text-[11px] font-bold text-[#1A1F36]`}>Total Spending vs $5,000 monthly limit</Text>
               </View>
               <Text style={tw`text-2xl font-black text-[#1A1F36] tracking-tighter`}>${totalSpent.toLocaleString()}</Text>
            </View>
            <View style={tw`h-1.5 bg-gray-50 rounded-full overflow-hidden`}>
               <View style={[tw`h-1.5 bg-[#1A1F36] rounded-full`, { width: `${Math.min((totalSpent/budgetGoal)*100, 100)}%` }]} />
            </View>
         </View>

         <View style={tw`px-6 mt-4`}>
            <Text style={tw`text-[10px] font-black uppercase text-gray-400 tracking-widest mb-8`}>Allocation Audit</Text>
            
            {categories.map((cat, idx) => {
               const percentage = Math.min((cat.val / cat.limit) * 100, 100);
               const overLimit = cat.val > cat.limit;
               return (
                 <View key={idx} style={tw`bg-white rounded-3xl p-6 mb-5 border border-gray-100 flex-row items-center justify-between shadow-xs`}>
                    <View style={tw`flex-row items-center flex-1`}>
                       <View style={tw`w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mr-4`}>
                          <Ionicons name={cat.icon} size={20} color="#1A1F36" />
                       </View>
                       <View style={tw`flex-1`}>
                          <Text style={tw`text-[11px] font-black text-[#1A1F36] uppercase tracking-widest mb-2`}>{cat.name}</Text>
                          <View style={tw`h-1 bg-gray-50 rounded-full overflow-hidden w-[85%]`}>
                             <View style={[tw`h-1 rounded-full`, { backgroundColor: cat.color, width: `${percentage}%` }]} />
                          </View>
                       </View>
                    </View>
                    <View style={tw`items-end`}>
                       <Text style={tw`text-[12px] font-black text-${overLimit ? 'red-600' : '[#1A1F36]'} mb-1`}>${cat.val.toLocaleString()}</Text>
                       <Text style={tw`text-[9px] text-gray-400 font-bold uppercase`}>{overLimit ? 'OVER' : `${Math.round(percentage)}%`}</Text>
                    </View>
                 </View>
               );
            })}
         </View>
      </ScrollView>
    </SafeAreaView>
  );
}
