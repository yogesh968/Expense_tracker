import React, { useMemo } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import tw from 'twrnc';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../context/ExpensesContext';
import { useAuth } from '../context/AuthContext';
import { LineChart } from 'react-native-chart-kit';

export default function HomeScreen() {
  const { expenses } = useExpenses();
  const { user } = useAuth();
  
  const total = useMemo(() => (expenses || []).reduce((acc, curr) => acc + Number(curr.amount || 0), 0), [expenses]);
  const incomeGoal = 5000; 

  const chartData = useMemo(() => {
    // Group expenses by date to make the graph consistent
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toISOString().split('T')[0];
    });

    const dayMap = {};
    (expenses || []).forEach(e => {
        const date = new Date(e.createdAt || Date.now()).toISOString().split('T')[0];
        dayMap[date] = (dayMap[date] || 0) + Number(e.amount);
    });

    return {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      datasets: [{ data: last7Days.map(day => dayMap[day] || 0) }]
    };
  }, [expenses]);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`px-6 pt-6 pb-6 bg-white flex-row justify-between items-center border-b border-gray-100 shadow-xs`}>
          <Text style={tw`text-3xl font-black text-[#1A1F36] tracking-tighter`}>FIYO</Text>
          <TouchableOpacity style={tw`w-10 h-10 items-center justify-center bg-gray-50 rounded-xl`}>
             <Ionicons name="notifications-outline" size={24} color="#1A1F36" />
          </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={tw`pb-32`} showsVerticalScrollIndicator={false}>
        {/* COMPACT WELCOME */}
        <View style={tw`px-6 pt-8 mb-6`}>
           <Text style={tw`text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1`}>Welcome Back</Text>
           <Text style={tw`text-3xl font-black text-[#1A1F36] tracking-tighter`}>{user?.name?.split(' ')[0] || 'User'}</Text>
        </View>

        {/* REFINED MINIMALIST GRAPH */}
        <View style={tw`px-6 mb-8`}>
           <View style={tw`bg-[#1A1F36] rounded-[32px] p-2 shadow-2xl relative`}>
              <View style={tw`px-6 pt-6 pb-2`}>
                  <Text style={tw`text-white/40 text-[9px] font-black uppercase tracking-widest mb-1`}>Expenditure Pulse</Text>
                  <Text style={tw`text-white text-2xl font-black tracking-tighter`}>${total.toLocaleString()}</Text>
              </View>
              <LineChart
                data={chartData}
                width={Dimensions.get('window').width - 48}
                height={180}
                yAxisLabel="$"
                chartConfig={{
                  backgroundColor: '#1A1F36',
                  backgroundGradientFrom: '#1A1F36',
                  backgroundGradientTo: '#1A1F36',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.5})`,
                  style: { borderRadius: 32 },
                  propsForDots: { r: "4", strokeWidth: "2", stroke: "#1A1F36" },
                  propsForBackgroundLines: { strokeDasharray: "", strokeWidth: 0.5, stroke: "rgba(255, 255, 255, 0.1)" },
                  fillShadowGradient: "#FFFFFF",
                  fillShadowGradientOpacity: 0.15,
                }}
                bezier
                withVerticalLines={false}
                withHorizontalLines={false}
                style={tw`rounded-[32px] ml-[-20]`}
              />
           </View>
        </View>

        {/* COMPACT SUMMARY TILES */}
        <View style={tw`flex-row px-6 mb-8 gap-4`}>
           <View style={tw`flex-1 bg-gray-50 p-5 rounded-[24px] border border-gray-100 shadow-sm`}>
              <Text style={tw`text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2`}>Expenses</Text>
              <Text style={tw`text-lg font-black text-red-600`}>${total.toLocaleString()}</Text>
           </View>
           <View style={tw`flex-1 bg-gray-50 p-5 rounded-[24px] border border-gray-100 shadow-sm`}>
              <Text style={tw`text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2`}>Budget Left</Text>
              <Text style={tw`text-lg font-black text-green-600`}>${(incomeGoal - total).toLocaleString()}</Text>
           </View>
        </View>

        <View style={tw`px-6`}>
           <View style={tw`flex-row justify-between items-center mb-6`}>
              <Text style={tw`text-[11px] font-black uppercase text-gray-400 tracking-widest`}>Recent Activity</Text>
              <TouchableOpacity>
                 <Text style={tw`text-[10px] font-black text-[#1A1F36] uppercase tracking-widest`}>Show All</Text>
              </TouchableOpacity>
           </View>
           {(expenses || []).slice(0, 5).map((item) => (
              <TouchableOpacity key={item.id} style={tw`bg-white rounded-3xl p-4 mb-4 border border-gray-50 flex-row items-center shadow-xs`}>
                 <View style={tw`w-12 h-12 bg-gray-50 rounded-2xl items-center justify-center mr-4`}>
                    <Ionicons name={getIcon(item.category)} size={24} color="#1A1F36" />
                 </View>
                 <View style={tw`flex-1`}>
                    <Text style={tw`text-sm font-black text-[#1A1F36] mb-1`}>{item.title}</Text>
                    <Text style={tw`text-[11px] text-gray-400 font-black uppercase tracking-tight`}>{new Date(item.createdAt).toLocaleDateString()} • {item.category}</Text>
                 </View>
                 <Text style={tw`text-sm font-black text-red-600`}>-${Number(item.amount).toLocaleString()}</Text>
              </TouchableOpacity>
           ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getIcon = (cat) => {
  if (cat === 'Groceries' || cat === 'Shopping') return 'basket-outline';
  if (cat === 'Transport') return 'car-outline';
  if (cat === 'Leisure' || cat === 'Dining') return 'restaurant-outline';
  if (cat === 'Utilities') return 'flash-outline';
  if (cat === 'Health') return 'medical-outline';
  return 'card-outline';
};
