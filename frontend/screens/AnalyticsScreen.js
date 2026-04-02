import React, { useMemo } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../context/ExpensesContext';
import { PieChart } from 'react-native-chart-kit';

export default function AnalyticsScreen() {
  const { expenses } = useExpenses();
  
  const categoryData = useMemo(() => {
    const map = {};
    (expenses || []).forEach(e => {
        map[e.category] = (map[e.category] || 0) + Number(e.amount || 0);
    });
    
    // Sophisticated Fintech Palette
    const colors = ['#1A1F36', '#334155', '#64748B', '#94A3B8', '#CBD5E1', '#E2E8F0'];

    return Object.entries(map)
      .sort((a,b) => b[1]-a[1])
      .map(([name, population], idx) => ({
        name,
        population,
        color: colors[idx] || '#F1F5F9',
        legendFontColor: '#1A1F36',
        legendFontSize: 11
      }));
  }, [expenses]);

  const totalSpent = useMemo(() => (expenses || []).reduce((acc, curr) => acc + Number(curr.amount || 0), 0), [expenses]);
  const portfolio = 142850.42;

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`px-6 pt-6 pb-6 bg-white flex-row justify-between items-center border-b border-gray-100 shadow-xs`}>
          <Text style={tw`text-3xl font-black text-[#1A1F36] tracking-tighter`}>FIYO</Text>
          <TouchableOpacity style={tw`w-10 h-10 items-center justify-center bg-gray-50 rounded-xl`}>
             <Ionicons name="notifications-outline" size={24} color="#1A1F36" />
          </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={tw`pb-40`} showsVerticalScrollIndicator={false}>
         {/* PORTFOLIO SUMMARY */}
         <View style={tw`px-6 py-8`}>
            <Text style={tw`text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1`}>Total Assets</Text>
            <View style={tw`flex-row justify-between items-end`}>
               <Text style={tw`text-3xl font-black text-[#1A1F36] tracking-tighter`}>${portfolio.toLocaleString()}</Text>
               <View style={tw`items-end`}>
                  <Text style={tw`text-[11px] font-bold text-green-600`}>+12.4% MONTHLY DRIFT</Text>
               </View>
            </View>
         </View>

         {/* REFINED PIE CHART */}
         <View style={tw`px-6`}>
            <View style={tw`bg-white rounded-[32px] p-6 border border-gray-100 mb-8 shadow-xl overflow-hidden`}>
               <Text style={tw`text-sm font-black text-[#1A1F36] mb-8`}>Expenditure Allocation</Text>
               {categoryData.length > 0 ? (
                 <PieChart
                   data={categoryData}
                   width={Dimensions.get('window').width - 48}
                   height={180}
                   chartConfig={{
                     color: (opacity = 1) => `rgba(26, 31, 54, ${opacity})`,
                   }}
                   accessor={"population"}
                   backgroundColor={"transparent"}
                   paddingLeft={"10"}
                   center={[0, 0]}
                   absolute
                 />
               ) : (
                 <View style={tw`h-48 items-center justify-center`}>
                    <Text style={tw`text-gray-300 text-xs font-bold`}>CALCULATING LEDGER...</Text>
                 </View>
               )}
            </View>

            {/* DYNAMIC TOP SPENDING CARDS */}
            <View style={tw`bg-white px-8 pb-10 border-b border-gray-100 mb-8`}>
               <Text style={tw`text-[10px] font-black text-gray-400 uppercase tracking-widest mb-10`}>Spending Concentration</Text>
               {categoryData.slice(0, 4).map((cat, idx) => {
                 const percentage = ((cat.population / totalSpent) * 100).toFixed(0);
                 return (
                   <View key={idx} style={tw`mb-7`}>
                      <View style={tw`flex-row justify-between mb-4`}>
                         <Text style={tw`text-[11px] font-black text-[#1A1F36] uppercase tracking-widest`}>{cat.name}</Text>
                         <Text style={tw`text-[11px] font-black text-[#1A1F36]`}>${cat.population.toLocaleString()}</Text>
                      </View>
                      <View style={tw`h-1.5 bg-gray-50 rounded-full overflow-hidden`}>
                         <View style={[tw`h-1.5 rounded-full`, { backgroundColor: cat.color, width: `${percentage}%` }]} />
                      </View>
                   </View>
                 );
               })}
            </View>

            <View style={tw`bg-[#1A1F36] rounded-3xl p-8 mb-8 flex-row items-center border border-gray-800 shadow-xl`}>
               <View style={tw`w-12 h-12 bg-white/10 rounded-2xl items-center justify-center mr-4`}>
                  <Ionicons name="analytics" size={24} color="white" />
               </View>
               <View style={tw`flex-1`}>
                  <Text style={tw`text-sm font-black text-white mb-1`}>Intelligent Audit</Text>
                  <Text style={tw`text-[10px] text-gray-400 font-bold uppercase tracking-widest`}>Recent anomaly detected in {categoryData[0]?.name || 'spending'}</Text>
               </View>
            </View>
         </View>
      </ScrollView>
    </SafeAreaView>
  );
}
