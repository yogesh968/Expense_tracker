import React from 'react';
import { View, Text, Switch, Alert, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { clearExpenses, getExpenses } from '../utils/storage';
import tw from 'twrnc';


function toCSV(rows) {
  if (!rows || rows.length === 0) return 'id,title,amount,category,date\n';
  const header = Object.keys(rows[0]).join(',');
  const body = rows.map((r) => Object.values(r).map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  return `${header}\n${body}`;
}

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();

  const onReset = async () => {
    await clearExpenses();
    Alert.alert('Done', 'All expenses cleared');
  };

  const onExport = async () => {
    const data = await getExpenses();
    const csv = toCSV(data);
    Alert.alert('Export CSV', csv.slice(0, 500) + (csv.length > 500 ? '\n... (truncated)' : ''));
  };

  return (
    <View style={tw`flex-1 bg-neutral-50 p-4`}>
      <View style={tw`bg-white rounded-2xl p-5 shadow-sm border border-neutral-100`}>
        <View style={tw`flex-row items-center justify-between mb-4`}>
          <Text style={tw`text-neutral-800`}>Dark Mode</Text>
          <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
        </View>

        <TouchableOpacity onPress={onReset} style={tw`bg-red-50 rounded-xl py-3 items-center mb-3`}>
          <Text style={tw`text-red-600 font-medium`}>Reset Data</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onExport} style={tw`bg-blue-600 rounded-xl py-3 items-center`}>
          <Text style={tw`text-white font-semibold`}>Export CSV</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
