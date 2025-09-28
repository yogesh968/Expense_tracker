import React, { useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useExpenses } from '../context/ExpensesContext';
import { PieChartView, BarChartView } from '../components/ChartView';
import { isThisMonth } from '../utils/dateRange';
import tw from 'twrnc';

const categories = ['Food', 'Travel', 'Shopping', 'Bills', 'Others'];
const colors = ['#60a5fa', '#34d399', '#f472b6', '#f59e0b', '#a78bfa'];

export default function AnalyticsScreen() {
  const { expenses } = useExpenses();

  const monthExpenses = useMemo(() => expenses.filter((e) => isThisMonth(e.date)), [expenses]);

  const pieData = useMemo(() => {
    const totals = Object.fromEntries(categories.map((c) => [c, 0]));
    monthExpenses.forEach((e) => (totals[e.category] = (totals[e.category] || 0) + Number(e.amount || 0)));
    return categories.map((c, i) => ({ name: c, amount: totals[c], color: colors[i], legendFontColor: '#64748b', legendFontSize: 12 }));
  }, [monthExpenses]);

  const barData = useMemo(() => {
    // Last 7 days trend
    const days = [...Array(7)].map((_, idx) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - idx));
      d.setHours(0,0,0,0);
      return d;
    });
    const labels = days.map((d) => `${d.getDate()}`);
    const sums = days.map((d) => {
      const next = new Date(d); next.setDate(d.getDate() + 1);
      return monthExpenses
        .filter((e) => {
          const dt = new Date(e.date);
          return dt >= d && dt < next;
        })
        .reduce((s, e) => s + Number(e.amount || 0), 0);
    });
    return { labels, sums };
  }, [monthExpenses]);

  return (
    <ScrollView style={tw`flex-1 bg-neutral-50`} contentContainerStyle={{ padding: 16 }}>
      <Text style={tw`text-neutral-700 font-semibold mb-2`}>Category Distribution</Text>
      <PieChartView data={pieData} />

      <Text style={tw`text-neutral-700 font-semibold mt-6 mb-2`}>Last 7 Days</Text>
      <BarChartView data={barData.sums} labels={barData.labels} />
    </ScrollView>
  );
}
